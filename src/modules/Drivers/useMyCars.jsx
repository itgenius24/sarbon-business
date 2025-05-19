"use client";

import {
  useCreateActionHistoriesMutation,
  useCreateUser,
  useGetUserGpsByIDData,
  useOfferFromCustomerMutation,
  useUpdateUser,
} from "@/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import useClipboard from "react-use-clipboard";
import { normalizeName } from "@/utils/normalizeName";

export const useMyCars = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get(`id`);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const router = useRouter();

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
    getValues,
  } = useForm({});
  
  const [isCopied, setCopied] = useClipboard(
    JSON.stringify(
      `Его логин: ${watch(`phone`)};  Его пароль: ${watch(`password`)}`
    )
  );
  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const [open, setOpen] = useState(false);

  const firm_id = authStore.userData.firm_id;

  const { mutate } = useCreateUser({
    onSuccess: (res) => {
      // router.push(`/${locale}/drivers`);
      setIsPopupOpen(true);
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: authStore.userData.your_id,
          action_time: new Date(),
          role_slug: `carrier`,
          action_comment: `create_driver`,
          role_id: authStore.userData?.role_id,
          action_type: [`create`],
        },
      });
    },
  });

  const { mutate: checkUserData, isLoading: isLoadingCrate } =
    useOfferFromCustomerMutation({
      onSuccess: (res) => {
        if (res?.response?.length === 0) {
          mutate({
            data: {
              ...getValues(),
              create_time: new Date(),
              login: getValues().full_name,
              firm_id,
              role_id: "921464fa-8308-46b7-9b66-363acf654e40",
              client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
            },
          });
        } else {
          setOpen(true);
        }
      },
    });

  const { mutate: updateDsate, isLoading } = useUpdateUser({
    onSuccess: (res) => {
      // setIsPopupOpen(true);
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: getUserGps?.data?.response[0].your_id,
          action_time: new Date(),
          role_slug: `carrier`,
          action_comment: `changed_driver_info`,
          role_id: authStore.userData?.role_id,
          action_type: [`update`],
        },
      });
      router.push(`/${locale}/drivers`);
    },
  });

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
    if (id) {
      updateDsate({
        data: {
          full_name: normalizeName(val.full_name),
          phone: val?.phone,
          firm_id,
          passport_scan: val?.passport_scan,
          passport_code: val?.passport_code,
          drivers_license: val?.drivers_license,
          photo: val?.photo,
          login: val?.phone,
          guid: getUserGps?.data?.response[0]?.guid,
          role_id: "921464fa-8308-46b7-9b66-363acf654e40",
          client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
        },
      });
    } else {
      checkUserData({
        data: {
          object_data: {
            phone: val?.phone?.startsWith("+")
              ? val?.phone?.slice(1)
              : val?.phone,
            type: `register`,
            register_type: "phone",
            email:``
          },
        },
      });
    }
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
    isLoading: isLoading ? isLoading : isLoadingCrate,
    copyFunction,
    open,
    setOpen,
  };
};
