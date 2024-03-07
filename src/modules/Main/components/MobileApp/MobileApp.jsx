import { RoundCheckIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import iphoneImg from "@/assets/images/twophones.png";
import { Box, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const MobileApp = () => {
  return (
    <Container mt={"96px"}>
      <Box bg="white" borderRadius={24} display="flex">
        <LeftContent />
        <RightContent />
      </Box>
    </Container>
  );
};

const RightContent = () => {
  return (
    <Box maxWidth="50%" width={"100%"} position="relative">
      <Image
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(0%, -45%)",
        }}
        // width={500}
        // height={500}
        src={iphoneImg}
        alt="Mobile Img"
      />
    </Box>
  );
};

const LeftContent = () => {
  return (
    <Box p="48px 32px" maxW={"50%"} flexGrow="1">
      <Heading fontSize={36} lineHeight="44px" mb={20.5}>
        Мобильное приложение
      </Heading>
      <Box maxW={544} bg="brand.50" borderRadius={12} p="20px 24px">
        <Flex mb={26} alignItems="center">
          <Image
            priority={false}
            width={40}
            height={40}
            src={"/svg/logo.svg"}
            alt="Logistics logo"
          />
          <Box as="span" ml="10px" fontSize={24} fontWeight={600}>
            Logistics
          </Box>
        </Flex>
        <List maxW={384} color="brand.600" ml={"42px"}>
          <ListItem
            display={"flex"}
            alignItems="baseline"
            width="100%"
            mb={"10px"}
          >
            <RoundCheckIcon styles={{ transform: "translate(0px, 4px)" }} />
            <Text ml={"12px"} fontWeight={400}>
              Находите и добавляйте грузы, отправляйте предложения,
              просматривайте рейтинг фирм
            </Text>
          </ListItem>
          <ListItem display={"flex"} alignItems="baseline" width="100%">
            <RoundCheckIcon styles={{ transform: "translate(0px, 4px)" }} />
            <Text ml={"12px"} fontWeight={400}>
              Попросите водителя скачать приложение, чтобы отправлять заявки и
              отслеживать этапы перевозки
            </Text>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
