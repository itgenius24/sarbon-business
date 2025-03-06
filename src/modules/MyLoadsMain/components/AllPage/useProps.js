import { useGetOffer, useGetUserCargo, useGetUserCargoPa } from "@/services/api";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useProps = (orderStatus, t) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(0);
  const [data,setData] = useState([])

  const getAllUserCargo = useGetUserCargoPa(
    {
      limit:40,
      offset: limit,
      data: JSON.stringify({
        users_id: userId,
        with_relations: true,
        cargo_type: ["cargo"],
        // order_status: orderStatus,
      }),
    },
    {
      enabled:Boolean(orderStatus === ``),
      refetchOnWindowFocus:false,
      onSuccess:(res) =>{
        const resData = res?.response || []
        setData([...data,...resData])
      }
    }
  );

  const addPage = () =>{
    setLimit(prev => prev + 40)
  }

  return {
    cargoData: data,
    isLoading: getAllUserCargo?.isLoading,
    isFetching:getAllUserCargo?.isFetching,
    addPage
  };
};

export default useProps;
