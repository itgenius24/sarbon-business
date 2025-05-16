import cls from "./styles.module.scss";
import { Box} from "@chakra-ui/react";

import StepOne from "../StepOne/StepOne";
import StepTwo from "../StepTwo/StepTwo";
import StepThere from "../StepThere/StepThere";
import StepFour from "../StepFour/StepFour";
import StepFive from "../StepFive/StepFive";

export const CargoDetail = ({ status,locale }) => {



  return (
    <Box
      display={`flex`}
      flexDirection={`column`}
      rowGap={`18px`}
      className={cls.cargoDetail}
      as="article"
      borderRadius="12px"
      // padding="24px"
      mt={`31px`}
    >
      {/* <Heading fontSize={isLargerThan1190 ? "20px" : "17px"} size="sm">{t("Детали груза")}</Heading> */}
      <StepOne status={status}  locale={locale}/>
      <StepTwo status={status} locale={locale} />
      <StepThere status={status}  locale={locale}/>
      <StepFour status={status} locale={locale} />
      <StepFive status={status}  locale={locale}/>
    </Box>
  );
};
