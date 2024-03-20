import authStore from "@/store/auth.store";
import { useDeleteCargo, useGetOffer, useGetUserCargo, usePushNotificationMutation, useUpdateResponse } from "@/services/api";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const useMyLoadsMainProps = () => {
  const [orderStatus, setOrderStatus] = useState("");

  const userId = authStore.userData.id;

  const toast = useToast();

  const getAllUserCargoParams = {
    data: JSON.stringify({
      users_id: userId,
      with_relations: true,
    })
  };

  const getCargoFilterParams = {
    data: JSON.stringify({
      users_id_3: userId,
      with_relations: true,
    })
  };

  const isCargo = !orderStatus || orderStatus === "in_moderation";

  if(orderStatus === "approve_from_driver") {

    const data = JSON.parse(getCargoFilterParams.data);
    data.response_status = [orderStatus];
    getCargoFilterParams.data = JSON.stringify(data);

  } else if(orderStatus === "performed" || orderStatus === "cancellation" || orderStatus === "archive") {

    const data = JSON.parse(getCargoFilterParams.data);
    data.provisions = [orderStatus];
    getCargoFilterParams.data = JSON.stringify(data);

  } else if(orderStatus === "in_moderation") {

    const data = JSON.parse(getAllUserCargoParams.data);
    data.order_status = [orderStatus, "rejected"];
    getAllUserCargoParams.data = JSON.stringify(data);

  } else if(orderStatus === "new") {

    const data = JSON.parse(getCargoFilterParams.data);
    data.provisions = [orderStatus];
    getCargoFilterParams.data = JSON.stringify(data);

  }

  const getAllUserCargo = useGetUserCargo(
    getAllUserCargoParams,
    { enabled: !!userId && (orderStatus === "" || orderStatus === "in_moderation") }
  );

  const getOfferCargo = useGetOffer(
    getCargoFilterParams,
    { enabled: !!userId && !isCargo, }
  );

  const deleteCargo = useDeleteCargo({
    onSuccess() {
      setTimeout(() => {
        if(isCargo) {
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
    }
  });

  const updateResponseMutation = useUpdateResponse({
    onError(res) {
      console.error(res);
    }
  });

  const pushNotification = usePushNotificationMutation();

  function handleCancel(id) {
    updateResponseMutation.mutate(
      {
        data:{
          guid: id,
          provisions:["cancellation"]
        }
      },
      {
        onSuccess() {
          if(isCargo) {
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
        }
      }
    );
  }

  function handleAccept(id, driverId) {
    pushNotification.mutate({
      data:{
        object_data:{
          guid: driverId,
          responses: id
        }
      }
    });
    updateResponseMutation.mutate(
      {
        data:{
          guid: id,
          response_status:["approve_from_driver"]
        }
      },
      {
        onSuccess() {
          if(isCargo) {
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
        }
      }
    );
  }

  function handleDelete (id) {
    deleteCargo.mutate({ id });
  }

  function onFilterChange({ value }) {
    setOrderStatus(value);
  }

  function getCargos () {

    if(isCargo) {
      return {
        data: getAllUserCargo.data?.response,
        isLoading: getAllUserCargo.isLoading
      };
    }

    if(!isCargo) {
      return {
        data: getOfferCargo.data?.response,
        isLoading: getOfferCargo.isLoading
      };
    }

    return {
      data: [],
      isLoading: false
    };

  }

  return {
    cargos: getCargos().data,
    isLoading: getCargos().isLoading,
    onFilterChange,
    handleDelete,
    orderStatus,
    handleAccept,
    handleCancel,
  };
};
