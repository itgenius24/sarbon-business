import { useFieldArray } from "react-hook-form";
import { useAddCargoContext } from "../../_providers";
import { useState } from "react";
import { useGetAddress } from "@/services/api";

export const useLoadingFormProps = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [coordinates, setCoordinates] = useState([41.3489411, 69.3375433]);

  const { control, register, watch, setValue } = useAddCargoContext();

  const getAddress = useGetAddress();
  const getAddressOptions = getAddress.data?.response?.map(item => ({ label: item.name, value: item.guid, addressId: item.address_id }));

  const { fields: loadings, append: appendLoading, remove: removeLoading } = useFieldArray({
    control,
    name: "loadings"
  });

  const { fields: unloading, append: appendUnloading, remove: removeUnloading } = useFieldArray({
    control,
    name: "unloading"
  });

  function handleAppendLoading() {
    appendLoading({
      location: "",
      address: ""
    });
  }

  function handleRemoveLoading(index) {
    removeLoading(index);
  }

  function handleUnloadingAppend() {
    appendUnloading({
      location: "",
      address: ""
    });
  }

  function handleUnloadingRemove(index) {
    removeUnloading(index);
  }

  function handleOpenModal() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      setCoordinates([lat, long]);
      setIsModalOpen(true);
    });
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return {
    loadings,
    register,
    control,
    watch,
    setValue,
    handleAppendLoading,
    handleRemoveLoading,
    handleUnloadingAppend,
    handleUnloadingRemove,
    unloading,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    coordinates,
    getAddressOptions,
  };
};
