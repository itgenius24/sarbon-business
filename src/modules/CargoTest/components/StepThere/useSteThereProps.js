import React, { useEffect, useMemo, useState } from "react";
import { useAddCargoContext } from "../../providers";
import {
  useGetCargoType,
  useGetCarType,
  useGetMeasurement,
  useUpdateCargo,
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
  const [disabled,setDisabled] = useState(true)
  useEffect(() => {
    if(watch("car_type")?.value && watch("transport_count")){
      setDisabled(false)
    } else{
      true
    }
  },[watch("car_type")?.value, watch("transport_count")])
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

  const [hoverIndex, setHoverIndex] = useState('');
  const [clickIndex,setClickIndex] = useState('')
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
  const updateCargo = useUpdateCargo({
    onSuccess: () => {
      setValue(`cargoIndex`,4)
    },
  });

  const onSubmit = () => {
    const requestData = {
      data: {
        guid: watch(`loadResId`),
        vehicle_type_id: watch("car_type")?.value,
        number_of_cars: watch("transport_count"),
        tir: watch("tir"),
        t1: watch("t1"),
        cmr: watch("cmr"),
        med: watch(`medic_certificate`),
        straps_number: watch("straps_number"),
        hitch: watch("hitch") || false,
        pneumatic: watch("pneumatic") || false,
        bunks: watch("bunks") || false,
      },
    };
    updateCargo.mutate(requestData)
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
    onSubmit,
    disabled
  };
};

export default useStepThereProps;
