import authStore from "@/store/auth.store";
import { useGetUserCargo } from "@/services/api";
import { useState } from "react";

export const useMyLoadsMainProps = () => {
  const [orderStatus, setOrderStatus] = useState("");

  const params = {
    data: JSON.stringify({
      user_id: authStore.userData.id,
      with_relations: true,
    })
  };

  if(orderStatus) {
    const data = JSON.parse(params.data);
    data.order_status = [orderStatus];
    params.data = JSON.stringify(data);
  }

  const getAllUserCargo = useGetUserCargo(params);

  function onFilterChange({ value }) {
    setOrderStatus(value);
  }

  return {
    allCargo: getAllUserCargo.data?.response,
    isLoading: getAllUserCargo.isLoading,
    onFilterChange,
  };
};
