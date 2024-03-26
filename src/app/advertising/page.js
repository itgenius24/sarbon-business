import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Heading } from "@chakra-ui/react";
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
  </Container>;
}
