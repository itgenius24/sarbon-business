"use client";

import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetVehicle2 } from "@/services/api";
import authStore from "@/store/auth.store";
import { ta } from "date-fns/locale";
import { useState } from "react";

export const useMyCars = () => {
  const locale = useGetLang();
  const [tabIndex, setTabIndex] = useState(0);
  const { t } = useTranslation();

  const { data: vehicle } = useGetVehicle2({
    params: {
      data: JSON.stringify({
        car_position: tabIndex === 0 ? ["moderation"] : ["alive"],
        payment: tabIndex === 2 ? ["paid"] : undefined,
        users_id_3: authStore.userData.guid,
        with_relations: true,
      }),
    },
  });

  console.log(`vehicle`,vehicle)

  const tabCange = (tab) => {
    setTabIndex(tab);
  };

  return {
    t,
    tabCange,
    vehicle:vehicle?.response
  };
};
