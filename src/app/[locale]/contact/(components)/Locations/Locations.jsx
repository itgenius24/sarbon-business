import { Container } from "@/components/Container";
import cls from "./styles.module.scss";
import { Box, Heading } from "@chakra-ui/react";

export const Locations = ({ location, t, isLargerThan768 }) => {

  return <Box mb={isLargerThan768 ? "96px" : "46px"} py={isLargerThan768 ? "50px" : "24px"} bgColor="#F9FAFB">
    <Container maxW="908px">
      <Heading fontSize={isLargerThan768 ? "36px" : "24px"} lineHeight="44px" mb={isLargerThan768 ? "50px" : "16px"}>{t("Наши локaции")}</Heading>
      <Box display="flex" columnGap="16px" alignItems="center">
        <span className={cls.icon}></span>
        <p className={cls.text}>{location}</p>
      </Box>
    </Container>
  </Box>;
};
