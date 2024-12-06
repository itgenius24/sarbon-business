import authStore from "@/store/auth.store";
import {
  useDeleteCargo,
  useGetNewPred,
  useGetOffer,
  useGetUserCargo,
  usePushNotificationMutation,
  useUpdateResponse,
} from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { isVisibleInViewport } from "@/utils/isVisibleInViewport";
import useDebounce from "@/hooks/useDebounce";
import { keepPreviousData } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { boolean, object } from "yup";

export const useMyLoadsMainProps = () => {
  const params = useSearchParams();
  const role_id = authStore.userData.role_id;
  const orderValStatus = params.get(`value`) || ``;
  const [dataPred, setDataPred] = useState(false);
  const router = useRouter();
  const [accept, setAccept] = useState(false);
  const [orderStatus, setOrderStatus] = useState(
    role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
      ? `new`
      : orderValStatus || ``
  );
  const [data, setData] = useState([]);
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
    }),
  };

  const getCargoFilterParams = {
    limit,
    offset: 0,
    data: JSON.stringify({
      // users_id_3: userId,
      users_id_2:
        role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
          ? undefined
          : orderStatus === "new"
          ? undefined
          : userId,
      users_id_3:
        role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" ? userId : undefined,
      with_relations: true,
    }),
  };

  const isCargo =
    !orderStatus ||
    orderStatus === "in_moderation" ||
    orderStatus === `in_active`;

  if (orderStatus === "approve_from_driver") {
    const data = JSON.parse(getCargoFilterParams.data);
    // data.response_status = [orderStatus];
    // data.provisions = ["new"];
    (data.provisions = ["new", "approve_from_driver"]),
      (getCargoFilterParams.data = JSON.stringify(data));
  } else if (
    orderStatus === "performed" ||
    orderStatus === "cancellation" ||
    orderStatus === "archive"
  ) {
    const data = JSON.parse(getCargoFilterParams.data);
    data.provisions = [orderStatus];
    getCargoFilterParams.data = JSON.stringify(data);
  } else if (orderStatus === "in_moderation") {
    const data = JSON.parse(getAllUserCargoParams.data);
    data.order_status = [orderStatus];
    getAllUserCargoParams.data = JSON.stringify(data);
  } else if (orderStatus === "in_active") {
    const data = JSON.parse(getAllUserCargoParams.data);
    data.order_status = [orderStatus];
    getAllUserCargoParams.data = JSON.stringify(data);
  }
  //  else if (orderStatus === "new") {
  //   const data = JSON.parse(getCargoFilterParams.data);
  //   data.provisions = ["approve_by_customer"];
  //   // data.response_status = ["approve_by_customer"];
  //   getCargoFilterParams.data = JSON.stringify(data);
  // }

  const getAllUserCargo = useGetUserCargo(getAllUserCargoParams, {
    enabled:
      !!userId &&
      (orderStatus === "" ||
        orderStatus === "in_moderation" ||
        orderStatus === "in_active") &&
      hasMore,
    placeholderData: keepPreviousData,
  });

  const getOfferCargo = useGetOffer(getCargoFilterParams, {
    enabled: !!userId && !isCargo && hasMore,
    placeholderData: keepPreviousData,
  });

  const getNewPred = useGetNewPred({
    onSuccess: (res) => {
      
      const data = res?.response?.[0]?.order?.map((item) => ({
        ...item,
        users_id_data: item.users_id_data?.[0],
        users_id_2_data: item?.users_id_2_data?.[0],
      }));
      setData(data);
      setAccept(false);
    },
  });



  useEffect(() => {
    // if (orderStatus === "new") {
    getNewPred.mutate({
      data: {
        object_data: {
          dispetchir_id: userId,
        },
      },
    });
    // }
  }, [Boolean(orderStatus === "new"),accept]);

  const getOfferCount = useGetOffer(
    {
      limit,
      offset: 0,
      data: JSON.stringify({
        users_id_3: userId,
        with_relations: true,
        provisions: ["approve_by_customer"],
      }),
    },
    { enabled: true }
  );

  const getWaitingDriverCount = useGetOffer(
    {
      limit,
      offset: 0,
      data: JSON.stringify({
        users_id_2:
        role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
          ? undefined
          : orderStatus === "new"
          ? undefined
          : userId,
      users_id_3:
        role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" ? userId : undefined,
        with_relations: true,
        // response_status: ["approve_from_driver"],
        provisions: ["new", "approve_from_driver"],
      }),
    },
    { enabled: false }
  );

  console.log(`getWaitingDriverCount`,getWaitingDriverCount)

  useEffect(() => {
    getOfferCount.refetch();
    getWaitingDriverCount.refetch();
  }, []);

  const deleteCargo = useDeleteCargo({
    onSuccess() {
      setTimeout(() => {
        if (isCargo) {
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
    },
  });

  const updateResponseMutation = useUpdateResponse({
    onSuccess: () => {
      setAccept(true);
      setData([])
    },
    onError(res) {
      console.error(res);
    },
  });

  const pushNotification = usePushNotificationMutation();

  function handleCancel(id) {
    updateResponseMutation.mutate(
      {
        data: {
          guid: id,
          provisions: ["cancellation"],
          who_cancellation: ["customer"],
        },
      },
      {
        onSuccess() {
          if (isCargo) {
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
        },
      }
    );
  }

  function handleAccept(id, driverId) {
    pushNotification.mutate({
      data: {
        object_data: {
          guid: driverId,
          responses: id,
        },
      },
    });
    setDataPred(false);
    updateResponseMutation.mutate(
      {
        data: {
          guid: id,
          users_id_3: userId,
          provisions: ["new", "approve_from_driver"],
          // response_status: ["approve_from_driver"],
        },
      },
      {
        onSuccess() {
          if (isCargo) {
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
        },
      }
    );
  }

  function handleDelete(id) {
    deleteCargo.mutate({ id });
  }

  const cargosData = isCargo ? getAllUserCargo : getOfferCargo;

  function onFilterChange({ label, value }) {
    router.push(`?value=${value}&label=${label}`);
    setOrderStatus(value);
    setLimit(6);
    setHasMore(true);
  }

  const ref = useRef(null);

  const setDebouncedLimit = useDebounce(setLimit, 450);

  function handleLoadMore() {
    setDebouncedLimit((prev) => prev + 6);
  }

  const handleScroll = () => {
    console.log(`ref`, ref);
    if (ref.current) {
      const isVisible = isVisibleInViewport(ref.current);

      if (isVisible && hasMore) {
        setDebouncedLimit((prev) => prev + 6);
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
    if (
      cargosData.data?.count &&
      cargosData.data?.count === cargosData.data?.response.length
    ) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [getAllUserCargo.data, getOfferCargo.data]);

  return {
    cargos: orderStatus === `new` ? data : cargosData.data?.response,

    isLoading:
      Boolean(
        role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" &&
          getNewPred.isPending &&
          orderStatus === `new`
      ) || cargosData.isLoading,
    hasMore,
    onFilterChange,
    handleDelete,
    orderStatus,
    handleAccept,
    handleCancel,
    ref,
    handleLoadMore,
    driverCount: data?.length,
    waitingDriverCount: getWaitingDriverCount.data?.count,
    setDataPred,
    dataPred,
  };
};
