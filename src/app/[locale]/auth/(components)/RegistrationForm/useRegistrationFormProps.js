import authStore from "@/store/auth.store";
import {
  useGetClientType,
  useGetCompanyList,
  useGetRoleList,
  useGetUserData,
  useGetUsers,
  useOfferFromCustomerMutation,
  useRegisterFirmMutation,
  useRegisterUserMutation,
  useUpdateUser,
} from "@/services/api";
import { useTinLookupMutation, mapTinDataToCompanyData } from "@/services/api/tin/tin.service";
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
  const [loadin, setLoadin] = useState(false);
  const [nomer, setNomer] = useState();
  const [open, setOpen] = useState(false);

  const { t } = useTranslation(locale, "translations");
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm();



  const getAuthData = authStore.getAuthData;
  const phone = getAuthData?.phone ? getAuthData?.phone : watch(`tel`);
  const firm_id = getAuthData?.firm_id;

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
      enabled: Boolean(enab),
    }
  );

  const login = () => {
    toast({
      title: t("Профиль успешно добавлен!"),
      status: "success",
      position: "top right",
      isClosable: true,
      duration: 3000,
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
        setLoadin(false);
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
        login();
      }
      setEnab(false);
    }
  }, [getUsers.data]);

  const registerUserMutation = useRegisterUserMutation({
    onSuccess: (data) => {
      setEnab(true);
    },
    onError(error) {
      setLoadin(false);
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

  const { mutate: useUpdate } = useUpdateUser({
    onSuccess: (data) => {
      setEnab(true);
    },
    onError(error) {
      setLoadin(false);
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
      if (authStore?.authData?.mediaAuth) {
        useUpdate({
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
            passport_code: watch(`passport_code`) ,
            passport_scan:  watch(`passport_scan`) ,
            create_time: new Date(),
            guid: authStore?.authData?.mediaAuth?.guid,
          },
        });
      } else {
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
            passport_code:  watch(`passport_code`) ,
            passport_scan: watch(`passport_scan`) ,
            create_time: new Date(),
          },
        });
      }
    },
    onError(error) {
      setLoadin(false);
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

  const offerFromCustomer = useOfferFromCustomerMutation({
    onSuccess(res) {
      if (res?.response?.length === 0) {
        registerFirmMutation.mutate({
          data: {
            company_direction: ["company_customer"],
            tip_account: status === 1 ? ["legal_owner"] : ["physic_owner"],
            full_name: nomer?.full_name,
            tin: nomer?.inn,
            company_name:
              status === 1
                ? `${
                    watch(`company_type`)?.value
                      ? watch(`company_type`)?.value
                      : `OOO`
                  } ${nomer?.companyName}`
                : undefined,
            building_address: nomer?.adress,
            phone_number: phone,
            logo: nomer?.img,
            company_type: ""
          },
        });
      } else {
        setOpen(true);
        setLoadin(false);
      }
    },
  });

  function onSubmit(data) {
    authStore.setAuthData("firm_id", data.company?.value);
    setNomer(data);
    setLoadin(true);
    if (authStore?.authData?.mediaAuth) {
      registerFirmMutation.mutate({
        data: {
          company_direction: ["company_customer"],
          tip_account: status === 1 ? ["legal_owner"] : ["physic_owner"],
          full_name: data?.full_name,
          tin: data?.inn,
          company_name:
            status === 1
              ? `${
                  watch(`company_type`)?.value
                    ? watch(`company_type`)?.value
                    : `OOO`
                } ${data?.companyName}`
              : undefined,
          building_address: data?.adress,
          phone_number: phone,
          logo: data?.img,
          company_type: "",
        },
      });
    } else {
      offerFromCustomer.mutate({
        data: {
          object_data: {
            email: watch(`email`),
            phone: phone?.startsWith("+") ? phone?.slice(1) : phone,
            type: `register`,
          },
        },
      });
    }
  }

  function handleTogglePasswordVisibility() {
    setPasswordVisible(!isPasswordVisible);
  }

  function handleBack() {
    router.push(`/${locale}/auth/registration`);
  }

  const tinLookupMutation = useTinLookupMutation({
    onSuccess: (data) => {
      const mappedData = mapTinDataToCompanyData(data);
      if (mappedData) {
        Object.keys(mappedData).forEach(key => {
          if (mappedData[key]) {
            setValue(key, mappedData[key]);
          }
        });
        toast({
          title: t("Данные компании успешно загружены"),
          status: "success",
          position: "top right",
          duration: 3000,
        });
      }
    },
    onError: (error) => {
      toast({
        title: t("Не удалось найти данные по ИНН"),
        status: "error",
        position: "top right",
        duration: 3000,
      });
    }
  });

  const handleTinLookup = (tin) => {
    if (tin && tin.length >= 9) {
      tinLookupMutation.mutate(tin);
    }
  };

  useEffect(() => {
    if (authStore?.authData?.mediaAuth) {
      setValue("email", authStore?.authData?.mediaAuth?.email);
      setValue("login", authStore?.authData?.mediaAuth?.email);
    } else {
      setValue("login", phone);
      setValue("tel", phone);
    }
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
    loadin,
    open,
    setOpen,
    handleTinLookup,
    tinLookupLoading: tinLookupMutation.isPending,
  };
};
