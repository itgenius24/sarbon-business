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
  const [disabled, setDisabled] = useState(true);

  const [as_soon_as_b, setas_soon_as_b] = useState(true);
  const [as_soon_as_a, setas_soon_as_a] = useState(false);

  const [placeMarkGeometry, setPlaceMarkGeometry] = useState([
    41.34908881486223, 69.3374228085318,
  ]);
  const [coordinates, setCoordinates] = useState([
    41.40587471972005, 69.46086540238926,
  ]);
  const [yMaps, setYMaps] = useState(null);
  const yandexMapRef = useRef(undefined);
  const { control, register, watch, setValue, errors, canEdit, getValues,handleResetForm } =
    useAddCargoContext();

  // useEffect(() => {
  //   if(canEdit && watch(`as_soon_as_a`)){
  //     setas_soon_as_a(true)

  //   } else{
  //     setas_soon_as_a(false)
  //   }
  // },[canEdit,watch(`as_soon_as_a`)])

  useEffect(() => {
    if (canEdit && watch(`as_soon_as_b`)) {
      setas_soon_as_b(false);
    } else {
      setas_soon_as_b(true);
    }
  }, [canEdit, watch(`as_soon_as_b`)]);

  const handLeCheck = (e) => {
    setas_soon_as_a(e.target.checked);
    setValue(`as_soon_as_a`, e.target.checked);
    // setValue(`loadings.${[index]}`, {
    //   ...loadings[index],
    //   from_date:"",
    // });
  };

  console.log(`salom`, watch(`as_soon_as_b`));

  const handLeCheck2 = (e) => {
    setas_soon_as_b(e.target.checked);
    setValue(`as_soon_as_b`, e.target.checked);
  };

  useEffect(() => {
    if (
      watch(`loadings[0].address`) &&
      watch("unloading[0].address") &&
      (watch(`loadings[0].from_date`) || watch(`as_soon_as_a`)) &&
      (watch(`as_soon_as_b`) || watch("unloading[0].to_date"))
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    watch("loadings[0].address")?.length,
    watch("unloading[0].address")?.length,
    watch(`loadings[0].from_date`),
    watch(`as_soon_as_a`),
    watch(`as_soon_as_b`),
    watch("unloading[0].from_date")
  ]);
  function onCreateCargoSuccess() {
    setValue(`cargoIndex`, 3);
  }

  function handleAppendLoading() {
    setValue(`loadings.${watch(`loadings`)?.length}`, {
      address: "",
      cor: "",
      from_date: "",
      loading_num: {},
    });
  }

  function handleRemoveLoading(indx, id) {
    setValue(
      `loadings`,
      watch(`loadings`)?.filter((item, index) => index !== indx)
    );
    if (id) {
      const period_ids = watch(`period_ids`) || [];
      const data = period_ids?.filter((item) => item === id);
      if (data?.length === 0 || data === undefined) {
        setValue(`period_ids`, [...period_ids, id]);
      }
    }
  }

  function handleUnloadingAppend() {
    setValue(`unloading.${watch(`unloading`)?.length}`, {
      address: "",
      cor: "",
      to_date: "",
    });
  }

  function handleUnloadingRemove(indx) {
    setValue(
      `unloading`,
      watch(`unloading`)?.filter((item, index) => index !== indx)
    );

    // removeUnloading(index);
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
      var countryCode = firstGeoObject.getCountryCode();
      var flagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

      setValue(nameState, firstGeoObject.getAddressLine());
      if (type === "loading") {
        setValue(`loadings.${[index]}`, {
          ...watch(`loadings`)[index],
          address: firstGeoObject.getAddressLine(),
          cor: `${firstGeoObject.geometry._coordinates[0]} ${firstGeoObject.geometry._coordinates[1]}`,
          from_date: watch(`loadings[${index}].from_date`) || "",
        });
        setValue(`flag_ot`, flagUrl);
        setValue(`country_code_from`, countryCode);
      } else {
        setValue(`unloading.${[index]}`, {
          address: firstGeoObject.getAddressLine(),
          cor: `${firstGeoObject.geometry._coordinates[0]} ${firstGeoObject.geometry._coordinates[1]}`,
          to_date: watch(`unloading[${index}].to_date`) || "",
        });
        setValue(`flag_do`, flagUrl);
        setValue(`country_code_to`, countryCode);
      }
      // setValue(nameState, firstGeoObject.getAddressLine());
      // setAddressAdd({
      //   address: firstGeoObject.getAddressLine(),
      //   cor: coords.join(","),
      // });
    });
  }

  console.log(`countryCode`, watch(`unloading`), watch(`unloading`));

  const hanleAdress = (location, name, index, type, id) => {
    if (id) {
      const period_ids = watch(`period_ids`) || [];
      const data = period_ids?.filter((item) => item === id);
      if (data?.length === 0 || data === undefined) {
        setValue(`period_ids`, [...period_ids, id]);
      }
    }
    setValue(
      name,
      `${location?.GeoObject?.name}, ${location?.GeoObject?.description ? location?.GeoObject?.description :``}`
    );
    const country_code =
      location?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.country_code?.toLowerCase();

    var flagUrl = `https://flagcdn.com/w320/${country_code?.toLowerCase()}.png`;

    if (type === "loading") {
      setValue(`loadings.${[index]}`, {
        ...watch(`loadings`)[index],
        address: watch(`loadings[${index}].address`),
        cor: location?.GeoObject?.Point?.pos?.split(` `)?.reverse()?.join(` `),
        from_date: watch(`loadings[${index}].from_date`) || "",
      });
      if (index === 0) {
        setValue(`flag_ot`, flagUrl);
        setValue(`country_code_from`, country_code);
      }
    } else {
      setValue(`unloading.${[index]}`, {
        address: watch(`unloading[${index}].address`),
        cor: location?.GeoObject?.Point?.pos?.split(` `)?.reverse()?.join(` `),
        to_date: watch(`unloading[${index}].to_date`) || "",
      });
      setValue(`flag_do`, flagUrl);
      setValue(`country_code_to`, country_code);
    }

    setResults([]);
  };

  const loadingNumF = (num, index, id) => {
    if (id) {
      const period_ids = watch(`period_ids`) || [];
      const data = period_ids?.filter((item) => item === id);
      if (data?.length === 0 || data === undefined) {
        setValue(`period_ids`, [...period_ids, id]);
      }
    }
    setValue(`loadings.${[index]}`, {
      ...watch(`loadings`)[index],
      loading_num: { value: num, label: num },
    });
  };

  const lodingChangeDate = (type, date, index, id) => {
    if (id) {
      const period_ids = watch(`period_ids`) || [];
      const data = period_ids?.filter((item) => item === id);
      if (data?.length === 0 || data === undefined) {
        setValue(`period_ids`, [...period_ids, id]);
      }
    }
    if (type === "loading") {
      setValue(`loadings.${[index]}`, {
        ...watch(`loadings`)[index],
        from_date: date,
      });
    } else {
      setValue(`unloading.${[index]}`, {
        ...watch(`unloading`)[index],
        to_date: date,
      });
    }
  };

  function onMapClick(e) {
    const coordinates = e.get("coords");
    getPlaceMarkAddress(coordinates);
    setPlaceMarkGeometry(coordinates);

    setValue("cor", coordinates.join(","));
  }

  const handleGeocode = async () => {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAP_KEY;
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
    // loadings,
    register,
    control,
    disabled,
    watch,
    setValue,
    handleAppendLoading,
    handleRemoveLoading,
    handleUnloadingAppend,
    handleUnloadingRemove,
    // unloading,
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
    as_soon_as_b,
    as_soon_as_a,
    address,
    lodingChangeDate,
    onCreateCargoSuccess,
    canEdit,
    loadingNumF,
    handLeCheck,
    handLeCheck2,
    handleResetForm
  };
};

export default useStepTwoProps;
