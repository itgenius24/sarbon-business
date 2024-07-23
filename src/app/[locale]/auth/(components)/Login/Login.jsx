"use client";

import cls from "./styles.module.scss";
import { useLoginProps } from "./useLoginProps";
import { AuthTitle } from "../AuthTitle";
import { TextField } from "@/components/TextField";
import { Box, Button, Text } from "@chakra-ui/react";
import { Checkbox } from "@/components/Checkbox";
import { ArrowLeft, EyeIcon, EyeIconOff } from "@/assets/icons/icons";
import Link from "next/link";
import { MobileLogo } from "../MobileLogo";

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
    locale,
  } = useLoginProps();

  return (
    <Box height={"650px"} as="form" onSubmit={handleSubmit(onSubmit)}>
      <div className={cls.buttonWrapper}>
        <Button
          onClick={navigateToMain}
          variant="reset"
          size="sm"
          color="brand.600"
          leftIcon={<ArrowLeft />}
        >
          {t("Вернуться на Главную")}
        </Button>
      </div>
      <MobileLogo />
      <AuthTitle mb="32px" title={'Вход в Furgo'} subtitle="" />
      <Box mb="24px" display="flex" flexDirection="column" rowGap="20px">
        <TextField
          register={register}
          rules={{
            required: {
              value: true,
              message: t("Это поле обязательно для заполнения"),
            },
          }}
          errors={errors}
          name="username"
          label={t("Логин")}
          placeholder={t("Введите свой логин")}
        />
        <TextField
          register={register}
          rules={{
            required: {
              value: true,
              message: t("Это поле обязательно для заполнения"),
            },
          }}
          errors={errors}
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          label={t("Пароль")}
          placeholder={t("Введите свий пароль")}
          addonAfter={
            <button type="button" onClick={handleTogglePasswordVisibility}>
              {isPasswordVisible ? <EyeIconOff /> : <EyeIcon />}
            </button>
          }
        />
      </Box>
      <div className={cls.rememberWrapper}>
        <Checkbox onChange={onRememberChange}>{t("Запомнить")}</Checkbox>
        <Link className={cls.forgotLink} href={`/${locale}/auth/forgot`}>
          {t("Забыли логин или пароль?")}
        </Link>
      </div>
      <Button mt="24px" size="md" type="submit" isLoading={isPending}>
        {t("Войти")}
      </Button>
      <Box mt="32px" display="flex" justifyContent="center" columnGap="4px">
        <Text fontSize="14px" color="brand.600" lineHeight="20px">
          {t("У вас нет аккаунта?")}
        </Text>
        <Button variant="reset" onClick={navigateRegistration}>
          {t("Зарегистрироваться")}
        </Button>
      </Box>
    </Box>
  );
};
