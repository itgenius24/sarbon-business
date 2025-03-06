import { useGetOffer, useGetOfferTab } from "@/services/api";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const usePerfomedPageProps = (orderStatus, t) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(0);
  const [data,setData] = useState([])
    const params = useSearchParams();
  
  const guid =  params.get(`guid`) || 0;



  const getOfferCargo = useGetOfferTab(
    {
      limit:40,
      offset: limit,
      data: JSON.stringify({
        users_id_2:
           role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" || guid
            ? undefined
            : guid ? guid : userId,
        users_id_3:
           role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" || guid
            ? guid ? guid : userId
            : undefined,
        with_relations: true,
        provisions: [orderStatus],
        
      }),
    },
    {
      enabled: Boolean(orderStatus === `performed`),
      refetchOnWindowFocus:false,
      onSuccess:(res) =>{
        const resData = res?.response || []
        setData([...data,...resData])
      }
    }
  );

  const addPage = () => {
    setLimit(prev => prev + 40)
  }

  console.log(`data`,data)

  return {
    cargoData: data,
    isLoading: getOfferCargo?.isLoading,
    isFetching: getOfferCargo?.isFetching,
    addPage
  };
};

export default usePerfomedPageProps;
