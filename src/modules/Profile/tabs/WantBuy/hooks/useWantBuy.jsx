import { useGetCarsOnSale } from "@/services/api";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useWantBuy = () => {
  const { isOpen, onToggle } = useDisclosure();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm();

  const [debouncedVal, setDebouncedVal] = useState(getValues("searchVal"));



  const dropDownOptions = [];
  const dropDownProps = () => {
    return {
      watch: watch,
      errors: errors,
      control: control,
      register: register,
      setValue: setValue,
      options: dropDownOptions,
    };
  };

  const searchVal = watch("searchVal");
  const params = getParams(debouncedVal);

  const { data: carsList , isLoading } = useGetCarsOnSale(params, {
    select:res=> {
      return res?.response;
    }
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedVal(searchVal);
    }, 1000);
    return () => clearTimeout(id);
  }, [searchVal]);

  return { dropDownProps, onToggle, carsList, isLoading };
};

function getParams(val) {
  if (!val?.length) return;
  return {
    data: JSON.stringify({
      offset: 1,
      name: [val],
      limit: 20,
    }),
  };
}



