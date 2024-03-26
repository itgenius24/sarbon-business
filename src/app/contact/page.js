"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Box, Heading } from "@chakra-ui/react";
import { useContactProps } from "./useContactProps";
import Image from "next/image";
import { ContactCard } from "./(components)/ContactCard";
import { Locations } from "./(components)/Locations";
import { PageContentLayout } from "@/layouts/PageContentLayout";

export default function ContactPage() {

  const { crumbs, directory, address } = useContactProps();

  return <>
    <PageContentLayout>
      <Container mt="50px">
        <BreadCrumb crumbs={crumbs} />
        <Heading fontSize="36px" lineHeight="44px" mb="50px">
          Контактная информация
        </Heading>
        <Box mb="100px">
          <Image src={directory?.photo} width="908" height="374" alt="" />
        </Box>
        <Box display="flex" columnGap="24px" mb="50px">
          <ContactCard title="Почта" desc="Мы вам поможем" type="email" content={directory?.email} />
          <ContactCard title="Локация" desc="Локация нашего офиса" type="location" content={address} />
          <ContactCard title="Номер" desc="Пн-Пт, от 10:00 до 18:00" type="phone" content={directory?.phone_number} />
        </Box>
      </Container>
    </PageContentLayout>
    <Locations location={address} />
  </>;
}
