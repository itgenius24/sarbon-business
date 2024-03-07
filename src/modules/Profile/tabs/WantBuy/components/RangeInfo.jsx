import { Text } from "@chakra-ui/react";

export const RangeInfo = ({ range }) => {
  return (
    <Text fontWeight={600} color="primary" fontSize="14px" lineHeight="14px">
      {range}
    </Text>
  );
};
