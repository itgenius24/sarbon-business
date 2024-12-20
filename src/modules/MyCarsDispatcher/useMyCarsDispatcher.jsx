"use client";

import { useDeletedeleteDispacersDriver, useGetCar } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { useDebounce as useDebounce2 } from "use-debounce";
import useDebounce from "@/hooks/useDebounce";
import { isVisibleInViewport } from "@/utils/isVisibleInViewport";

export const useMyCarsDispatcher = () => {
  const { register, watch } = useForm();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const disId = authStore.userData?.id;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [refe, setRefe] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [filter1, setFilter1] = useState(false);
  const [isAscending, setIsAscending] = useState(true); // Saralash tartibini saqlash uchun holat
  const [search, setSearch] = useState(``);
  const [count, setCount] = useState(0);
  const [debouncedValue] = useDebounce2(search, 500);
  const containerRef = useRef(null);

  const { mutate, isPending } = useGetCar({
    onSuccess: (res) => {
      if (res?.response?.length) {
        setRefe(false);
        setCount(res?.count?.total_count);

        let data = res?.response;
        const uniqueData = data.filter(
          (item) => !oldData.some((stateItem) => stateItem?.users_id === item?.users_id)
        );
        setData((prev) => [...prev, ...uniqueData]); // Yangi ma'lumotlarni data ga qo'shish
        setOldData((prev) => [...prev, ...uniqueData]); // Yangi ma'lumotlarni oldData ga qo'shish
      
      }
    },
  });

 
  useEffect(() => {
    const dataReq = {
      data: {
        object_data: {
          page: debouncedValue?.length > 0 ? 0 : page,
          search: debouncedValue,
          limit: debouncedValue?.length > 0 ? 1000 : limit,
          type: "dispatcher",
          dispatcher_id: disId,
        },
      },
    };

    mutate(dataReq);
  }, [page, limit, debouncedValue?.length, refe]);


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
      setOldData([]);
    },
  });

  const deleteFuntion = (id) => {
    deleteUser({
      id,
    });
  };

  const setSearchFn = (val) => {
    setSearch(val?.replace(/\+/g, ""));
    if (val?.replace(/\+/g, "")) {
      setData([]);
      setOldData([]);
      setPage(0);
    }
  };
  const setDebouncedLimit = useDebounce(setPage, 250);

  const handleScroll = () => {
    if (!isPending) {
      if (containerRef.current) {
        const isVisible = isVisibleInViewport(containerRef.current);

        if (isVisible) {
          setDebouncedLimit((res) => res + 1);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { capture: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    data,
    deleteFuntion,
    nameFilter,
    filter1,
    isPending,
    t,
    register,
    setSearchFn,
    search,
    containerRef,
    count,
  };
};
