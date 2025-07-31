"use client";

import { ProfileLayout } from "@/layouts/ProfileLayout";
import { PersonalInfo } from "@/modules/PersonalInfo";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Profile() {

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { t } = useTranslation();

  return <ProfileLayout>
    {
      isLargerThan845 ? (
        <PersonalInfo />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
          textAlign="center"
          p={4}
        >
          <Text fontSize="16px" color="gray.600" mb={4}>
            {t("Выберите раздел из меню выше для просмотра и редактирования ваших данных")}
          </Text>
        </Box>
      )
    }
  </ProfileLayout>;
}
