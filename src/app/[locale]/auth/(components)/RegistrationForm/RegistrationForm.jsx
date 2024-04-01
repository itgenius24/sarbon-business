"use client";

import { Box, Button } from "@chakra-ui/react";
import { AuthTitle } from "../AuthTitle";
import { Dropdown } from "@/components/Dropdown";
import { useRegistrationFormProps } from "./useRegistrationFormProps";
import { TextField } from "@/components/TextField";
import { HelpCircleIcon } from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";

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
  } = useRegistrationFormProps();

  return <Box as="form" onSubmit={handleSubmit(onSubmit)}>
    <AuthTitle mb="32px" title={t("Регистрация нового участника на Logistics")} />
    <Box display="flex" flexDirection="column" rowGap="20px" mb="24px">
      <Dropdown
        options={clientTypeOptions}
        control={control}
        name="clientType"
        label={t("Профиль деятельности")}
        required
      />
      <Dropdown
        options={companyOptions}
        control={control}
        name="company"
        label={t("Компания")}
        required
      />
      <TextField
        label="Имя"
        name="fullName"
        register={register}
        placeholder={t("Введите свое имя")}
      />
      <TextField
        label="Email"
        name="email"
        register={register}
        placeholder={t("Введите свой email")}
        type="email"
        addonAfter={<HelpCircleIcon />}
      />
      <TextField
        label="Логин"
        name="login"
        register={register}
        placeholder={t("Введите свой логин")}
      />
      <TextField
        label={t("Пароль")}
        bottomText={t("мин. 8 символов")}
        name="password"
        register={register}
        placeholder="••••••••"
        type="password"
      />
    </Box>
    <Box display="flex" flexDirection="column" rowGap="16px">
      <Button type="submit">{t("Подтвердить")}</Button>
      <Button variant="secondary" onClick={handleBack}>{t("Назад")}</Button>
    </Box>
    <Box mt="32px">
      <Checkbox filled>{t("Нажимая кнопку, вы принимаете условия Пользовательского соглашения")}</Checkbox>
    </Box>
  </Box>;
};
