import { useGetOffer, useGetUserCargo } from "@/services/api";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useProps = (orderStatus, t) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(40);

  const getAllUserCargo = useGetUserCargo(
    {
      limit:40,
      offset: limit,
      data: JSON.stringify({
        users_id: userId,
        with_relations: true,
        cargo_type: ["cargo"],
        order_status: [orderStatus],
      }),
    },
    {
      placeholderData: keepPreviousData,
    }
  );

  const addPage = () =>{
    setLimit(prev => prev + 40)
  }

  return {
    cargoData: getAllUserCargo.data?.response,
    isLoading: getAllUserCargo?.isLoading,
    isFetching: getAllUserCargo?.isFetching,
    addPage
  };
};

export default useProps;
