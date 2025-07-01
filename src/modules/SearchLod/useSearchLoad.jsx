"use client";

import {
  useCreateLogHistory,
  useGetCargoMap,
  useGetCargoPost,
} from "@/services/api";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import { useDebounce } from "use-debounce";
import { useMediaQuery } from "@chakra-ui/react";
import { is } from "date-fns/locale";

export const useSearchLoad = () => {
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");
  const [openFilter, setOpenFilter] = useState(false);
  const [dataRes, setDataRes] = useState([]);
  const [dataResOld, setDataResOld] = useState([]);
  const [status2, setStatus2] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const firm_id = authStore.userData.firm_id;
  const {
    control,
    watch,
    register,
    formState: { errors },
    setValue,
    formState,
  } = useForm({});

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");



  const {
    data: dataMap,
    isFetching,
    isLoading,
    refetch,
  } = useGetCargoMap({
    data: {
      data: {
        object_data: {
          from: watch(`addressFrom`) || "",
          to: watch(`addressTo`) || "",
          prepayment: watch(`prepayment`) ? true : "",
          spot: watch(`spot`) ? true : "",
          in_spot: watch(`in_spot`) ? true : "",
          vehicle_type_id: watch(`vehicle_type_id`)?.value
            ? [watch(`vehicle_type_id`)?.value]
            : [],
          min_volume: +watch(`min_volume`) || 0,
          max_volume: +watch(`max_volume`) || 1000,
          min_weight: +watch(`min_weight`) || 0,
          max_weight: +watch(`max_weight`) || 1000,
          only_for_me: watch(`only_for_me`) || false,
          firm_id,
          page,
          limit: 50,
        },
      },
    },
    querySettings: {
      enabled: Boolean(isLargerThan845 ? true : false),
      select: (res) => ({
        ...res,
        response: res?.response.sort((a, b) => a.distances - b.distances),
      }),
      onSuccess: (res) => {
        setOpenFilter(false);
        const data = res?.response;
        setTotal(res?.count?.[0]?.totalCount);
        if (status2) {
          setDataRes(data);
          setDataResOld(data);
        } else if (page > 1) {
          setDataRes((res) => [...res, ...data]);
          setDataResOld((res) => [...res, ...data]);
        } else {
          setDataRes(data);
          setDataResOld(data);
        }
        setStatus2(false);
      },
    },
  });

  const { mutate: logHistory } = useCreateLogHistory({});

  useEffect(() => {
    logHistory({
      data: {
        users_id: authStore.userData.guid,
        last_move_time: new Date(),
        menu: `search_cargo`,
      },
    });
  }, []);

  const loadMore = () => {
    if (!isLargerThan845) {
      setPage((prev) => prev + 1);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!isLargerThan845) {
      refetch();
    }
  }, [page]);

  const onSubmit = () => {
    refetch();
  };

  return {
    t,
    setValue,
    control,
    register,
    watch,
    formState,
    openFilter,
    setOpenFilter,
    dataRes,
    setDataResOld,
    dataResOld,
    setDataRes,
    status2,
    setStatus2,
    setPage,
    page,
    isLoadingLo: isFetching,
    onSubmit,
    total,
    loadMore,
  };
};
