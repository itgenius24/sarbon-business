"use client";

import {
  useCheckUser,
  useCreateDispatcherTeams,
  useCreateUser,
  useGetAddress,
  useGetCarListOnSubmit,
  useGetPhone,
  useGetUserGpsByIDData,
  useGetUserGpsData,
  useOfferFromCustomerMutation,
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

  const [open, setOpen] = useState(false);

  const firm_id = authStore.userData.firm_id;

  const { mutate: createDispatcherTeams } = useCreateDispatcherTeams();

  const { mutate: phoneGet } = useGetPhone({
    onSuccess: (res) => {
      createDispatcherTeams({
        data: {
          users_id: authStore.userData.guid,
          users_id_2: res?.response?.[0]?.guid,
        },
      });
      setIsPopupOpen(true);
    },
  });

  const { mutate, isLoading: useLoading } = useCreateUser({
    onSuccess: (res) => {
      phoneGet({
        data: JSON.stringify({
          phone: res?.phone?.replace("+", ""),
        }),
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
              login: getValues().phone,
              firm_id,
              dispatcher_type:[`first_dispatcher`],
              role_id: "785678f2-fae7-4a00-8766-99ea67d3784f",
              client_type_id: "2ae57983-f68f-487a-b76c-c7166c35dbba",
            },
          });
        } else {
          setOpen(true);
        }
      },
    });

  const { mutate: updateDsate, isLoading } = useUpdateUser({
    onSuccess: (res) => {
      setIsPopupOpen(true);
      // router.push(`/${locale}/dispatcher`);
    },
  });

  const getUserGps = useGetUserGpsByIDData({
    params: {
      data: JSON.stringify({
        // client_type_id: "2ae57983-f68f-487a-b76c-c7166c35dbba",
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
          role_id: "785678f2-fae7-4a00-8766-99ea67d3784f",
          client_type_id: "2ae57983-f68f-487a-b76c-c7166c35dbba",
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
            email: ``,
          },
        },
      });
    }
  };

  const copyFunction = () => {
    setCopied();
    setIsPopupOpen(false);
    router.push(`/${locale}/dispatcher`);
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
    isLoading: isLoadingCrate || isLoading || useLoading,
    copyFunction,
    open,
    setOpen,
  };
};
