"use client";

import cls from "./styles.module.scss";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { InfoBox } from "../(components)/InfoBox";
import React from "react";
import { Logo } from "@/components/Logo";
import { LocaleDropdown } from "@/components/LocaleDropdown";
import { Container } from "@/components/Container";

export default function AuthLayout({ children, params: { locale, auth } }) {
  const isRegisterForm = auth?.[0];
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return (
    <Box bgColor={isRegisterForm !== "registration-form" ? "baseWhite":``} height={"100%"}>
      <Box bgColor={"baseWhite"} borderBottom="1px solid #EAECF0">
        <Container>
          <Box display="flex" justifyContent="space-between" py="16px">
            <Logo />
            <LocaleDropdown locale={locale} />
          </Box>
        </Container>
      </Box>
      <Box pt="24px" pb="26px">
        {isRegisterForm !== "registration-form" ? (
          <Box
            maxW="1440px"
            mx="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            columnGap="180px"
            // background={`red`}
          >
            <div className={cls.formWrapper}>{children}</div>
            <InfoBox />
          </Box>
        ) : (
          <Container  m={!isLargerThan845 && `0px`} p={!isLargerThan845 && `0px`} >
            <div className={cls.formWrapper2}>{children}</div>
          </Container>
        )}
      </Box>
    </Box>
  );
}
