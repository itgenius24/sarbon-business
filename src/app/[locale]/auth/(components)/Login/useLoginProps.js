import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useLoginMutation, useOneLoginMutation } from "@/services/api";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useLoginProps = () => {

  const router = useRouter();

  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const customerTypeId = process.env.NEXT_PUBLIC_CUSTOMER_TYPE_ID;
  const expeditorTypeId = process.env.NEXT_PUBLIC_EXPEDITOR_TYPE_ID;

  const [remember, setRemember] = useState(false);

  const defaultUserData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")).username : "";

  const toast = useToast();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues:{
      username: defaultUserData?.username,
      password: defaultUserData?.password,
    }
  });

  const login = useLoginMutation({
    onSuccess: (data) => {
      console.log(`data2`,data);
      authStore.login({
        user: { firm_id: data.user_data?.firm_id, full_name: data.user_data?.full_name, ...data?.user },
        token: data?.token,
        role: data?.role,
      });

      if(remember) {
        localStorage.setItem("loginData", JSON.stringify({
          username: watch("username"),
          password: watch("password"),
        }));
      }

      router.push(`/${locale}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginOne = useOneLoginMutation({
    onSuccess: (data) => {

      const clientTypeId = data?.companies?.[0]?.projects?.[0]?.resource_environments?.[0]?.client_types?.response?.[0]?.guid;

      if(clientTypeId === customerTypeId || clientTypeId === expeditorTypeId) {
        login.mutate(
          {
            username: watch("username"),
            password: watch("password"),
            company_id: "b8367a10-5699-4e91-8c1c-71578ca5448e",
            project_id: "f539f64b-961e-4c6c-8534-140091f7f27b",
            environment_id: "11b59b25-8772-456a-84e1-20bdfdd32506",
            client_type: clientTypeId,
            environment_ids: [
              "11b59b25-8772-456a-84e1-20bdfdd32506"
            ]
          }
        );
      } else {
        toast({
          title: t("Этот пользователь не заказчик"),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    onError: () => {
      setError("username", { message: t("Неверные данные") });
      setError("password", { message: t("Неверные данные") });
    },
  });

  function navigateRegistration () {
    router.push(`/${locale}/auth/registration`);
  }

  function navigateToMain () {
    router.push(`/${locale}`);
  }

  function onSubmit (data) {
    loginOne.mutate(data);
  }

  function onRememberChange (e) {
    setRemember(e.target.checked);
  }

  function handleTogglePasswordVisibility(){
    setPasswordVisible(!isPasswordVisible);
  }

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    navigateRegistration,
    isPending: loginOne.isPending || login.isPending,
    onRememberChange,
    t,
    handleTogglePasswordVisibility,
    isPasswordVisible,
    navigateToMain,
    locale,
  };

};
