import { useOtpMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthContext } from "../../_providers/AuthProvider";
import authStore from "@/store/auth.store";

export const useOtpProps = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  // const { smsId, phone } = useAuthContext();

  // console.log({ smsId });


  const { smsId, phone } = authStore.getAuthData;

  const registrationMutation = useOtpMutation({
    onSuccess: (data) => {
      console.log({ data });
      router.push("/auth/registration-form");
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

  function navigateLogin () {
    router.push("/auth/login");
  }

  return {
    value,
    onChange,
    handleSendOtp,
    navigateLogin,
    phone,
  };
};
