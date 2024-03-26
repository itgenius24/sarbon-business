import { Container } from "@/components/Container";
import cls from "./styles.module.scss";
import { Box, Heading } from "@chakra-ui/react";

export const Locations = ({ location }) => {

  return <Box mb="96px" py="50px" bgColor="#F9FAFB">
    <Container maxW="908px">
      <Heading fontSize="36px" lineHeight="44px" mb="50px">Наши локaции</Heading>
      <Box display="flex" columnGap="16px" alignItems="center">
        <span className={cls.icon}></span>
        <p className={cls.text}>{location}</p>
      </Box>
    </Container>
  </Box>;
};
