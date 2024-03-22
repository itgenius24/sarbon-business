"use client";

import {
  Box,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import React from "react";
import { usePersonalInfoProps } from "./usePersonalInfoProps";
import { MainContentHeader } from "./components/MainContentHeader";
import { ProfileInfoForm } from "./components/ProfileInfoForm";
import { MainContentCard } from "@/components/MainContentCard";

export const PersonalInfo = () => {

  const {
    getProfileFormProps,
    handleSubmit,
    submitForm,
    isPending
  } = usePersonalInfoProps();

  return (
    <Box>
      <MainContentHeader
        title="Личные данные"
        subtitle="Обновите свою фотографию и личные данные."
      />
      <MainContentCard
        as="form"
        onSubmit={handleSubmit(submitForm)}
        footer={
          <ButtonGroup ml="auto" spacing="2">
            <Button
              h="40px"
              p="10px 16px"
              variant="outline"
              color="brand.700"
              borderColor="brand.300"
              fontSize="16px"
            >
              Отмена
            </Button>
            <Button
              isLoading={isPending}
              type="submit"
              fontSize="16px"
              h="40px"
              p="10px 16px"
              variant="solid"
            >
              Сохранить
            </Button>
          </ButtonGroup>
        }
      >
        <ProfileInfoForm {...getProfileFormProps()} />
      </MainContentCard>
    </Box>
  );
};
