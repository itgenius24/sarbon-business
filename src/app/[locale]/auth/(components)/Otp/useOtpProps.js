import { useOtpMutation, usePhoneMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";

export const useOtpProps = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const [timer, setTimer] = useState(59);

  const toast = useToast();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const [error, setError] = useState(false);

  const { smsId, phone, typeSms } = authStore.getAuthData;

  const registrationMutation = useOtpMutation({
    onSuccess: (data) => {
      if (authStore.authData.isForgot) {
        router.push(`/${locale}/auth/new-password`);
      } else {
        router.replace(`/${locale}/auth/registration-form`);
      }
      // }
    },
    onError: () => {
      setError(true);
      toast({
        title: t("Неправильный код"),
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
    },
  });

  function onChange(value) {
    if (value?.length === 6) {
      registrationMutation.mutate({
        data: {
          sms_id: smsId,
          otp: value,
          phone: phone,
          client_type_id: "9bb1227a-0c90-4c70-bcee-b2563d32f7a0",
          role_id: "48871d27-7361-4f69-8fe4-b54daf270739",
        },
        login_strategy: typeSms === `PHONE` ? "PHONE_OTP" : `TELEGRAM_OTP`,
      });
    }
    setValue(value);
    setError(false);
  }

  function handleSendOtp() {}

  const phoneMutation = usePhoneMutation({
    onSuccess: (data) => {
      authStore.setAuthData("smsId", data.sms_id);
      authStore.setAuthData("isForgot", false);
    },
  });

  function handleResendOtp() {
    setTimer(59);
    phoneMutation.mutate({
      recipient: authStore.authData.phone,
      text: "code",
      type: typeSms,
    });
  }

  function navigateBack() {
    router.back();
  }

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setTimer(0);
    }
  }, [timer]);

  return {
    value,
    onChange,
    handleSendOtp,
    navigateBack,
    phone,
    t,
    error,
    handleResendOtp,
    timer,
    isLoading: registrationMutation.isLoading,
    success: registrationMutation.isSuccess,
  };
};
