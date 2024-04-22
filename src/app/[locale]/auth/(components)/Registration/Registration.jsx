import { useRegistrationProps } from "./useRegistrationProps";
import { PhoneForm } from "../PhoneForm";

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

  return <PhoneForm
    isPending={isPending}
    navigateLogin={navigateLogin}
    onSubmit={handleSubmit(onSubmit)}
    backText={t("Вернуться на Войти")}
    errors={errors}
    firstBtnText={t("Зарегистрироваться")}
    title={t("Регистрация нового участника на Furgo")}
    register={register}
  />;
};
