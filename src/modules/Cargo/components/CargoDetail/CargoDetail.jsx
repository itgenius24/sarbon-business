import { Box, Heading } from "@chakra-ui/react";
import { CargoForm } from "../CargoForm";
import { DeadlineForm } from "../DeadlineForm";
import { TransportDetail } from "../TransportDetail";
import { LoadingForm } from "../LoadingForm";
import { useTranslation } from "@/app/i18n/client";
import localeStore from "@/store/locale.store";

export const CargoDetail = () => {

  const { t } = useTranslation(localeStore.locale, "translations");

  return <Box as="article" borderRadius="12px" padding="24px" bgColor="baseWhite">
    <Heading size="sm">{t("Детали груза")}</Heading>
    <CargoForm />
    <DeadlineForm />
    <LoadingForm />
    <TransportDetail />
  </Box>;
};
