"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Heading, Text } from "@chakra-ui/react";
import { usePrivacyPolicyProps } from "./usePrivacyPolicyProps";

export default function PrivacyPolicyPage() {
  const { directory, crumbs } = usePrivacyPolicyProps();

  return <Container mt="50px">
    <BreadCrumb crumbs={crumbs} />
    <Heading fontSize={48} lineHeight="60px" mb="24px" ML={{ __html: directory?.question }} />
    <Text fontWeight="400"
      fontSize="20px"
      lineHeight="30px"
      color="brand.600"
      dangerouslySetInnerHTML={{ __html: directory?.answear }}
    />
  </Container>;
}
