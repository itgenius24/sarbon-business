import { useGetFirmInfo } from "@/services/api";
import { Avatar, Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useProps = () => {
  const [tab, setTabs] = useState(`0`);
  const router = useRouter()
  const params = useSearchParams();
  const guid = params.get(`guid`);
  const vehicles_data_size = params.get(`vehicles_data_size`);
  const driver_size = params.get(`driver_size`);
  const reliabilitiy = params.get(`reliabilitiy`);
  const rev_count = params.get(`rev_count`);
  const time = params.get(`time`);
  const rating = params.get(`rating`);
  const user_type = params.get(`type`);

  const { t } = useTranslation();

  const filterTabs = [
    { value: `0`, label: `Данные ${user_type === `driver` ? `водителя` : `перевозчика`}` },
    { value: `1`, label: `Надёжность` },
  ];

  const { data: firmData } = useGetFirmInfo(guid, {
    enabled: Boolean(guid),
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
    router,
    guid,
    time,
    rating,
    user_type
  };
};
