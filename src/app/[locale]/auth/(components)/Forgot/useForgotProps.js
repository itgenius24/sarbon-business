import authStore from "@/store/auth.store";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { usePhoneMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@/utils/yupResolver";

export const useForgotProps = () => {

  const router = useRouter();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translation");

  const schema = yup
    .object({ phone: yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Неправильный номер телефона").required("Обязательное поле") })
    .required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  // const phoneMutation = usePhoneMutation({
  //   onSuccess: (data) => {
  //     authStore.setAuthData("smsId", data.sms_id);
  //     router.push(`/${locale}/auth/otp`);
  //   }
  // });

  const navigateLogin = () => {
    router.back();
  };

  function onSubmit(data) {
    authStore.setAuthData("phone", data.phone);
    authStore.setAuthData("isForgot", true);
    router.push(`/${locale}/auth/otp`);
    // phoneMutation.mutate({
    //   recipient: data.phone,
    //   text: "code",
    //   type: "PHONE"
    // });
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    navigateLogin,
    t,
  };
};
