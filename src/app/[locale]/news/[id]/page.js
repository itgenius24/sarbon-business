"use client";

import { Container } from "@/components/Container";
import { Box, Heading, useMediaQuery, } from "@chakra-ui/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGetNewData } from "@/services/api";
import { BreadCrumb } from "@/components/BreadCrumb";

const maxW = 908 + 16 + 16; // width + pL + pR
export default function NewsPage({ params }) {

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { id } = params;
  const page = useSearchParams()?.get("page") || "1";

  const { data } = useGetNewData(
    id,
    {
      select: (res) => {
        return res?.response;
      },
    }
  );

  const crumbs = [
    {
      title: "Главная",
      href: `/?page=${page}`,
      color: "#98A2B3",
    },
    { title: "Новости" },
  ];

  return (
    <Container maxW={`${maxW}px`} mt="50px">
      <BreadCrumb crumbs={crumbs} />
      <Box padding={isLargerThan768 ? 0 : "12px"} borderRadius={isLargerThan768 ? 0 : "12px"} bgColor={isLargerThan768 ? "transparent" : "white"}>
        {
          isLargerThan768 && <Heading fontSize={48} lineHeight="60px" mb="24px">
            {data?.title}
          </Heading>
        }
        <Box maxH={514} borderRadius="10px" overflow="hidden" mb={!isLargerThan768 ? "8px" : "64px"}>
          <Image
            src={data?.news_photo}
            alt={data?.title}
            width={908}
            height={514}
            style={{ maxHeight: "inherit" }}
          />
          {
            !isLargerThan768 && <Heading fontSize={20} lineHeight="25px" mt="16px">
              {data?.title}
            </Heading>
          }
        </Box>
        <Box
          color="brand.600"
          fontSize={isLargerThan768 ? 18 : 16}
          lineHeight="28px"
          fontWeight={400}
          mb="96px"
          display={!data?.comment ? "none" : ""}
        >
          <div dangerouslySetInnerHTML={{ __html: data?.comment }} />
        </Box>
      </Box>
    </Container>
  );
}
