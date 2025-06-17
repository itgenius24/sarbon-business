import {
  useCreateActionHistoriesMutation,
  useDeleteOrder,
  useGetOffer,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const useProps = (orderStatus, t) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(0);
  const [data, setData] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState({});
  const params = useSearchParams();

  const guid = params.get(`guid`) || 0;

  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const getOfferCargo = useGetOffer(
    {
      limit: 40,
      offset: limit,
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
        provisions: [orderStatus],
      }),
    },
    {
      enabled: Boolean(orderStatus),
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const resData = res?.response || [];
        if (limit === 0) {
          setData(resData);
        } else {
          setData([...data, ...resData]);
        }
      },
    }
  );

  const addPage = () => {
    setLimit((prev) => prev + 40);
  };

  const { mutate: deleteOrderData } = useDeleteOrder({
    onSuccess() {
      setLimit(0)
      getOfferCargo.refetch();
      setIsDeletePopupOpen({});
      toast({
        position: "top-right",
        title: "Груз успешно удален",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const onDeleteAccept = () => {
    deleteOrderData({ id: isDeletePopupOpen?.guid });
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: isDeletePopupOpen?.order_number,
        action_time: new Date(),
        role_slug: `ceo`,
        action_comment: `cancel_order`,
        role_id: authStore.userData?.role_id,
        action_type: [`delete`],
      },
    });
  };

  return {
    cargoData: data,
    isLoading: getOfferCargo?.isLoading,
    isFetching: getOfferCargo?.isFetching,
    addPage,
    isDeletePopupOpen,
    setIsDeletePopupOpen,
    onDeleteAccept,
  };
};

export default useProps;
