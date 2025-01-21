import authStore from "@/store/auth.store";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetUserData, usePhoneMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@/utils/yupResolver";
import { useEffect, useState } from "react";

export const useForgotProps = () => {
  const router = useRouter();
  const [nomer, setNomer] = useState();
  const [open, setOpen] = useState(false);

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translation");

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
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const phoneMutation = usePhoneMutation({
    onSuccess: (data) => {
      authStore.setAuthData("smsId", data.sms_id);
      router.push(`/${locale}/auth/otp`);
    },
    onError: () => {
      router.push(`/${locale}/auth/otp`);
    },
  });

  const navigateLogin = () => {
    router.back();
  };

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

  useEffect(() => {
    if (useList?.count > 0) {
      console.log("useList?.count", useList?.response[0]?.guid);
      phoneMutation.mutate({
        recipient: nomer,
        text: "code",
        type: "PHONE",
      });
      authStore.setAuthData("userId", useList?.response[0]?.guid);

    } else if(useList?.count === 0) {
      setOpen(true);
    }
  }, [useList?.count]);

  function onSubmit(data) {
    authStore.setAuthData("phone", data.phone);
    authStore.setAuthData("isForgot", true);
    setNomer(data.phone);
 
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    navigateLogin,
    t,
    control,
    setOpen,
    open,
    watch
  };
};
