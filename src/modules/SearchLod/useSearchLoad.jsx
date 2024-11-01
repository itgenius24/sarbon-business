"use client";

import {
  useGetAddress,
  useGetCarListOnSubmit,
} from "@/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useToast } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { isValidJSON } from "@/utils/isValidJSON";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export const useSearchLoad = () => {

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");



  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    reset,
    setValue,formState
  } = useForm({});



  return {
    t,
    setValue,control,
    register,
    watch,
    formState
  };
};
