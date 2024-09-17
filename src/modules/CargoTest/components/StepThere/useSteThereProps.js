import React, { useEffect, useMemo, useState } from "react";
import { useAddCargoContext } from "../../providers";
import {
  useGetCargoType,
  useGetCarType,
  useGetMeasurement,
} from "@/services/api";
import { fileUpload } from "@/services/fileUpload";

const useStepThereProps = () => {
  const {
    register,
    control,
    errors,
    watch,
    canEdit,
    setValue,
    isEditing,
    setRequirementOpen,
    setAccessOpen,
    setBeltsOpen,
    setLiftingCapacityOpen,
    isRequirementOpen,
    isAccessOpen,
    isBeltsOpen,
    isLiftingCapacityOpen,
  } = useAddCargoContext();

  const getCarType = useGetCarType();
  const carTypeOptions = getCarType.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));

  function handleCheckboxChange(e) {
    const name = e.target.name;
    const checked = e.target.checked;

    if (checked) {
      if (name === "is_ftl") {
        setValue("is_ftl", true);
        setValue("is_ltl", false);
      } else if (name === "is_ltl") {
        setValue("is_ltl", true);
        setValue("is_ftl", false);
      }
    }
  }

  function handleOpenRequirement() {
    setRequirementOpen(true);
  }

  function handleCloseRequirement() {
    setRequirementOpen(false);
  }

  function handleOpenAccess() {
    setAccessOpen(true);
  }

  function handleCloseAccess() {
    setAccessOpen(false);
  }

  function handleOpenBelts() {
    setBeltsOpen(true);
  }

  function handleCloseBelts() {
    setBeltsOpen(false);
  }

  function handleOpenLiftingCapacity() {
    setLiftingCapacityOpen(true);
  }

  function handleCloseLiftingCapacity() {
    setLiftingCapacityOpen(false);
  }

  useEffect(() => {
    if (isEditing && !canEdit) {
      if (
        watch("tir") ||
        watch("cmr") ||
        watch("t1") ||
        watch("medic_certificate")
      ) {
        handleOpenAccess(true);
      }
      if (watch("hitch") || watch("pneumatic") || watch("bunks")) {
        handleOpenRequirement(true);
      }
      if (watch("straps_number")) {
        handleOpenBelts(true);
      }
      if (watch("capacity")) {
        handleOpenLiftingCapacity(true);
      }
    }
  }, [
    watch("capacity"),
    watch("remains"),
    watch("tir"),
    watch("cmr"),
    watch("t1"),
    watch("medic_certificate"),
    watch("hitch"),
    watch("pneumatic"),
    watch("bunks"),
  ]);

  const [hoverIndex, setHoverIndex] = useState(0);
  const [clickIndex,setClickIndex] = useState(0)
  const boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setClickIndex(Number(watch("transport_count") || 0));
    
  },[watch("transport_count")])
  const onMouseLeave = () => {
    setHoverIndex(-1);
    if(clickIndex){
      setValue("transport_count",hoverIndex)
    } else{
      setValue("transport_count",0)

    }

  };
  const onMouseEnter = (num) => {
    setHoverIndex(num);
    setClickIndex(null);
    setValue("transport_count",num)
  };

  const handleNumClick = (num) => {
    setClickIndex(num);
    setValue("transport_count",num)
  }
  return {
    control,
    setHoverIndex,
    hoverIndex,
    boxes,
    onMouseLeave,
    onMouseEnter,
    isRequirementOpen,
    isAccessOpen,
    isBeltsOpen,
    isLiftingCapacityOpen,
    carTypeOptions,
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
    setValue,
    watch,
    handleNumClick,
    clickIndex,
  };
};

export default useStepThereProps;
