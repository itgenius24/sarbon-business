"use client";

import cls from "./styles.module.scss";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { InfoBox } from "../(components)/InfoBox";
import React from "react";
import { Logo } from "../../../../components/Logo/Logo";
import { LocaleDropdown } from "@/components/LocaleDropdown";
import { ContainerNav } from "@/components/container/Container";
import { Container } from "@/components/Container";

export default function AuthLayout({ children, params: { locale, auth } }) {
  const isRegisterForm = auth?.[0];

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return (
    <>
      {isRegisterForm !== `registration-form` ? (
        <Box display={`flex`} bgColor={"baseWhite"} height={"100vh"}>
          <Box className={cls.contendWrap} height={`100%`} width={`50%`}>
            <Box
              height={`74px`}
              display={`flex`}
              alignItems={`center`}
              justifyContent={`space-between`}
            >
              <ContainerNav>
                <Box
                  className={cls.navContainer}
                  display="flex"
                  justifyContent="space-between"
                  alignItems={`center`}
                >
                  <Logo
                    width={isLargerThan845 ? 134 : 150}
                    height={isLargerThan845 ? 134 : 150}
                  />

                  <LocaleDropdown locale={locale} />
                </Box>
              </ContainerNav>
            </Box>

            <Box
              width={`100%`}
              display={`flex`}
              alignItems={`center`}
              justifyContent={`space-around`}
              className={cls.layoutContend}
            >
              <div className={cls.formWrapper}>{children}</div>
            </Box>

          </Box>
          <Box className={cls.imgWrap} height={`100%`} width={`50%`}>
            <InfoBox />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box bgColor={"baseWhite"} borderBottom="1px solid #EAECF0">
            <ContainerNav>
              <Box display="flex" justifyContent="space-between" py="16px">
                <Logo />
                <LocaleDropdown locale={locale} />
              </Box>
            </ContainerNav>
          </Box>
          <Container 
           maxW={`1444px`}
            m={!isLargerThan845 && `0px`}
            p={!isLargerThan845 && `0px`}
          >
            <div className={cls.formWrapper2}>{children}</div>
          </Container>
        </Box>
      )}
    </>
  );
}
