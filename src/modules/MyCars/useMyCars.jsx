"use client";

import {
  useCreateActionHistoriesMutation,
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
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
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
  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

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
      setUserId(null);
    },
  });

  const { mutate: dalete } = useDeleteVehicle({
    onSuccess: () => {
      getVehicle.refetch();
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: authStore.userData.your_id,
          action_time: new Date(),
          role_slug: `carrier`,
          action_comment: `delete_unit`,
          role_id: authStore.userData?.role_id,
          action_type: [`delete`],
        },
      });
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
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: authStore.userData.your_id,
        action_time: new Date(),
        role_slug: `carrier`,
        action_comment: `delete_driver`,
        role_id: authStore.userData?.role_id,
        action_type: [`update`],
      },
    });
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
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: authStore.userData.your_id,
        action_time: new Date(),
        role_slug: `carrier`,
        action_comment: `edit_driver`,
        role_id: authStore.userData?.role_id,
        action_type: [`update`],
      },
    });
  };

  const { mutate: dataMutate } = useGetCar({
    onSuccess: (res) => {
      const response = res?.response;

      if (!Array.isArray(response)) return;

      // Guruhlash
      const grouped = {};

      response.forEach((item) => {
        const guid = item.driver_gps_data?.guid;

        if (!guid) return;

        if (!grouped[guid]) {
          grouped[guid] = {
            ...item,
            orders: item?.order_data ? [item.order_data] : undefined,
          };
          delete grouped[guid].order_data;
        } else {
          grouped[guid].orders.push(item.order_data);
        }
      });

      const finalResult = Object.values(grouped);
      setData(finalResult);
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

  const filteredData = data?.filter((item) => {
    // Agar checkbox tanlangan bo'lsa, faqat statusi true bo'lgan elementlarni ko'rsatish
    if (isCheckboxChecked) {
      return !item?.vehicle_data;
    }
    // Agar checkbox tanlanmagan bo'lsa, faqat search natijasini ko'rsatish
    return item;
  });

  console.log(`filteredData`, filteredData);

  return {
    data: getVehicle?.data?.response,
    useList: useList?.response,
    dataModal: filteredData,
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
    isCheckboxChecked,
    setIsCheckboxChecked,
  };
};
