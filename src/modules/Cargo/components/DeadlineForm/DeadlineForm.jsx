import cls from "./styles.module.scss";
import { DatePicker } from "@/components/DatePicker";
import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useAddCargoContext } from "../../providers";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export const DeadlineForm = () => {
  const { startDate, setStartDate, endDate, setEndDate, canEdit } = useAddCargoContext();

  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Box py="24px" borderBottom="1px solid" borderColor="brand.200">
    <Box className={cls.fieldsWrapper} display="flex" alignItems="center" columnGap="32px">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">{t("Когда")}</Heading>
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">{t("до")} {endDate ? `${endDate.getDate()} ${endDate.toLocaleString("ru-RU", { month: "short" })} ${t("затем переместится в архив")}` : ""}</Text>
      </Box>
      <Box className={cls.dateInput} display="flex">
        <DatePicker
          minDate={new Date()}
          placeholder={t("Выберите")}
          disabled={!canEdit}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          inputWidth="100%"
          monthsShown={isLargerThan600 ? 2 : 1}
          range
        />
      </Box>
    </Box>
  </Box>;

};
