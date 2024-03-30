import authStore from "@/store/auth.store";
import { useDeleteCargo, useGetOffer, useGetUserCargo, usePushNotificationMutation, useUpdateResponse } from "@/services/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { isVisibleInViewport } from "@/utils/isVisibleInViewport";
import useDebounce from "@/hooks/useDebounce";

export const useMyLoadsMainProps = () => {
  const [orderStatus, setOrderStatus] = useState("");

  const userId = authStore.userData.id;

  const toast = useToast();

  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const getAllUserCargoParams = {
    limit: 6,
    offset,
    data: JSON.stringify({
      users_id: userId,
      with_relations: true,
      cargo_type: ["cargo"],
    })
  };

  const getCargoFilterParams = {
    limit: 6,
    offset,
    data: JSON.stringify({
      users_id_3: userId,
      with_relations: true,
    })
  };

  const isCargo = !orderStatus || orderStatus === "in_moderation";

  if(orderStatus === "approve_from_driver") {

    const data = JSON.parse(getCargoFilterParams.data);
    data.response_status = [orderStatus];
    getCargoFilterParams.data = JSON.stringify(data);

  } else if(orderStatus === "performed" || orderStatus === "cancellation" || orderStatus === "archive") {

    const data = JSON.parse(getCargoFilterParams.data);
    data.provisions = [orderStatus];
    getCargoFilterParams.data = JSON.stringify(data);

  } else if(orderStatus === "in_moderation") {

    const data = JSON.parse(getAllUserCargoParams.data);
    data.order_status = [orderStatus, "rejected"];
    getAllUserCargoParams.data = JSON.stringify(data);

  } else if(orderStatus === "new") {

    const data = JSON.parse(getCargoFilterParams.data);
    data.provisions = [orderStatus];
    getCargoFilterParams.data = JSON.stringify(data);

  }

  const getAllUserCargo = useGetUserCargo(
    getAllUserCargoParams,
    { enabled: !!userId && (orderStatus === "" || orderStatus === "in_moderation"), keepPreviousData: true }
  );

  const getOfferCargo = useGetOffer(
    getCargoFilterParams,
    {
      enabled: !!userId && !isCargo,
      keepPreviousData: true
    }
  );

  const deleteCargo = useDeleteCargo({
    onSuccess() {
      setTimeout(() => {
        if(isCargo) {
          getAllUserCargo.refetch();
        } else {
          getOfferCargo.refetch();
        }
      }, 800);
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
    }
  });

  const updateResponseMutation = useUpdateResponse({
    onError(res) {
      console.error(res);
    }
  });

  const pushNotification = usePushNotificationMutation();

  function handleCancel(id) {
    updateResponseMutation.mutate(
      {
        data:{
          guid: id,
          provisions:["cancellation"]
        }
      },
      {
        onSuccess() {
          if(isCargo) {
            getAllUserCargo.refetch();
          } else {
            getOfferCargo.refetch();
          }
          toast({
            position: "top-right",
            title: "Груз отказан",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      }
    );
  }

  function handleAccept(id, driverId) {
    pushNotification.mutate({
      data:{
        object_data:{
          guid: driverId,
          responses: id
        }
      }
    });
    updateResponseMutation.mutate(
      {
        data:{
          guid: id,
          response_status:["approve_from_driver"]
        }
      },
      {
        onSuccess() {
          if(isCargo) {
            getAllUserCargo.refetch();
          } else {
            getOfferCargo.refetch();
          }
          toast({
            position: "top-right",
            title: "Груз принят",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      }
    );
  }

  function handleDelete (id) {
    deleteCargo.mutate({ id });
  }

  function onFilterChange({ value }) {
    setOrderStatus(value);
  }

  const getCargos = useCallback(() => {
    if(isCargo) {
      return {
        data: getAllUserCargo.data?.response,
        isLoading: getAllUserCargo.isLoading,
        count: getAllUserCargo.data?.count,
      };
    }

    if(!isCargo) {
      return {
        data: getOfferCargo.data?.response,
        isLoading: getOfferCargo.isLoading,
        count: getOfferCargo.data?.count,
      };
    }

    return {
      data: [],
      isLoading: false,
      count: 0,
    };

  }, [getAllUserCargo.data, getOfferCargo.data]);

  const ref = useRef(null);

  const setDebouncedLimit = useDebounce(setOffset, 450);

  const handleScroll = () => {
    let isInViewport = null;

    if(ref.current) isInViewport = isVisibleInViewport(ref.current);
    console.log({ length: getCargos().data });
    if (
      isInViewport && getCargos().data?.length === 6
    ) {
      setDebouncedLimit(prev => prev + 6);
    } else {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   document.addEventListener("scroll", handleScroll, { passive: true, capture: true });

  //   return () => {
  //     document.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // useEffect(() => {

  //   if(getCargos().data <= getCargos().data?.length) {
  //     setHasMore(false);
  //   }

  // }, [getCargos().data]);

  return {
    cargos: isCargo ? getAllUserCargo.data?.response : getOfferCargo.data?.response,
    isLoading: getCargos().isLoading,
    onFilterChange,
    handleDelete,
    orderStatus,
    handleAccept,
    handleCancel,
    isFetching: isLoading,
    ref,
  };
};
