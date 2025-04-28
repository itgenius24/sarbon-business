"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { usePrivacyPolicyProps } from "./usePrivacyPolicyProps";
import { PageContentLayout } from "@/layouts/PageContentLayout";

export default function PrivacyPolicyPage() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { directory, crumbs, t } = usePrivacyPolicyProps();

  return <PageContentLayout>
    <Container mt="50px">
      {
        isLargerThan768 && <BreadCrumb crumbs={crumbs} />
      }
      <Box padding={isLargerThan768 ? 0 : "12px"} borderRadius={isLargerThan768 ? 0 : "12px"} bgColor={isLargerThan768 ? "transparent" : "white"}>
        <Heading fontSize={isLargerThan768 ? 48 : 20} lineHeight={isLargerThan768 ? "60px" : "20px"} mb="24px">
          {t("Privacy Policy for Sarbon")}
        </Heading>
        <Text fontWeight="400"
          mb="40px"
          // fontSize={isLargerThan768 ? "20px" : "16px"}
          lineHeight={isLargerThan768 ? "30px" : "19px"}
          color="brand.600"
          dangerouslySetInnerHTML={{ __html: directory?.answear }}
        />
      </Box>
    </Container>
  </PageContentLayout>;
}
