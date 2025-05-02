import authStore from "@/store/auth.store";
import {
  useCreateFeedback,
  useCreateLogHistory,
  useGetExcelPost,
  useGetNewPredData,
  useGetNotification,
  useGetOffer,
  useGetOfferCount,
  useUpdateNoteData,
  useUpdateResponse,
} from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery, useToast } from "@chakra-ui/react";
import useDebounce2 from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { filterTabsDis, filterTabsZ } from "./data";
const predlojeniya = "/predlojeniya.mp3";
const predlojeniyauz = "/predlojeniyauz.mp3";
const vispolneniya = "/vispolneniya.mp3";
const vispolneniyauz = "/vispolneniyauz.mp3";
const zavishon = "/zavishon.mp3";
const zavishonuz = "/zavishonuz.mp3";

export const useMyLoadsMainProps = (locale) => {
  const [open, setOpen] = useState(false);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { t } = useTranslation(locale, "translations");
  const params = useSearchParams();
  const role_id = authStore.userData.role_id;
  const orderValStatus = params.get(`value`) || ``;
  const index = params.get(`index`) || 0;

  const guid = params.get(`guid`) || ``;
  const full_name = params.get(`full_name`) || 0;

  const router = useRouter();
  const [accept, setAccept] = useState(false);
  const [orderStatus, setOrderStatus] = useState(orderValStatus);
  const [comments, setComments] = useState([]);
  const { register, watch, setValue } = useForm();
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const pathname = usePathname();
  const [notificationID,setNotificationId] = useState(``)
  const userId = authStore.userData.id;
  const [results, setResults] = useState([]);
  const [address, setAddress] = useState("");
  const [debouncedValue] = useDebounce(address, 800);

  const query = useQueryClient();

  const toast = useToast();

  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(40);

  const tabButtons =
    role_id === `785678f2-fae7-4a00-8766-99ea67d3784f` || guid
      ? filterTabsDis
      : filterTabsZ;

  const goodComment = [
    {
      label: "Все прошло по плану",
      key: "everything_went_according_to_plan",
    },
    {
      label: "Вовремя получил груз",
      key: "received_the_cargo_on_time",
    },
    {
      label: "Ответственный водитель",
      key: "responsible_driver",
    },
    {
      label: "Неудовлетворительное состояние груза",
      key: "unsatisfactory_cargo_condition",
    },
    {
      label: "Я бы снова работал с этим водителем",
      key: "i_would_work_with_this_driver_again",
    },
  ];

  const badComment = [
    {
      label: "Возникли проблемы с доставкой",
      key: "there_were_problems_with_delivery",
    },
    {
      label: "Задержка достаки",
      key: "delivery_delay",
    },
    {
      label: "Водитель был недоступен для связи",
      key: "the_driver_was_unavailable_for_communication",
    },
    {
      label: "Неудовлетворительное состояние транспорта",
      key: "poor_condition_of_transport",
    },
  ];

  const { mutate: logHistory } = useCreateLogHistory({});

  useEffect(() => {
    if (
      authStore.userData.role_id === `785678f2-fae7-4a00-8766-99ea67d3784f` ||
      authStore.userData.role_id === "48871d27-7361-4f69-8fe4-b54daf270739"
    ) {
      logHistory({
        data: {
          users_id: authStore.userData.guid,
          last_move_time: new Date(),
          menu: `my_cargo`,
        },
      });
    }
  }, []);

  const handleCheckboxChange = (key) => {
    setComments(
      (prev) =>
        prev.includes(key)
          ? prev.filter((item) => item !== key) // Agar tanlangan bo'lsa olib tashlash
          : [...prev, key] // Aks holda qo'shish
    );
  };

  const { mutate } = useUpdateNoteData();

  const { data: data2 } = useGetNotification({
    data: {
      data: {
        object_data: {
          type: `notification`,
          users_id_2: authStore.userData?.guid,
          views: false,
        },
      },
    },
    querySettings: {
      enabled: Boolean(
        authStore.userData?.role_id ===
          "785678f2-fae7-4a00-8766-99ea67d3784f" &&
          pathname.includes(`my-loads`)
      ),
      onSuccess: (res) => {
        if (res.response?.length > 0) {
          notificationFn(res);
        }
      },
      refetchInterval: 10000,
    },
  });

  const updateResponseMutation = useUpdateResponse({
    onSuccess: () => {
      setAccept(true);
    },
    onError(res) {
      console.error(res);
    },
  });

  const createFeedback = useCreateFeedback({
    onSuccess() {
      toast({
        title: t("Ваш отзыв отправлен"),
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setComments([]);
      setSelectedRating(0);
      setHoverRating(0);
      updateResponseMutation.mutate({
        data: {
          guid: open.guid,
          review: true,
        },
      });

      setOpen(null);
    },
  });

  function onSubmit() {
    createFeedback.mutate({
      data: {
        company_id: null,
        grade: selectedRating,
        rewiv: watch(`comment`)?.length > 0 ? watch(`comment`) : ``,
        users_id: open.users_id,
        review_status: comments,
        users_id_2: authStore.userData.id,
        status: ["driver"],
      },
    });
  }

  const { data: getNewPred, refetch: refetchNewPred } = useGetNewPredData({
    data: {
      data: {
        object_data: {
          dispetchir_id: userId,
          provisions: [`new`],
        },
      },
    },
  });

  const { data: getNoDisPred, refetch: refetchNoDisPred } = useGetNewPredData({
    data: {
      data: {
        object_data: {
          dispetchir_id: ``,
        },
      },
    },
  });

  const getOfferCount = useGetOfferCount(
    {
      limit,
      offset: 0,
      data: JSON.stringify({
        users_id_3: userId,
        with_relations: true,
        provisions: ["approve_by_customer"],
      }),
    },
    { enabled: true }
  );

  const getWaitingDriverCount = useGetOffer(
    {
      limit,
      offset: 0,
      data: JSON.stringify({
        users_id_2:
          role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
            ? undefined
            : orderStatus === "new"
            ? undefined
            : userId,
        users_id_3:
          role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
            ? userId
            : undefined,
        with_relations: true,
        // response_status: ["approve_from_driver"],
        provisions: ["approve_from_driver"],
      }),
    },
    { enabled: false }
  );

  const notificationFn = (res) => {
    if (res?.response?.[0]?.users_id_2) {
      mutate({
        data: {
          views: true,
          guid: res?.response?.[0]?.guid,
        },
      });
    } else{
      setNotificationId(res?.response?.[0]?.guid)
    }

    Notification.requestPermission();
    if (res?.response?.[0]?.type === "предложение") {
      if (res?.response?.[0]?.users_id_2) {
        refetchNewPred();
        query.invalidateQueries(["getNewPred2"]);
      } else {
        refetchNoDisPred();
        query.invalidateQueries(["getNewPred2"]);
      }
      getOfferCount.refetch();
      getWaitingDriverCount?.refetch();
      const audio = new Audio(locale === `uz` ? predlojeniyauz : predlojeniya);
      audio.play();
      new Notification(res?.response?.[0]?.title, {
        body: res?.response?.[0]?.notification,
        icon: "/custom-icon.png",
        vibrate: [200, 100, 200],
      });
    } else if (res?.response?.[0]?.type === "в исполнении") {
      getOfferCount.refetch();
      getWaitingDriverCount?.refetch();
      refetchNewPred();
      const audio = new Audio(locale === `uz` ? vispolneniyauz : vispolneniya);
      audio.play();
      new Notification(res?.response?.[0]?.title, {
        body: res?.response?.[0]?.notification,
        icon: "/custom-icon.png",
        vibrate: [200, 100, 200],
      });
    } else if (res?.response?.[0]?.type === "завершенный") {
      getOfferCount.refetch();
      getWaitingDriverCount?.refetch();
      const audio = new Audio(locale === `uz` ? zavishonuz : zavishon);
      refetchNewPred();
      audio.play();
      new Notification(res?.response?.[0]?.title, {
        body: res?.response?.[0]?.notification,
        icon: "/custom-icon.png",
        vibrate: [200, 100, 200],
      });
    }
  };

  useEffect(() => {
    if (role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" && !orderValStatus) {
      // router.push(`?value=new&label=Предложение`);
      setOrderStatus(`new`);
    }
  }, []);

  useEffect(() => {
    getOfferCount.refetch();
    getWaitingDriverCount.refetch();
  }, [accept, orderStatus]);

  const downloadByLanguage = async (url) => {
    try {
      const link = document.createElement("a");
      const res = `https://pub-be0226dfadb94399a1ec5722d30b655b.r2.dev/${url}`;
      link.href = res;
      link.target = "_blank";
      link.download = `Груз`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log(2);
    }
  };

  const getExcelFile = useGetExcelPost({
    onSuccess: (res) => {
      downloadByLanguage(res?.url);
    },
  });

  const getExcelFileFn = () => {
    getExcelFile.mutate({
      data: {
        object_data: {
          customer_id: authStore?.userData?.id,
          type: "customer",
        },
      },
    });
  };

  const hanleAdress = (location, name) => {
    setValue(name, `${location?.GeoObject?.name}`);
    setResults([]);
  };

  const handleGeocode = async () => {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAP_KEY; // Yandex API kalitini bu yerga qo'ying
    const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${debouncedValue}`;
    // const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${debouncedValue}&format=json`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.response) {
        const geoObjects = data.response.GeoObjectCollection.featureMember;
        setResults(geoObjects);
      } else {
        console.log("Manzil topilmadi");
      }
    } catch (error) {
      console.error("Geokodlashda xatolik:", error);
    }
  };

  useEffect(() => {
    if (address && debouncedValue.length >= 3) {
      handleGeocode();
    }
  }, [debouncedValue]);

  function onFilterChange(index) {
    const data = tabButtons[index];
    router.push(
      `?value=${data?.value}&label=${data?.label}&index=${index}${
        guid ? `&guid=${guid}&full_name=${full_name}` : ``
      }`
    );
  }

  const ref = useRef(null);

  const setDebouncedLimit = useDebounce2(setLimit, 450);

  function handleLoadMore() {
    setDebouncedLimit((prev) => prev + 40);
  }

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setSelectedRating(index);
    setComments([]);
  };

  return {
    hasMore,
    onFilterChange,
    driverCount: getNewPred?.response?.[0]?.order?.length,
    noDataDisCount: getNoDisPred?.response?.[0]?.order?.length,
    waitingDriverCount: getWaitingDriverCount.data?.count,
    getExcelFileFn,
    isLoadingExe: getExcelFile.isLoading,
    open,
    setOpen,
    goodComment,
    badComment,
    register,
    watch,
    guid,
    full_name,
    setValue,
    setComments,
    handleCheckboxChange,
    comments,
    hoverRating,
    selectedRating,
    index,
    onSubmit,
    addPage: handleLoadMore,
    results,
    setResults,
    address,
    setAddress,
    hanleAdress,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    isLargerThan768,
    t: t,
    tabButtons,
    router,
    refetchNewPred,
    refetchNoDisPred,
    refetchWaitingDriverCount: getWaitingDriverCount,
    orderStatus,
    setNotificationId,notificationID
  };
};
