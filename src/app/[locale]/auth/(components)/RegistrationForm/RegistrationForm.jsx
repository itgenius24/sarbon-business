"use client";

import { Box, Button } from "@chakra-ui/react";
import { AuthTitle } from "../AuthTitle";
import { Dropdown } from "@/components/Dropdown";
import { useRegistrationFormProps } from "./useRegistrationFormProps";
import { TextField } from "@/components/TextField";
import { EyeIcon, EyeIconOff, HelpCircleIcon } from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";
import { MobileLogo } from "../MobileLogo";

export const RegistrationForm = () => {

  const {
    clientTypeOptions,
    control,
    register,
    handleSubmit,
    onSubmit,
    handleBack,
    companyOptions,
    t,
    errors,
    handleTogglePasswordVisibility,
    isPasswordVisible,
    watch,
  } = useRegistrationFormProps();

  return <Box as="form" onSubmit={handleSubmit(onSubmit)}>
    <MobileLogo />
    <AuthTitle mb="32px" title={t("Регистрация нового участника на Furgo")} />
    <Box display="flex" flexDirection="column" rowGap="20px" mb="24px">
      <Dropdown
        options={[clientTypeOptions?.[1]]}
        control={control}
        name="clientType"
        label={t("Профиль деятельности")}
        errors={errors}
        required={{
          value: true,
          message: t("Это поле обязательно"),
        }}
      />
      <Dropdown
        options={companyOptions}
        control={control}
        name="company"
        label={t("Компания")}
        errors={errors}
        required={{
          value: true,
          message: t("Это поле обязательно"),
        }}
      />
      <TextField
        label="Имя"
        name="fullName"
        register={register}
        placeholder={t("Введите свое имя")}
        errors={errors}
        rules={{
          required: {
            value: true,
            message: t("Это поле обязательно"),
          },
        }}
      />
      <TextField
        label="Email"
        name="email"
        register={register}
        placeholder={t("Введите свой email")}
        type="email"
        errors={errors}
        addonAfter={<HelpCircleIcon />}
        rules={{
          required: {
            value: true,
            message: t("Это поле обязательно"),
          },
        }}
      />
      <TextField
        label="Логин"
        name="login"
        register={register}
        errors={errors}
        placeholder={t("Введите свой логин")}
        rules={{
          required: {
            value: true,
            message: t("Это поле обязательно"),
          },
        }}
      />
      <TextField
        label={t("Пароль")}
        bottomText={t("мин. 8 символов")}
        name="password"
        register={register}
        placeholder={"Введите свой пароль"}
        type={isPasswordVisible ? "text" : "password"}
        errors={errors}
        addonAfter={
          <button type="button" onClick={handleTogglePasswordVisibility}>
            {
              isPasswordVisible ? <EyeIconOff /> : <EyeIcon />
            }
          </button>
        }
        rules={{
          required: {
            value: true,
            message: t("Это поле обязательно"),
          },
        }}
      />
    </Box>
    <Box display="flex" flexDirection="column" mt="24px">
      <Box mb="16px">
        <Checkbox filled register={register} name="acceptTerms">{t("Нажимая кнопку, вы принимаете условия Пользовательского соглашения")}</Checkbox>
      </Box>
      <Button type="submit" mb="16px" isDisabled={!watch("acceptTerms")} >{t("Подтвердить")}</Button>
      <Button variant="secondary" onClick={handleBack}>{t("Назад")}</Button>
    </Box>
  </Box>;
};
