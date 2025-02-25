import authStore from "@/store/auth.store";
import {
  useCreateFeedback,
  useCreateLogHistory,
  useDeleteCargo,
  useGetExcelPost,
  useGetNewPred,
  useGetNoteList,
  useGetNotification,
  useGetOffer,
  useGetOfferCount,
  useGetUserCargo,
  usePushNotificationMutation,
  useUpdateNoDriver,
  useUpdateNoteData,
  useUpdateResponse,
} from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import useDebounce from "@/hooks/useDebounce";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
const predlojeniya = "/predlojeniya.mp3";
const predlojeniyauz = "/predlojeniyauz.mp3";
const vispolneniya = "/vispolneniya.mp3";
const vispolneniyauz = "/vispolneniyauz.mp3";
const zavishon = "/zavishon.mp3";
const zavishonuz = "/zavishonuz.mp3";

export const useMyLoadsMainProps = (locale) => {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const role_id = authStore.userData.role_id;
  const orderValStatus = params.get(`value`) || ``;
  const [dataPred, setDataPred] = useState(false);
  const router = useRouter();
  const [accept, setAccept] = useState(false);
  const [orderStatus, setOrderStatus] = useState(orderValStatus);
  const [comments, setComments] = useState([]);
  const { register, watch, setValue } = useForm();
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const pathname = usePathname();
  console.log(`locale`, locale);
  const [data, setData] = useState([]);
  const [dataDis, setDataDis] = useState([]);
  const userId = authStore.userData.id;

  const toast = useToast();
  const { t } = useTranslation();

  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(40);

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
    if(authStore.userData.role_id === `785678f2-fae7-4a00-8766-99ea67d3784f`){
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

  const getNewPred = useGetNewPred({
    onSuccess: (res) => {
      const data = res?.response?.[0]?.order?.map((item) => ({
        ...item,
        users_id_data: item.users_id_data?.[0],
        users_id_2_data: item?.users_id_2_data?.[0],
      }));
      setData(data);
      setAccept(false);
    },
  });

  const getNoDisPred = useGetNewPred({
    onSuccess: (res) => {
      const data = res?.response?.[0]?.order?.map((item) => ({
        ...item,
        users_id_data: item.users_id_data?.[0],
        users_id_2_data: item?.users_id_2_data?.[0],
      }));
      setDataDis(data);
      setAccept(false);
    },
  });

  const { mutate } = useUpdateNoteData();

  const { data: data2, } = useGetNotification({
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
      setData([]);
      getOfferCargo.refetch();
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

  const getAllUserCargoParams = {
    limit,
    offset: 0,
    data: JSON.stringify({
      users_id: userId,
      with_relations: true,
      cargo_type: ["cargo"],
    }),
  };

  const getCargoFilterParams = {
    limit,
    offset: 0,
    data: JSON.stringify({
      // users_id_3: userId,
      users_id_2:
        role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
          ? undefined
          : orderStatus === "new"
          ? undefined
          : userId,
      users_id_3:
        role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" ? userId : undefined,
      with_relations: true,
    }),
  };

  const isCargo =
    !orderStatus ||
    orderStatus === "in_moderation" ||
    orderStatus === `in_active`;

  if (orderStatus === "approve_from_driver") {
    const data = JSON.parse(getCargoFilterParams.data);
    // data.response_status = [orderStatus];
    // data.provisions = ["new"];
    (data.provisions = ["approve_from_driver"]),
      (getCargoFilterParams.data = JSON.stringify(data));
  } else if (
    orderStatus === "performed" ||
    orderStatus === "cancellation" ||
    orderStatus === "archive"
  ) {
    const data = JSON.parse(getCargoFilterParams.data);
    data.provisions = [orderStatus];
    getCargoFilterParams.data = JSON.stringify(data);
  } else if (orderStatus === "in_moderation") {
    const data = JSON.parse(getAllUserCargoParams.data);
    data.order_status = [orderStatus];
    getAllUserCargoParams.data = JSON.stringify(data);
  } else if (orderStatus === "in_active") {
    const data = JSON.parse(getAllUserCargoParams.data);
    data.order_status = [orderStatus];
    getAllUserCargoParams.data = JSON.stringify(data);
  }

  const getAllUserCargo = useGetUserCargo(getAllUserCargoParams, {
    enabled:
      !!userId &&
      (orderStatus === "" ||
        orderStatus === "in_moderation" ||
        orderStatus === "in_active") &&
      hasMore,
    placeholderData: keepPreviousData,
  });

  const getOfferCargo = useGetOffer(getCargoFilterParams, {
    enabled: Boolean(!!userId && !isCargo && hasMore),
    placeholderData: keepPreviousData,
  });

  const notificationFn = (res) => {
    mutate({
      data: {
        views: true,
        guid: res?.response?.[0]?.guid,
      },
    });

    Notification.requestPermission();
    if (res?.response?.[0]?.type === "предложение") {
      if(res?.response?.[0]?.users_id_2){
        getNewPred.mutate({
          data: {
            object_data: {
              dispetchir_id: userId,
            },
          },
        });
      }else{
        getNoDisPred.mutate({
          data: {
            object_data: {
              dispetchir_id: ``,
            },
          },
        });
      }
      const audio = new Audio(locale === `uz` ? predlojeniyauz : predlojeniya);
      audio.play();
      new Notification(res?.response?.[0]?.title, {
        body: res?.response?.[0]?.notification,
        icon: "/custom-icon.png",
        vibrate: [200, 100, 200],
      });
    } else if (res?.response?.[0]?.type === "в исполнении") {
      getOfferCargo.refetch();
      getNewPred.mutate({
        data: {
          object_data: {
            dispetchir_id: userId,
          },
        },
      });
      const audio = new Audio(locale === `uz` ? vispolneniyauz : vispolneniya);
      audio.play();
      new Notification(res?.response?.[0]?.title, {
        body: res?.response?.[0]?.notification,
        icon: "/custom-icon.png",
        vibrate: [200, 100, 200],
      });
    } else if (res?.response?.[0]?.type === "завершенный") {
      getOfferCargo.refetch();
      const audio = new Audio(locale === `uz` ? zavishonuz : zavishon);
      getNewPred.mutate({
        data: {
          object_data: {
            dispetchir_id: userId,
          },
        },
      });
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
    getNewPred.mutate({
      data: {
        object_data: {
          dispetchir_id: userId,
        },
      },
    });
  }, [Boolean(orderStatus === "new"), accept]);

  useEffect(() => {
    getNoDisPred.mutate({
      data: {
        object_data: {
          dispetchir_id: ``,
        },
      },
    });
  }, [Boolean(orderStatus === `no_dispatcher`), accept]);

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

  useEffect(() => {
    getOfferCount.refetch();
    getWaitingDriverCount.refetch();
  }, [accept, orderStatus]);

  const deleteCargo = useDeleteCargo({
    onSuccess() {
      setTimeout(() => {
        if (isCargo) {
          getAllUserCargo.refetch();
        } else {
          getOfferCargo.refetch();
        }
      }, 800);
      toast({
        position: "top-right",
        title: "Груз успешно удален",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError(res) {
      console.error(res);
    },
  });

  const updateNoDriver = useUpdateNoDriver({});

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

  const pushNotification = usePushNotificationMutation();

  function handleCancel(cargo) {
    updateResponseMutation.mutate(
      {
        data: {
          guid: cargo?.guid,
          provisions: ["cancellation"],
          who_cancellation: ["customer"],
          cancel_time: new Date(),
        },
      },
      {
        onSuccess() {
          if (isCargo) {
            getAllUserCargo.refetch();
          } else {
            getOfferCargo.refetch();
          }
          toast({
            position: "top-right",
            title: "Груз отказан",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        },
      }
    );

    if (orderStatus === `no_dispatcher`) {
      updateNoDriver.mutate({
        data: {
          users_id: cargo?.users_id,
          users_id_2: authStore.userData.guid,
          firm_id: authStore.userData.firm_id || ``,
        },
      });
    }
  }

  function handleAccept(id, driverId) {
    pushNotification.mutate({
      data: {
        object_data: {
          guid: driverId,
          responses: id,
        },
      },
    });

    updateResponseMutation.mutate(
      {
        data: {
          guid: id,
          users_id_3: userId,
          approve_time_from_dispatcher: new Date().toISOString(),
          provisions: ["new", "approve_from_driver"],
          // response_status: ["approve_from_driver"],
        },
      },
      {
        onSuccess() {
          if (isCargo) {
            getAllUserCargo.refetch();
          } else {
            getOfferCargo.refetch();
          }
          toast({
            position: "top-right",
            title: "Груз принят",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        },
      }
    );
    if (orderStatus === `no_dispatcher`) {
      updateNoDriver.mutate({
        data: {
          users_id: dataPred?.users_id,
          users_id_2: authStore.userData.guid,
          firm_id: authStore.userData.firm_id || ``,
        },
      });
    }
    setDataPred(false);
  }

  function handleDelete(id) {
    deleteCargo.mutate({ id });
  }

  const cargosData = isCargo ? getAllUserCargo : getOfferCargo;

  function onFilterChange({ label, value }) {
    router.push(`?value=${value}&label=${label}`);
    setOrderStatus(value);
    setLimit(40);
    setHasMore(true);
  }

  const ref = useRef(null);

  const setDebouncedLimit = useDebounce(setLimit, 450);

  function handleLoadMore() {
    setDebouncedLimit((prev) => prev + 40);
  }

  useEffect(() => {
    if (
      cargosData.data?.count &&
      cargosData.data?.count === cargosData.data?.response.length
    ) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [getAllUserCargo.data, getOfferCargo.data]);

  return {
    cargos:
      orderStatus === `new`
        ? data
        : orderStatus === `no_dispatcher`
        ? dataDis
        : cargosData.data?.response,

    isLoading:
      Boolean(
        role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" &&
          getNewPred.isLoading &&
          orderStatus === `new`
      ) || cargosData.isLoading,
    hasMore,
    onFilterChange,
    handleDelete,
    orderStatus,
    handleAccept,
    handleCancel,
    ref,
    handleLoadMore,
    driverCount: data?.length,
    noDataDisCount: dataDis?.length,
    waitingDriverCount: getWaitingDriverCount.data?.count,
    setDataPred,
    dataPred,
    getExcelFileFn,
    isLoadingExe: getExcelFile.isLoading,
    open,
    setOpen,
    goodComment,
    badComment,
    register,
    watch,
    setValue,
    setComments,
    handleCheckboxChange,
    comments,
    selectedRating,
    setSelectedRating,
    hoverRating,
    setHoverRating,
    onSubmit,
    addPage: handleLoadMore,
  };
};
