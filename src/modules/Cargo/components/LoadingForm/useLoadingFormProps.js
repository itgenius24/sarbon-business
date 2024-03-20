import React from "react";
import { useFieldArray } from "react-hook-form";
import { useAddCargoContext } from "../../providers";
import { useGetAddress } from "@/services/api";

export const useLoadingFormProps = () => {

  const yandexMapRef = React.useRef(undefined);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formAddressName, setFormAddressName] = React.useState({});

  const [yMaps, setYMaps] = React.useState(null);

  const [coordinates, setCoordinates] = React.useState([41.40587471972005, 69.46086540238926]);
  const [placeMarkGeometry, setPlaceMarkGeometry] = React.useState([41.34908881486223, 69.3374228085318]);

  const { control, register, watch, setValue, errors, canEdit } = useAddCargoContext();

  const getAddress = useGetAddress();
  const getAddressOptions = getAddress.data?.response?.map(item => ({ label: item.name, value: item.guid, addressId: item.address_id }));

  const {
    fields: loadings,
    append: appendLoading,
    remove: removeLoading,
    update: updateLoading
  } = useFieldArray({
    control,
    name: "loadings",
    rules: { minLength: 1, }
  });

  const {
    fields: unloading,
    append: appendUnloading,
    remove: removeUnloading ,
    update: updateUnloading,
  } = useFieldArray({
    control,
    name: "unloading"
  });

  function handleAppendLoading() {
    appendLoading({
      location: {
        label: "",
        value: ""
      },
      address: "",
      cor: "",
    });
  }

  function handleRemoveLoading(index) {
    removeLoading(index);
  }

  function handleUnloadingAppend() {
    appendUnloading({
      location: {
        label: "",
        value: ""
      },
      address: "",
      cor: "",
    });
  }

  function handleUnloadingRemove(index) {
    removeUnloading(index);
  }

  function handleOpenModal(name, index) {
    setFormAddressName(() => ({ name, index }));

    if(watch(`${name}.${index}.cor`)?.length) {

      let cors = watch(`${name}.${index}.cor`);

      if(typeof cors === "string") {
        cors = [Number(cors.split(",")[0]), Number(cors.split(",")[1])];
      }

      setCoordinates(cors);
      setPlaceMarkGeometry(cors);
      setIsModalOpen(true);

    } else {
      setIsModalOpen(true);
      // navigator.geolocation.getCurrentPosition((position) => {
      //   let lat = position.coords.latitude;
      //   let long = position.coords.longitude;
      //   setCoordinates([lat, long]);
      //   setIsModalOpen(true);
      // });

    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setFormAddressName({});
  }

  function getPlaceMarkAddress(coords) {
    yMaps?.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);
      if(formAddressName?.name === "loadings") {
        updateLoading(formAddressName?.index, {
          location: watch(`loadings.${formAddressName?.index}.location`),
          address: firstGeoObject.getAddressLine(),
          cor: `${coords[0]},${coords[1]}`
        });
      } else {
        updateUnloading(formAddressName?.index, {
          location: watch(`unloading.${formAddressName?.index}.location`),
          address: firstGeoObject.getAddressLine(),
          cor: `${coords[0]},${coords[1]}`
        });
      }
    });
  }

  function onMapClick (e) {
    const coordinates = e.get("coords");

    getPlaceMarkAddress(coordinates);
    setPlaceMarkGeometry(coordinates);

    if(formAddressName.name === "loadings") {

      updateLoading(formAddressName?.index, {
        location: watch(`loadings.${formAddressName?.index}.location`),
        address: watch(`loadings.${formAddressName?.index}.address`),
        cor: coordinates.join(",")
      });

    } else {

      updateUnloading(formAddressName?.index, {
        location: watch(`unloading.${formAddressName?.index}.location`),
        address: watch(`unloading.${formAddressName?.index}.address`),
        cor: coordinates.join(",")
      });

    }

  }

  function handleClearLocation() {
    setValue(`${formAddressName?.name}.${formAddressName?.index}.address`, "");
    setValue(`${formAddressName?.name}.${formAddressName?.index}.cor`, "");
    handleCloseModal();
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
    errors,
    canEdit,
    placeMarkGeometry,
    setPlaceMarkGeometry,
    onMapClick,
    setYMaps,
    yandexMapRef,
    handleClearLocation,
    setIsModalOpen,
  };
};
