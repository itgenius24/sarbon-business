import { Box, Heading } from "@chakra-ui/react";
import { CargoForm } from "../CargoForm";
import { DeadlineForm } from "../DeadlineForm";
import { TransportDetail } from "../TransportDetail";
import { LoadingForm } from "../LoadingForm";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export const CargoDetail = () => {

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Box as="article" borderRadius="12px" padding="24px" bgColor="baseWhite">
    <Heading size="sm">{t("Детали груза")}</Heading>
    <CargoForm />
    <DeadlineForm />
    <LoadingForm />
    <TransportDetail />
  </Box>;
};
