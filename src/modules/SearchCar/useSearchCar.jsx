"use client";

import {
  useGetAddress,
  useGetCarListOnSubmit,
  useGetMeasurement,
} from "@/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useToast } from "@chakra-ui/react";

export const useSearchCar = () => {
  const toast = useToast();
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm({});

  const [startDate, setStartDate] = useState(undefined);
  const [carsArr, setCarsArr] = useState([]);

  const getAddress = useGetAddress();
  const getAddressOptions = getAddress.data?.response?.map((item) => ({
    label: item.name,
    value: item.guid,
    addressId: item.guid,
  }));

  const getMeasurement = useGetMeasurement({});
  const weightMeasurementOptions = getMeasurement.data?.response
    ?.filter((item) => !item?.base_unit.includes("meter"))
    ?.map((item) => ({ label: item.Symbol, value: item.guid }));

  const volumeMeasurementOptions = getMeasurement.data?.response
    ?.filter((item) => item?.base_unit.includes("meter"))
    ?.map((item) => ({ label: item.Symbol, value: item.guid }));

  useEffect(() => {
    if (getMeasurement.isSuccess) {
      setValue("weight_unit", weightMeasurementOptions[0]);
      setValue("volume_unit", volumeMeasurementOptions[0]);
    }
  }, [getMeasurement.data]);

  const formatDate = (val) => {
    if (!val) return;
    return format(new Date(val), "dd.MM.yyyy HH:mm");
  };

  const { mutate, isPending } = useGetCarListOnSubmit({
    onSuccess(data) {
      if(data?.response?.length) {
        setCarsArr(data?.response);
      } else {
        toast({
          title: "Не найдено",
          description: "К сожалений ничего не найдено",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    },
  });

  const onSubmit = (data) => {
    const address_id = data.from?.addressId;
    const address_id_2 = data.to?.addressId;
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
      weightMeasurementOptions,
      volumeMeasurementOptions,
    };
  };

  const getCarListProps = () => {
    return { data: carsArr };
  };


  return {
    getSearchProps,
    getCarListProps
  };
};
