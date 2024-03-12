
import { useGetCarType, useGetCarsOnSale, useGetCurrency } from "@/services/api";
import { fileUpload } from "@/services/fileUpload";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useMyAd = () => {
  const { id } = useParams();
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      photo:
        "3bf18b7b-4c9f-4166-b20f-cbb430ea03bc/media/bbfa4468-847b-4c31-885a-959acacda110_Снимокэкрана(82).png",
    },
  });
  console.log("watch() ", watch());

  const { data: TCOptions = [] } = useGetCarType(undefined, {
    select: (res) =>
      res?.response?.map((el) => ({ label: el?.name, value: el?.guid })),
  });

  const { data: currencyOptions, isSuccess } = useGetCurrency(undefined, {
    select: (res) =>
      res?.response?.map((el) => ({ label: el?.name, value: el?.guid })),
  });

  const { data: carsList = [], isLoading, isFetching } = useGetCarsOnSale(
    JSON.stringify({ data: { status: ["active"], with_relations: true, users_id: id }, }),
    {
      select: (res) => {
        console.log("useGetCarsOnSale ", res);
        return res?.response;
      },
    }
  );

  console.log("carsList", carsList);
  console.log("isLoading", isLoading);
  console.log("isFetching", isFetching);


  useEffect(() => {
    if (isSuccess) {
      setValue("currency_id", currencyOptions[0]);
    }
  }, [isSuccess]);


  const submitForm = (data) => {
    console.log("data ", data);
  };

  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    setValue("photo", result?.link);
  };

  const rules = { required: { value: true, message: "Это поле обязательно для заполнения" }, };

  const getCreateAdProps = () => {
    return {
      watch,
      errors,
      control,
      setValue,
      register,
      TCOptions,
      currencyOptions,
      handleImageUpload,
      rules,
    };
  };

  const onsubmit = () => handleSubmit(submitForm);


  return { onsubmit, getCreateAdProps, list: carsList, isLoading };
};
