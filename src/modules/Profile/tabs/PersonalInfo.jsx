"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MainContentHeader } from "../components/MainContentHeader";
import { MainContentCard } from "../components/MainContentCard";
import { ProfileInfoForm } from "../components/ProfileInfoForm";
import { useProfileInfoHook } from "../hooks/useProfileInfoHook";

export const PersonalInfo = () => {
  const { getProfileFormProps, handleSubmit, submitForm, isPending } =
    useProfileInfoHook();
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
