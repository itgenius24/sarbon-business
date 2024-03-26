import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Banner } from "./(components)/Banner";

export default function AdvertisingPage() {

  const crumbs = [
    {
      title: "Главная",
      href: "/",
    },
    { title: "Реклама на сайте", },
  ];

  return <Container mt="50px">
    <BreadCrumb crumbs={crumbs} />
    <Heading fontSize="36px" lineHeight="44px" mb="24px">
      Реклама на сайте
    </Heading>
    <Banner />
    <Box py="96px">
      <Heading textAlign="center" mb="20px" fontSize="36px" lineHeight="44px">Ежедневно на сайте</Heading>
      <Box maxW="906px" mx="auto" mt="30px" display="flex" justifyContent="space-between">
        <Box w="261px" textAlign="center">
          <Text fontWeight="600" fontSize="60px" lineHeight="72px" color="primary">400</Text>
          <Text fontWeight="500" fontSize="18px" lineHeight="28px" >Projects completed</Text>
        </Box>
        <Box w="261px" textAlign="center">
          <Text fontWeight="600" fontSize="60px" lineHeight="72px" color="primary">400</Text>
          <Text fontWeight="500" fontSize="18px" lineHeight="28px" >Projects completed</Text>
        </Box>
        <Box w="261px" textAlign="center">
          <Text fontWeight="600" fontSize="60px" lineHeight="72px" color="primary">400</Text>
          <Text fontWeight="500" fontSize="18px" lineHeight="28px" >Projects completed</Text>
        </Box>
      </Box>
    </Box>;
  </Container>;
}
