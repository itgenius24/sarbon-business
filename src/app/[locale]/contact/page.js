"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { useContactProps } from "./useContactProps";
import Image from "next/image";
import { ContactCard } from "./(components)/ContactCard";
import { Locations } from "./(components)/Locations";
import { PageContentLayout } from "@/layouts/PageContentLayout";
import { useTranslation } from "@/app/i18n/client";

export default function ContactPage({ params }) {

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { locale } = params;

  const { t } = useTranslation(locale, "translations");

  const { crumbs, directory, address } = useContactProps();

  return <>
    <PageContentLayout>
      <Container mt="50px">
        {isLargerThan768 && <BreadCrumb crumbs={crumbs} />}
        <Heading fontSize={isLargerThan768 ? "36px" : "24px"} lineHeight={isLargerThan768 ? "44px" : "24px"} mb={isLargerThan768 ? "50px" : "24px"}>
          {t("Контактная информация")}
        </Heading>
        <Box mb={isLargerThan768 ? "100px" : "24px"}>
          <Image style={{ borderRadius: "10px" }} src={directory?.photo} width="908" height="374" alt="" />
        </Box>
        <Box
          display="flex"
          columnGap="24px"
          mb="50px"
          flexDirection={isLargerThan768 ? "row" : "column"}
          rowGap={isLargerThan768 ? "0" : "16px"}
        >
          <ContactCard title={t("Почта")} desc={t("Мы вам поможем")} type="email" content={directory?.email} />
          <ContactCard title={t("Локация")} desc={t("Локация нашего офиса")} type="location" content={address} />
          <ContactCard title={t("Номер")} desc={t("Пн-Пт, от 10:00 до 18:00")} type="phone" content={directory?.phone_number} />
        </Box>
      </Container>
    </PageContentLayout>
    <Locations isLargerThan768={isLargerThan768} location={address} t={t} />
  </>;
}
