import { RoundCheckIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { Box, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const MobileApp = ({
  photo,
  description,
  description1
}) => {
  return (
    <Container mt={"96px"} mb={"96px"}>
      <Box bg="white" borderRadius={24} display="flex">
        <LeftContent description={description} description1={description1} />
        <RightContent photo={photo} />
      </Box>
    </Container>
  );
};

const RightContent = ({ photo }) => {
  return (
    <Box maxWidth="50%" width={"100%"} position="relative">
      <Image
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(0%, -45%)",
        }}
        width={500}
        height={500}
        src={photo}
        alt="Mobile Img"
      />
    </Box>
  );
};

const LeftContent = ({ description, description1 }) => {
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
            alt="Furgo logo"
          />
          <Box as="span" ml="10px" fontSize={24} fontWeight={600}>
          Furgo
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
              {description}
            </Text>
          </ListItem>
          <ListItem display={"flex"} alignItems="baseline" width="100%">
            <RoundCheckIcon styles={{ transform: "translate(0px, 4px)" }} />
            <Text ml={"12px"} fontWeight={400}>
              {description1}
            </Text>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
