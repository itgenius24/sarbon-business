"use client";

import {
  useCheckUser,
  useCreateUser,
  useGetAddress,
  useGetCarListOnSubmit,
  useGetUserGpsByIDData,
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
import useClipboard from "react-use-clipboard";
import { normalizeName } from "@/utils/normalizeName";

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
    getValues,
  } = useForm({});
  const [isCopied, setCopied] = useClipboard(
    JSON.stringify(
      `Его логин: ${watch(`phone`)};  Его пароль: ${watch(`password`)}`
    )
  );

  const [open,setOpen] = useState(false)

  const firm_id = authStore.userData.firm_id;
 

  const getUserGps = useGetUserGpsByIDData({
    params: {
      data: JSON.stringify({
        // client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
        //  firm_id,
        guid: id,
        with_relations: true,
      }),
    },
  });


  useEffect(() => {
    if (id) {
      reset({
        ...getUserGps?.data?.response[0],
        password: "",
      });
    }
  }, [getUserGps?.data?.response]);

  const onSubmit = (val) => {
  
  };
  const copyFunction = () => {
    setCopied();
    setIsPopupOpen(false);
    router.push(`/${locale}/drivers`);
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
    isLoading:false,
    copyFunction,
    open,
    setOpen
  };
};
