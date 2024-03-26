import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Heading } from "@chakra-ui/react";
import { DigitalFacts } from "./(components)/DigitalFacts";
import { Partners } from "./(components)/Partners";

export default function AboutUsPage() {

  const crumbs = [
    {
      title: "Главная",
      href: "/",
    },
    { title: "О системе Logistics", },
  ];

  return <Container mt="50px">
    <BreadCrumb crumbs={crumbs} />
    <Heading fontSize="36px" lineHeight="44px" mb="24px">
      О системе Logistics
    </Heading>
    <DigitalFacts />
    <Partners />
  </Container>;
}
