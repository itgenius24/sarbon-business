import { useGetCurrency } from "@/services/api";
import { useAddCargoContext } from "../../_providers";
import { useEffect } from "react";
import { fileUpload } from "@/services/fileUpload";

export const userCargoSetupProps = () => {

  const { register, control, errors, setValue, watch } = useAddCargoContext();

  const getCurrency = useGetCurrency();

  const currencyOptions = getCurrency.data?.response?.map(item => ({ label: item?.name, value: item?.guid }));

  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    setValue("image", result?.link);
  };

  useEffect(() => {

    if(getCurrency.isSuccess) {
      setValue("price_prepayment_unit", currencyOptions[0]);
    }

  }, [getCurrency.data]);

  return { register, control, errors, setValue, watch, currencyOptions, handleImageUpload };
};
