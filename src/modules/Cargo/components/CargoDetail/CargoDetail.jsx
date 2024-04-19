import cls from "./styles.module.scss";
import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { CargoForm } from "../CargoForm";
import { DeadlineForm } from "../DeadlineForm";
import { TransportDetail } from "../TransportDetail";
import { LoadingForm } from "../LoadingForm";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export const CargoDetail = () => {

  const locale = useGetLang();

  const [isLargerThan1190] = useMediaQuery("(min-width: 1190px)");

  const { t } = useTranslation(locale, "translations");

  return <Box className={cls.cargoDetail} as="article" borderRadius="12px" padding="24px" bgColor="baseWhite">
    <Heading fontSize={isLargerThan1190 ? "20px" : "17px"} size="sm">{t("Детали груза")}</Heading>
    <CargoForm />
    <DeadlineForm />
    <LoadingForm />
    <TransportDetail />
  </Box>;
};
