import { useEffect } from "react";
import { useAddCargoContext } from "../../providers";

export const usePaymentDetailProps = () => {

  const {
    prepaymentFuelOpen,
    setPrepaymentFuelOpen,
    directContractOpen,
    setDirectContractOpen,
    watch,
    isEditing,
    canEdit
  } = useAddCargoContext();

  useEffect(() => {
    if(isEditing && !canEdit) {
      if(watch("prepayment_interest") || watch("prepayment_of_fuel") || watch("payment_upon_unloading")) {
        setPrepaymentFuelOpen(true);
      }
      if(watch("company_contract")) {
        setDirectContractOpen(true);
      }
    }
  }, [watch("prepayment_interest"), watch("prepayment_of_fuel"), watch("payment_upon_unloading"), watch("company_contract")]);

  return {
    prepaymentFuelOpen,
    setPrepaymentFuelOpen,
    directContractOpen,
    setDirectContractOpen
  };
};
