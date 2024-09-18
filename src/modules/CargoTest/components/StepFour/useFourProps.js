import React, { useEffect, useState } from 'react'
import { useAddCargoContext } from '../../providers';
import { useGetCurrency, useGetPaymentType } from '@/services/api';

const useFourProps = () => {
    const [check,setCheck] = useState()
    const { register, control, errors, setValue, watch, canEdit,canEditActive } = useAddCargoContext();
    const getCurrency = useGetCurrency();
  const getPaymentType = useGetPaymentType();

  const currencyOptions = getCurrency.data?.response?.map(item => ({ label: item?.name, value: item?.guid }));
  const paymentOptions = getPaymentType.data?.response?.map(item => ({ label: item?.payment_type, value: item?.guid }));
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
  return{
    register,
    control,
    errors,
    setValue,
    watch,
    setCheck,
    check,
    currencyOptions,
    // handleImageUpload,
    paymentOptions,
    // imageLoader,
    // canEdit,
    canEditActive,
  }
}

export default useFourProps