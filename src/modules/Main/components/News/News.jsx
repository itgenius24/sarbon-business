"use client";

import { ArrowLeft } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetNewsList } from "@/services/api";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Spacer,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import cls from "./styles.module.scss";
// keepPreviousData is deprecated in v4, using placeholderData instead
import { useTranslation } from "@/app/i18n/client";

export const News = () => {

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(+page || 0);
  const [limit, setLimit] = useState(6);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const handlePaginationClick = (type) => {
    if (type === "prev" && currentPage > 0) {
      setCurrentPage((prevVal) => prevVal - 6);
    }
    if (type === "next") {
      if(!isLargerThan768) {
        setLimit((prevVal) => prevVal + 6);
        return;
      } else {
        setCurrentPage((prevVal) => prevVal + 6);
      }
    }
    const page = type === "prev" ? currentPage - 6 : currentPage + 6;
    const path = `${pathname}?page=${page}`;
    router.push(path, { scroll: false });
  };

  const { data: newsList } = useGetNewsList(
    {
      limit,
      offset: currentPage,
      data: JSON.stringify({
        order: {},
        view_fields: [],
        search: "",
        // undefined: "",
      }),
    },
    {
      select: (res) => {
        return res;
      },
      placeholderData: isLargerThan768 ? [] : undefined,
    }
  );

  if (!newsList?.response?.length) return null;
  const count = newsList?.count;

  return (
    <Container>
      <Stack gap={0}>
        <Heading className={cls.title} fontSize={36} lineHeight="44px" mb="32px">
          {t("Новости")}
        </Heading>
        <NewsList
          page={page}
          count={count || 1}
          handlePaginationClick={handlePaginationClick}
          isLargerThan768={isLargerThan768}
          news={newsList?.response}
        />
        <Pagination
          t={t}
          click={handlePaginationClick}
          page={currentPage}
          pageLength={Math.ceil(count / limit) || 1}
        />
      </Stack>
    </Container>
  );
};

const Pagination = ({ page, pageLength, click, t }) => {

  return (
    <Box className={cls.pagination}>
      <Container mb={"96px"}>
        <Flex>
          <IconButton
            isDisabled={page === 0}
            borderColor="#D0D5DD"
            h="36px"
            minW="36px"
            maxW="36px"
            variant="outline"
            aria-label="Previous button"
            icon={<ArrowLeft />}
            onClick={() => click("prev")}
            bgColor="#fff"
          />
          <Spacer />
          <Box>
            {t("Страница")} <b>{Math.floor(page / 6) + 1}</b> {t("из")} <b>{pageLength}</b>
          </Box>
          <Spacer />
          <IconButton
            isDisabled={Math.floor(page / 6) + 1 === pageLength}
            borderColor="#D0D5DD"
            h="36px"
            minW="36px"
            maxW="36px"
            variant="outline"
            aria-label="Next button"
            bgColor="#fff"
            icon={<ArrowLeft rotate={true} />}
            onClick={() => click("next")}
          />
        </Flex>
      </Container>
    </Box>
  );
};

const NewsList = ({ news = [], handlePaginationClick, isLargerThan768, page, count }) => {

  return (
    <>
      <SimpleGrid className={cls.simpleGrid} columns={[2, null, 3]} spacing="32px" mb={68}>
        {news?.map((newCard, i) => (
          <NewsCard key={i} data={newCard} />
        ))}
        {
          !isLargerThan768 && <Box display="flex" flexDirection="column" justifyContent="center">
            <IconButton
              isDisabled={news?.length >= count}
              borderColor="#D0D5DD"
              h="36px"
              minW="36px"
              maxW="36px"
              variant="outline"
              aria-label="Next button"
              bgColor="#fff"
              icon={<ArrowLeft rotate={true} />}
              onClick={() => handlePaginationClick("next")}
            />
          </Box>
        }
      </SimpleGrid>
    </>
  );
};

const NewsCard = ({ data = {} }) => {
  const searchParams = useSearchParams();
  const fromPage = searchParams.get("page") || "1";

  const locale = useGetLang();

  return <Link href={`/${locale}/news/${data.guid}?page=${fromPage}`}>
    <Box className={cls.newsCard}>
      <Box className={cls.newsCardImageBox} overflow="hidden" maxW="max-content">
        <Image
          className={cls.newsCardImage}
          style={{ aspectRatio: "384 / 280", objectFit:"cover" }}
          width={384}
          height={280}
          src={data.news_photo}
          alt={data.title}
        />
      </Box>
      <Box className={cls.newsCardContent}>
        <Heading
          className={cls.newsHeading}
          fontSize={24}
          lineHeight="32px"
          noOfLines={1}
          m="24px 0 8px"
          {...(!data.title ? { color: "transparent" } : {})}
        >
          {data.title || "!"}
        </Heading>
        <Box
          color="brand.600"
          fontWeight={500}
          noOfLines={2}
          {...(!data.comment ? { color: "transparent" } : {})}
        >
          <div className={cls.newsComment} dangerouslySetInnerHTML={{ __html: data.comment }} />
        </Box>
      </Box>
    </Box>
  </Link>;
};
