import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const LeftHeaderCard = ({ title, value }) => {
  const {t} = useTranslation();
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
        {value || t("не найдено")}
      </Text>
    </Box>
  );
};
