"use client";

import {
  useCreateUser,
  useGetAddress,
  useGetCarListOnSubmit,
  useGetUserGpsData,
  useUpdateUser,
} from "@/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useToast } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { isValidJSON } from "@/utils/isValidJSON";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";

export const useMyCars = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get(`id`);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  console.log(`id`, id);

  const router = useRouter();

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
  const firm_id = authStore.userData.firm_id;

  const { mutate } = useCreateUser({
    onSuccess: (res) => {
      // router.push(`/${locale}/drivers`);
      setIsPopupOpen(true);
    },
  });

  const { mutate: updateDsate } = useUpdateUser({
    onSuccess: (res) => {
      setIsPopupOpen(true);
      // router.push(`/${locale}/drivers`);
    },
  });

  const getUserGps = useGetUserGpsData({
    params: {
      data: JSON.stringify({
        // client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
        //  firm_id,
        guid: id,
        with_relations: true,
      }),
    },
  });

  //  console.log("getUserGps",getUserGps?.data.response)

  useEffect(() => {
    if (id) {
      reset({
        ...getUserGps?.data?.response[0]?.users_id_data,
        password: "",
      });
    }
  }, [getUserGps?.data?.response]);

  const onSubmit = (val) => {
    if (id) {
      updateDsate({
        data: {
          full_name: val.full_name,
          phone: val?.phone,
          firm_id,
          // password:val?.password,
          passport_scan: val?.passport_scan,
          passport_code: val?.passport_code,
          drivers_license: val?.drivers_license,
          photo: val?.photo,
          login: val?.phone,
          guid: getUserGps?.data?.response[0]?.users_id,
          role_id: "921464fa-8308-46b7-9b66-363acf654e40",
          client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
        },
      });
    } else {
      mutate({
        data: {
          ...val,
          login: val.full_name,
          firm_id,
          role_id: "921464fa-8308-46b7-9b66-363acf654e40",
          client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
        },
      });
    }
  };

  return {
    t,
    control,
    watch,
    setValue,
    register,
    errors,
    router,
    locale,
    handleSubmit,
    onSubmit,
    setIsPopupOpen,
    isPopupOpen,
    id,
  };
};
