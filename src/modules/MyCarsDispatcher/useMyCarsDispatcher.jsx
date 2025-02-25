"use client";

import {
  useCreateLogHistory,
  useDeletedeleteDispacersDriver,
  useGetCar,
  useUpdateUserInfo,
} from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { useDebounce as useDebounce2 } from "use-debounce";
import useDebounce from "@/hooks/useDebounce";
import { isVisibleInViewport } from "@/utils/isVisibleInViewport";
import { CencelMapIcon, CheckBlueIcon, GreenCarIcon, QuestionBlueIcon } from "@/assets/icons/icons";

export const useMyCarsDispatcher = () => {
  const { register, watch } = useForm();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const disId = authStore.userData?.id;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [refe, setRefe] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [filter1, setFilter1] = useState(false);
  const [isAscending, setIsAscending] = useState(true); // Saralash tartibini saqlash uchun holat
  const [search, setSearch] = useState(``);
  const [count, setCount] = useState(0);
  const [debouncedValue] = useDebounce2(search, 500);
  const containerRef = useRef(null);
  const [iconStatus, setIconStatus] = useState(``);
  const [open, setOpen] = useState(false);


   const statusData = [
      {
        id: 1,
        type: "empty",
        icon: GreenCarIcon,
        title: "Свободная",
      },
      {
        id: 2,
        type: "someone_cargo",
        icon: QuestionBlueIcon,
      title:t( "Занята чужим грузом")
      },
      {
        id: 3,
        type: "broke_down",
        icon: CencelMapIcon,
        title:t( "Неисправна")
      },
    ];

  const { mutate: logHistory } = useCreateLogHistory({});

  useEffect(() => {
    logHistory({
      data: {
        users_id: authStore.userData.guid,
        last_move_time: new Date(),
        menu: `my_driver`,
      },
    });
  }, []);

  const { mutate, isLoading } = useGetCar({
    onSuccess: (res) => {
      if (res?.response?.length) {
        setRefe(false);
        setCount({
          count: res?.count?.total_count,
          free_count: res?.FreeCount?.free_count,
        });

        let data = res?.response;
        const uniqueData = data.filter(
          (item) =>
            !oldData.some((stateItem) => stateItem?.users_id === item?.users_id)
        );
        //  if(page > 1){
        const uniqueData2 = data.filter((item) =>
          oldData.some((stateItem) => stateItem?.users_id === item?.users_id)
        );
        setData2((prev) => [...prev, ...uniqueData2]);

        //  }
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

  const addPage = () => {
    setPage((pa) => pa + 1);
  };

  const nameFilter = () => {
    setFilter1(!filter1);
    const sortedData = data?.sort(
      (a, b) =>
        isAscending
          ? a?.driver_data?.[0]?.full_name.localeCompare(
              b?.driver_data?.[0]?.full_name
            ) // Alfavit bo'yicha
          : b?.driver_data?.[0]?.full_name.localeCompare(
              a?.driver_data?.[0]?.full_name
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
    console.log(`deleteFuntion`, id);
    deleteUser({
      id,
    });
  };

  const { mutate: userUpdate } = useUpdateUserInfo({
      onSuccess() {
        setRefe(true);
        setData([]);
        setOldData([]);
        setOpen(false);
  
      },
      onError() {},
    });
  
console.log(open)
  const statusIconChange = () =>{

    const body = {
      guid: open.driver_data?.guid,
      provisions: [iconStatus],
    };
    userUpdate({ data: body });
  }

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
    if (!isLoading) {
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
    isLoading,
    t,
    register,
    setSearchFn,
    search,
    count,
    addPage,
    statusData,
    iconStatus, setIconStatus,
    open, setOpen,
    statusIconChange
  };
};
