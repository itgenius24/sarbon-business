"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { DigitalFacts } from "./(components)/DigitalFacts";
import { Partners } from "./(components)/Partners";
import { useAboutUsProps } from "./useAboutUsProps";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";

export default function AboutUsPage({ params }) {

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { locale } = params;

  const { t } = useTranslation(locale, "translations");

  const { directory, crumbs, partners } = useAboutUsProps();

  return <Container mt="50px">
    {
      isLargerThan768 && <BreadCrumb crumbs={crumbs} />
    }
    <Box padding={isLargerThan768 ? 0 : "12px"} borderRadius={isLargerThan768 ? 0 : "12px"} bgColor={isLargerThan768 ? "transparent" : "white"}>
      <Heading fontSize={isLargerThan768 ? "36px" : "25px"} lineHeight="44px" mb={isLargerThan768 ? "24px" : "8px"}>
        {t("О системе Sarbon")}
      </Heading>
      <Text
        fontWeight="400"
        fontSize="20px"
        lineHeight="30px"
        color="brand.600"
        dangerouslySetInnerHTML={{ __html: directory?.question }}
      />
      <Image style={{ borderRadius: "10px" }} alt="" src={directory?.photo} width="907" height="128" />
      <Text
        mt={isLargerThan768 ? "64px" : "8px"}
        fontWeight="400"
        fontSize="20px"
        lineHeight="30px"
        color="brand.600"
        dangerouslySetInnerHTML={{ __html: directory?.answear }}
      />
    </Box>
  </Container>;
}
