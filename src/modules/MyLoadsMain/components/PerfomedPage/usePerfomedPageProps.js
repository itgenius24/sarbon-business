import {
  useCreateActionHistoriesMutation,
  useGetOfferTab,
  useUpdateCargo,
  useUpdateResponse,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const usePerfomedPageProps = (orderStatus, t) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(0);
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [reason, setReason] = useState(``);
  const [dataPred, setDataPred] = useState({});
  const params = useSearchParams();
  const [error, setError] = useState(false);
  const { onClose, onOpen, isOpen } = useDisclosure();

  const guid = params.get(`guid`) || 0;

  const getOfferCargo = useGetOfferTab(
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
      enabled: Boolean(orderStatus === `performed`),
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const resData = res?.response || [];
        setData([...data, ...resData]);
      },
    }
  );

  const addPage = () => {
    setLimit((prev) => prev + 40);
  };

  const updateResponseMutation = useUpdateResponse({
    onError(res) {
      console.error(res);
    },
  });
  const updateCargoData = useUpdateCargo({});

  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  function handleCancel() {
    onClose();
    if (reason.length > 0) {
      updateResponseMutation.mutate(
        {
          data: {
            guid: dataPred?.guid,
            provisions: ["cancellation"],
            who_cancellation: ["customer"],
            cancel_time: new Date(),
            reason: reason,
          },
        },
        {
          onSuccess() {
            setReason(``);
            setDisabled(false);
            if (role_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469") {
              actionCreate({
                data: {
                  user_name: authStore.userData.full_name,
                  phone_number: authStore.userData?.phone,
                  user_id: authStore.userData.guid,
                  increment_id: dataPred?.cargo_id_data?.number_of_order,
                  action_time: new Date(),
                  role_slug: `ceo`,
                  action_comment: `cancel_order`,
                  role_id: authStore.userData?.role_id,
                  reason: reason,
                  action_type: [`update`],
                },
              });
            } else if (role_id === "785678f2-fae7-4a00-8766-99ea67d3784f") {
                actionCreate({
                data: {
                  user_name: authStore.userData.full_name,
                  phone_number: authStore.userData?.phone,
                  user_id: authStore.userData.guid,
                  increment_id: dataPred?.cargo_id_data?.number_of_order,
                  action_time: new Date(),
                  role_slug: `first_dispatcher`,
                  action_comment: `cancel_order`,
                  role_id: authStore.userData?.role_id,
                  reason: reason,
                  action_type: [`update`],
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
            setData([]);
            getOfferCargo?.refetch();
            setError(false);
          },
        }
      );
      updateCargoData.mutate({
        data: {
          order_status: ["active"],
          guid: dataPred?.cargo_id_data?.guid,
          accepted_offers: dataPred?.cargo_id_data?.accepted_offers + 1,
        },
      });
    } else {
      setError(true);
    }
  }

  return {
    cargoData: data,
    isLoading: getOfferCargo?.isLoading,
    isFetching: getOfferCargo?.isFetching,
    addPage,
    setDisabled,
    disabled,
    onClose,
    onOpen,
    isOpen,
    handleCancel,
    setReason,
    reason,
    setDataPred,
    error,
  };
};

export default usePerfomedPageProps;
