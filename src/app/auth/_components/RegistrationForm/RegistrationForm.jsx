import { Box, Button } from "@chakra-ui/react";
import { AuthTitle } from "../AuthTitle";
import { Dropdown } from "@/components/Dropdown";
import { useRegistrationFormProps } from "./useRegistrationFormProps";
import { TextField } from "@/components/TextField";
import { HelpCircleIcon } from "@/assets/icons/icons";

export const RegistrationForm = () => {

  const {
    roleOptions,
    control,
    register,
    handleSubmit,
    onSubmit,
    handleBack
  } = useRegistrationFormProps();

  return <Box as="form" onSubmit={handleSubmit(onSubmit)}>
    <AuthTitle mb="32px" title="Регистрация нового участника на Logistics" subtitle="На перевочика" />
    <Box display="flex" flexDirection="column" rowGap="20px" mb="24px">
      <Dropdown
        options={roleOptions}
        control={control}
        name="role"
        label="Профиль деятельности"
      />
      <TextField
        label="Email"
        name="email"
        register={register}
        placeholder="Введите свой email"
        type="email"
        addonAfter={<HelpCircleIcon />}
      />
      <TextField
        label="Логин"
        name="login"
        register={register}
        placeholder="Введите свой логин"
      />
      <TextField
        label="Пароль"
        bottomText="мин. 8 символов"
        name="password"
        register={register}
        placeholder="••••••••"
        type="password"
      />
    </Box>
    <Box display="flex" flexDirection="column" rowGap="16px">
      <Button type="submit">Подтвердить</Button>
      <Button variant="secondary" onClick={handleBack}>Назад</Button>
    </Box>
  </Box>;
};
