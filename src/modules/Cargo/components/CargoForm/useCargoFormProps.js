import { useEffect, useMemo, useState } from "react";
import { useAddCargoContext } from "../../providers";
import {
  useGetCargoType,
  useGetMeasurement,
  useGetPackage,
} from "@/services/api";

export const useCargoFormProps = () => {
  const {
    control,
    errors,
    register,
    setValue,
    watch,
    canEdit,
    isEditing,
    isPackagingAndQuantity,
    setPackagingAndQuantity,
    isDimensionsAndDiameter,
    setDimensionsAndDiameter,
    loadingOptions,
  } = useAddCargoContext();

  const [searchCargo, setSearchCargo] = useState("");
  const [offset,setOffset] = useState(0);
  const [refesh,setRefesh] = useState(0);

  const getCargoTypes = useGetCargoType({
    params: {
      offset: offset,
      limit: 40,
      data: JSON.stringify({}),
    },
    querySettings:{
      enabled:true
    }
  });

  console.log(`getCargoTypes`,getCargoTypes.isSuccess);
  const getMeasurement = useGetMeasurement();
  const getPackages = useGetPackage();

  useEffect(() => {
     if(getCargoTypes?.getCargoTypes?.data?.response?.length  === 40){
      setOffset(offset + 40);
      setRefesh(refesh + 1);
     }
     else{
     setRefesh(0);
     }
  },[!getCargoTypes.isSucces, refesh]);

  const weightMeasurementOptions = getMeasurement.data?.response
    ?.filter((item) => !item?.base_unit.includes("meter"))
    ?.map((item) => ({ label: item.Symbol, value: item.guid }));

  const volumeMeasurementOptions = getMeasurement.data?.response
    ?.filter((item) => item?.base_unit.includes("meter"))
    ?.map((item) => ({ label: item.Symbol, value: item.guid }));

  const cargoTypeOptions = getCargoTypes.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));

  // console.log("salom",cargoTypeOptions?.filter((item) => item.label !== searchCargo));

  const optionCargoType = useMemo(() => {
    if (searchCargo) {
      return cargoTypeOptions?.filter((item) =>
        item?.label?.toLowerCase()?.includes(searchCargo.toLowerCase())
      );
    } else {
      return cargoTypeOptions;
    }
  }, [searchCargo, cargoTypeOptions]);

  const packageOptions = getPackages.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));

  function handleDimensionsAndDiameter() {
    setDimensionsAndDiameter(!isDimensionsAndDiameter);
  }

  function handlePackagingAndQuantity() {
    setPackagingAndQuantity(!isPackagingAndQuantity);
  }

  useEffect(() => {
    if (getMeasurement.isSuccess) {
      setValue("weight_unit", weightMeasurementOptions[0]);
      setValue("volume_unit", volumeMeasurementOptions[0]);
    }
  }, [getMeasurement.data]);

  useEffect(() => {
    if (isEditing && !canEdit) {
      if (watch("packaging")?.value || watch("packaging_quantity")) {
        setPackagingAndQuantity(true);
      }
      if (watch("width") || watch("height") || watch("length")) {
        setDimensionsAndDiameter(true);
      }
    }
  }, [
    watch("packaging"),
    watch("packaging_quantity"),
    watch("width"),
    watch("height"),
    watch("length"),
  ]);

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
    optionCargoType,
    weightMeasurementOptions,
    volumeMeasurementOptions,
    packageOptions,
    canEdit,
    isEditing,
    setSearchCargo,
    loadingOptions,
  };
};
