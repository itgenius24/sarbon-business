import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@/utils/yupResolver";
import { usePhoneMutation } from "@/services/api";
import authStore from "@/store/auth.store";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";

export const useRegistrationProps = () => {

  const router = useRouter();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const schema = yup
    .object({ phone: yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Неправильный номер телефона").required("Обязательное поле") })
    .required();

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const phoneMutation = usePhoneMutation({
    onSuccess: (data) => {
      authStore.setAuthData("smsId", data.sms_id);
      authStore.setAuthData("isForgot", false);
      router.push(`/${locale}/auth/otp`);
    }
  });

  function navigateLogin () {
    router.push(`/${locale}/auth/login`);
  }

  function onSubmit (data) {
    authStore.setAuthData("phone", data.phone);
    phoneMutation.mutate({
      recipient: data.phone,
      text: "code",
      type: "PHONE"
    });
  }

  return {
    handleSubmit,
    register,
    errors,
    navigateLogin,
    onSubmit,
    isPending: phoneMutation.isPending,
    t
  };
};
