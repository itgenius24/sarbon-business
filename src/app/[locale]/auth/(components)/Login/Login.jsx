"use client";

import { useLoginProps } from "./useLoginProps";
import { AuthTitle } from "../AuthTitle";
import { TextField } from "@/components/TextField";
import { Box, Button, Text } from "@chakra-ui/react";
import { Checkbox } from "@/components/Checkbox";
import { ArrowLeft, EyeIcon, EyeIconOff } from "@/assets/icons/icons";

export const Login = () => {

  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    navigateRegistration,
    isPending,
    onRememberChange,
    t,
    isPasswordVisible,
    handleTogglePasswordVisibility,
    navigateToMain,
  } = useLoginProps();

  return <Box as="form" onSubmit={handleSubmit(onSubmit)}>
    <Button
      onClick={navigateToMain}
      variant="reset"
      size="sm"
      color="brand.600"
      leftIcon={<ArrowLeft />}
      mb="32px"
    >
      {t("Вернуться на Главную")}
    </Button>
    <AuthTitle mb="32px" title="Вход в Logistics" subtitle="" />
    <Box mb="24px" display="flex" flexDirection="column" rowGap="20px">
      <TextField register={register} rules={{ required: { value: true, message: t("Это поле обязательно для заполнения") } }} errors={errors} name="username" label={t("Логин")} placeholder={t("Введите свой логин")} />
      <TextField
        register={register}
        rules={{ required: { value: true, message: t("Это поле обязательно для заполнения") } }}
        errors={errors}
        name="password"
        type={isPasswordVisible ? "text" : "password"}
        label={t("Пароль")}
        placeholder={t("Введите свий пароль")}
        addonAfter={
          <button type="button" onClick={handleTogglePasswordVisibility}>
            {
                isPasswordVisible ? <EyeIconOff /> : <EyeIcon />
            }
          </button>
        }
      />
    </Box>
    <Checkbox onChange={onRememberChange}>{t("Запомнить")}</Checkbox>
    <Button mt="24px" size="md" type="submit">{t("Войти")}</Button>
    <Box mt="32px" display="flex" justifyContent="center" columnGap="4px">
      <Text fontSize="14px" color="brand.600" lineHeight="20px">{t("У вас нет аккаунта?")}</Text>
      <Button isLoading={isPending} variant="reset" onClick={navigateRegistration}>{t("Зарегистрироваться")}</Button>
    </Box>
  </Box>;
};
