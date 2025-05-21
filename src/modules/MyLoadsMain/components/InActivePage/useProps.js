import { useGetUserCargo } from "@/services/api";
import authStore from "@/store/auth.store";
import { keepPreviousData, } from "@tanstack/react-query";
import { useState } from "react";

const useProps = (orderStatus, t) => {
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(40);

  const getAllUserCargo = useGetUserCargo(
    {
      limit,
      offset: 0,
      data: JSON.stringify({
        users_id: userId,
        with_relations: true,
        cargo_type: ["cargo"],
        order_status: [orderStatus],
      }),
    },
    {
      placeholderData: keepPreviousData,
      enabled: Boolean(orderStatus === `in_active`),
    }
  );


  return {
    cargoData: getAllUserCargo.data?.response || [],
    isLoading: getAllUserCargo?.isLoading,
    isFetching: getAllUserCargo?.isFetching,
  };
};

export default useProps;
