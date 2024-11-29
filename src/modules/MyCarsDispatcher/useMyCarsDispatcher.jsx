"use client";

import {
  useDeletedeleteDispacersDriver,
  useDeleteVehicle,
  useGetAddress,
  useGetCar,
  useGetCarListOnSubmit,
  useGetUserData,
  useGetVehicle,
  useUpdateVehicle,
} from "@/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useToast } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { isValidJSON } from "@/utils/isValidJSON";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";

export const useMyCarsDispatcher = () => {
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const disId = authStore.userData?.id;
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [refe, setRefe] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const { mutate, isPending } = useGetCar({
    onSuccess: (res) => {
      // const filteredData = res?.response.filter(
      //   (item) => item.user && item.vehicles
      // );

      const uniqueData = res?.response.filter(
        (item) =>
          !oldData.some(
            (stateItem) => stateItem?.user?.guid === item?.user?.guid
          )
      );

      setData(res?.response);
      // setOldData((prev) => [res?.response]);
      setRefe(false);
    },
  });

  useEffect(() => {
    const data = {
      data: {
        object_data: {
          page,
          limit,
          type: "dispatcher",
          dispatcher_id: disId,
        },
      },
    };
    mutate(data);
  }, [limit, refe]);

  const { mutate: deleteUser } = useDeletedeleteDispacersDriver({
    onSuccess: () => {
      setRefe(true);
    },
  });

  const deleteFuntion = (id) => {
    deleteUser({
      id,
    });
  };

  return {
    data,
    deleteFuntion,
    t,
  };
};
