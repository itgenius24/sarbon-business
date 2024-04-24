import { useGetCurrency, useGetPaymentType } from "@/services/api";
import { useAddCargoContext } from "../../providers";
import { useEffect } from "react";
import { fileUpload } from "@/services/fileUpload";

export const userCargoSetupProps = () => {

  const { register, control, errors, setValue, watch, canEdit } = useAddCargoContext();

  const getCurrency = useGetCurrency();
  const getPaymentType = useGetPaymentType();

  const currencyOptions = getCurrency.data?.response?.map(item => ({ label: item?.name, value: item?.guid }));
  const paymentOptions = getPaymentType.data?.response?.map(item => ({ label: item?.payment_type, value: item?.guid }));

  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    setValue("image", result?.link);
  };

  function imageLoader() {
    return watch("image")?.includes("http") ? watch("image") : process.env.NEXT_PUBLIC_MEDIA_URL + watch("image");
  }

  useEffect(() => {

    if(getCurrency.isSuccess) {
      setValue("price_prepayment_unit", currencyOptions[0]);
    }

  }, [getCurrency.data]);

  useEffect(() => {

    if(!watch("price_prepayment")) {
      setValue("price_after_order", 0);
    } else if(!watch("price" || !watch("price_prepayment"))) {
      setValue("price_after_order", 0);
    } else if(watch("price") && watch("price_prepayment") && canEdit) {
      setValue("price_after_order", watch("price") - watch("price_prepayment"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("price"), watch("price_prepayment")]);

  return {
    register,
    control,
    errors,
    setValue,
    watch,
    currencyOptions,
    handleImageUpload,
    paymentOptions,
    imageLoader,
    canEdit,
  };
};
