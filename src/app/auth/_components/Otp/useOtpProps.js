"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const useOtpProps = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onChange (value) {
    setValue(value);
  }

  function handleSendOtp () {
  }

  function navigateLogin () {
    router.push("/auth/login");
  }

  return {
    value,
    onChange,
    handleSendOtp,
    navigateLogin,
  };
};
