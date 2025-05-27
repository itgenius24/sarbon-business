"use client";

import {
  useCreateActionHistoriesMutation,
  useCreateVehicle,
  useGetCarNumber,
  useGetFuelInfo,
  useGetMeasurement,
  useGetNewPred,
  useGetPackage,
  useGetTrailerType,
  useGetVehicleSingle,
  useUpdateResponse,
  useUpdateVehicle,
} from "@/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import { countries } from "@/utils/country";

export const useProps = () => {
  const searchParams = useSearchParams();
  const [inputValue, setinputValue] = useState(``);
  const id = searchParams.get(`id`);
  const driver_id = searchParams.get(`driver_id`);
  const full_name = searchParams.get(`full_name`);
  const phone = searchParams.get(`phone`);

  const guid = searchParams.get(`guid`);
  const firm_idPrams = searchParams.get(`firm_id`);
  const [loadingFront, setLoadingFront] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const locale = useGetLang();
  const router = useRouter();
  const { t } = useTranslation(locale, "translations");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const euroTypeOptions = [
    { label: `${t(`Евро`)}-1`, value: `Евро-1` },
    { label: `${t(`Евро`)}-2`, value: `Евро-2` },
    { label: `${t(`Евро`)}-3`, value: `Евро-3` },
    { label: `${t(`Евро`)}-4`, value: `Евро-4` },
    { label: `${t(`Евро`)}-5`, value: `Евро-5` },
    { label: `${t(`Евро`)}-6`, value: `Евро-6` },
  ];

  const {
    handleSubmit,
    getValues,
    control,
    watch,
    register,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm({});
  const [load, setLoad] = useState({});

  const { data: getCarNumnber } = useGetCarNumber({
    params: {
      data: JSON.stringify({
        offset: 0,
        order: {},
        search: inputValue,
        limit: 1000,
        view_fields: ["car_number"],
      }),
    },
    querySettings: {
      enabled: Boolean(inputValue),
    },
  });

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
  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const { data: useList } = useGetVehicleSingle({
    params: {
      id,
    },
    querySettings: {
      enabled: Boolean(id),
    },
  });

  const { data: fuel } = useGetFuelInfo();

  useEffect(() => {
    if (id) {
      const trilerVal = carTypeOptions?.filter(
        (item) => item?.value === useList?.response?.trailer_type_id
      );

      if (useList?.response?.download_type) {
        useList?.response?.download_type?.forEach((name) => {
          setValue(name, true); // Mark the checkbox with the matching name as true
        });
      }

      reset({
        ...useList?.response,
        trailer_type_id: trilerVal?.[0],
        fuel_id:
          fuel &&
          fuel?.response
            ?.filter((item) => item?.guid === useList?.response?.fuel_id)
            ?.map((item) => ({ label: item?.name, value: item?.guid }))?.[0],
        car_country: countries
          ?.filter((item) => item?.code === useList?.response?.car_country)
          ?.map((item) => ({
            label: item[`name_${locale}`],
            value: item?.code,
          }))?.[0],
        eco_standart: euroTypeOptions
          ?.filter((item) => item?.value === useList?.response?.eco_standart)
          ?.map((item) => ({ label: item?.value, value: item?.value }))?.[0],
      });

      setinputValue(useList?.response?.car_number);
    }
  }, [useList]);

  useEffect(() => {
    if (getCarNumnber?.count === 1) {
      if (useList?.response && useList?.response?.car_number === inputValue) {
        setValue(`car_number`, inputValue, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        setError(`car_number`, {
          message: `Этот номер автомобиля был зарегистрирован ранее!`,
        });
      }
    } else if (
      (getCarNumnber?.count > 1 ||
        getCarNumnber?.count === 0 ||
        !getCarNumnber ||
        id) &&
      inputValue?.length > 0
    ) {
      setValue(`car_number`, inputValue, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [getCarNumnber?.count > 0, inputValue?.length]);

  const updateResponseMutation = useUpdateResponse({
    onSuccess: (res) => {
      setIsPopupOpen(true);
    },
  });

  const { mutate, isLoading } = useCreateVehicle({
    onSuccess: (res) => {
      if (guid) {
        updateResponseMutation.mutate({
          data: {
            car_type: watch(`trailer_type_id`)?.label,
            vehicle_id: res?.guid,
            guid: guid,
          },
        });
      }else{
        setIsPopupOpen(true);
      }

      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: authStore.userData.your_id,
          action_time: new Date(),
          role_slug: `first_dispatcher`,
          action_comment: `create_unit`,
          role_id: authStore.userData?.role_id,
          action_type: [`create`],
        },
      });
    },
  });

  const { mutate: updateW, isLoading: upisLoading } = useUpdateVehicle({
    onSuccess: () => {
      // actionCreate({
      //   data: {
      //     user_name: authStore.userData.full_name,
      //     phone_number: authStore.userData?.phone,
      //     user_id: authStore.userData.guid,
      //     increment_id: authStore.userData.your_id,
      //     action_time: new Date(),
      //     role_slug: `carrier`,
      //     action_comment: `edit_unit`,
      //     role_id: authStore.userData?.role_id,
      //     action_type: [`update`],
      //   },
      // });
      router.push(`/${locale}/my-cars`);
    },
  });

  const { mutate: uploadAiData } = useGetNewPred({
    onSuccess: (res) => {
      const jsonData = JSON.parse(
        res?.response?.[0]?.message?.content?.replace(/```json|```/g, "").trim()
      );

      if (jsonData?.model) {
        setValue(`marka`, jsonData?.model);
      }
      if (jsonData?.license_plate) {
        setValue(`car_number`, jsonData?.license_plate);
      }
      if (jsonData?.chassis_number) {
        setValue(`car_vin_number`, jsonData?.chassis_number);
      }
      if (jsonData?.fuel_type) {
        setValue(`fuel_type`, jsonData?.fuel_type);
      }
      if (jsonData?.address) {
        setValue(`address`, jsonData?.address);
      }
      if (jsonData?.color) {
        setValue(`color`, jsonData?.color);
      }
      if (jsonData?.engine_number) {
        setValue(`engine_number`, jsonData?.engine_number);
      }
      if (jsonData?.engine_power) {
        setValue(`engine_power`, jsonData?.engine_power);
      }
      if (jsonData?.gross_weight) {
        setValue(`gross_weight`, jsonData?.gross_weight);
      }
      if (jsonData?.issue_date) {
        setValue(`issue_date`, jsonData?.issue_date);
      }
      if (jsonData?.owner) {
        setValue(`owner`, jsonData?.owner);
      }
      if (jsonData?.seating_capacity) {
        setValue(`seating_capacity`, jsonData?.seating_capacity);
      }
      if (jsonData?.special_marks) {
        setValue(`special_marks`, jsonData?.special_marks);
      }
      if (jsonData?.standing_capacity) {
        setValue(`standing_capacity`, jsonData?.standing_capacity);
      }
      if (jsonData?.tax_id) {
        setValue(`tax_id`, jsonData?.tax_id);
      }
      if (jsonData?.traffic_department) {
        setValue(`traffic_department`, jsonData?.traffic_department);
      }
      if (jsonData?.type) {
        setValue(`type`, jsonData?.type);
      }
      if (jsonData?.unladen_weight) {
        setValue(`unladen_weight`, jsonData?.unladen_weight);
      }
      if (jsonData?.year_of_manufacture) {
        setValue(`year_of_manufacture`, jsonData?.year_of_manufacture);
      }

      setLoadingFront(false);
      setLoadingBack(false);
      clearErrors();
    },
    onError: (error) => {
      setLoadingFront(false);
      setLoadingBack(false);
    },
  });

  const uploadAi = (link, type) => {
    uploadAiData({
      data: {
        object_data: {
          type: "licence",
          document_type: type,
          links: [link],
        },
      },
    });
  };

  const onSubmit = (val) => {
    const data = {
      data: {
        trailer_type_id: val.trailer_type_id.value,
        capacity: +val.capacity,
        height: +val.height,
        car_number: val.car_number,
        marka: val.marka,
        cemt: val.cemt,
        tir: val.tir,
        pneumatic: val.pneumatic,
        coupling: val.coupling,
        konika: val.konika,
        adr: val?.adr?.value || ``,
            back_side_trailer: val.back_side_trailer?.length > 0 ? val.back_side_trailer : ``, //url cdn
        back_side_trailer_1: val?.back_side_trailer_1?.length > 0 ? val?.back_side_trailer_1 : ``,
        front_side_trailer: val.front_side_trailer?.length > 0 ? val.front_side_trailer: ``, //url cdn
        front_side_trailer_1: val.front_side_trailer_1?.length > 0 ? val.front_side_trailer_1 : ``,
        users_id: driver_id,
        car_photo: val.car_photo,
        download_type: getTrueKeys(load),
        car_position: ["alive"],
        status: [`active`],
        firm_id: firm_idPrams ? firm_idPrams : undefined,
        car_country: val?.car_country?.value,
        fuel_type: val?.fuel_type,
        eco_standart: val?.eco_standart?.value,
        guid: id ? id : undefined,
        create_time: id ? undefined : new Date(),

        address: watch(`address`) || undefined,
        color: watch(`color`) || undefined,
        engine_power: watch(`engine_power`) || undefined,
        gross_weight: watch(`gross_weight`) || undefined,
        issue_date: watch(`issue_date`) || undefined,
        owner: watch(`owner`) || undefined,
        seating_capacity: watch(`seating_capacity`) || undefined,
        special_marks: watch(`special_marks`) || undefined,
        standing_capacity: watch(`standing_capacity`) || undefined,
        tax_id: watch(`tax_id`) || undefined,
        traffic_department: watch(`traffic_department`) || undefined,
        unladen_weight: watch(`unladen_weight`) || undefined,
        year_of_manufacture: watch(`year_of_manufacture`) || undefined,
        engine_number: watch(`engine_number`) || undefined,
        car_vin_number: watch(`car_vin_number`) || undefined,
        type: watch(`type`) || undefined,
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
    loading: isLoading ? isLoading : upisLoading,
    errors,
    carTypeOptions,
    weightMeasurementOptions,
    packageOptions,
    setIsPopupOpen,
    isPopupOpen,
    onSubmit,
    handleSubmit,
    euroTypeOptions,
    router,
    locale,
    fuels: fuel?.response,
    setinputValue,
    getValues,
    isBtn: Object.values(errors)?.length > 0,
    setError: setError,
    loadingFront,
    setLoadingFront,
    loadingBack,
    setLoadingBack,
    uploadAi,
    full_name,
    phone
  };
};
