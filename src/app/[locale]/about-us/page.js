"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Heading, Text } from "@chakra-ui/react";
import { DigitalFacts } from "./(components)/DigitalFacts";
import { Partners } from "./(components)/Partners";
import { useAboutUsProps } from "./useAboutUsProps";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";

export default function AboutUsPage({ params }) {

  const { locale } = params;

  const { t } = useTranslation(locale, "translations");

  const { directory, crumbs, partners } = useAboutUsProps();

  return <Container mt="50px">
    <BreadCrumb crumbs={crumbs} />
    <Heading fontSize="36px" lineHeight="44px" mb="24px">
      {t("О системе Furgo")}
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
      mt="64px"
      fontWeight="400"
      fontSize="20px"
      lineHeight="30px"
      color="brand.600"
      dangerouslySetInnerHTML={{ __html: directory?.answear }}
    />
    <DigitalFacts
      t={t}
      completed={directory?.projects_completed}
      downloads={directory?.global_downloads}
      investment={directory?.return_on_investment}
    />
    <Partners partners={partners} t={t} />
  </Container>;
}
