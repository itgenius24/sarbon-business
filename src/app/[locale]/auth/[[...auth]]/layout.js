"use client";

import { Box } from "@chakra-ui/react";
import { InfoBox } from "../(components)/InfoBox";
import React from "react";
import { Logo } from "@/components/Logo";
import { LocaleDropdown } from "@/components/LocaleDropdown";
import { Container } from "@/components/Container";

export default function AuthLayout({ children, params: { locale } }) {
  return <Box bgColor="baseWhite">
    <Box borderBottom="1px solid #EAECF0">
      <Container>
        <Box display="flex" justifyContent="space-between" py="16px">
          <Logo />
          <LocaleDropdown locale={locale} />
        </Box>
      </Container>
    </Box>
    <Box pt="24px" pb="26px">
      <Box maxW="1440px" mx="auto" display="flex" alignItems="center" justifyContent="space-between">
        <Box flexGrow={1} maxW="360px" ml="auto" mr="180px">
          {children}
        </Box>
        <InfoBox />
      </Box>
    </Box>
  </Box>;
}
