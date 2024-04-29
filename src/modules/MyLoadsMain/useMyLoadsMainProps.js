import authStore from "@/store/auth.store";
import { useDeleteCargo, useGetOffer, useGetUserCargo, usePushNotificationMutation, useUpdateResponse } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { isVisibleInViewport } from "@/utils/isVisibleInViewport";
import useDebounce from "@/hooks/useDebounce";
import { keepPreviousData } from "@tanstack/react-query";

export const useMyLoadsMainProps = () => {
  const [orderStatus, setOrderStatus] = useState("");

  const userId = authStore.userData.id;

  const toast = useToast();

  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(6);

  const getAllUserCargoParams = {
    limit,
    offset: 0,
    data: JSON.stringify({
      users_id: userId,
      with_relations: true,
      cargo_type: ["cargo"],
    })
  };

  const getCargoFilterParams = {
    limit,
    offset: 0,
    data: JSON.stringify({
      users_id_3: userId,
      with_relations: true,
    })
  };

  const isCargo = !orderStatus || orderStatus === "in_moderation";

  if(orderStatus === "approve_from_driver") {

    const data = JSON.parse(getCargoFilterParams.data);
    data.response_status = [orderStatus];
    data.provisions = ["new"];
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
    data.response_status = ["approve_by_customer"];
    getCargoFilterParams.data = JSON.stringify(data);

  }

  const getAllUserCargo = useGetUserCargo(
    getAllUserCargoParams,
    {
      enabled: !!userId && (orderStatus === "" || orderStatus === "in_moderation") && hasMore,
      placeholderData: keepPreviousData
    }
  );

  const getOfferCargo = useGetOffer(
    getCargoFilterParams,
    {
      enabled: !!userId && !isCargo && hasMore,
      placeholderData: keepPreviousData
    }
  );

  const getOfferCount = useGetOffer(
    {
      limit,
      offset: 0,
      data: JSON.stringify({
        users_id_3: userId,
        with_relations: true,
        provisions: ["new"],
        response_status: ["approve_by_customer"]
      })
    },
    { enabled: false, }
  );

  const getWaitingDriverCount = useGetOffer(
    {
      limit,
      offset: 0,
      data: JSON.stringify({
        users_id_3: userId,
        with_relations: true,
        response_status: ["approve_from_driver"],
        provisions: ["new"],
      })
    },
    { enabled: false, }
  );

  useEffect(() => {
    getOfferCount.refetch();
    getWaitingDriverCount.refetch();
  }, []);

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

  const cargosData = isCargo ? getAllUserCargo : getOfferCargo;

  function onFilterChange({ value }) {
    setOrderStatus(value);
    setLimit(6);
    setHasMore(true);
  }

  const ref = useRef(null);

  const setDebouncedLimit = useDebounce(setLimit, 450);

  function handleLoadMore() {
    setDebouncedLimit(prev => prev + 6);
  }

  const handleScroll = () => {

    if(ref.current) {
      const isVisible = isVisibleInViewport(ref.current);

      if(isVisible && hasMore) {
        setDebouncedLimit(prev => prev + 6);
      }
    }

  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { capture: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };

  }, []);

  useEffect(() => {

    if(cargosData.data?.count && cargosData.data?.count === cargosData.data?.response.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }

  }, [getAllUserCargo.data, getOfferCargo.data]);

  return {
    cargos: cargosData.data?.response,
    isLoading: cargosData.isLoading,
    hasMore,
    onFilterChange,
    handleDelete,
    orderStatus,
    handleAccept,
    handleCancel,
    ref,
    handleLoadMore,
    driverCount: getOfferCount.data?.count,
    waitingDriverCount: getWaitingDriverCount.data?.count,
  };
};
