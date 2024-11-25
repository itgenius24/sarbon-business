"use client";

import {
  useDeleteVehicle,
  useGetAddress,
  useGetCar,
  useGetCarListOnSubmit,
  useGetUserData,
  useGetVehicle,
  useUpdateVehicle,
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

export const useMyCars = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState();
  const [status, setStatus] = useState(false);
  const locale = useGetLang();

  const { t } = useTranslation();

  const toast = useToast();
  const [carId, setCarId] = useState();
  const [userId, setUserId] = useState();
  const [centerModalType, setCenterModalType] = useState(false);

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
  const getVehicle = useGetVehicle(
    {
      data: JSON.stringify({
        firm_id,
        with_relations: true,
        // ...requestBody,
      }),
    },
    { enabled: true }
  );

  const { data: useList } = useGetUserData({
    params: {
      data: JSON.stringify({
        firm_id,
        client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
        with_relations: true,
      }),
    },
    querySettings: {
      onSuccess: (res) => {
        console.log(`res`, res);
      },
    },
  });

  const { mutate } = useUpdateVehicle({
    onSuccess: () => {
      getVehicle.refetch();
      setCenterModalType(false);
      setStatus(true);
      setUserId(null)

    },
  });

  const { mutate: dalete } = useDeleteVehicle({
    onSuccess: () => {
      getVehicle.refetch();
      setCenterModalType(false);
    },
  });

  const handleUpdate = () => {
    const data = {
      data: {
        guid: carId?.guid,
        users_id: userId,
      },
    };
    mutate(data);
  };

  const handleDelete = (id) => {
    const data = {
      id: id,
    };
    dalete(data);
  };
  const handleUpdateId = (id) => {
    const data = {
      data: {
        guid: id,
        users_id: ``,
      },
    };
    mutate(data);
    
  };

  const { mutate: dataMutate } = useGetCar({
    onSuccess: (res) => {
      setData(res?.response);
      setStatus(false);
    },
  });

  useEffect(() => {
    const data = {
      data: {
        object_data: {
          firm_id,
        },
      },
    };
    dataMutate(data);
  }, [status]);



  return {
    data: getVehicle?.data?.response,
    useList: useList?.response,
    dataModal:data,
    setCarId,
    setUserId,
    handleUpdate,
    handleDelete,
    handleUpdateId,
    centerModalType,
    setCenterModalType,
    userId,
    t,
    carId,
  };
};
