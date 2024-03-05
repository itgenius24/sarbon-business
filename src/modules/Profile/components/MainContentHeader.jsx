import { Heading, Text } from "@chakra-ui/react";
import React from "react";

export const MainContentHeader = ({ title, subtitle }) => {
  return (
    <>
      {!!title && (
        <Heading fontSize="18px" lineHeight="20px" color="brand.700">
          {title}
        </Heading>
      )}
      {!!subtitle && (
        <Text fontSize="14px" lineHeight="20px" color="brand.600" mt="8px">
          {subtitle}
        </Text>
      )}
    </>
  );
};
