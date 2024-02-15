"use client";

import { Login } from "../_components/Login";
import { Registration } from "../_components/Registration";
import { RegistrationForm } from "../_components/RegistrationForm";
import { Otp } from "../_components/Otp";

export default function Auth({ params }) {
  const path = params.auth?.[0];

  const authTypes = {
    login: Login,
    registration: Registration,
    "registration-form": RegistrationForm,
    otp: Otp,
  };

  const Current = authTypes[path];

  return Current ? <Current /> : <Login />;
}

