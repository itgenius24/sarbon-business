import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@/utils/yupResolver";
import { usePhoneMutation } from "@/services/api";
import authStore from "@/store/auth.store";

export const useRegistrationProps = () => {

  const router = useRouter();

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
      router.push("/auth/otp");
    }
  });

  function navigateLogin () {
    router.push("/auth/login");
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
    isPending: phoneMutation.isPending
  };
};
