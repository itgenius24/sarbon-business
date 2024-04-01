import cls from "./styles.module.scss";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRegistrationProps } from "./useRegistrationProps";
import { AuthTitle } from "../AuthTitle";
import { TextField } from "@/components/TextField";
import { ArrowLeft } from "@/assets/icons/icons";

export const Registration = () => {

  const {
    handleSubmit,
    register,
    errors,
    navigateLogin,
    onSubmit,
    isPending,
    t,
  } = useRegistrationProps();

  return <Box as="form" onSubmit={handleSubmit(onSubmit)}>
    <Button
      onClick={navigateLogin}
      variant="reset"
      size="sm"
      color="brand.600"
      leftIcon={<ArrowLeft />}
      mb="32px"
      isLoading={isPending}
    >
      {t("Вернуться на Войти")}
    </Button>
    <AuthTitle mb="32px" title={t("Регистрация нового участника на Logistics")} />
    <Box mb="24px">
      <TextField
        register={register}
        errors={errors}
        name="phone"
        type="tel"
        label={t("Мобильный телефон")}
        placeholder="+998971234567"
      />
    </Box>
    <Button size="md" type="submit">{t("Продолжить")}</Button>
    <Text mt="32px" fontSize="14px" color="brand.600" lineHeight="20px">{t("Нажимая кнопку «Продолжить», вы принимаете условия")} <a className={cls.link} href="#">{t("Пользовательского соглашения")}</a></Text>
  </Box>;
};
