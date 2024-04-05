import { useEffect, useState } from "react";
import { useAddCargoContext } from "../../providers";
import { useGetCarType } from "@/services/api";

export const useTransportDetailProps = () => {

  const [isAdrOpen, setAdrOpen] = useState(false);
  const [isRequirementOpen, setRequirementOpen] = useState(false);
  const [isAccessOpen, setAccessOpen] = useState(false);
  const [isBeltsOpen, setBeltsOpen] = useState(false);
  const [isLiftingCapacityOpen, setLiftingCapacityOpen] = useState(false);
  const [isPermissionOpen, setPermissionOpen] = useState(false);

  const {
    register,
    control,
    errors,
    watch,
    canEdit,
    setValue,
    isEditing,
  } = useAddCargoContext();

  const getCarType = useGetCarType();
  const carTypeOptions = getCarType.data?.response?.map(item => ({ label: item?.name, value: item?.guid }));

  function handleCheckboxChange(e) {

    const name = e.target.name;
    const checked = e.target.checked;

    if(checked) {
      if(name === "is_ftl") {
        setValue("is_ftl", true);
        setValue("is_ltl", false);
      } else if(name === "is_ltl") {
        setValue("is_ltl", true);
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

  function handleOpenPermission () {
    setPermissionOpen(true);
  }

  function handleClosePermission () {
    setPermissionOpen(false);
  }

  useEffect(() => {
    if(watch("tir") || watch("cmr") || watch("t1")) {
      setAccessOpen(true);
    }
    if(watch("is_adr_requirement") || watch("is_pneumatic_requirement") || watch("is_tir_requirement")) {
      setRequirementOpen(true);
    }
    if(watch("remains")) {
      setBeltsOpen(true);
    }
    if(watch("capacity")) {
      setLiftingCapacityOpen(true);
    }
  }, []);

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
    isEditing,
    handleOpenPermission,
    handleClosePermission,
    isPermissionOpen,
  };
};
