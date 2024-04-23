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

  const { smsId, phone } = authStore.getAuthData;

  const registrationMutation = useOtpMutation({
    onSuccess: (data) => {
      if(!data?.user_found && authStore.getAuthData.isForgot) {
        toast({
          status: "error",
          title: t("Пользователь не найден"),
          duration: 3000,
          position: "top right",
        });
        router.back();
      } else {
        if(authStore.authData.isForgot) {
          authStore.setAuthData("userId", data?.user_id);
          router.push(`/${locale}/auth/new-password`);
        } else {
          router.push(`/${locale}/auth/registration-form`);
        }
      }
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
    }
  });

  function onChange (value) {
    setValue(value);
    setError(false);
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

  const phoneMutation = usePhoneMutation({
    onSuccess: (data) => {
      authStore.setAuthData("smsId", data.sms_id);
      authStore.setAuthData("isForgot", false);
    }
  });

  function handleResendOtp() {
    setTimer(59);
    phoneMutation.mutate({
      recipient: authStore.authData.phone,
      text: "code",
      type: "PHONE"
    });
  }

  function navigateBack () {
    router.back();
  }

  useEffect(() => {
    if(timer > 0) {
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
  };
};
