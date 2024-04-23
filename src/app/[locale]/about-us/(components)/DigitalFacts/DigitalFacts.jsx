import { Box, Heading, Text } from "@chakra-ui/react";
import cls from "./style.module.scss";

export const DigitalFacts = ({
  completed,
  downloads,
  investment,
  t = () => { },
  isLargerThan768,
}) => {

  return <Box py={isLargerThan768 ? "96px" : "24px"}>
    <Heading textAlign="center" mb={isLargerThan768 ? "20px" : "4px"} fontSize={isLargerThan768 ? "36px" : "24px"} lineHeight={isLargerThan768 ? "44px" : "32px"}>{t("Мы в цифрах")}</Heading>
    <Text color="brand.600" textAlign="center" fontSize={isLargerThan768 ? "20px" : "16px"} lineHeight={isLargerThan768 ? "30px" : "24px"}>{t("Наши данные в цифрах для более точного информации")}</Text>
    <Box
      className={cls.digitalFacts}
      maxW="906px"
      mx="auto"
      mt={isLargerThan768 ? "64px" : "24px"}
      bgColor="baseWhite"
      borderRadius="16px"
      display="flex"
      justifyContent="space-between"
      alignItems={isLargerThan768 ? "stretch" : "center"}
      flexDirection={isLargerThan768 ? "row" : "column"}
      rowGap={isLargerThan768 ? "0" : "24px"}
    >
      <Box w="261px" textAlign="center">
        <Text fontWeight="600" fontSize={isLargerThan768 ? "60px" : "36px"} lineHeight={isLargerThan768 ? "72px" : "44px"} color="primary">{completed}+</Text>
        <Text fontWeight="500" fontSize="18px" lineHeight="28px" >Projects completed</Text>
      </Box>
      <Box w="261px" textAlign="center">
        <Text fontWeight="600" fontSize={isLargerThan768 ? "60px" : "36px"} lineHeight={isLargerThan768 ? "72px" : "44px"} color="primary">{investment}%</Text>
        <Text fontWeight="500" fontSize="18px" lineHeight="28px" >Return on investment</Text>
      </Box>
      <Box w="261px" textAlign="center">
        <Text fontWeight="600" fontSize={isLargerThan768 ? "60px" : "36px"} lineHeight={isLargerThan768 ? "72px" : "44px"} color="primary">{downloads}</Text>
        <Text fontWeight="500" fontSize="18px" lineHeight="28px" >Global downloads</Text>
      </Box>
    </Box>
  </Box>;
};
