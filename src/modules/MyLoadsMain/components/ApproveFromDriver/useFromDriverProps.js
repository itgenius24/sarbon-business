import { useGetOffer } from "@/services/api";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const useFromDriverProps = (orderStatus, t) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(40);
    const params = useSearchParams();
  
  const guid =  params.get(`guid`) || 0;


  const getOfferCargo = useGetOffer(
    {
      limit,
      offset: 0,
      data: JSON.stringify({
        users_id_2:
           role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" || guid
            ? undefined
            : guid ? guid:  userId,
        users_id_3:
           role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" || guid
            ? guid ? guid:  userId
            : undefined,
        with_relations: true,
        provisions: ["approve_from_driver"],
      }),
    },
    {
      enabled: Boolean(orderStatus),
    }
  );

  return {
    cargoData: getOfferCargo.data?.response,
    isLoading: getOfferCargo?.isFetching,
  };
};

export default useFromDriverProps;
