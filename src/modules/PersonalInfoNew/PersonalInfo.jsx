"use client";

import {
  Box,
  Button,
  ButtonGroup,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { usePersonalInfoProps } from "./usePersonalInfoProps";
import { MainContentHeader } from "./components/MainContentHeader";
import { ProfileInfoForm } from "./components/ProfileInfoForm";
import { MainContentCard } from "@/components/MainContentCard";
import { BackArrow } from "@/assets/icons/icons";
import { useTranslation } from "react-i18next";

export const PersonalInfo = () => {

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const {
    getProfileFormProps,
    handleSubmit,
    submitForm,
    isLoading,
    router,
  } = usePersonalInfoProps();
  const {t} = useTranslation();

  return (
    <Box>
      <Box display={isLargerThan845 ? "block" : "flex"} alignItems="center">
    
      </Box>
      <MainContentCard
        as="form"
        onSubmit={handleSubmit(submitForm)}
        footer={
          <ButtonGroup
            width={isLargerThan845 ? "auto" : "100%"}
            ml={isLargerThan845 ? "auto" : "0"}
            spacing={isLargerThan845 ? "2" : "0"}
            display={isLargerThan845 ? "inline-flex" : "flex"}
            flexDirection={isLargerThan845 ? "row" : "column-reverse"}
            rowGap={isLargerThan845 ? "0" : "8px"}
          >
            <Button
              h={isLargerThan845 ? "40px" : "52px"}
              p="10px 16px"
              variant="outline"
              color="brand.700"
              borderColor="brand.300"
              fontSize={isLargerThan845 ? "16px" : "15px"}
            >
              {t(`Отмена`)}
            </Button>
            <Button
              isLoading={isLoading}
              type="submit"
              fontSize={isLargerThan845 ? "16px" : "15px"}
              h={isLargerThan845 ? "40px" : "52px"}
              p="10px 16px"
              variant="solid"
            >
              {t(`Сохранить`)}
            </Button>
          </ButtonGroup>
        }
      >
        <ProfileInfoForm {...getProfileFormProps()} />
      </MainContentCard>
    </Box>
  );
};
