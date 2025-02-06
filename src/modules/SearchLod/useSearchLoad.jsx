"use client";

import {
  useGetAddress,
  useGetCargoPost,
  useGetCarListOnSubmit,
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

export const useSearchLoad = () => {
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");
  const [openFilter, setOpenFilter] = useState(false);
  const [dataRes, setDataRes] = useState([]);
  const [dataResOld, setDataResOld] = useState([]);
  const [status2, setStatus2] = useState(false);
  const [page, setPage] = useState(1);
  const [total,setTotal] = useState()
  const firm_id = authStore.userData.firm_id;

  const {
    control,
    watch,
    register,
    formState: { errors },
    setValue,
    formState,
  } = useForm({});

  const { mutate: getCargoPost, isPending: isPendingLo } = useGetCargoPost({
    onSuccess: (res) => {
      const data = res?.response;
      setTotal(res?.count?.[0]?.totalCount)
      if(status2){
        setDataRes(data);
        setDataResOld(data)
      }else if(page > 1){
        setDataRes((res) => [...res,...data])
        setDataResOld((res) => [...res,...data]);
      }else{
        setDataRes(data);
        setDataResOld(data)
      }
      setStatus2(false);
    },
  });

  useEffect(() => {
    const dataCargo = {
      data: {
        object_data: {
          from: watch(`from`) || ``,
          to: watch(`to`) || ``,
          prepayment: watch(`prepayment`) ? `true` : ``,
          spot: watch(`spot`) ? `true` : ``,
          in_spot: watch(`in_spot`) ? `true` : ``,
          vehicle_type_id: watch(`vehicle_type_id`)?.value,
          min_volume: +watch(`min_volume`) || 0,
          max_volume: +watch(`max_volume`) || 0,
          min_weight: +watch(`min_weight`) || 0,
          max_weight: +watch(`max_weight`) || 0,
          only_for_me: watch(`only_for_me`) || 0,
          firm_id,
          page: page,
          limit: 50,
        },
      },
    };
    getCargoPost(dataCargo);
  }, [
    watch(`from`)?.length,
    watch(`to`)?.length,
    watch(`prepayment`),
    watch(`spot`),
    watch(`in_spot`),
    watch(`vehicle_type_id`)?.value,
    watch(`min_volume`),
    watch(`max_volume`),
    watch(`min_weight`),
    watch(`max_weight`),
    watch(`only_for_me`),
    status2,
    page,
    status2,
    page,
  ]);


  const onSubmit = () => {
    const dataCargo = {
      data: {
        object_data: {
          from: watch(`from2`) || ``,
          to: watch(`to2`) || ``,
          prepayment: watch(`prepayment2`) ? `true` : ``,
          spot: watch(`spot2`) ? `true` : ``,
          in_spot: watch(`in_spot2`) ? `true` : ``,
          vehicle_type_id: watch(`vehicle_type_id2`)?.value,
          min_volume: +watch(`min_volume2`) || 0,
          max_volume: +watch(`max_volume2`) || 0,
          min_weight: +watch(`min_weight2`) || 0,
          max_weight: +watch(`max_weight2`) || 0,
          only_for_me: watch(`only_for_me2`) || 0,
          firm_id,
          page: page,
          limit: 50,
        },
      },
    };
    getCargoPost(dataCargo);
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
    isPendingLo,
    onSubmit,
    total
  };
};
