import {
  useCreateActionHistoriesMutation,
  useGetOffer,
  useUpdateResponse,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useFromDriverProps = (orderStatus, t) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(40);
  const params = useSearchParams();
  const [comments, setComments] = useState([]);
  const [cancelData, setCancelData] = useState({});

  const { watch, register } = useForm();
  const {
    isOpen: canCelIsOpen,
    onClose: canCelOnClose,
    onOpen: canCelOnOpen,
  } = useDisclosure();

  const guid = params.get(`guid`) || 0;

  const comment = [
    {
      label: "Груз уже закрыт",
      key: "cargo_closed",
    },
    {
      label: "Предложенная цена нас не устраивает",
      key: "price_not_yet",
    },
    {
      label: "Погрузка аник эмас",
      key: "loading_unclear",
    },
    {
      label: "Ваша машина не подходит по габаритам груза",
      key: "truck_not_fit",
    },
    {
      label: "Свой вариант",
      key: "own_version",
    },
  ];
  const handleCheckboxChange = (key) => {
    setComments(
      (prev) =>
        prev.includes(key)
          ? prev.filter((item) => item !== key) // Agar tanlangan bo'lsa olib tashlash
          : [key] // Aks holda qo'shish
    );
  };

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
      enabled: Boolean(orderStatus === `approve_from_driver`),
      refetchOnWindowFocus: false,
    }
  );

  const updateResponseMutation = useUpdateResponse({
    onSuccess: (res) => {
      getOfferCargo?.refetch();
    },
    onError(res) {
      console.error(res);
    },
  });

  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const handleCancelButton = () => {
    updateResponseMutation.mutate({
      data: {
        guid: cancelData?.guid,
        provisions: ["cancellation"],
        who_cancellation: ["customer"],
        cancel_time: new Date(),
        cancel_reason:
          comments?.[0] === `own_version` ? undefined : comments?.[0],
        reason: comments?.[0] === `own_version` ? watch(`comment`) : undefined,
      },
    });
    if (role_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469") {
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: cancelData?.cargo_id_data?.number_of_order,
          action_time: new Date(),
          role_slug: `ceo`,
          action_comment: `cancel_order`,
          role_id: authStore.userData?.role_id,
          action_type: [`update`],
          cancel_reason:
            comments?.[0] === `own_version` ? undefined : comments?.[0],
          reason:
            comments?.[0] === `own_version` ? watch(`comment`) : undefined,
        },
      });
    } else if (role_id === "785678f2-fae7-4a00-8766-99ea67d3784f") {
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: cancelData?.cargo_id_data?.number_of_order,
          action_time: new Date(),
          role_slug: `first_dispatcher`,
          action_comment: `cancel_order`,
          role_id: authStore.userData?.role_id,
          action_type: [`update`],
          cancel_reason:
            comments?.[0] === `own_version` ? undefined : comments?.[0],
          reason:
            comments?.[0] === `own_version` ? watch(`comment`) : undefined,
        },
      });
    }

    toast({
      position: "top-right",
      title: "Груз отказан",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  function handleCancel(cargo) {
    setCancelData(cargo);
    canCelOnOpen();
  }

  return {
    cargoData: getOfferCargo.data?.response,
    isLoading: getOfferCargo?.isFetching,
    isLoadingCancel: updateResponseMutation?.isLoading,
    handleCancel,
    canCelIsOpen,
    canCelOnClose,
    canCelOnOpen,
    comment,
    handleCheckboxChange,
    watch,
    register,
    comments,
    handleCancelButton,
  };
};

export default useFromDriverProps;
