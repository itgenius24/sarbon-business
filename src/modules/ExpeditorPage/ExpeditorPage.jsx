"use client";
import { Container } from "@/components/Container";
import React from "react";
import { useProps } from "./useProps";
import { Box, Button, Heading } from "@chakra-ui/react";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

const ExpeditorPage = ({ locale }) => {
  const { column, isLargerThan845, t, expeditorData, addPage, isFetching,router } =
    useProps();
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
        <SarbonTable onRow={(row) => router.push(`/${locale}/dispatcher-expeditor/user-management`)} variant="card" columns={column} data={expeditorData} />
      </Box>
      {expeditorData?.length >= 100 && (
        <Box mt={`15px`} width={`fit-content`}>
          <Button isLoading={isFetching} onClick={addPage}>
            Загрузить еще
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ExpeditorPage;
