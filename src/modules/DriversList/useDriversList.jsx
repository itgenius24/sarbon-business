"use client";

import {
  useDeleteUsers,
  useGetAddress,
  useGetCar,
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
 

  const locale = useGetLang();
  const [data,setData] = useState()
  const [status,setStatus] = useState(false)

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

  const firm_id = authStore.userData.firm_id;

  
  const { mutate,isPending } = useGetCar({
    onSuccess:(res) => {
      setData(res?.response)
      setStatus(false)
    }
  });

  useEffect(() => {
    const data = {
      data: {
        object_data: {
          firm_id
        },
      },
    };
    mutate(data);
  }, [status]);

  const { mutate: dalete } = useDeleteUsers({
    onSuccess: () => {
      setStatus(true)
    },
  });

  const handleDelete = (id) => {
    const data = {
      id: id,
    };
    dalete(data);
  };


 

  return {
    data: data,
    isPending,
    t,
    handleDelete,
  };
};
