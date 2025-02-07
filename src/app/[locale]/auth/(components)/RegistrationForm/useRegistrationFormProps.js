import authStore from "@/store/auth.store";
import {
  useGetClientType,
  useGetCompanyList,
  useGetRoleList,
  useGetUsers,
  useRegisterFirmMutation,
  useRegisterUserMutation,
} from "@/services/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { normalizeName } from "@/utils/normalizeName";

export const useRegistrationFormProps = () => {
  const locale = useGetLang();
  const router = useRouter();
  const [value, setValueR] = useState("C1");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loadin,setLoadin] = useState(false)

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
  const [enab, setEnab] = useState(false);

  const getClientTypes = useGetClientType();

  const clientTypeOptions = getClientTypes.data?.response
    ?.filter(
      (client) =>
        client?.name === t("Заказчик") || client?.name === t("Экспидетор")
    )
    ?.map((role) => ({ label: role?.name, value: role?.guid }));

  const getUsers = useGetUsers(
    {
      data: JSON.stringify({
        client_type_id:
          value === `C2`
            ? clientTypeOptions?.[1]?.value
            : "a25d605c-d153-4ddf-8590-e4cda176ef93",
      }),
    },
    {   
      enabled: Boolean(enab)
    }
  );

  const login = () => {
    toast({
      title: t("Профиль успешно добавлен!"),
      status: "success",
      position: "top right",
      isClosable:true,
      duration:3000
    });
    authStore.login({
      user: {
        firm_id: getUsers?.data?.response?.[0]?.firm_id,
        ...getUsers?.data?.response?.[0],
        id: getUsers?.data.response?.[0]?.guid,
        client_id: getUsers?.data?.response?.[0]?.client_type_id,
      },
      token: {},
      role: getUsers?.data?.response?.[0]?.role,
    });
    router.replace(`/${locale}/search-load`);
    // setLoadin(false)
  };

  useEffect(() => {
    if (getUsers.data && enab) {
      if (value === `C2`) {
        setLoadin(false)
        authStore.login({
          user: {
            firm_id: getUsers?.data?.response?.[0]?.firm_id,
            ...getUsers?.data?.response?.[0],
            id: getUsers?.data.response?.[0]?.guid,
            client_id: getUsers?.data?.response?.[0]?.client_type_id,
          },
          token: {},
          role: getUsers?.data?.response?.[0]?.role,
        });
        router.push(`/${locale}`);
      } else {
        login()
      }
      setEnab(false);
    }
  }, [getUsers.data]);



  const registerUserMutation = useRegisterUserMutation({
    onSuccess: (data) => {
      setEnab(true);
    },
    onError(error) {
      setLoadin(false)
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
      registerUserMutation.mutate({
        data: {
          role_id:
            value === `C2`
              ? "48871d27-7361-4f69-8fe4-b54daf270739"
              : "f81d3c3d-228d-479e-a2b1-9948c98640f2",
          client_type_id:
            value === `C2`
              ? clientTypeOptions[1].value
              : "a25d605c-d153-4ddf-8590-e4cda176ef93",
          phone: phone,
          full_name: normalizeName(watch(`full_name`)),
          login: watch(`login`),
          password: watch(`password`),
          firm_id: data?.guid,
          photo: watch(`img`),
          email: watch(`email`),
          user_status: ["rejected"],
          passport_code: status === 1 ? watch(`passport_code`) : undefined,
          passport_scan: status === 1 ? watch(`passport_scan`) : undefined,
          create_time:new Date()
        },
      });
    },
    onError(error) {
      setLoadin(false)
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
        company_name: status === 1 ? `${watch(`company_type`)?.value ? watch(`company_type`)?.value : `OOO`} ${data?.companyName}` :undefined,
        building_address: data.adress,
        phone_number: phone,
        logo: data.img,
      },
    });
    setLoadin(true)
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
    setValueR,
    value,
    isPopupOpen,
    setIsPopupOpen,
    locale,
    router,
    login,
    loadin
  };
};
