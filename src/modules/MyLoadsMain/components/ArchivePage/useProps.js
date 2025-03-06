import { useGetOffer } from "@/services/api";
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


  const getOfferCargo = useGetOffer(
    {
      limit:40,
      offset: limit,
      data: JSON.stringify({
        users_id_2:
          role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
            ? undefined
            : userId,
        users_id_3:
          role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
            ? userId
            : undefined,
        with_relations: true,
        provisions: [orderStatus],
      }),
    },
    {
      enabled:Boolean(orderStatus === `archive`),
      refetchOnWindowFocus:false,
      onSuccess:(res) =>{
        setData([...data,...res?.response])
      }
    }
  );

  const addPage = () => {
    setLimit(prev => prev + 40)
  }


  return {
    cargoData: data,
    isLoading: getOfferCargo?.isLoading,
    isFetching: getOfferCargo?.isFetching,
    addPage
  };
};

export default useProps;
