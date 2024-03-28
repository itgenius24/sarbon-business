"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Box, Heading } from "@chakra-ui/react";
import { useContactProps } from "./useContactProps";
import Image from "next/image";
import { ContactCard } from "./(components)/ContactCard";
import { Locations } from "./(components)/Locations";
import { PageContentLayout } from "@/layouts/PageContentLayout";
import { useTranslation } from "@/app/i18n/client";

export default function ContactPage({ params }) {

  const { locale } = params;

  const { t } = useTranslation(locale, "translations");

  const { crumbs, directory, address } = useContactProps();

  return <>
    <PageContentLayout>
      <Container mt="50px">
        <BreadCrumb crumbs={crumbs} />
        <Heading fontSize="36px" lineHeight="44px" mb="50px">
          {t("Контактная информация")}
        </Heading>
        <Box mb="100px">
          <Image src={directory?.photo} width="908" height="374" alt="" />
        </Box>
        <Box display="flex" columnGap="24px" mb="50px">
          <ContactCard title={t("Почта")} desc={t("Мы вам поможем")} type="email" content={directory?.email} />
          <ContactCard title={t("Локация")} desc={t("Локация нашего офиса")} type="location" content={address} />
          <ContactCard title={t("Номер")} desc={t("Пн-Пт, от 10:00 до 18:00")} type="phone" content={directory?.phone_number} />
        </Box>
      </Container>
    </PageContentLayout>
    <Locations location={address} t={t} />
  </>;
}
