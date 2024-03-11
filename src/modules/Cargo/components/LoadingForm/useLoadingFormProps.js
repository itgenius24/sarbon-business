import { useFieldArray } from "react-hook-form";
import { useAddCargoContext } from "../../providers";
import { useRef, useState } from "react";
import { useGetAddress } from "@/services/api";

export const useLoadingFormProps = () => {

  const yandexMapRef = useRef(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formAddressName, setFormAddressName] = useState({});

  const [yMaps, setYMaps] = useState(null);

  const [coordinates, setCoordinates] = useState([41.40587471972005, 69.46086540238926]);
  const [placeMarkGeometry, setPlaceMarkGeometry] = useState([]);

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
      cor: []
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
      address: ""
    });
  }

  function handleUnloadingRemove(index) {
    removeUnloading(index);
  }

  function handleOpenModal(name, index) {
    setFormAddressName(() => ({ name, index }));

    if(watch(`${name}.${index}.cor`)?.length) {

      console.log(watch(`${name}.${index}.cor`));

      let cors = watch(`${name}.${index}.cor`);

      if(typeof cors === "string") {
        cors = [Number(cors.split(",")[0]), Number(cors.split(",")[1])];
      }

      setCoordinates(cors);
      setPlaceMarkGeometry(cors);
      setIsModalOpen(true);

    } else {

      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setCoordinates([lat, long]);
        setIsModalOpen(true);
      });

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
    setPlaceMarkGeometry([coordinates[0], coordinates[1]]);

    if(formAddressName.name === "loading") {
      updateLoading(formAddressName?.index, {
        location: watch(`loadings.${formAddressName?.index}.location`),
        address: watch(`loadings.${formAddressName?.index}.address`),
        cor: coordinates
      });
    } else {
      updateUnloading(formAddressName?.index, {
        location: watch(`unloading.${formAddressName?.index}.location`),
        address: watch(`unloading.${formAddressName?.index}.address`),
        cor: coordinates
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
