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
  const getUserGps = useGetUserGpsData(
   {
    params: {
      data: JSON.stringify({
        firm_id,
        guid:'b28d3079-7b07-49d0-8b74-8cff6f6bb888',
        with_relations: true,
      }),
    },
   }
  );

  const { data: useList } = useGetUserData({
    params: {
      data: JSON.stringify({
        firm_id,
        with_relations: true,
      }),
    },
    querySettings: {
      onSuccess: (res) => {
        console.log(`res`, res);
      },
    },
  });

  const caroCencel = (id) => {

  }
 
  
  return {
    data:getUserGps?.data?.response,
    useList:useList?.response,
    t,
    caroCencel,
  };
};
