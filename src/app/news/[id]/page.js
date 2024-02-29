"use client";

import { Container } from "@/components/Container";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useGetNewData } from "@/services/api";

const maxW = 908 + 16 + 16; // width + pL + pR
export default function NewsPage() {
  const { id } = useParams() || {};
  const page = useSearchParams()?.get("page") || "1";

  const { data } = useGetNewData(
    id,
    {
      select: (res) => {
        return res?.response;
        // if (res.count && res.count !== pageLength) {
        //   setPageLength(res.count);
        // }
      },
    }
  );

  return (
    <Container maxW={`${maxW}px`} mt="50px">
      <Breadcrumb
        mb="24px"
        separator={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
          >
            <circle cx="2" cy="2" r="2" fill="#98A2B3" />
          </svg>
        }
      >
        <BreadcrumbItem color="#98A2B3">
          <BreadcrumbLink as={Link} href={`/?page=${page}`}>
            Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage color="#344054">
            Новости
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading fontSize={48} lineHeight="60px" mb="24px">
        {data?.title}
      </Heading>
      {/* <Text
        color="brand.600"
        fontSize={20}
        lineHeight="30px"
        fontWeight={400}
        mb="64px"
      >
        How do you create compelling presentations that wow your colleagues and
        impress your managers?
      </Text> */}
      <Box maxH={514} borderRadius="10px" overflow="hidden" mb="64px">
        <Image
          src={data?.photo}
          alt={data?.title}
          width={908}
          height={514}
          style={{ maxHeight: "inherit" }}
        />
      </Box>
      <Box
        color="brand.600"
        fontSize={18}
        lineHeight="28px"
        fontWeight={400}
        mb="96px"
        display={!data?.comment ? "none" : ""}
      >
        <div dangerouslySetInnerHTML={{ __html: data?.comment }} />
      </Box>
    </Container>
  );
}
