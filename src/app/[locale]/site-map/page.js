"use client";

import { Container } from "@/components/Container";
import { Box, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import Image from "next/image";
import TrakImage from "@/assets/images/trak.svg";
import Link from "next/link";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";

export default function SiteMap() {

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Box h="100%">
    <Container>
      <Box width="472px" m="0 auto">
        <Flex justifyContent="center" mb="52px">
          <Image src={TrakImage} width="384" height="257" alt="trak" />
        </Flex>
        <Heading color="brand.600" mb="80px">{t("Карта сайта")}</Heading>
        <Heading fontSize="24px" lineHeight="32px" mb="40px">{t("Главная")}</Heading>
        <Heading fontSize="36px" lineHeight="44px" mb="24px">{t("Поиск грузов")}</Heading>
        <UnorderedList color="primary">
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href={`/${locale}/distance-calculation`}>{t("Расчет расстояний")}</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href={`/${locale}/about-us`}>{t("О системе Logistics")}</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href={`/${locale}/contact`}>{t("Контактная информация")}</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href={`/${locale}/privacy-policy`}>{t("Политика конфиденциальности")}</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href={`/${locale}/site-map`}>{t("Карта сайта")}</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href={`/${locale}/add-cargo`}>{t("Добавить груз")}</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href={`/${locale}/my-loads`}>{t("Мои грузы")}</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href={`/${locale}/search-car`}>{t("Поиск машин")}</Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Container>
  </Box>;
}
