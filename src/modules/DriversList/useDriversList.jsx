"use client";

import {
  useGetAddress,
  useGetCarListOnSubmit,
  useGetUserData,
  useGetUserGpsData,
  useGetVehicle,
} from "@/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useToast } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { isValidJSON } from "@/utils/isValidJSON";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";

export const useDriversList = () => {

  const searchParams = useSearchParams();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const toast = useToast();

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({});

const firm_id = authStore.userData.firm_id


  const { data: useList } = useGetUserData({
    params: {
      data: JSON.stringify({
        firm_id,
        with_relations: true,
        client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
      }),
    },
    querySettings: {
      onSuccess: (res) => {
        console.log(`res`, res);
      },
    },
  });


  
  return {
    data:useList?.response,
    useList:useList?.response,
    t,
  
  };
};
