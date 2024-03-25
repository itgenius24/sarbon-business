import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Heading } from "@chakra-ui/react";

export default function PrivacyPolicyPage() {

  const crumbs = [
    {
      title: "Главная",
      href: "/",
    },
    { title: "Политика конфиденциальности", },
  ];

  const privacyPolicy = "<p>Политика конфиденциальности</p>";

  return <Container mt="50px">
    <BreadCrumb crumbs={crumbs} />
    <Heading fontSize={48} lineHeight="60px" mb="24px">
      Политика конфиденциальности
    </Heading>
    <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
  </Container>;
}
