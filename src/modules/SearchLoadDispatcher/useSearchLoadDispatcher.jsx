"use client";

import { set, useForm } from "react-hook-form";

import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  useCreateAddressMutation,
  useGetCar,
  useGetCarTrackingFilter,
} from "@/services/api";
import { useEffect, useRef, useState } from "react";
import authStore from "@/store/auth.store";
import { isVisibleInViewport } from "@/utils/isVisibleInViewport";
import useDebounce from "@/hooks/useDebounce";
import { useDebounce as useDebounce2 } from "use-debounce";

export const useSearchLoadDispatcher = () => {
  const locale = useGetLang();
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [filter1, setFilter1] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [filter3, setFilter3] = useState(false);
  const [filter4, setFilter4] = useState(false);
  const [filter5, setFilter5] = useState(false);
  const [filter6, setFilter6] = useState(false);
  const [search, setSearch] = useState(``);
  const [debouncedValue] = useDebounce2(search, 500);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(700);
  const [refe, setRefe] = useState(false);
  const containerRef = useRef(null);
  const [ids, setId] = useState([]);

  const { t } = useTranslation(locale, "translations");
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);
  const observerRef = useRef(null);
  const disId = authStore.userData?.id;
  const userData = authStore.userData;
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({});
  const [value, setValueR] = useState(`val1`);

  const negotiableOption = [
    {
      value: `val1`,
      label: t(`Отображать все`) + ` ${data?.length}`,
    },
    // {
    //   value: `val2`,
    //   label: t(`Только свободные (349)`),
    // },
    // {
    //   value: `val3`,
    //   label: t(`Только мои водители (36)`),
    // },
  ];

  const { mutate, isPending } = useGetCar({
    onSuccess: (res) => {
      // if (res?.response === null) {
      //   setPage(page - 1)
      // }
      if (res?.response?.length) {
        setRefe(false);
        const vehicles = [{ trailer_type: t(`Без трейлера`) }];
        const filteredData = res?.response.map((item) => ({
          ...item,
          guid: item[`_id`],
          full_name:item?.full_name?.trim(),
          trailer_type_data:
            item?.vehicle_data?.length > 0
              ? item?.vehicle_data
              : vehicles,
        }));

        const uniqueData = filteredData.filter(
          (item) => !oldData.some((stateItem) => stateItem?.guid === item?.guid)
        );

        setData((prev) => [...prev, ...uniqueData]);
        setOldData((prev) => [...prev, ...uniqueData]);
      }
    },
  });

  useEffect(() => {
    const data = {
      data: {
        object_data: {
          page: debouncedValue?.length > 0 ? 0 : page,
          search: debouncedValue,
          limit: debouncedValue?.length > 0 ? 1000 : limit,
          firm_id: ``,
        },
      },
    };
    mutate(data);
  }, [page, refe, debouncedValue?.length]);

  const setDebouncedLimit = useDebounce(setPage, 250);

  const handleScroll = () => {
    // console.log(`hehht`,document.body.scrollTop,document.body.scrollHeight);
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

  const setSearchFn = (val) => {
    setSearch(val?.replace(/\+/g, ""));
    // if (val?.replace(/\+/g, "")) {
      setData([]);
      setOldData([]);
      setPage(0);
    // }
  };

  //   trackingFilter({
  //     data: {
  //       object_data: {
  //         page,
  //         limit,
  //         dispetchir_id: ``,
  //       },
  //     },
  //   });
  // }, [limit, value === `val2`, refe]);

  // useEffect(() => {
  //   trackingFilter({
  //     data: {
  //       object_data: {
  //         page,
  //         limit,
  //         dispetchir_id: authStore?.userData?.id,
  //       },
  //     },
  //   });
  // }, [limit, value === `val3`, refe]);

  const addPage = () => {
    setPage(page + 1);
    // setLimit(50);
  };

  const [isAscending, setIsAscending] = useState(true); // Saralash tartibini saqlash uchun holat
  const [isAscendingTip, setIsAscendingTip] = useState(true); // Saralash tartibini saqlash uchun holat
  const [isAscendingTime, setIsAscendingTime] = useState(true);
  const [isAscendingDispatcher, setIsAscendingDispatcher] = useState(true);


  const nameFilter = () => {
    setFilter1(prev => !prev); // filter1 ni o'zgartirish
    const sortedData = [...data].sort((a, b) => 
        isAscending
            ? a.full_name.localeCompare(b.full_name) // Alfavit bo'yicha
            : b.full_name.localeCompare(a.full_name) // Teskari alfavit bo'yicha
    );

    setData(sortedData); // To'g'ridan-to'g'ri yangilash
    setIsAscending(prev => !prev); // Tartibni almashtirish
};

console.log(`oldData`,data)

  const nameFilterMawini = () => {
    setFilter2(!filter2);
    const sortedData = data?.sort(
      (a, b) =>
        isAscending
          ? a?.firm_data?.[0]?.full_name.localeCompare(
              b?.firm_data?.[0]?.full_name
            ) // Alfavit bo'yicha
          : b?.firm_data?.[0]?.full_name.localeCompare(
              a?.firm_data?.[0]?.full_name
            ) // Teskari alfavit bo'yicha
    );

    setData(() => [...sortedData]);
    setIsAscending(!isAscending); // Tartibni almashtirish
  };

  const nameFilterMawiniNomer = () => {
    setFilter4(!filter4);
    const sortedData = data?.sort(
      (a, b) =>
        isAscending
          ? a?.vehicle_data?.[0]?.car_number?.localeCompare(
              b?.vehicle_data?.[0]?.car_number
            ) // Alfavit bo'yicha
          : b?.vehicle_data?.[0]?.car_number?.localeCompare(
              a?.vehicle_data?.[0]?.car_number
            ) // Teskari alfavit bo'yicha
    );

    setData(() => [...sortedData]);
    setIsAscending(!isAscending); // Tartibni almashtirish
  };

  const tipFilter = () => {
    setFilter3(!filter3);
    const sortedData = data?.sort(
      (a, b) =>
        isAscendingTip
          ? a?.trailer_type_data?.[0]?.name.localeCompare(
              b?.trailer_type_data?.[0]?.name
            ) // Alfavit bo'yicha
          : b?.trailer_type_data?.[0]?.name.localeCompare(
              a?.trailer_type_data?.[0]?.name
            ) // Teskari alfavit bo'yicha
    );

    setData(() => [...sortedData]);
    setIsAscendingTip(!isAscendingTip); // Tartibni almashtirish
  };

  const timeFilter = () => {
    setFilter5(!filter5);
    const sortedData = data?.sort((a, b) => {
      const timeA = a?.gps_data?.[0]?.update_time
        ? new Date(a.gps_data?.[0].update_time)
        : new Date(0);
      const timeB = b?.gps_data?.[0]?.update_time
        ? new Date(b.gps_data?.[0].update_time)
        : new Date(0);
      return isAscendingTime ? timeA - timeB : timeB - timeA;
    });

    setData(() => [...sortedData]);
    setIsAscendingTime(!isAscendingTime);
  };

  const dispatcherFilter = () => {
    setFilter6(!filter6);
    const sortedData = data?.sort((a, b) => {
      const nameA = a?.dispatcher_full_data?.full_name || "";
      const nameB = b?.dispatcher_full_data?.full_name || "";
      return isAscendingDispatcher
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    setData(() => [...sortedData]);
    setIsAscendingDispatcher(!isAscendingDispatcher);
  };

  const onFilterChange = (e) => {
    const filteredData = oldData.filter((item) => {
      return (
        item?.full_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        (item?.vehicles?.[0]?.car_number || ``)
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item?.phone.includes(e.target.value)
      );
    });
    setData(() => [...filteredData]);
  };

  const { mutate: createUserAdress, isPending: createAdressisPending } =
    useCreateAddressMutation({
      onSuccess: () => {
        setData((prevData) =>
          prevData.map((item) => {
            const processedItem = ids.find((pItem) => pItem.guid === item.guid);
            const data = item;
            if (processedItem) {
               data.dispatcher_full_data = { full_name: userData?.full_name };

              return data;
            }
            return item;
          })
        );
        setId([]);
      },
    });

  const onSubmit = () => {
    createUserAdress({
      data: {
        object_data: {
          type: "dispatcher",
          name: ids?.map((item) => ({
            firm_id: item?.firm_id || ``,
            driver_id: item?.guid,
          })),
          dispatcher_id: disId,
        },
      },
    });
  };



  const handleCheckboxChange = (user) => {
    if (ids?.map((item) => item?.guid).includes(user?.guid)) {
      // Agar id arrayda bo'lsa, uni olib tashlaymiz
      setId((prevIds) => prevIds.filter((item) => item?.guid !== user?.guid));
    } else {
      // Agar id yo'q bo'lsa, uni qo'shamiz
      setId((prevIds) => [...prevIds, user]);
    }
  };

  const onChange = (e) => {
    setValueR(e);
  };

  return {
    t,
    setValue,
    filter1,
    filter2,
    filter3,
    filter4,
    filter5,
    filter6,
    register,
    watch,
    negotiableOption,
    isLargerThan845,
    data: data,
    ids,
    addPage,
    isPending,
    nameFilter,
    nameFilterMawini,
    nameFilterMawiniNomer,
    tipFilter,
    timeFilter,
    dispatcherFilter,
    onFilterChange,
    handleCheckboxChange,
    observerRef,
    showButton,
    onSubmit,
    createAdressisPending,
    onChange,
    value,
    setValueR,
    search,
    setSearchFn,
    containerRef,
  };
};
