"use client";

import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useDeleteVehicle, useGetVehicle2 } from "@/services/api";
import authStore from "@/store/auth.store";
import { ta } from "date-fns/locale";
import { useState } from "react";

export const useMyCars = () => {
  const locale = useGetLang();
  const [tabIndex, setTabIndex] = useState(0);
  const { t } = useTranslation();

  const { data: vehicle,refetch } = useGetVehicle2({
    params: {
      data: JSON.stringify({
        car_position: tabIndex === 0 ? ["moderation"] : ["alive"],
        payment: tabIndex === 2 ? ["paid"] : tabIndex === 1 ? ["unpaid"] : undefined,
        users_id_3: authStore.userData.guid,
        with_relations: true,
      }),
    },
  });



  const tabCange = (tab) => {
    setTabIndex(tab);
  };

  const { mutate: dalete } = useDeleteVehicle({
    onSuccess: () => {
      refetch()
    },
  });

  const handleDelete = (id) => {
    const data = { id: id, };
    dalete(data);
  };

  return {
    t,
    tabCange,
    vehicle:vehicle?.response,
    handleDelete
  };
};
