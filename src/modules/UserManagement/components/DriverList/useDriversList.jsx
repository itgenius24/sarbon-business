"use client";

import { useGetLang } from "@/hooks/useGetLang";
import {
  useCreateActionHistoriesMutation,
  useDeleteUsers,
  useGetCar,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export const useDriversList = () => {
  const locale = useGetLang();
  const [data, setData] = useState();
  const [status, setStatus] = useState(false);
  const params = useSearchParams();
  const guid = params.get(`guid`);
  const { t } = useTranslation(locale, "translations");

  const firm_id = authStore.userData.firm_id;
  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const { mutate, isLoading } = useGetCar({
    onSuccess: (res) => {
       const response = res?.response;

      if (!Array.isArray(response)) return;
      const grouped = {};

      response.forEach((item) => {
        const guid = item?.guid;

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

  console.log(`data`,data)

  useEffect(() => {
    const data = {
      data: {
        object_data: {
          firm_id:guid,
        },
      },
    };
    mutate(data);
  }, [status]);

  const { mutate: dalete } = useDeleteUsers({
    onSuccess: () => {
      setStatus(true);
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: authStore.userData.your_id,
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
