"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useTermsProps } from "./useTermsProps";
import { PageContentLayout } from "@/layouts/PageContentLayout";

export default function TermsPage() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { directory, crumbs, t } = useTermsProps();

  return <PageContentLayout>
    <Container mt="50px">
      {
        isLargerThan768 && <BreadCrumb crumbs={crumbs} />
      }
      <Box padding={isLargerThan768 ? 0 : "12px"} borderRadius={isLargerThan768 ? 0 : "12px"} bgColor={isLargerThan768 ? "transparent" : "white"}>
        <Heading fontSize={isLargerThan768 ? 48 : 20} lineHeight={isLargerThan768 ? "60px" : "20px"} mb="24px">
          {t("Terms and Conditions")}
        </Heading>
        <Text fontWeight="400"
          mb="40px"
          lineHeight={isLargerThan768 ? "30px" : "19px"}
          color="brand.600"
          dangerouslySetInnerHTML={{ __html: directory?.answear }}
        />
      </Box>
    </Container>
  </PageContentLayout>;
}
