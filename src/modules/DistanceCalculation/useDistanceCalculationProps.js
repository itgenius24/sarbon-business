import React, { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export const useDistanceCalculationProps = () => {

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [ymaps, setYmaps] = React.useState(false);
  const [panel, setPanel] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState([]);

  const mapRef = useRef(null);

  const { register, control } = useForm();

  const { fields: locations, append, remove } = useFieldArray({
    control,
    name: "locations",
  });

  function handleAppend() {
    append({
      cor: [],
      name: ""
    });
  }

  function handleRemove(index) {
    remove(index);
  }

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function onMapClick(e) {
    console.log(e.get("coords"));
    // setCoordinates(e.get("coords"));
  }

  useEffect(() => {
    if(mapRef.current) {
      console.log(mapRef.current.controls.get("routePanelControl"));
    }
    console.log(ymaps);
  }, [ymaps]);

  useEffect(() => {
    console.log(panel);
  }, [panel]);

  return {
    locations,
    register,
    handleAppend,
    handleRemove,
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
    setYmaps,
    mapRef,
    onMapClick,
    panel,
    setPanel
  };
};
