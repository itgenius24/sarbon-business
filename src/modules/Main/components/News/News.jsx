"use client";

import { Container } from "@/components/Container";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "@/assets/icons/icons";
import { useGetNewsList } from "@/services/api";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
const limit = 6;

export const News = ({ t }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(+page || 0);

  const handlePaginationClick = (type) => {
    if (type === "prev" && currentPage > 0) {
      setCurrentPage((prevVal) => prevVal - 6);
    }
    if (type === "next") {
      setCurrentPage((prevVal) => prevVal + 6);
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
    }
  );

  if (!newsList?.response?.length) return null;
  const count = newsList?.count;

  return (
    <Container>
      <Stack gap={0}>
        <Heading fontSize={36} lineHeight="44px" mb="32px">
          {t("Новости")}
        </Heading>
        <NewsList page={currentPage - 1} news={newsList?.response} />
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
    <>
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
    </>
  );
};

const NewsList = ({ news = [] }) => {

  return (
    <>
      <SimpleGrid columns={[2, null, 3]} spacing="32px" mb={68}>
        {news?.map((newCard, i) => (
          <NewsCard key={i} data={newCard} />
        ))}
      </SimpleGrid>
    </>
  );
};

const NewsCard = ({ data = {} }) => {
  const searchParams = useSearchParams();
  const fromPage = searchParams.get("page") || "1";

  const locale = useGetLang();

  return <Link href={`/${locale}/news/${data.guid}?page=${fromPage}`}>
    <Box>
      <Box borderRadius={10} overflow="hidden" maxW="max-content">
        <Image
          style={{ aspectRatio: "384 / 280", objectFit:"cover" }}
          width={384}
          height={280}
          src={data.news_photo}
          alt={data.title}
        />
      </Box>
      <Heading
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
        <div dangerouslySetInnerHTML={{ __html: data.comment }} />
      </Box>
    </Box>
  </Link>;
};
