import { Text } from "@chakra-ui/react";

export const CarInfo = ({ prop, val, color = "brand.800" }) => {
  return (
    <Text
      display="flex"
      gap="8px"
      fontSize="14px"
      fontWeight={400}
      lineHeight="18px"
      color="brand.500"
    >
      {prop}
      <Text as="span" fontWeight={500} color={color}>
        {val}
      </Text>
    </Text>
  );
};
