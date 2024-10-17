import authStore from "@/store/auth.store";
import {
  useGetClientType,
  useGetCompanyList,
  useGetRoleList,
  useRegisterFirmMutation,
  useRegisterMutation,
  useRegisterUserMutation,
} from "@/services/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export const useRegistrationFormProps = () => {
  const locale = useGetLang();
  const router = useRouter();

  const { t } = useTranslation(locale, "translations");

  const { phone, firm_id } = authStore.getAuthData;

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const toast = useToast();
  const [status, setStatus] = useState(1);

  // const registerMutation = useRegisterMutation({
  //   onSuccess: (data) => {
  //     authStore.login({
  //       user: { firm_id, ...data?.user },
  //       token: data?.token,
  //       role: data?.role,
  //     });
  //     router.push(`/${locale}`);
  //   },
  //   onError(error) {
  //     if (error.data?.data?.includes("user_unq_login")) {
  //       toast({
  //         title: t("Такой логин уже зарегистрирован"),
  //         status: "error",
  //         position: "top right",
  //       });
  //       setError("login", { message: t("Такой логин уже зарегистрирован") });
  //       // router.push(`/${locale}/auth/login`);
  //     } else if (error.data?.data?.includes("user_project_idx_unique")) {
  //       toast({
  //         title: t("Такой номер уже зарегистрирован"),
  //         status: "error",
  //         position: "top right",
  //       });
  //     } else {
  //       toast({
  //         title: t("Произошла ошибка при регистрации"),
  //         status: "error",
  //         position: "top right",
  //       });
  //     }
  //   },
  // });

  const registerUserMutation = useRegisterUserMutation({
    onSuccess: (data) => {
      authStore.login({
        user: { firm_id, ...data?.user },
        token: data?.token,
        role: data?.role,
      });
      router.push(`/${locale}`);
    },
    onError(error) {
      if (error.data?.data?.includes("user_unq_login")) {
        toast({
          title: t("Такой логин уже зарегистрирован"),
          status: "error",
          position: "top right",
        });
        setError("login", { message: t("Такой логин уже зарегистрирован") });
        // router.push(`/${locale}/auth/login`);
      } else if (error.data?.data?.includes("user_project_idx_unique")) {
        toast({
          title: t("Такой номер уже зарегистрирован"),
          status: "error",
          position: "top right",
        });
      } else {
        toast({
          title: t("Произошла ошибка при регистрации"),
          status: "error",
          position: "top right",
        });
      }
    },
  });

  const registerFirmMutation = useRegisterFirmMutation({
    onSuccess: (data) => {
      console.log(`data`, data);
      registerUserMutation.mutate({
        data: {
          role_id: "f81d3c3d-228d-479e-a2b1-9948c98640f2",
          client_type_id: "a25d605c-d153-4ddf-8590-e4cda176ef93",
          phone: phone,
          full_name: watch(`fullName`),
          login: watch(`login`),
          password: watch(`password`),
          firm_id: data?.guid,
          email: watch(`email`),
          passport_code: status === 1 ? watch(`passport_code`) : undefined,
          passport_scan: status === 1 ? watch(`passport_scan`) : undefined,
        },
      });
    },
    onError(error) {
      if (error.data?.data?.includes("user_unq_login")) {
        toast({
          title: t("Такой логин уже зарегистрирован"),
          status: "error",
          position: "top right",
        });
        setError("login", { message: t("Такой логин уже зарегистрирован") });
      } else if (error.data?.data?.includes("user_project_idx_unique")) {
        toast({
          title: t("Такой номер уже зарегистрирован"),
          status: "error",
          position: "top right",
        });
      } else {
        toast({
          title: t("Произошла ошибка при регистрации"),
          status: "error",
          position: "top right",
        });
      }
    },
  });

  const getRoles = useGetRoleList({
    data: JSON.stringify({ client_type_id: "" }),
  });

  const getClientTypes = useGetClientType();
  const clientTypeOptions = getClientTypes.data?.response
    ?.filter(
      (client) =>
        client?.name === t("Заказчик") || client?.name === t("Экспидетор")
    )
    ?.map((role) => ({ label: role?.name, value: role?.guid }));

  const getCompanyList = useGetCompanyList({
    data: JSON.stringify({ company_direction: ["logistic_company"] }),
  });
  const companyOptions = getCompanyList.data?.response?.map((company) => ({
    label: company?.full_name,
    value: company?.guid,
  }));

  function onSubmit(data) {
    authStore.setAuthData("firm_id", data.company?.value);
    registerFirmMutation.mutate({
      data: {
        company_direction: ["company_customer"],
        tip_account: status === 1 ? ["legal_owner"] : ["physic_owner"],
        full_name: data.full_name,
        tin: data.inn,
        building_address: data.adress,
        phone_number: phone,
        logo: data.img,
      },
    });
  }

  function handleTogglePasswordVisibility() {
    setPasswordVisible(!isPasswordVisible);
  }

  function handleBack() {
    router.push(`/${locale}/auth/registration`);
  }

  useEffect(() => {
    setValue("login", phone);
    setValue("tel", phone);
  }, []);

  return {
    clientTypeOptions,
    control,
    register,
    handleSubmit,
    onSubmit,
    handleBack,
    companyOptions,
    t,
    phone,
    errors,
    handleTogglePasswordVisibility,
    isPasswordVisible,
    watch,
    setStatus,
    status,
    setValue,
  };
};
