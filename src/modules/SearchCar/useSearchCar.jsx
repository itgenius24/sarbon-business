"use client";

import {
  useGetAddress,
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

export const useSearchCar = () => {

  const searchParams = useSearchParams();


  const fromValue = isValidJSON(searchParams.get("from")) ? JSON.parse(searchParams.get("from")) : undefined;
  const toValue = isValidJSON(searchParams.get("to")) ? JSON.parse(searchParams.get("to")) : undefined;
  const date = searchParams.get("date");
  const weight = searchParams.get("weight");
  const volume = searchParams.get("volume");

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const toast = useToast();

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm({});

  const [startDate, setStartDate] = useState(undefined);
  const [carsArr, setCarsArr] = useState([]);

  const getAddress = useGetAddress();
  const getAddressOptions = getAddress.data?.response?.map((item) => ({
    label: item.name,
    value: item.guid,
    addressId: item.guid,
  }));

  const formatDate = (val) => {
    if (!val) return;
    return format(new Date(val), "dd.MM.yyyy HH:mm");
  };

  const { mutate, isPending } = useGetCarListOnSubmit({
    onSuccess(data) {
      if(data?.response?.length) {
        setCarsArr(data?.response);
      } else {
        setCarsArr([]);
        toast({
          title: t("Не найдено"),
          description: t("К сожалений ничего не найдено"),
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    },
  });

  const onSubmit = (data) => {
    const address_id = data.from?.value;
    const address_id_2 = data.to?.value;
    const capacity = Number(data.weight_measurement);
    const volume = Number(data.volume_measurement);
    const date = formatDate(startDate);
    const params = {
      data: JSON.stringify(
        // {
        //   with_relations: true,
        //   offset: 0,
        //   order: {},
        //   search: "",
        //   limit: 20,
        //   address_id: ["9c8d3e8d-c699-4c8a-a0e2-8889b0f1490d"],
        //   address_id_2: ["c4da468c-7270-4e67-bedc-ce16dc2bac41"],
        //   capacity: 5,
        //   volume: 5,
        //   date: "12.03.2024 00:00",
        // }
        {
          with_relations: true,
          offset: 0,
          order: {},
          search: "",
          limit: 20,
          address_id: [address_id || ""],
          address_id_2: [address_id_2 || ""],
          ...(capacity ? { capacity } : {}),
          ...(volume ? { volume } : {}),
          ...(date ? { date } : {}),
        }
      ),
    };
    mutate(params);
  };

  const getSearchProps =()=> {
    return {
      handleSubmit,
      onSubmit,
      control,
      register,
      watch,
      getAddressOptions,
      errors,
      isPending,

      startDate,
      setStartDate,
    };
  };

  const getCarListProps = () => {
    return { data: carsArr };
  };

  useEffect(() => {
    if(fromValue || toValue || date || weight || volume) {
      reset({
        from: fromValue,
        to: toValue,
        weight_measurement: weight,
        volume_measurement: volume,
      });
      setStartDate(date ? new Date(date) : undefined);

      const capacity = Number(weight);
      const numberVolume = Number(volume);

      const params = {
        data: JSON.stringify(
          {
            with_relations: true,
            offset: 0,
            order: {},
            search: "",
            limit: 20,
            address_id: [fromValue?.value || ""],
            address_id_2: [toValue?.value || ""],
            ...(capacity ? { capacity } : {}),
            ...(numberVolume ? { numberVolume } : {}),
            ...(date ? { date } : {}),
          }
        ),
      };
      mutate(params);
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return {
    getSearchProps,
    getCarListProps,
    t,
  };
};
