import cls from "./styles.module.scss";
import { Box, Button, Text } from "@chakra-ui/react";
import { AuthTitle } from "../AuthTitle";
import { TextField } from "@/components/TextField";
import { ArrowLeft } from "@/assets/icons/icons";
import { MobileLogo } from "../MobileLogo";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import { allowOnlyNumbers } from "@/utils/allowOnlyNumbers";
import FormInternationInput from "@/components/Input/FormInternationalInput";

export const PhoneForm = ({
  onSubmit,
  navigateLogin,
  isPending,
  backText = "Вернуться на Войти",
  title = "Регистрация нового участника на Furgo",
  register = () => {},
  errors = {},
  control,
  firstBtnText = "Продолжить",
}) => {
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translation");

  return (
    <Box height={"650px"} as="form" onSubmit={onSubmit}>
      <div className={cls.buttonWrapper}>
        <Button
          onClick={navigateLogin}
          variant="reset"
          size="sm"
          color="brand.600"
          leftIcon={<ArrowLeft />}
        >
          {backText}
        </Button>
      </div>
      <MobileLogo />
      <AuthTitle mb="32px" title={title} />
      <Box mb="24px">
        <Box>
          <p className={cls.textFieldName}> {t("Мобильный телефон")} *</p>
          <FormInternationInput control={control} name={`phone`} />
        </Box>
      </Box>
      <Button size="md" type="submit" isLoading={isPending}>
        {firstBtnText}
      </Button>
      <Text mt="32px" fontSize="14px" color="brand.600" lineHeight="20px">
        {t("Нажимая кнопку «Продолжить», вы принимаете условия")}{" "}
        <a className={cls.link} href="#">
          {t("Пользовательского соглашения")}
        </a>
      </Text>
    </Box>
  );
};
