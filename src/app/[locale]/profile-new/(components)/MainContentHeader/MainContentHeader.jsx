import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

export const MainContentHeader = ({
  title,
  subtitle,
  icon,
  onTitleClick = () => {},
}) => {
  return (
    <>
      <Flex cursor={icon ? "pointer": "auto"} gap="10px" onClick={onTitleClick}>
        {!!icon && icon}
        {!!title && (
          <Heading fontSize="18px" lineHeight="20px" color="brand.700">
            {title}
          </Heading>
        )}
      </Flex>
      {!!subtitle && (
        <Text fontSize="14px" lineHeight="20px" color="brand.600" mt="8px">
          {subtitle}
        </Text>
      )}
    </>
  );
};
