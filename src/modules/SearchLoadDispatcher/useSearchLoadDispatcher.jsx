"use client";

import { useForm } from "react-hook-form";

import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export const useSearchLoadDispatcher = () => {
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({});

  return {
    t,
    setValue,
    register,
    watch,

  };
};
