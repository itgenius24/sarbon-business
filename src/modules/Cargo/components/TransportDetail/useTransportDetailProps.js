import { useEffect, useState } from "react";
import { useAddCargoContext } from "../../providers";
import { useGetCarType } from "@/services/api";

export const useTransportDetailProps = () => {

  const [isAdrOpen, setAdrOpen] = useState(false);
  const [isRequirementOpen, setRequirementOpen] = useState(false);
  const [isAccessOpen, setAccessOpen] = useState(false);
  const [isBeltsOpen, setBeltsOpen] = useState(false);
  const [isLiftingCapacityOpen, setLiftingCapacityOpen] = useState(false);

  const { register, control, errors, watch, canEdit, setValue, } = useAddCargoContext();

  const getCarType = useGetCarType();
  const carTypeOptions = getCarType.data?.response?.map(item => ({ label: item?.name, value: item?.guid }));

  function handleCheckboxChange(e) {
    const value = e.target.value;
    const checked = e.target.checked;

    if(!checked) {
      e.preventDefault();
      return;
    }

    if(checked) {
      if(value === "is_ftl") {
        setValue("is_ltl", false);
      } else if(value === "is_ltl") {
        setValue("is_ftl", false);
      }
    }

  }

  function handleOpenAdr () {
    setAdrOpen(true);
  }

  function handleCloseAdr () {
    setAdrOpen(false);
  }

  function handleOpenRequirement () {
    setRequirementOpen(true);
  }

  function handleCloseRequirement () {
    setRequirementOpen(false);
  }

  function handleOpenAccess () {
    setAccessOpen(true);
  }

  function handleCloseAccess () {
    setAccessOpen(false);
  }

  function handleOpenBelts () {
    setBeltsOpen(true);
  }

  function handleCloseBelts () {
    setBeltsOpen(false);
  }

  function handleOpenLiftingCapacity () {
    setLiftingCapacityOpen(true);
  }

  function handleCloseLiftingCapacity () {
    setLiftingCapacityOpen(false);
  }

  useEffect(() => {

    setLiftingCapacityOpen(!!watch("capacity"));

  }, [watch("capacity")]);


  return {
    control,
    isAdrOpen,
    isRequirementOpen,
    isAccessOpen,
    isBeltsOpen,
    isLiftingCapacityOpen,
    carTypeOptions,
    handleOpenAdr,
    handleCloseAdr,
    handleOpenRequirement,
    handleCloseRequirement,
    handleOpenAccess,
    handleCloseAccess,
    handleOpenBelts,
    handleCloseBelts,
    handleOpenLiftingCapacity,
    handleCloseLiftingCapacity,
    register,
    errors,
    canEdit,
    handleCheckboxChange,
  };
};
