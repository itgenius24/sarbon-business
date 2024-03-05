import { Box, Text } from "@chakra-ui/react";

export const LeftHeaderCard = ({ title, value }) => {
  return (
    <Box width={150} p="8px 12px" bg="white" rounded="10px">
      <Text
        fontSize="14px"
        lineHeight="18px"
        fontWeight={400}
        letterSpacing="-0.24px"
        color="icon.base"
      >
        {title}
      </Text>
      <Text color="black" mt="8px">
        {value}
      </Text>
    </Box>
  );
};
