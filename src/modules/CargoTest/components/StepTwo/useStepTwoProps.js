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
  const { control, register, watch, setValue, errors, canEdit, getValues, loadings,appendLoading,removeLoading,updateLoading,unloading,appendUnloading,removeUnloading,updateUnloading} =
    useAddCargoContext();


 

 


  useEffect(() => {
    if(watch(`loadings[0].address`) && watch("unloading[0].address") && watch(`loadings[0].loading_num`) ){
      setDisabled(false)
    } else{
      setDisabled(true)
    }
  },[watch("loadings[0].address")?.label, watch("unloading[0].address")?.length , watch("loadings[0].loading_num`")?.length])
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
  // console.log(`firstGeoObject`,watch(`loadings[${index}].loading_num`))

  function getPlaceMarkAddress(coords) {
    yMaps?.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);
      console.log(`firstGeoObject`,watch(`loadings[${index}].loading_num`))
      setValue(nameState, firstGeoObject.getAddressLine());
      if (type === "loading") {
        updateLoading(index, {
          ...loadings[index],
          address: firstGeoObject.getAddressLine(),
          cor: `${firstGeoObject.geometry._coordinates[0]} ${firstGeoObject.geometry._coordinates[1]}`,
          from_date: watch(`loadings[${index}].from_date`) || "",
        });
      } else {
        updateUnloading(index, {
          address: firstGeoObject.getAddressLine(),
          cor: `${firstGeoObject.geometry._coordinates[0]} ${firstGeoObject.geometry._coordinates[1]}`,
          to_date: watch(`unloading[${index}].to_date`) || "",
        });
      }
      // setValue(nameState, firstGeoObject.getAddressLine());
      // setAddressAdd({
      //   address: firstGeoObject.getAddressLine(),
      //   cor: coords.join(","),
      // });
    });
  }

  console.log(`loading2323`,loadings,unloading)

  const hanleAdress = (location, name, index, type) => {
    setValue(name, location?.GeoObject?.name);
    if (type === "loading") {
      updateLoading(index, {
        ...loadings[index],
        address: watch(`loadings[${index}].address`),
        cor: location?.GeoObject?.Point?.pos,
        from_date: watch(`loadings[${index}].from_date`) || "",
       
      });
    } else {
      updateUnloading(index, {
        address: watch(`unloading[${index}].address`),
        cor: location?.GeoObject?.Point?.pos,
        to_date: watch(`unloading[${index}].to_date`) || "",
      });
    }

    setResults([]);
  };

  const loadingNumF = (num,index) => {
    updateLoading(index, {
      ...loadings[index],
      loading_num:num,
    });
  }

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
    loadingNumF
  };
};

export default useStepTwoProps;
