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
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "@/assets/icons/icons";
import { useGetNewsList } from "@/services/api";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
const limit = 6;
export const News = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(+page || 1);

  const handlePaginationClick = (type) => {
    if (type === "prev") {
      setCurrentPage((prevVal) => prevVal - 1);
    }
    if (type === "next") {
      setCurrentPage((prevVal) => prevVal + 1);
    }
    const page = type === "prev" ? currentPage - 1 : currentPage + 1;
    const path = `${pathname}?page=${page}`;
    router.push(path, { scroll: false });
  };

  const { data: newsList } = useGetNewsList(
    {
      data: JSON.stringify({
        order: {},
        view_fields: [],
        search: "",
        undefined: "",
      }),
    },
    {
      select: (res) => {
        return res;
        // if (res.count && res.count !== pageLength) {
        //   setPageLength(res.count);
        // }
      },
    }
  );

  if (!newsList?.response?.length) return null;
  const count = newsList?.count;
  return (
    <Container mt={"96px"}>
      <Stack gap={0}>
        <Heading fontSize={36} lineHeight="44px" mb="32px">
          Новости
        </Heading>
        <NewsList page={currentPage - 1} news={newsList?.response} />
        <Pagination
          click={handlePaginationClick}
          page={currentPage}
          pageLength={Math.ceil(count / limit) || 1}
        />
      </Stack>
    </Container>
  );
};

const Pagination = ({ page, pageLength,click }) => {
  return (
    <>
      <Container mb={"96px"}>
        <Flex>
          <IconButton
            isDisabled={page === 1}
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
            Страница <b>{page}</b> из <b>{pageLength}</b>
          </Box>
          <Spacer />
          <IconButton
            isDisabled={page === pageLength}
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

const NewsList = ({ news = [], page }) => {
  const limit = 6;
  const fromTo = [page * limit, limit * (page + 1)];
  const data = news ? news.slice(fromTo[0], fromTo[1]) : [];

  return (
    <>
      <SimpleGrid columns={[2, null, 3]} spacing="32px" mb={68}>
        {data?.map((newCard, i) => (
          <NewsCard key={i} data={newCard} />
        ))}
      </SimpleGrid>
    </>
  );
};

const NewsCard = ({ data = {} }) => {
  const searchParams = useSearchParams();
  const fromPage = searchParams.get("page") || "1";
  return (
    <>
      <Link href={`news/${data.guid}?page=${fromPage}`}>
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
            <div dangerouslySetInnerHTML={{ __html: data.comment || lorem }} />
          </Box>
        </Box>
      </Link>
    </>
  );
};

const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ab!";
