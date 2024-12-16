"use client";

import { useDeletedeleteDispacersDriver, useGetCar } from "@/services/api";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";

export const useMyCarsDispatcher = () => {
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const disId = authStore.userData?.id;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [refe, setRefe] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [filter1, setFilter1] = useState(false);
  const [isAscending, setIsAscending] = useState(true); // Saralash tartibini saqlash uchun holat

  const addPage = () => {
    setPage(page + 1);
    setLimit(25);
    
  };
  
  const { mutate, isPending } = useGetCar({
    onSuccess: (res) => {
      if (res?.response?.length === limit) {
        addPage();
      }
      if (res?.response?.length) {
        setRefe(false);
        let data = res?.response;
        const uniqueData = data.filter(
          (item) =>
            !oldData.some(
              (stateItem) => stateItem?.user?.users_id === item?.user?.users_id
            )
        );
        const data12 =  res?.response
        setData2((prev) => [...prev, ...data12])
        setData((prev) => [...prev, ...uniqueData]);
        setOldData((prev) => [...prev, ...uniqueData]);
      }
      if (res?.response?.length === null) {
        mutate({
          data: {
            object_data: {
              page,
              limit,
              type: "dispatcher",
              dispatcher_id: disId,
            },
          },
        });
      }
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
  }, [page, limit, refe]);

  const nameFilter = () => {
    setFilter1(!filter1);
    const sortedData = data?.sort(
      (a, b) =>
        isAscending
          ? a?.user?.users_id_data?.full_name.localeCompare(
              b?.user?.users_id_data?.full_name
            ) // Alfavit bo'yicha
          : b?.user?.users_id_data?.full_name.localeCompare(
              a?.user?.users_id_data?.full_name
            ) // Teskari alfavit bo'yicha
    );

    setData(() => [...sortedData]);
    setIsAscending(!isAscending); // Tartibni almashtirish
  };

  const { mutate: deleteUser } = useDeletedeleteDispacersDriver({
    onSuccess: () => {
      setRefe(true);
      setData([]);
      setOldData([])
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
    isPending,
    t,
  };
};
