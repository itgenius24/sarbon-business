import { useState } from "react";
import { useAddCargoContext } from "../../_providers";

export const useCargoFormProps = () => {

  const [isPackagingAndQuantity, setPackagingAndQuantity] = useState(false);
  const [isDimensionsAndDiameter, setDimensionsAndDiameter] = useState(false);

  const { control, errors, register, setValue, watch } = useAddCargoContext();

  const weightOptions = [
    {
      label: "кг",
      value: "kg"
    },
    {
      label: "т",
      value: "t"
    }
  ];

  function handleDimensionsAndDiameter() {
    setDimensionsAndDiameter(!isDimensionsAndDiameter);
  }

  function handlePackagingAndQuantity() {
    setPackagingAndQuantity(!isPackagingAndQuantity);
  }

  return {
    weightOptions,
    errors,
    control,
    register,
    setValue,
    watch,
    handleDimensionsAndDiameter,
    handlePackagingAndQuantity,
    isDimensionsAndDiameter,
    isPackagingAndQuantity,
  };
};
