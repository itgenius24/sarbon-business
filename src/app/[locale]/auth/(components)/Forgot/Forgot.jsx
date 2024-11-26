import { PhoneForm } from "../PhoneForm";
import { useForgotProps } from "./useForgotProps";

export const Forgot = () => {

  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    navigateLogin,
    t,
    control
  } = useForgotProps();

  return <PhoneForm
    // isPending={isPending}
    navigateLogin={navigateLogin}
    onSubmit={handleSubmit(onSubmit)}
    backText={t("Вернуться на Войти")}
    errors={errors}
    firstBtnText={t("Продолжить")}
    title={t("Забыли пароль")}
    register={register}
    control={control}
      />;
};
