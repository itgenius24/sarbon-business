"use client";

import { Login } from "../_components/Login";
import { Registration } from "../_components/Registration";
import { RegistrationForm } from "../_components/RegistrationForm";
import { Otp } from "../_components/Otp";
import AuthProvider from "../_providers";
import { useState } from "react";

export default function Auth({ params }) {
  const path = params.auth?.[0];

  // const [smsId, setSmsId] = useState("");
  // const [phone, setPhone] = useState("");
  // const [clientTypeId, setClientTypeId] = useState("");
  // const [roleId, setRoleId] = useState("");

  const authTypes = {
    login: Login,
    registration: Registration,
    "registration-form": RegistrationForm,
    otp: Otp,
  };

  const Current = authTypes[path];

  return <AuthProvider
    // value={{
    //   smsId,
    //   setSmsId,
    //   phone,
    //   setPhone,
    //   clientTypeId,
    //   setClientTypeId,
    //   roleId,
    //   setRoleId
    // }}
  >
    {Current ? <Current /> : <Login />}
  </AuthProvider>;
}
