"use client";

import {
  useDeletedeleteDispacersDriver,
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

export const useMyCarsDispatcher = () => {
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const disId = authStore.userData?.id;
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [refe, setRefe] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [filter1, setFilter1] = useState(false);
  const [isAscending, setIsAscending] = useState(true); // Saralash tartibini saqlash uchun holat

  

  const { mutate, isPending } = useGetCar({
    onSuccess: (res) => {
      setRefe(false);
      // const filteredData = res?.response.filter(
      //   (item) => item.user && item.vehicles
      // );

      const uniqueData = res?.response.filter(
        (item) =>
          !oldData.some(
            (stateItem) => stateItem?.user?.guid === item?.user?.guid
          )
      );

      setData(res?.response);
      // setOldData((prev) => [res?.response]);
      
    },
  });

  useEffect(() => {
    const data = {
      data: {
        object_data: {
          page,
          limit,
          type: "dispatcher",
          dispatcher_id: disId,
        },
      },
    };
    mutate(data);
  }, [limit, refe]);


  const nameFilter = () => {
    setFilter1(!filter1);
    const sortedData = data?.sort(
      (a, b) =>
        isAscending
          ? a?.user?.users_id_data?.full_name.localeCompare(b?.user?.users_id_data?.full_name) // Alfavit bo'yicha
          : b?.user?.users_id_data?.full_name.localeCompare(a?.user?.users_id_data?.full_name) // Teskari alfavit bo'yicha
    );

    setData(() => [...sortedData]);
    setIsAscending(!isAscending); // Tartibni almashtirish
  };


  const { mutate: deleteUser } = useDeletedeleteDispacersDriver({
    onSuccess: () => {
      setRefe(true);
      setData([]);
    },
  });

  const deleteFuntion = (id) => {
    deleteUser({
      id,
    });
  };

  

  return {
    data,
    deleteFuntion,
    nameFilter,
    filter1,
    iSloader:isPending,
    t,
  };
};
