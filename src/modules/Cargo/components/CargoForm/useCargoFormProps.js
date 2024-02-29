import { useEffect, useState } from "react";
import { useAddCargoContext } from "../../providers";
import { useGetCargoType, useGetMeasurement, useGetPackage } from "@/services/api";

export const useCargoFormProps = () => {
  const { control, errors, register, setValue, watch } = useAddCargoContext();

  const [isPackagingAndQuantity, setPackagingAndQuantity] = useState(false);
  const [isDimensionsAndDiameter, setDimensionsAndDiameter] = useState(false);


  const getCargoTypes = useGetCargoType();
  const getMeasurement = useGetMeasurement();
  const getPackages = useGetPackage();

  const weightMeasurementOptions = getMeasurement.data?.response
    ?.filter(item => !item?.base_unit.includes("meter"))
    ?.map(item => ({ label: item.Symbol, value: item.guid }));

  const volumeMeasurementOptions = getMeasurement.data?.response
    ?.filter(item => item?.base_unit.includes("meter"))
    ?.map(item => ({ label: item.Symbol, value: item.guid }));

  const cargoTypeOptions = getCargoTypes.data?.response?.map(item => ({ label: item?.name, value: item?.guid }));

  const packageOptions = getPackages.data?.response?.map(item => ({ label: item?.name, value: item?.guid }));

  function handleDimensionsAndDiameter() {
    setDimensionsAndDiameter(!isDimensionsAndDiameter);
  }

  function handlePackagingAndQuantity() {
    setPackagingAndQuantity(!isPackagingAndQuantity);
  }

  useEffect(() => {

    if(getMeasurement.isSuccess) {
      setValue("weight_unit", weightMeasurementOptions[0]);
      setValue("volume_unit", volumeMeasurementOptions[0]);
    }

  }, [getMeasurement.data]);

  useEffect(() => {
    setPackagingAndQuantity(!!watch("packaging_quantity"));
  }, [watch("packaging_quantity")]);

  return {
    errors,
    control,
    register,
    setValue,
    watch,
    handleDimensionsAndDiameter,
    handlePackagingAndQuantity,
    isDimensionsAndDiameter,
    isPackagingAndQuantity,
    cargoTypeOptions,
    weightMeasurementOptions,
    volumeMeasurementOptions,
    packageOptions,
  };
};
