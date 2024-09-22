import cls from "./styles.module.scss";
import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

import StepOne from "../StepOne/StepOne";
import StepTwo from "../StepTwo/StepTwo";
import StepThere from "../StepThere/StepThere";
import StepFour from "../StepFour/StepFour";
import StepFive from "../StepFive/StepFive";

export const CargoDetail = ({status}) => {

  const locale = useGetLang();

  const [isLargerThan1190] = useMediaQuery("(min-width: 1190px)");

  const { t } = useTranslation(locale, "translations");

  return <Box display={`flex`} flexDirection={`column`} rowGap={`18px`} className={cls.cargoDetail} as="article" borderRadius="12px" padding="24px" >
     {/* <Heading fontSize={isLargerThan1190 ? "20px" : "17px"} size="sm">{t("Детали груза")}</Heading> */}
      <StepOne status={status}  />
      <StepTwo  status={status}/>
      <StepThere status={status}/>
      <StepFour status={status}/>
      <StepFive status={status} />
  </Box>;
};
