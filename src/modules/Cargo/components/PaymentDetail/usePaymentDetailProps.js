import { useState } from "react";

export const usePaymentDetailProps = () => {
  const [prepaymentFuelOpen, setPrepaymentFuelOpen] = useState(false);
  const [directContractOpen, setDirectContractOpen] = useState(false);

  return {
    prepaymentFuelOpen,
    setPrepaymentFuelOpen,
    directContractOpen,
    setDirectContractOpen
  };
};
