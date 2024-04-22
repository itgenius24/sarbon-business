import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { yupResolver } from "@/utils/yupResolver";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const useNewPasswordProps = () => {
  const router = useRouter();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translation");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const scheme = yup
    .object({
      password: yup.string().required("Обязательное поле").min(8, t("Минимальная длина пароля 8 символов")),
      confirm_password: yup.string().required("Обязательное поле").min(8, t("Минимальная длина пароля 8 символов")),
    });

  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({ resolver: yupResolver(scheme), });


  function handleTogglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function handleToggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  }

  function navigateBack() {
    router.push(`/${locale}/auth`);
  }

  function onSubmit(data) {
    if(watch("password") !== watch("confirm_password")) {
      setError("confirm_password", { type: "custom", message: t("Пароли не совпадают") });
      return;
    }
    console.log(data);
  }

  return {
    t,
    navigateBack,
    register,
    handleSubmit,
    errors,
    handleTogglePasswordVisibility,
    handleToggleConfirmPasswordVisibility,
    isConfirmPasswordVisible,
    isPasswordVisible,
    onSubmit,
  };
};
