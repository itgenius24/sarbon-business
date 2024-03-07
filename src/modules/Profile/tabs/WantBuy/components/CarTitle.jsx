import { Heading } from "@chakra-ui/react";
import React from "react";

export const CarTitle = ({ title }) => {
  return (
    <Heading fontSize="16px" lineHeight="19px">
      {title}
    </Heading>
  );
};
