"use client"
import { Container } from "@/components/Container";
import React from "react";
import { useProps } from "./useProps";
import { Box, Heading } from "@chakra-ui/react";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

const ExpeditorPage = ({ locale }) => {
  const { column, isLargerThan845, t } = useProps();
  return (
    <Container my={`40px`}>
      <Heading
        size={isLargerThan845 ? "md" : "sm"}
        mb={isLargerThan845 ? "24px" : "12px"}
        color={`rgba(33, 31, 38, 1)`}
      >
        {t("Перевозчики")}
      </Heading>
      <Box mt={`35px`}>
        <SarbonTable variant="card"  columns={column} data={[12,3,4,5]}/>
      </Box>
    </Container>
  );
};

export default ExpeditorPage;
