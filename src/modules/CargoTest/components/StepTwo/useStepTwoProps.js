import { useFieldArray } from "react-hook-form";
import { useAddCargoContext } from "../../providers";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  useCreateAddressMutation,
  useCreatePeriodMutation,
  useUpdateCargo,
} from "@/services/api";
import { addDaysToDate } from "@/utils/addDaysToDate";

const useStepTwoProps = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [index, setIndex] = useState();
  const [requestLoadingIndex, setRequestLoadingIndex] = useState(0);
  const [requestUnLoadingIndex, setRequestUnLoadingIndex] = useState(0);
  const [type, setType] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedValue] = useDebounce(address, 500);
  const [activeIndex, setActiveIndex] = useState(null);
  const [nameState, setNameState] = useState("");
  const [disabled,setDisabled] = useState(true)
  const [placeMarkGeometry, setPlaceMarkGeometry] = useState([
    41.34908881486223, 69.3374228085318,
  ]);
  const [coordinates, setCoordinates] = useState([
    41.40587471972005, 69.46086540238926,
  ]);
  const [yMaps, setYMaps] = useState(null);
  const yandexMapRef = useRef(undefined);
  const { control, register, watch, setValue, errors, canEdit, getValues } =
    useAddCargoContext();


  const {
    fields: loadings,
    append: appendLoading,
    remove: removeLoading,
    update: updateLoading,
  } = useFieldArray({
    control,
    name: "loadings",
    // rules: { minLength: 1, }
  });

  const {
    fields: unloading,
    append: appendUnloading,
    remove: removeUnloading,
    update: updateUnloading,
  } = useFieldArray({
    control,
    name: "unloading",
  });


  useEffect(() => {
    if(watch("cargo_type")?.label && watch("weight_measurement") && watch("volume_measurement") ){
      setDisabled(false)
    } else{
      true
    }
  },[watch("cargo_type")?.labe, watch("weight_measurement") , watch("volume_measurement")])
  function onCreateCargoSuccess() {

    setValue(`cargoIndex`,3)
  }

  function handleAppendLoading() {
    appendLoading({
      address: "",
      cor: "",
      from_date: "",
      loading_num:""
    });
  }

  function handleRemoveLoading(index) {
    removeLoading(index);
  }

  function handleUnloadingAppend() {
    appendUnloading({
      address: "",
      cor: "",
      to_date: "",
    });
  }

  function handleUnloadingRemove(index) {
    removeUnloading(index);
  }

  function handleOpenModal(name, index, type) {
    setNameState(name);
    setIsModalOpen(true);
    setIndex(index);
    setType(type);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    // setStateMap(false);
    // setFormAddressName({});
  }
  function getPlaceMarkAddress(coords) {
    yMaps?.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);
      setValue(nameState, firstGeoObject.getAddressLine());
      if (type === "loading") {
        updateLoading(index, {
          location: { value: "", label: "" },
          address: firstGeoObject.getAddressLine(),
          cor: location?.Point?.pos,
          search: firstGeoObject.getAddressLine(),
        });
      } else {
        updateUnloading(index, {
          location: { value: "", label: "" },
          address: firstGeoObject.getAddressLine(),
          cor: location?.Point?.pos,
          search: firstGeoObject.getAddressLine(),
        });
      }
      // setValue(nameState, firstGeoObject.getAddressLine());
      // setAddressAdd({
      //   address: firstGeoObject.getAddressLine(),
      //   cor: coords.join(","),
      // });
    });
  }

  const hanleAdress = (location, name, index, type) => {
    setValue(name, location?.GeoObject?.name);
    if (type === "loading") {
      updateLoading(index, {
        address: watch(`loadings.${index}.address`),
        cor: location?.GeoObject?.Point?.pos,
        from_date: watch(`loadings[${index}].from_date`) || "",
        loading_num:`loadings[${index}].loading_num`,
      });
    } else {
      updateUnloading(index, {
        address: watch(`unloading.${index}.address`),
        cor: location?.GeoObject?.Point?.pos,
        to_date: watch(`unloading.${index}.to_date`) || "",
      });
    }

    setResults([]);
  };

  const lodingChangeDate = (type, date, index) => {
    if (type === "loading") {
      updateLoading(index, { ...loadings[index], from_date: date });
    } else {
      updateUnloading(index, { ...unloading[index], to_date: date });
    }
  };

  function onMapClick(e) {
    const coordinates = e.get("coords");
    // if (yandexMapRef.current) {
    //   const map = yandexMapRef.current;
    //   console.log("map",map)

    //   const coords = map.setCenter(e.get('clientX'), e.get('clientY'));
    //   onMapClick(coords);
    // }
    getPlaceMarkAddress(coordinates);
    setPlaceMarkGeometry(coordinates);

    setValue("cor", coordinates.join(","));
  }

  const handleGeocode = async () => {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAP_KEY; // Yandex API kalitini bu yerga qo'ying
    const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${debouncedValue}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.response) {
        const geoObjects = data.response.GeoObjectCollection.featureMember;
        console.log("data", data.response.GeoObjectCollection.featureMember);
        setResults(geoObjects);
      } else {
        console.log("Manzil topilmadi");
      }
    } catch (error) {
      console.error("Geokodlashda xatolik:", error);
    }
  };

  useEffect(() => {
    if (address) {
      handleGeocode();
    }
  }, [debouncedValue]);

  return {
    loadings,
    register,
    control,
    disabled,
    watch,
    setValue,
    handleAppendLoading,
    handleRemoveLoading,
    handleUnloadingAppend,
    handleUnloadingRemove,
    unloading,
    handleOpenModal,
    handleCloseModal,
    setIsModalOpen,
    isModalOpen,
    onMapClick,
    setYMaps,
    yandexMapRef,
    placeMarkGeometry,
    coordinates,
    setAddress,
    setActiveIndex,
    results,
    activeIndex,
    hanleAdress,
    address,
    lodingChangeDate,
    onCreateCargoSuccess,
    canEdit,
  };
};

export default useStepTwoProps;
