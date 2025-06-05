import { useGetCarsOnSale } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useWantBuyProps = () => {

  const router = useRouter();

  const {
    register,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
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

  return { dropDownProps, carsList, isLoading, router };
};

function getParams(val) {
  if (!val?.length) return { data: JSON.stringify({ status: ["active"], with_relations: true, } ) };
  return { data: JSON.stringify({ view_fields:["name"], search: val, with_relations: true, }), };
}



