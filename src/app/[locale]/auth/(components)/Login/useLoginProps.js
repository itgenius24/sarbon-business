import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import {
  useGetUseMutation,
  useGetUserGpsBYData,
  useGoogleRigister,
  useLoginMutation,
  useOneLoginMutation,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { signInWithGoogle } from "@/utils/fribaseAuth";
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
  const dispachaerTypeId = process.env.NEXT_PUBLIC_DISPACR_TYPE_ID;
  const analiticTypeId = process.env.NEXT_PUBLIC_ANALITIK_TYPE_ID;
  const dillerTypeId = process.env.NEXT_PUBLIC_DILLER_TYPE_ID;

  const [remember, setRemember] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] = useState({});


  const toast = useToast();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username:``,
      password: ``,
    },
  });

  const { mutate: getUserByIdData, isLoading: getUseLoading } =
    useGetUseMutation({
      onSuccess: (res) => {
        if (res?.response?.[0]?.user_status?.[0] === `blocked`) {
          toast({
            title: t("Это заблокированный пользователь."),
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          authStore.login({
            user: {
              firm_id: dataUser.user_data?.firm_id,
              full_name: dataUser.user_data?.full_name,
              id: dataUser?.user_data.guid,
              ...dataUser?.user_data,
              client_id: dataUser?.client_type?.id,
              role_id: dataUser?.role?.id,
            },
            token: dataUser?.token,
            role: dataUser?.role,
          });
          router.push(`/${locale ? locale : `ru`}`);
        }

        setDataUser({});
      },
    });

  const login = useLoginMutation({
    onSuccess: (data) => {
      getUserByIdData({
        data: JSON.stringify({
          guid: data?.user_data.guid,
          with_relations: true,
        }),
      });
      setDataUser(data);

      // if (remember) {
      //   localStorage.setItem(
      //     "loginData",
      //     JSON.stringify({
      //       username: watch("username"),
      //       password: watch("password"),
      //     })
      //   );
      // }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginOne = useOneLoginMutation({
    onSuccess: (data) => {
      const clientTypeId =
        data?.companies?.[0]?.projects?.[0]?.resource_environments?.[0]
          ?.client_types?.response?.[0]?.guid;
      if (
        clientTypeId === customerTypeId ||
        clientTypeId === expeditorTypeId ||
        clientTypeId === dispachaerTypeId ||
        clientTypeId === analiticTypeId ||
        clientTypeId === dillerTypeId
      ) {
        login.mutate({
          username: watch("username"),
          password: watch("password"),
          company_id: "b8367a10-5699-4e91-8c1c-71578ca5448e",
          project_id: "f539f64b-961e-4c6c-8534-140091f7f27b",
          environment_id: "11b59b25-8772-456a-84e1-20bdfdd32506",
          client_type: clientTypeId,
          environment_ids: ["11b59b25-8772-456a-84e1-20bdfdd32506"],
        });
      } else if (
        data?.companies?.[0]?.projects?.[0]?.resource_environments?.[0]
          ?.client_types?.response?.[0]?.guid ===
        "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5"
      ) {
        setOpen(true);
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

  const { mutate: getUserData } = useGetUserGpsBYData({
    onSuccess: (res) => {
      authStore.login({
        user: {
          firm_id: res?.response?.[0].firm_id,
          full_name: res?.response?.[0].full_name,
          id: res?.response?.[0]?.guid,
          ...res?.response?.[0],
          client_id: res?.response?.[0]?.client_type_id,
          role_id: res?.response?.[0]?.role_id_data?.guid,
        },
        token: {},
        role: {},
      });
      authStore.setAuthData("phone", ``);
      authStore.setAuthData("mediaAuth", {});
      router.push(`/${locale ? locale : `ru`}`);
    },
  });

  const { mutate: googleRigister } = useGoogleRigister({
    onSuccess: (res) => {
      if (res?.response?.[0].phone) {
        getUserData({
          data: JSON.stringify({
            guid: res?.response?.[0].guid,
            with_relations: true,
          }),
        });
      } else {
        toast({
          title: t("Вы не зарегистрированы с этим email"),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        authStore.setAuthData("phone", ``);
        authStore.setAuthData("mediaAuth", res?.response?.[0]);
        router.push(`/${locale}/auth/registration-form`);
      }
    },
  });

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();



    const body = {
      display_name: user?.displayName,
      login_type: user?.email,
      id_token: user?.uid,
      access_token: user?.accessToken,
      type: `register`,
      register_type: `email`,
      unique_id: ``,
      user_type: `carrier`,
    };
    googleRigister({
      data: {
        object_data: body,
      },
    });
  };

  function navigateRegistration() {
    router.push(`/${locale}/auth/registration`);
  }

  function navigateToMain() {
    router.push(`/${locale}`);
  }

  function onSubmit(data) {
    loginOne.mutate(data);
  }

  function onRememberChange(e) {
    setRemember(e.target.checked);
  }

  function handleTogglePasswordVisibility() {
    setPasswordVisible(!isPasswordVisible);
  }

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    navigateRegistration,
    isLoading: loginOne.isLoading || login.isLoading || getUseLoading,
    onRememberChange,
    t,
    handleTogglePasswordVisibility,
    isPasswordVisible,
    navigateToMain,
    locale,
    open,
    setOpen,
    handleGoogleLogin,
  };
};
