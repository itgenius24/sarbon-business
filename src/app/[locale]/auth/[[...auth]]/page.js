"use client";

import { Login } from "../(components)/Login";
import { Registration } from "../(components)/Registration";
import { RegistrationForm } from "../(components)/RegistrationForm";
import { Otp } from "../(components)/Otp";
import { Forgot } from "../(components)/Forgot";
import { NewPassword } from "../(components)/NewPassword/NewPassword";

export default function Auth({ params }) {
  const path = params.auth?.[0];

  const authTypes = {
    login: Login,
    registration: Registration,
    "registration-form": RegistrationForm,
    otp: Otp,
    forgot: Forgot,
    "new-password": NewPassword,
  };

  const Current = authTypes[path];

  return Current ? <Current /> : <Login />;
}
