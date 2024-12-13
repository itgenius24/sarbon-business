"use client";

import {
  useCreateVehicle,
  useGetAddress,
  useGetCarListOnSubmit,
  useGetCarType,
  useGetMeasurement,
  useGetPackage,
  useGetTrailerType,
  useGetUserData,
  useGetUsers,
  useGetVehicle,
  useGetVehicleSingle,
  useUpdateVehicle,
} from "@/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useToast } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { isValidJSON } from "@/utils/isValidJSON";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import { countries } from "@/utils/country";

export const useSearchCargo = () => {
  
  const searchParams = useSearchParams();
  const id = searchParams.get(`id`);
  console.log(`id`, id);

  const fromValue = isValidJSON(searchParams.get("from"))
    ? JSON.parse(searchParams.get("from"))
    : undefined;
  const toValue = isValidJSON(searchParams.get("to"))
    ? JSON.parse(searchParams.get("to"))
    : undefined;
  const date = searchParams.get("date");
  const weight = searchParams.get("weight");
  const volume = searchParams.get("volume");

  const locale = useGetLang();
  const router = useRouter();
  const { t } = useTranslation(locale, "translations");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const adrOptions = [
    { label: 1, value: `ADR 1` },
    { label: 2, value: `ADR 2` },
    { label: 3, value: `ADR 3` },
    { label: 4, value: `ADR 4` },
    { label: 5, value: `ADR 5` },
    { label: 7, value: `ADR 7` },
    { label: 8, value: `ADR 8` },
    { label: 9, value: `ADR 9` },
  ];

  const toast = useToast();

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({});
  const [load, setLoad] = useState({});
  const firm_id = authStore.userData.firm_id;

  useEffect(() => {
    setLoad({
      top: watch(`top`),
      side: watch(`side`),
      back: watch(`back`),
      with_removal: watch(`with_removal`),
    });
  }, [watch(`top`), watch(`side`), watch(`back`), watch(`with_removal`)]);
  const getTrueKeys = (obj) => {
    return Object.keys(obj).filter((key) => obj[key] === true);
  };

  const getCarType = useGetTrailerType();
  const carTypeOptions = getCarType.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));
  const getMeasurement = useGetMeasurement();
  const getPackages = useGetPackage();
  const weightMeasurementOptions = getMeasurement.data?.response
    ?.filter((item) => !item?.base_unit.includes("meter"))
    ?.map((item) => ({ label: item.Symbol, value: item.guid }));

  const packageOptions = getPackages.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));

  const { data: useList } = useGetVehicleSingle({
    params: {
      id,
    },
    querySettings: {
      enabled: Boolean(id),
    },
  });

  

  useEffect(() => {
    if (id) {
      const trilerVal = carTypeOptions?.filter(
        (item) => item?.value === useList?.response?.trailer_type_id
      );
      const adrVal = adrOptions?.filter(
        (item) => item?.value === useList?.response?.adr
      );

      useList?.response?.download_type.forEach((name) => {
        setValue(name, true); // Mark the checkbox with the matching name as true
      });
      console.log(`val2wq`,countries?.filter((item) => item?.car_country === useList?.response?.car_country),useList?.response?.car_country)
      reset({
        ...useList?.response,
        trailer_type_id: trilerVal?.[0],
        adr: adrVal?.[0],
        car_country: countries
          ?.filter(
            (item) => item?.car_country === useList?.response?.car_country
          )
          ?.map((item) => ({ label: item[`name_${locale}`], value: item?.code })),
      });
    }
  }, [useList]);

  const { mutate, isPending } = useCreateVehicle({
    onSuccess: (res) => {
      // reset()
      setIsPopupOpen(true);
      // router.push(`/${locale}/my-cars`);
    },
  });
  const { mutate: updateW, isPending: upisPending } = useUpdateVehicle({
    onSuccess: () => {
      // setIsPopupOpen(true)
      // reset()
      router.push(`/${locale}/my-cars`);
    },
  });


  const onSubmit = (val) => {
    const data = {
      data: {
        trailer_type_id: val.trailer_type_id.value,
        capacity: +val.capacity,
        height: +val.height,
        car_number: val.car_number,
        marka: val.marka,
        cemt: val.cemt, //or false
        tir: val.tir, // or true
        pneumatic: val.pneumatic, //or false
        coupling: val.coupling, // or true
        konika: val.konika, // or false
        adr: val?.adr?.value || ``,
        back_side_trailer: val.back_side_trailer, //url cdn
        front_side_trailer: val.front_side_trailer, //url cdn
        car_photo: val.car_photo, //url cdn
        download_type: getTrueKeys(load),
        status: [`in_active`],
        firm_id,
        car_country: val?.car_country,
        guid: id ? id : undefined,
      },
    };

    if (id) {
      updateW(data);
    } else {
      mutate(data);
    }
  };
  


  return {
    t,
    setValue,
    register,
    watch,
    control,
    reset,
    loading: isPending ? isPending : upisPending,
    errors,
    carTypeOptions,
    weightMeasurementOptions,
    packageOptions,
    setIsPopupOpen,
    isPopupOpen,
    onSubmit,
    handleSubmit,
    adrOptions,
    router,
    locale,
  };
};
