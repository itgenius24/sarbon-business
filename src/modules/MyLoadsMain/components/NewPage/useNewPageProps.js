import {
  useCreateActionHistoriesMutation,
  useGetNewPredData,
  useGetNewPredData2,
  usePushNotificationMutation,
  useUpdateNoDriver,
  useUpdateNoteData,
  useUpdateResponse,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { Boogaloo } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useNewPageProps = (
  orderStatus,
  t,
  refetchNewPred,
  refetchNoDisPred,
  refetchWaitingDriverCount,
  setNotificationId,
  notificationID
) => {
  const toast = useToast();
  const params = useSearchParams();
  const guid = params.get(`guid`) || 0;
  const userId = authStore.userData.id;
  const [disabled, setDisabled] = useState(false);
  const [comments, setComments] = useState([]);
  const { watch, register } = useForm();
  const [dataPred, setDataPred] = useState(``);
  const [cancelData, setCancelData] = useState({});
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: canCelIsOpen,
    onClose: canCelOnClose,
    onOpen: canCelOnOpen,
  } = useDisclosure();
  const obj = {
    after_payment: t(`Оплата после завершения`),
    prepayment: t(`Предоплата`),
  };

  const { mutate } = useUpdateNoteData({
    onSuccess: () => {
      setNotificationId(``);
    },
  });

  const comment = [
    {
      label: "Груз уже закрыт",
      key: "cargo_closed",
    },
    {
      label: "Предложенная цена нас не устраивает",
      key: "price_not_yet",
    },
    {
      label: "Погрузка аник эмас",
      key: "loading_unclear",
    },
    {
      label: "Ваша машина не подходит по габаритам груза",
      key: "truck_not_fit",
    },
    {
      label: "Свой вариант",
      key: "own_version",
    },
  ];

  const {
    data: newData,
    isFetching,
    refetch,
  } = useGetNewPredData2({
    data: {
      data: {
        object_data: {
          dispetchir_id: orderStatus === `new` ? (guid ? guid : userId) : ``,
          provisions:
            orderStatus === `new` ? ["new", "approve_by_customer"] : undefined,
        },
      },
    },
    querySettings: {
      select: (res) =>
        res?.response?.[0]?.order?.map((item) => ({
          ...item,
          users_id_data: item.users_id_data?.[0],
          users_id_2_data: item?.users_id_2_data?.[0],
        })),
      enabled: Boolean(
        orderStatus === `new` || orderStatus === `no_dispatcher`
      ),
      onSuccess: () => {
        if (notificationID) {
          mutate({
            data: {
              views: true,
              guid: notificationID,
            },
          });
        }
      },
    },
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   mutate({
  //     data: {
  //       views: true,
  //       guid: notificationID,
  //     },
  //   });
  // },[notificationID])

  const handleCheckboxChange = (key) => {
    setComments(
      (prev) =>
        prev.includes(key)
          ? prev.filter((item) => item !== key) // Agar tanlangan bo'lsa olib tashlash
          : [key] // Aks holda qo'shish
    );
  };

  const pushNotification = usePushNotificationMutation({
    onSuccess: () => {
      refetch();
      refetchNewPred();
      refetchNoDisPred();
      refetchWaitingDriverCount.refetch();
      onClose();
    },
  });
  const updateNoDriver = useUpdateNoDriver({
    onSuccess: () => {
      onClose();
    },
  });
  const updateResponseMutation = useUpdateResponse({
    onSuccess: () => {
      refetch();
      refetchNewPred();
      refetchNoDisPred();
      refetchWaitingDriverCount.refetch();
      onClose();
      canCelIsOpen();
    },
    onError(res) {
      console.error(res);
    },
  });

  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

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

    if (orderStatus === `new`) {
      if (authStore.userData.dispatcher_type?.[0] === `top_dispatcher`) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: dataPred?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `top_dispatcher`,
            action_comment: `accept_order`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      } else if (
        authStore.userData.dispatcher_type?.[0] === `first_dispatcher`
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: dataPred?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `first_dispatcher`,
            action_comment: `accept_order`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      }
    }

    if (orderStatus === `no_dispatcher`) {
      updateNoDriver.mutate({
        data: {
          users_id: dataPred?.users_id,
          users_id_2: authStore.userData.guid,
          firm_id: authStore.userData.firm_id || ``,
        },
      });
      if (authStore.userData.dispatcher_type?.[0] === `top_dispatcher`) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: dataPred?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `top_dispatcher`,
            action_comment: `accept_order_free_driver`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      } else if (
        authStore.userData.dispatcher_type?.[0] === `first_dispatcher`
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: dataPred?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `first_dispatcher`,
            action_comment: `accept_order_free_driver`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      }
    }
  }

  function handleCancel(cargo) {
    setCancelData(cargo);
    canCelOnOpen();
  }

  const handleCancelButton = () => {
    updateResponseMutation.mutate({
      data: {
        guid: cancelData?.guid,
        provisions: ["cancellation"],
        who_cancellation: ["customer"],
        cancel_time: new Date(),
        cancel_reason:
          comments?.[0] === `own_version` ? undefined : comments?.[0],
        reason: comments?.[0] === `own_version` ? watch(`comment`) : undefined,
      },
    });

    onClose();
    if (orderStatus === `new`) {
      if (authStore.userData.dispatcher_type?.[0] === `top_dispatcher`) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `top_dispatcher`,
            action_comment: `cancel_order`,
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      } else if (
        authStore.userData.dispatcher_type?.[0] === `first_dispatcher`
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `first_dispatcher`,
            action_comment: `cancel_order`,
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      } else if (
        authStore.userData?.role_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469"
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `ceo`,
            action_comment: `cancel_order`,
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      }
    }
    if (orderStatus === `no_dispatcher`) {
      if (authStore.userData.dispatcher_type?.[0] === `top_dispatcher`) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `top_dispatcher`,
            action_comment: `cancel_order_free_driver`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
          },
        });
      } else if (
        authStore.userData.dispatcher_type?.[0] === `first_dispatcher`
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `first_dispatcher`,
            action_comment: `cancel_order_free_driver`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
          },
        });
      } else if (
        authStore.userData?.role_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469"
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `ceo`,
            action_comment: `cancel_order_free_driver`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
          },
        });
      }
    }
    toast({
      position: "top-right",
      title: "Груз отказан",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setComments([]);
    canCelOnClose();

    if (orderStatus === `no_dispatcher`) {
      updateNoDriver.mutate({
        data: {
          users_id: cancelData?.users_id,
          users_id_2: authStore.userData.guid,
          firm_id: authStore.userData.firm_id || ``,
        },
      });
    }
  };

  return {
    newData: newData || [],
    isLoading: isFetching,
    comments,
    setComments,
    setDataPred,
    handleAccept,
    handleCancel,
    handleCancelButton,
    dataPred,
    onClose,
    disabled,
    setDisabled,
    disabledBtn: updateResponseMutation.isLoading,
    obj,
    onOpen,
    isOpen,
    canCelIsOpen,
    canCelOnClose,
    canCelOnOpen,
    comment,
    handleCheckboxChange,
    watch,
    register,
  };
};

export default useNewPageProps;
