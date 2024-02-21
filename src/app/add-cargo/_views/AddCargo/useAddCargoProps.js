import { useState } from "react";
import { useForm } from "react-hook-form";

export const useAddCargoProps = () => {

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      loadings: [
        {
          location: "",
          address: ""
        }
      ],
      unloading: [
        {
          location: "",
          address: ""
        }
      ]
    }
  });

  function onSubmit(data) {
    console.log(data);
  }

  return {
    register,
    control,
    setValue,
    handleSubmit,
    onSubmit,
    watch,
    errors,
    startDate,
    setStartDate,
    endDate,
    setEndDate
  };
};
