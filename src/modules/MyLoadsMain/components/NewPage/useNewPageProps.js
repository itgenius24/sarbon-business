import {
  useGetNewPredData,
  useGetNewPredData2,
  usePushNotificationMutation,
  useUpdateNoDriver,
  useUpdateResponse,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { Boogaloo } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const useNewPageProps = (
  orderStatus,
  t,
  refetchNewPred,
  refetchNoDisPred,
  refetchWaitingDriverCount
) => {
  const toast = useToast();
  const params = useSearchParams();

  const guid = params.get(`guid`) || 0;
  const userId = authStore.userData.id;
  const [disabled, setDisabled] = useState(false);
  const [dataPred, setDataPred] = useState(``);
  const {isOpen,onClose,onOpen} =  useDisclosure()
  const obj = {
    after_payment: t(`Оплата после завершения`),
    prepayment: t(`Предоплата`),
  };



  const {
    data: newData,
    isFetching,
    refetch,
  } = useGetNewPredData2({
    data: {
      data: {
        object_data: {
          dispetchir_id: orderStatus === `new` ? (guid ? guid : userId) : ``,
          provisions: orderStatus === `new` ? [`new`] : undefined,
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
        enabled :Boolean(orderStatus === `new` || orderStatus === `no_dispatcher`)
    },
    refetchOnWindowFocus: false,
  });

  const pushNotification = usePushNotificationMutation({
    onSuccess: () => {
      refetch();
      refetchNewPred();
      refetchNoDisPred();
      refetchWaitingDriverCount();
      onClose()
    },
  });
  const updateNoDriver = useUpdateNoDriver({
    onSuccess: () => {
      onClose()
    },
  });
  const updateResponseMutation = useUpdateResponse({
    onSuccess: () => {
      refetch();
      refetchNewPred();
      refetchNoDisPred();
      refetchWaitingDriverCount();
      onClose()
    },
    onError(res) {
      console.error(res);
    },
  });

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
    if (orderStatus === `no_dispatcher`) {
      updateNoDriver.mutate({
        data: {
          users_id: dataPred?.users_id,
          users_id_2: authStore.userData.guid,
          firm_id: authStore.userData.firm_id || ``,
        },
      });
    }
  }

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

 
  return {
    newData: newData || [],
    isLoading: isFetching,
    setDataPred,
    handleAccept,
    handleCancel,
    dataPred,
    onClose,
    disabled,
    setDisabled,
    disabledBtn:updateResponseMutation.isLoading,
    obj,
    onOpen,
    isOpen
  };
};

export default useNewPageProps;
