"use client";

import { set, useForm } from "react-hook-form";

import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCreateAddressMutation, useGetCar } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import authStore from "@/store/auth.store";

export const useSearchLoadDispatcher = () => {
  const locale = useGetLang();
  const [data, setData] = useState([]);
  const [filter1, setFilter1] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [oldData, setOldData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [refe, setRefe] = useState();

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

  const { mutate, isPending } = useGetCar({
    onSuccess: (res) => {
      setRefe(false);
      const vehicles = [{ trailer_type_id_data: { name: `Без трейлера` } }];

      const filteredData = res?.response.map((item) => ({
        ...item,
        vehicles: item?.vehicles ? item?.vehicles : vehicles,
      }));

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
  }, [limit, refe]);

  const addPage = () => {
    setPage(page + 1);
    setLimit(limit + 50);
  };

  const [isAscending, setIsAscending] = useState(true); // Saralash tartibini saqlash uchun holat
  const [isAscendingTip, setIsAscendingTip] = useState(true); // Saralash tartibini saqlash uchun holat

  const nameFilter = () => {
    setFilter1(!filter1);
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
    setFilter2(!filter2);

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
    console.log(`e.target.value`, e.target.value)
    const filteredData = oldData.filter((item) => {
      return (
        item?.user?.full_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
        ||
        (item?.vehicles?.[0]?.car_number || ``)
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item?.user?.phone.includes(e.target.value)
      );
    });
    setData(() => [...filteredData]);
  };

  const { mutate: createUserAdress, isPending: createAdressisPending } =
    useCreateAddressMutation({
      onSuccess: () => {
        // setOldData([]);
        // setData([]);
        // setPage(1);
        // setLimit(25);
        // Group items by guid and add dispatcher

        setData(prevData => prevData.map(item => {
          const processedItem = ids.find(pItem => pItem.guid === item.user?.guid);
          const data = item;
          if (processedItem) {
            data.dispatcher = [{
              users_id_2_data: {
                full_name: userData?.full_name
              }
            }]
            return data;
          }
          return item;
        }));

        // setRefe(true);
        setId([]);
        // setShowButton(false)
        // router.push(`/${locale}/my-cars-dispatcher`);
      },
    });

  const onSubmit = () => {
    createUserAdress({
      data: {
        object_data: {
          type: "dispatcher",
          name: ids?.map((item) => ({
            firm_id: item?.firm_id,
            driver_id: item?.guid,
          })),
          dispatcher_id: disId,
        },
      },
    });
  };

  console.log(`ids`, data);

  const handleCheckboxChange = (user) => {
    if (ids?.map((item) => item?.guid).includes(user?.guid)) {
      // Agar id arrayda bo'lsa, uni olib tashlaymiz
      setId((prevIds) => prevIds.filter((item) => item?.guid !== user?.guid));
    } else {
      // Agar id yo'q bo'lsa, uni qo'shamiz
      setId((prevIds) => [...prevIds, user]);
    }
  };

  return {
    t,
    setValue,
    filter1,
    filter2,
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
    onSubmit,
    createAdressisPending,
  };
};
