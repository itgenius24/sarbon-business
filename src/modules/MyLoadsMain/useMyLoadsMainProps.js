import authStore from "@/store/auth.store";
import { useDeleteCargo, useGetOffer, useGetUserCargo } from "@/services/api";
import { useState } from "react";

export const useMyLoadsMainProps = () => {
  const [orderStatus, setOrderStatus] = useState("");

  const userId = authStore.userData.id;

  const getAllUserCargoParams = {
    data: JSON.stringify({
      user_id: userId,
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
    data.order_status = [orderStatus];
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
    },
    onError(res) {
      console.error(res);
    }
  });

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
  };
};
