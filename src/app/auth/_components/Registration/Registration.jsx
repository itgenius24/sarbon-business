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
  } = useRegistrationProps();

  return <Box as="form" onSubmit={handleSubmit(onSubmit)}>
    <AuthTitle mb="32px" title="Регистрация нового участника на Logistics" subtitle="На перевочика" />
    <Box mb="24px">
      <TextField
        register={register}
        errors={errors}
        name="phone"
        type="tel"
        label="Мобильный телефон"
        placeholder="+998971234567"
      />
    </Box>
    <Button size="md" type="submit">Продолжить</Button>
    <Text mt="32px" fontSize="14px" color="brand.600" lineHeight="20px">Нажимая кнопку «Продолжить», вы принимаете условия <a className={cls.link} href="#">Пользовательского соглашения</a></Text>
    <Button
      onClick={navigateLogin}
      variant="reset"
      size="sm"
      color="brand.600"
      leftIcon={<ArrowLeft />}
      mt="32px"
      isLoading={isPending}
    >
      Вернуться на Войти
    </Button>
  </Box>;
};
