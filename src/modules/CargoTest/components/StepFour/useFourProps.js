import { useEffect, useMemo, useState } from "react";
import { useAddCargoContext } from "../../providers";
import { useGetCurrency, useGetPaymentType } from "@/services/api";
import { useGetLang } from "@/hooks/useGetLang";

const useFourProps = ({ locale }) => {
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
    getValues,
  } = useAddCargoContext();
  const [disabled, setDisabled] = useState(true);
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

  const currencyOptions = getCurrency.data?.response?.map((item) => ({
    label: item?.[`code_${locale ? locale : "ru"}`],
    value: item?.guid,
  }));

  const paymentOptions = getPaymentType.data?.response
    ?.slice(0, 2)
    ?.map((item) => ({
      label: item?.[`payment_type_${locale}`],
      value: item?.guid,
    }));

  const selectedOption = useMemo(() => {
    return paymentOptions?.find(
      (opt) => opt.value === watch(`payment_type`)?.value
    );
  }, [watch(`payment_type`)?.value, paymentOptions]);


  useEffect(() => {
    if (
      (watch("price_after_order") ||
        check ||
        watch("price_after_order") === 0) &&
      watch("price_after_order") >= 0
    ) {
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
      setValue(
        "price_after_order",
        Number(watch("price")) - Number(watch("price_prepayment"))
      );
    }
  }, [watch("price")?.length, watch("price_prepayment"), watch("prepayment")]);

  useEffect(() => {
    if (!watch(`payment_type_1`)) {
      setValue(`payment_type_1`, paymentOptions?.[0]);
    }
    if (!watch(`payment_type`)) {
      setValue(`payment_type`, paymentOptions?.[0]);
    }
  }, [paymentOptions]);

  function handleAppendAllPrice() {
    setValue(`allPrice.${watch(`allPrice`)?.length}`, {
      payment_type: {
        label: "Наличные",
        value: "b4900a94-180f-4ef0-923e-e20725dec9a2",
      },
      payment: {
        label: "доллар",
        value: "8ce5aea8-da17-4e47-9e53-73f6bde69601",
      },
      price: ``,
    });
  }

  function handleAppendAllPrepayment() {
    setValue(`allPrepayment.${watch(`allPrepayment`)?.length}`, {
      payment_type: {
        label: "Наличные",
        value: "b4900a94-180f-4ef0-923e-e20725dec9a2",
      },
      payment: {
        label: "доллар",
        value: "8ce5aea8-da17-4e47-9e53-73f6bde69601",
      },
      price: ``,
    });
  }
  function handleAppendPriceAfterOrder() {
    setValue(`priceAfterOrder.${watch(`priceAfterOrder`)?.length}`, {
      payment_type: {
        label: "Наличные",
        value: "b4900a94-180f-4ef0-923e-e20725dec9a2",
      },
      payment: {
        label: "доллар",
        value: "8ce5aea8-da17-4e47-9e53-73f6bde69601",
      },
      price: ``,
    });
  }



  const removeInput = (indx) => {
    setValue(
      `allPrice`,
      watch(`allPrice`)?.filter((item, index) => index !== indx)
    );
  };

  const removeInputAllPrepayment = (indx) => {
    setValue(
      `allPrepayment`,
      watch(`allPrepayment`)?.filter((item, index) => index !== indx)
    );
  };

  const removeInputPriceAfterOrder = (indx) => {
    setValue(
      `priceAfterOrder`,
      watch(`priceAfterOrder`)?.filter((item, index) => index !== indx)
    );
  };

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
    setEditModal,
    selectedOption,
    handleAppendAllPrice,
    handleAppendAllPrepayment,
    removeInput,
    removeInputAllPrepayment,
    handleAppendPriceAfterOrder,
    removeInputPriceAfterOrder,
  };
};

export default useFourProps;
