import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export const CarTitle = ({ title, price }) => {
  return (
    <Heading display="flex" justifyContent="space-between" alignItems="center" fontSize="16px" lineHeight="19px">
      <span>{title}</span>
      {
        price && <Box as="span" color="#007AFF">{price}</Box>
      }
    </Heading>
  );
};
