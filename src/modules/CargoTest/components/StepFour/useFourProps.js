import React, { useEffect, useState } from "react";
import { useAddCargoContext } from "../../providers";
import {
  useGetCurrency,
  useGetPaymentType,
  useUpdateCargo,
} from "@/services/api";

const useFourProps = () => {
  const { register, control, errors, setValue, watch, canEdit, canEditActive,mone, setMoney,  check, setCheck,} =
    useAddCargoContext();
  const [disabled,setDisabled] = useState(true)
  const getCurrency = useGetCurrency();
  const getPaymentType = useGetPaymentType();


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

  const getTrueKeys = (obj) => {
    return Object.keys(obj).filter((key) => obj[key] === true);
  };

  const currencyOptions = getCurrency.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));

  const paymentOptions = getPaymentType.data?.response?.slice(0,2)?.map((item) => ({
    label: item?.payment_type,
    value: item?.guid,
  }));




  useEffect(() => {
    if(watch("price_after_order")|| check) {
      setDisabled(false)
    } else{
      setDisabled(true)
    }
  },[watch("price_after_order"),check])


  useEffect(() => {
    if(watch("price") && !watch("prepayment")) {
      setValue("price_after_order", watch("price"));
    } else if (!watch("price") || !watch("price_prepayment")) {
      setValue("price_after_order", ``);

    } else if (watch("price") && watch("price_prepayment") && canEdit) {
      setValue("price_after_order", watch("price") - watch("price_prepayment"));
    }
    //  if(!watch("prepayment")){
    //   setValue("price_prepayment", watch("prepayment"))
    //  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("price")?.length, watch("price_prepayment"),watch("prepayment")]);



  const updateCargo = useUpdateCargo({
    onSuccess: () => {
      setValue(`cargoIndex`,5)

    },
  });

  const onSubmit = () => {
    setValue(`cargoIndex`,5)
    // const requestData = check
    //   ? {
    //     data: {
    //       guid: watch(`loadResId`),
    //       money_code: getTrueKeys(mone),
    //     },
    //   }
    //   : {
    //     data: {
    //       guid: watch(`loadResId`),
    //       bid_cash: +watch("price"),
    //       prepayment_percentage: +watch(`price_prepayment`),
    //       dim_length_special: watch("price_after_order"),
    //       payment_description: watch("payment_description"),
    //       currency_id:watch("price_prepayment_unit").value,
    //       map_id: watch("payment_type")?.value,
    //       map_id_2: watch("payment_type_1")?.value,
    //       map_id_3: watch("payment_type_2")?.value,
    //     },
    //   };
    // updateCargo.mutate(requestData);
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
    // handleImageUpload,
    paymentOptions,
    // imageLoader,
    canEdit,
    canEditActive,
    onSubmit,
  };
};

export default useFourProps;
