"use client";

import {
  useCreateActionHistoriesMutation,
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
  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  
  const { mutate,isLoading } = useGetCar({
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
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id:  authStore.userData.your_id,
          action_time: new Date(),
          role_slug: `carrier`,
          action_comment: `deleted_driver`,
          role_id: authStore.userData?.role_id,
          action_type: [`delete`],
        },
      });
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
    isLoading,
    t,
    handleDelete,
  };
};
