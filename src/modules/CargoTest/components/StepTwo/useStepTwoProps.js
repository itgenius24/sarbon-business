import { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useAddCargoContext } from "../../providers";

const useStepTwoProps = ({ locale }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [index, setIndex] = useState();
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
  const {
    control,
    register,
    watch,
    setValue,
    errors,
    canEdit,
    getValues,
    handleResetForm,
    setEditModal,
  } = useAddCargoContext();


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

  };

  useEffect(() => {
    if (watch(`addressFrom`)?.length <= 0 && activeIndex) {
      setValue(activeIndex, ``);
    } else if (watch(`addressTo`)?.length <= 0 && activeIndex) {
      setValue(activeIndex, ``);
    }
  }, [watch(`addressFrom`), watch(`addressTo`)]);

  const handLeCheck2 = (e) => {
    setas_soon_as_b(e.target.checked);
    setValue(`as_soon_as_b`, e.target.checked);
  };

  const watchFields = useWatch({
    control,
    name: [
      "loadings[0].address",
      "unloading[0].address",
      "loadings[0].from_date",
      "as_soon_as_a",
      "as_soon_as_b",
      "unloading[0].to_date",
    ],
  });

  useEffect(() => {
    const [
      loadingAddress,
      unloadingAddress,
      loadingDate,
      asSoonAsA,
      asSoonAsB,
      unloadingDate,
    ] = watchFields;

    if (
      loadingAddress &&
      unloadingAddress &&
      (loadingDate || asSoonAsA) &&
      (asSoonAsB || unloadingDate)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watchFields]);

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
    setValue(`loadings`, watch(`loadings`)?.filter((item, index) => index !== indx));
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

  function handleUnloadingRemove(indx, id) {
    setValue(`unloading`,watch(`unloading`)?.filter((item, index) => index !== indx));
    if (id) {
      const period_ids = watch(`period_ids`) || [];
      const data = period_ids?.filter((item) => item === id);
      if (data?.length === 0 || data === undefined) {
        setValue(`period_ids`, [...period_ids, id]);
      }
    }
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
      var countryCode = firstGeoObject?.getCountryCode()?.toUpperCase();
      var countryName = res.geoObjects.get(0)?._xalEntities.country;
      var flagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

      setValue(nameState, firstGeoObject.getAddressLine());
      if (type === "loading") {
        setValue(`loadings.${[index]}`, {
          ...watch(`loadings`)[index],
          address: firstGeoObject.getAddressLine(),
          cor: `${firstGeoObject.geometry._coordinates[0]} ${firstGeoObject.geometry._coordinates[1]}`,
          from_date: watch(`loadings[${index}].from_date`) || "",
        });
        if (index === 0) {
          setValue(`flag_ot`, flagUrl);
          setValue(`country_code_from`, countryCode);
          setValue(`country_from`, countryName);
        }
      } else {
        setValue(`unloading.${[index]}`, {
          ...watch(`unloading`)[index],
          address: firstGeoObject.getAddressLine(),
          cor: `${firstGeoObject.geometry._coordinates[0]} ${firstGeoObject.geometry._coordinates[1]}`,
          to_date: watch(`unloading[${index}].to_date`) || "",
        });
        if (index === 0) {
          setValue(`flag_do`, flagUrl);
          setValue(`country_code_to`, countryCode);
          setValue(`country_to`, countryName);
        }
      }
      // setValue(nameState, firstGeoObject.getAddressLine());
      // setAddressAdd({
      //   address: firstGeoObject.getAddressLine(),
      //   cor: coords.join(","),
      // });
    });
  }

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
      location?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
    );
    const country_code =
      location?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.country_code?.toUpperCase();
    const country_name =
      location?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address
        ?.Components?.[0]?.name;

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
        setValue(`country_from`, country_name);
      }
    } else {
      setValue(`unloading.${[index]}`, {
        ...watch(`unloading`)[index],
        address: watch(`unloading[${index}].address`),
        cor: location?.GeoObject?.Point?.pos?.split(` `)?.reverse()?.join(` `),
        to_date: watch(`unloading[${index}].to_date`) || "",
      });
      if (index === 0) {
        setValue(`flag_do`, flagUrl);
        setValue(`country_code_to`, country_code);
        setValue(`country_to`, country_name);
      }
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
        setResults(geoObjects);
      }
    } catch (_) { return }
  };

  useEffect(() => {
    if (address && debouncedValue.length >= 3) {
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
    handleResetForm,
    setDisabled,
    setEditModal,
  };
};

export default useStepTwoProps;
