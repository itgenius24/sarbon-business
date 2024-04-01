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

  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [cargos, setCargos] = useState([]);

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
    { enabled: !!userId && (orderStatus === "" || orderStatus === "in_moderation") && hasMore }
  );

  const getOfferCargo = useGetOffer(
    getCargoFilterParams,
    {
      enabled: !!userId && !isCargo && hasMore,
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

  function handleLoadMore() {
    setDebouncedLimit(prev => prev + 6);
  }

  const handleScroll = () => {
    if(ref.current) {
      const isVisible = isVisibleInViewport(ref.current);

      if(isVisible) setDebouncedLimit(prev => prev + 6);
    }

  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { capture: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };

  }, []);

  useEffect(() => {
    if(getCargos().data?.length) {

      if(getCargos().data?.length < 6) setHasMore(false);
      else setHasMore(true);

      if(isCargo) setCargos(prev => [...prev, ...getAllUserCargo.data.response]);
      else setCargos(prev => [...prev, ...getOfferCargo.data.response]);
    }
  }, [getCargos().data]);

  useEffect(() => {
    setCargos([]);
    setHasMore(true);
    setOffset(0);
  }, [orderStatus]);

  return {
    cargos,
    isLoading: getCargos().isLoading,
    hasMore,
    onFilterChange,
    handleDelete,
    orderStatus,
    handleAccept,
    handleCancel,
    ref,
    handleLoadMore,
  };
};
