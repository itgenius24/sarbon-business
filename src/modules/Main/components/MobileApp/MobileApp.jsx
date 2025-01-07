"use client";

import { useTranslation } from "@/app/i18n/client";
import cls from "./styles.module.scss";
import { RoundCheckIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
// import { useGetLang } from "@/hooks/useGetLang";
import { Box, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const MobileApp = ({ photo, description, description1, data }) => {
  const { t } = useTranslation();
  console.log(`data`, data);
  return (
    <Container className={cls.mobileContainer} mt={"96px"} mb={"96px"}>
      <Box className={cls.mobileApp} bg="white" borderRadius={24}>
        <Heading
          className={cls.mobileAppHeading}
          fontSize={36}
          lineHeight="44px"
          mb={20.5}
          color={`var(--primary-text)`}
        >
          {t("Мобильное приложение")}
        </Heading>
        <Box className={cls.contentWrapper} height={`100%`} display="flex" alignItems="center">
          <LeftContent description={description} description1={description1} />

          <RightContent photo={photo} />
        </Box>
      </Box>
    </Container>
  );
};

const RightContent = ({ photo }) => {
  return (
    <Box className={cls.bannerWrapper} width={"100%"} position="relative">
      <Image
        className={cls.bannerImage}
        width={400}
        height={400}
        src={`https://cdn.u-code.io/3bf18b7b-4c9f-4166-b20f-cbb430ea03bc/media/17ed1e94-38ea-4f5b-8f36-7b27362796b2_sarbon_logistic_app.png`}
        alt="Mobile Img"
      />
    </Box>
  );
};

const LeftContent = ({ description, description1, t }) => {
  return (
    <Box className={cls.leftContent} flexGrow="1">
      <Box
        className={cls.leftContentInner}
        bg="brand.50"
        borderRadius={12}
        p="20px 24px"
      >
        <Flex mb={26} alignItems="center">
          {/* <Image
            // style={{ borderRadius: "50%" }}
            priority={false}
            width={40}
            height={40}
            src={"/svg/logo.svg"}
            alt="Furgo logo"
          />
          <Box as="span" ml="10px" fontSize={24} fontWeight={600}>
            Furgo
          </Box> */}
        </Flex>
        <List className={cls.list} maxW={384} color="brand.600">
          <ListItem
            display={"flex"}
            alignItems="baseline"
            width="100%"
            mb={"10px"}
          >
            <RoundCheckIcon styles={{ transform: "translate(0px, 4px)" }} />
            <Text ml={"12px"} fontWeight={400}>
              {description}
            </Text>
          </ListItem>
          <ListItem display={"flex"} alignItems="baseline" width="100%">
            <RoundCheckIcon styles={{ transform: "translate(0px, 4px)" }} />
            <Text ml={"12px"} fontWeight={400}>
              {description1}
            </Text>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
