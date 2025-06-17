import {
  useCreateActionHistoriesMutation,
  useDeleteCargo,
  useGetOffer,
  useGetUserCargo,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useProps = (orderStatus, t) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(0);
  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const getAllUserCargo = useGetUserCargo(
    {
      limit: 40,
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

  const addPage = () => {
    setLimit((prev) => prev + 40);
  };

  const deleteCargo = useDeleteCargo({
    onSuccess() {
      getAllUserCargo.refetch();
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
    },
  });

  const handleDelete = (id) => {
    deleteCargo.mutate({ id: id?.guid });
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: id?.number_of_order,
        action_time: new Date(),
        role_slug: `customer`,
        action_comment: `delete_cargo`,
        role_id: authStore.userData?.role_id,
        action_type: [`update`],
      },
    });
  };

  return {
    cargoData: getAllUserCargo.data?.response,
    isLoading: getAllUserCargo?.isLoading,
    isFetching: getAllUserCargo?.isFetching,
    addPage,
    handleDelete,
  };
};

export default useProps;
