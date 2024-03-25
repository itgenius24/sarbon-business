"use client";

import { Box } from "@chakra-ui/react";
import { InfoBox } from "../(components)/InfoBox";
import React from "react";

export default function AuthLayout({ children }) {
  return <Box bgColor="baseWhite" pt="24px" pb="26px">
    <Box maxW="1440px" mx="auto" display="flex" alignItems="center" justifyContent="space-between">
      <Box maxW="360px" ml="auto" mr="180px">
        {children}
      </Box>
      <InfoBox />
    </Box>
  </Box>;
}
