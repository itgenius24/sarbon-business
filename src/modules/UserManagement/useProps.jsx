import { useGetFirmInfo, useGetNewPredData } from "@/services/api";
import { Avatar, Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useProps = () => {
  const [tab, setTabs] = useState(`0`);
  const router = useRouter();
  const params = useSearchParams();
  const guid = params.get(`guid`);
  const vehicles_data_size = params.get(`vehicles_data_size`);
  const driver_size = params.get(`driver_size`);
  const reliabilitiy = params.get(`reliabilitiy`);
  const rev_count = params.get(`rev_count`);
  const time = params.get(`time`);
  const rating = params.get(`rating`);
  const user_type = params.get(`type`);
  const user_id = params.get(`user_id`);

  const { t } = useTranslation();

  const filterTabs =
    user_type === `driver`
      ? [
          { value: `0`, label: `Данные  водителя` },
          { value: `1`, label: `Надёжность` },
        ]
      : [
          { value: `0`, label: `Данные перевозчика` },
          // { value: `1`, label: `Водители` },
          // { value: `2`, label: `Машины` },
          { value: `1`, label: `Надёжность` },
        ];

  const { data: firmData } = useGetFirmInfo(guid, {
    enabled: Boolean(guid && tab === `0`),
  });

  const { data: userData, refetch } = useGetNewPredData({
    data: {
      data: {
        object_data: {
          driver_id: user_id,
          type: `reliabilitiy_driver`,
        },
      },
    },
    querySettings: {
      enabled: Boolean(user_id && tab === `0`),
    },
  });

  return {
    t,
    tab,
    setTabs,
    filterTabs,
    vehicles_data_size,
    reliabilitiy,
    rev_count,
    driver_size,
    firmData,
    userData,
    router,
    guid,
    time,
    rating,
    user_type,
  };
};
