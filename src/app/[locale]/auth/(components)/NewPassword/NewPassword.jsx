import cls from "./styles.module.scss";
import { Box, Button } from "@chakra-ui/react";
import { useNewPasswordProps } from "./useNewPasswrodProps";
import { ArrowLeft, EyeIcon, EyeIconOff } from "@/assets/icons/icons";
import { MobileLogo } from "../MobileLogo";
import { AuthTitle } from "../AuthTitle";
import { TextField } from "@/components/TextField";

export const NewPassword = () => {

  const {
    t,
    navigateBack,
    register,
    errors,
    handleSubmit,
    handleTogglePasswordVisibility,
    handleToggleConfirmPasswordVisibility,
    isConfirmPasswordVisible,
    isPasswordVisible,
    onSubmit,
  } = useNewPasswordProps();

  return <Box>
    <div className={cls.buttonWrapper}>
      <Button
        onClick={navigateBack}
        variant="reset"
        size="sm"
        color="brand.600"
        leftIcon={<ArrowLeft />}
      >
        {t("Назад")}
      </Button>
    </div>
    <MobileLogo />
    <AuthTitle
      mb="32px"
      title="Придумайте пароль"
    />
    <Box display="flex" flexDirection="column" rowGap="32px">
      <TextField
        label={t("Введите новый пароль")}
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
      <TextField
        label={t("Подтвердите пароль")}
        bottomText={t("мин. 8 символов")}
        name="confirm_password"
        register={register}
        placeholder={"Введите свой пароль"}
        type={isConfirmPasswordVisible ? "text" : "password"}
        errors={errors}
        addonAfter={
          <button type="button" onClick={handleToggleConfirmPasswordVisibility}>
            {
              isConfirmPasswordVisible ? <EyeIconOff /> : <EyeIcon />
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
    <Button mt="44px" onClick={handleSubmit(onSubmit)}>{t("Восстановить пароль")}</Button>
  </Box>;
};
