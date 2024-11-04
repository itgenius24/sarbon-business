"use client";

import { Container } from "@/components/Container";
import { TopContentPerfomet } from "../Cargo/components/TopContentPerfomet/TopContentPerfomet";
import { Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useGetLang } from "@/hooks/useGetLang";

export const PerformedModule = () => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return (
    <Container my="40px">
      <Flex width={"100%"} justifyContent={"space-between"}>
        <Heading
          size={isLargerThan845 ? "md" : "sm"}
          mb={isLargerThan845 ? "24px" : "12px"}
        >
          {t("В исполнение")}
        </Heading>
      </Flex>
      <TopContentPerfomet />
    </Container>
  );
};
