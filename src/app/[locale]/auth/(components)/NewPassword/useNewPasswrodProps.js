import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetUsers, useUpdateUserInfo } from "@/services/api";
import authStore from "@/store/auth.store";
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

  const getUsers = useGetUsers(
    { data: JSON.stringify({ guid: authStore.getAuthData.userId, }) },
    { enabled: false, }
  );

  const scheme = yup
    .object({
      password: yup.string().required("Обязательное поле").min(8, t("Минимальная длина пароля 8 символов")),
      confirm_password: yup.string().required("Обязательное поле").min(8, t("Минимальная длина пароля 8 символов")),
    });

  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({ resolver: yupResolver(scheme), });

  const updateUserPassword = useUpdateUserInfo({
    onSuccess(data) {
      getUsers.refetch();
    }
  });

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
    updateUserPassword.mutate({
      data:{
        guid: authStore.authData.userId,
        password: data.password
      }
    });
  }

  useEffect(() => {
    if(getUsers.isSuccess) {
      const data = getUsers.data?.response?.[0];
      authStore.login(
        {
          user: {
            firm_id: data?.firm_id,
            company_id: data?.company_id,
            email: data?.email,
            id: data?.guid,
            login: data?.login,
            password: data?.password,
            phone: data?.phone,
          },
          token: data?.token,
          role: data?.role,
        }
      );
      router.push(`/${locale}`);
    }
  }, [getUsers.data]);

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
