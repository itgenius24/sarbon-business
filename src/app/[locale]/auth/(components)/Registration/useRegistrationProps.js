import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@/utils/yupResolver";
import { useCheckUser, useGetUserData, usePhoneMutation } from "@/services/api";
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

  console.log(`user`,user)

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
    authStore.setAuthData("phone", data.phone);
    setNomer(data.phone);
  }

  const setType = (type) => {
    router.push(`?type=${type}`);
  };

  const closeModal = () => {
    setNomer(``)
    setOpen(false)
  }

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


  const handleGoogleLogin = async () => {


    const user = await signInWithGoogle();
    setUser(user);
  };

  const handleAppleLogin = async () => {
    console.log(`result`)

    const user = await signInWithApple();
    setUser(user);
  };

  return {
    handleSubmit,
    register,
    errors,
    navigateLogin,
    onSubmit,
    isLoading: phoneMutation.isLoading  ,
    t,
    control,
    setOpen,
    open,
    watch,
    locale,
    closeModal,
    setType,
    handleGoogleLogin,
    handleAppleLogin
  };
};
