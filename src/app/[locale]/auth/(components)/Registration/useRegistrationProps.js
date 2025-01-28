import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@/utils/yupResolver";
import { useCheckUser, useGetUserData, usePhoneMutation } from "@/services/api";
import authStore from "@/store/auth.store";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useState } from "react";

export const useRegistrationProps = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [nomer, setNomer] = useState();
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

  useEffect(() => {
    if (useList?.count > 0) {
      setOpen(true);
    } else {
      phoneMutation.mutate({
        recipient: nomer,
        text: "code",
        type: "PHONE",
      });
    }
  }, [useList?.count]);

  return {
    handleSubmit,
    register,
    errors,
    navigateLogin,
    onSubmit,
    isPending: phoneMutation.isPending,
    t,
    control,
    setOpen,
    open,
    watch,
  };
};
