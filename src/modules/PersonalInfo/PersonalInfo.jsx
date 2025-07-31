"use client";

import { BackArrow } from "@/assets/icons/icons";
import { MainContentCard } from "@/components/MainContentCard";
import authStore from "@/store/auth.store";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MainContentHeader } from "./components/MainContentHeader";
import { ProfileInfoForm } from "./components/ProfileInfoForm";
import { usePersonalInfoProps } from "./usePersonalInfoProps";

export const PersonalInfo = ({ variant = "simple" }) => {

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  // Use the same hook for both variants - the logic is the same
  const {
    getProfileFormProps,
    handleSubmit,
    submitForm,
    isLoading,
    router,
  } = usePersonalInfoProps();

  const disabledBtn = variant === "advanced" ? authStore.userData.dispatcher_type?.[0] : null;
  const { t } = useTranslation();

  if (variant === "advanced") {
    // Advanced variant with simplified layout and different button text
    return (
      <Box>
        <Box
          display={isLargerThan845 ? "block" : "flex"}
          alignItems="center"
        >
          {!isLargerThan845 && (
            <MainContentHeader
              title={
                <Flex as="button" onClick={router.back} alignItems="center">
                  <BackArrow />
                  <span>{t("Личные данные")}</span>
                </Flex>
              }
            />
          )}
        </Box>
        <MainContentCard
          as="form"
          onSubmit={handleSubmit(submitForm)}
          footer={
            <ButtonGroup
              width={isLargerThan845 ? "auto" : "100%"}
              spacing={isLargerThan845 ? "2" : "0"}
              display={isLargerThan845 ? "inline-flex" : "flex"}
              flexDirection={isLargerThan845 ? "row" : "column-reverse"}
              rowGap={isLargerThan845 ? "0" : "8px"}
            >
              <Button
                isDisabled={disabledBtn === `first_dispatcher`}
                isLoading={isLoading}
                type="submit"
                fontSize={isLargerThan845 ? "16px" : "15px"}
                variant="solid"
              >
                {t(`Сохранить профиль`)}
              </Button>
            </ButtonGroup>
          }
        >
          <ProfileInfoForm {...getProfileFormProps()} />
        </MainContentCard>
      </Box>
    );
  }

  // Simple variant (original)
  return (
    <Box>
      <Box display={isLargerThan845 ? "block" : "flex"} alignItems="center">
        {
          !isLargerThan845 && <button onClick={router.back}>
            <BackArrow />
          </button>
        }
        <MainContentHeader
          title={t("Личные данные")}
        // subtitle="Обновите свою фотографию и личные данные."
        />
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
