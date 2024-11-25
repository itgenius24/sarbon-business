"use client";

import { useForm } from "react-hook-form";

import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useGetCar } from "@/services/api";
import { useEffect, useRef, useState } from "react";

export const useSearchLoadDispatcher = () => {
  const locale = useGetLang();
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const [ids, setId] = useState([]);

  const { t } = useTranslation(locale, "translations");
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);
  const observerRef = useRef(null);

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

  const negotiableOption = [
    {
      value: `val1`,
      label: t(`Отображать все (682)`),
    },
    {
      value: `val2`,
      label: t(`Только свободные (349)`),
    },
    {
      value: `val3`,
      label: t(`Только мои водители (36)`),
    },
  ];
  console.log(`showButton`,showButton)



  const { mutate, isPending } = useGetCar({
    onSuccess: (res) => {
      const filteredData = res?.response.filter(
        (item) => item.user && item.vehicles
      );

      const uniqueData = filteredData.filter(
        (item) =>
          !oldData.some(
            (stateItem) => stateItem?.user?.guid === item?.user?.guid
          )
      );

      setData((prev) => [...prev, ...uniqueData]);
      setOldData((prev) => [...prev, ...uniqueData]);
    },
  });

  useEffect(() => {
    const data = {
      data: {
        object_data: {
          page,
          limit,
          firm_id: ``,
        },
      },
    };
    mutate(data);
  }, [limit]);

  const addPage = () => {
    setPage(page + 1);
    setLimit(limit + 25);
  };

  const [isAscending, setIsAscending] = useState(true); // Saralash tartibini saqlash uchun holat
  const [isAscendingTip, setIsAscendingTip] = useState(true); // Saralash tartibini saqlash uchun holat

  const nameFilter = () => {
    const sortedData = data?.sort(
      (a, b) =>
        isAscending
          ? a?.user?.full_name.localeCompare(b?.user?.full_name) // Alfavit bo'yicha
          : b?.user?.full_name.localeCompare(a?.user?.full_name) // Teskari alfavit bo'yicha
    );

    setData(() => [...sortedData]);
    setIsAscending(!isAscending); // Tartibni almashtirish
  };
  const tipFilter = () => {
    const sortedData = data?.sort(
      (a, b) =>
        isAscendingTip
          ? a?.vehicles?.[0]?.trailer_type_id_data?.name.localeCompare(
              b?.vehicles?.[0]?.trailer_type_id_data?.name
            ) // Alfavit bo'yicha
          : b?.vehicles?.[0]?.trailer_type_id_data?.name.localeCompare(
              a?.vehicles?.[0]?.trailer_type_id_data?.name
            ) // Teskari alfavit bo'yicha
    );

    setData(() => [...sortedData]);
    setIsAscendingTip(!isAscendingTip); // Tartibni almashtirish
  };

  const onFilterChange = (e) => {
    const filteredData = oldData.filter((item) => {
      return (
        item?.user?.full_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item?.vehicles?.[0]?.car_number
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item?.user?.phone.includes(e.target.value)
      );
    });
    setData(() => [...filteredData]);
  };

  const handleCheckboxChange = (id) => {
    if (ids.includes(id)) {
      // Agar id arrayda bo'lsa, uni olib tashlaymiz
      setId((prevIds) => prevIds.filter((item) => item !== id));
    } else {
      // Agar id yo'q bo'lsa, uni qo'shamiz
      setId((prevIds) => [...prevIds, id]);
    }
  };

  return {
    t,
    setValue,
    register,
    watch,
    negotiableOption,
    isLargerThan845,
    data,
    ids,
    addPage,
    isPending,
    nameFilter,
    tipFilter,
    onFilterChange,
    handleCheckboxChange,
    observerRef,
    showButton,
  };
};
