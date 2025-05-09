import{ useEffect, useState } from "react";
import { useAddCargoContext } from "../../providers";
import {
  useGetCurrency,
  useGetPaymentType,
} from "@/services/api";
import { useGetLang } from "@/hooks/useGetLang";

const useFourProps = () => {
  const {
    register,
    control,
    errors,
    setValue,
    watch,
    canEdit,
    canEditActive,
    mone,
    setMoney,
    check,
    setCheck,
    order_status,
    setEditModal,
  } = useAddCargoContext();
  const [disabled, setDisabled] = useState(true);
  const getCurrency = useGetCurrency();
  const getPaymentType = useGetPaymentType();
  const locale = useGetLang();

  useEffect(() => {
    setMoney({
      uzs: watch(`uzs`),
      usd: watch(`usd`),
      rub: watch(`rub`),
      eur: watch(`eur`),
      spot: watch(`spot`),
      with_nds: watch(`with_nds`),
      free_nds: watch(`free_nds`),
    });
  }, [
    watch(`uzs`),
    watch(`usd`),
    watch(`rub`),
    watch(`eur`),
    watch(`spot`),
    watch(`with_nds`),
    watch(`free_nds`),
  ]);


 
  const currencyOptions = getCurrency.data?.response?.map((item) => ({
    label: item?.[`code_${ locale? locale : 'ru'}`],
    value: item?.guid,
  }));

  const paymentOptions = getPaymentType.data?.response
    ?.slice(0, 2)
    ?.map((item) => ({
      label: item?.payment_type,
      value: item?.guid,
    }));

  useEffect(() => {
    if ((watch("price_after_order") || check || watch("price_after_order") === 0) &&  watch("price_after_order") >= 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watch("price_after_order"), check]);

  useEffect(() => {
    if (watch("price") && !watch("prepayment")) {
      setValue("price_after_order", watch("price"));
    } else if (!watch("price") || !watch("price_prepayment")) {
      setValue("price_after_order", ``);
    } else if (watch("price") && watch("price_prepayment") && canEdit) {
      setValue("price_after_order", Number(watch("price")) - Number(watch("price_prepayment")));
      console.log(`price`,watch("price") - watch("price_prepayment"))
    }
  }, [watch("price")?.length, watch("price_prepayment"), watch("prepayment")]);



  const onSubmit = () => {
    setValue(`cargoIndex`, 5);
  };

  return {
    register,
    control,
    errors,
    setValue,
    watch,
    setCheck,
    check,
    disabled,
    currencyOptions,
    paymentOptions,
    canEdit,
    order_status,
    canEditActive,
    onSubmit,
    mone,
    setEditModal
  };
};

export default useFourProps;
