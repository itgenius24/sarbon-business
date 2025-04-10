import { useCreateActionHistoriesMutation, useGetOffer, useUpdateResponse } from "@/services/api";
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

  const guid = params.get(`guid`) || 0;

  const getOfferCargo = useGetOffer(
    {
      limit,
      offset: 0,
      data: JSON.stringify({
        users_id_2:
          role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" || guid
            ? undefined
            : guid
            ? guid
            : userId,
        users_id_3:
          role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" || guid
            ? guid
              ? guid
              : userId
            : undefined,
        with_relations: true,
        provisions: ["approve_from_driver"],
      }),
    },
    {
      enabled: Boolean(orderStatus),
    }
  );

  const updateResponseMutation = useUpdateResponse({
      onError(res) {
        console.error(res);
      },
    });

      const { mutate: actionCreate } = useCreateActionHistoriesMutation();
    

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
          actionCreate({
            data: {
              user_name: authStore.userData.full_name,
              phone_number: authStore.userData?.phone,
              user_id: authStore.userData.guid,
              increment_id: cargo?.cargo_id_data?.number_of_order,
              action_time: new Date(),
              role_slug: `first_dispatcher`,
              action_comment: `cancel_order`,
              role_id: authStore.userData?.role_id,
              action_type: [`update`],
            },
            
          });
          toast({
            position: "top-right",
            title: "Груз отказан",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          getOfferCargo?.refetch()
        },
      }
    );
  }

  return {
    cargoData: getOfferCargo.data?.response,
    isLoading: getOfferCargo?.isFetching,
    isLoadingCancel: updateResponseMutation?.isLoading,
    
    handleCancel
  };
};

export default useFromDriverProps;
