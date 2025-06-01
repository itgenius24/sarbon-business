import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@/utils/yupResolver";
import {
  useCheckUser,
  useGetUserData,
  useGetUserGpsBYData,
  useGetUserGpsByIDData,
  useGoogleRigister,
  usePhoneMutation,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useState } from "react";
import { signInWithApple, signInWithGoogle } from "@/utils/fribaseAuth";

export const useRegistrationProps = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [nomer, setNomer] = useState();
  const [user, setUser] = useState(null);
  const locale = useGetLang();


  const { t } = useTranslation(locale, "translations");

  const schema = yup
    .object({
      phone: yup
        .string()
        .matches(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          "Неправильный номер телефона"
        )
        .required("Обязательное поле"),
    })
    .required();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const phoneMutation = usePhoneMutation({
    onSuccess: (data) => {
      authStore.setAuthData("smsId", data.sms_id);
      authStore.setAuthData("isForgot", false);
      authStore.setAuthData("mediaAuth", false);
      router.push(`/${locale}/auth/otp`);
    },
    onError: () => {
      // router.push(`/${locale}/auth/otp`);
    },
  });

  function navigateLogin() {
    router.push(`/${locale}/auth/login`);
  }

  const { data: useList } = useGetUserData({
    params: {
      data: JSON.stringify({
        offset: 0,
        order: {},
        search: nomer?.startsWith("+") ? nomer?.slice(1) : nomer,
        limit: 1000,
        view_fields: ["phone"],
      }),
    },
    querySettings: {
      enabled: Boolean(nomer),
    },
  });

  function onSubmit(data) {
    console.log(`data`, data);
    authStore.setAuthData("phone", data.phone);
    setNomer(data.phone);
  }

  const setType = (type) => {
    router.push(`?type=${type}`);
  };

  const closeModal = () => {
    setNomer(``);
    setOpen(false);
  };

  useEffect(() => {
    if (
      useList?.response?.[0]?.role_id === "921464fa-8308-46b7-9b66-363acf654e40"
    ) {
      setOpen(`driver`);
    } else if (
      useList?.response?.[0]?.role_id === "f81d3c3d-228d-479e-a2b1-9948c98640f2"
    ) {
      setOpen(`exspiditor`);
    } else if (useList?.count === 0) {
      phoneMutation.mutate({
        recipient: nomer,
        text: "code",
        type: "PHONE",
      });
    }
  }, [useList?.count]);

  const { mutate: getUserData } = useGetUserGpsBYData({
    onSuccess:(res) => {
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

    }
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
    setUser(user);
  };

  const handleAppleLogin = async () => {
    const user = await signInWithApple();
    setUser(user);
  };

  return {
    handleSubmit,
    register,
    errors,
    navigateLogin,
    onSubmit,
    isLoading: phoneMutation.isLoading,
    t,
    control,
    setOpen,
    open,
    watch,
    locale,
    closeModal,
    setType,
    handleGoogleLogin,
    handleAppleLogin,
  };
};
