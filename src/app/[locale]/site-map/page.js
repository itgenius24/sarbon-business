import { Container } from "@/components/Container";
import { Box, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import Image from "next/image";
import TrakImage from "@/assets/images/trak.svg";
import Link from "next/link";

export default function SiteMap() {

  return <Box bgColor="baseWhite" h="100%">
    <Container>
      <Box width="472px" m="0 auto">
        <Flex justifyContent="center" mb="52px">
          <Image src={TrakImage} width="384" height="257" alt="trak" />
        </Flex>
        <Heading color="brand.600" mb="80px">Карта сайта</Heading>
        <Heading fontSize="24px" lineHeight="32px" mb="40px">Главная</Heading>
        <Heading fontSize="36px" lineHeight="44px" mb="24px">Поиск грузов</Heading>
        <UnorderedList color="primary">
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href="/">Поиск грузов по России</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href="/">Поиск грузов по Мальдивы</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href="/">Поиск грузов по Армении</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href="/">Поиск грузов по Италии</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href="/">Поиск грузов по Македонии</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href="/">Поиск грузов по Латинской Америки</Link>
          </ListItem>
          <ListItem mb="12px" fontWeight={400} fontSize="24px" lineHeight="32px">
            <Link href="/">Поиск грузов по Мальдивы</Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Container>
  </Box>;
}
