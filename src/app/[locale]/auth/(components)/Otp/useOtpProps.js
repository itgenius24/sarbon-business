import { useOtpMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";

export const useOtpProps = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const toast = useToast();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const { smsId, phone } = authStore.getAuthData;

  const registrationMutation = useOtpMutation({
    onSuccess: () => {
      router.push(`/${locale}/auth/registration-form`);
    },
    onError: () => {
      toast({
        title: t("Неправильный код"),
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
    }
  });

  function onChange (value) {
    setValue(value);
  }

  function handleSendOtp () {
    registrationMutation.mutate({
      data:{
        sms_id: smsId,
        otp: value,
        phone: phone,
        client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
        role_id: "921464fa-8308-46b7-9b66-363acf654e40"
      },
      login_strategy: "PHONE_OTP"
    });
  }

  function navigateBack () {
    router.back();
  }

  return {
    value,
    onChange,
    handleSendOtp,
    navigateBack,
    phone,
    t,
  };
};
