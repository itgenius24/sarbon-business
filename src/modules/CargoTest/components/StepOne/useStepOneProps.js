import React, { useState } from 'react'
import { useAddCargoContext } from '../../providers';
import { useGetMeasurement } from '@/services/api';

const useStepOneProps = () => {
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

      const getMeasurement = useGetMeasurement();
      const weightMeasurementOptions = getMeasurement.data?.response
      ?.filter((item) => !item?.base_unit.includes("meter"))
      ?.map((item) => ({ label: item.Symbol, value: item.guid }));

      function handleDimensionsAndDiameter() {
        setDimensionsAndDiameter(!isDimensionsAndDiameter);
      }
    
      function handlePackagingAndQuantity() {
        setPackagingAndQuantity(!isPackagingAndQuantity);
      }
    

  return {
    control,
    errors,
    register,
    setValue,
    watch,
    setSearchCargo,
    weightMeasurementOptions,
    isPackagingAndQuantity,
    isDimensionsAndDiameter,
    handleDimensionsAndDiameter,
    handlePackagingAndQuantity
  }
}

export default useStepOneProps