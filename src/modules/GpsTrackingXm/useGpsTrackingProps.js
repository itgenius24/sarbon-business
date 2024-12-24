import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  useGetCar,
  useGetCarDispatcher,
  useGetCarRefueling,
  useGetMeasurement,
  useGetTrailerType,
  useGetUserData,
  useLoadingTypes,
  useLocation,
  useLogistikaGpsTrackingFilterDriver,
  useUpdateUserInfo,
} from "@/services/api";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useGetLang } from "@/hooks/useGetLang";
import {
  BrokeDownIcon,
  GreenMapIcon,
  OurCargoIcon,
  SomeoneCargoIcon,
  WaitingForDriverIcon,
} from "@/assets/icons/icons";
import { useDebounce } from "use-debounce";
import authStore from "@/store/auth.store";

/* eslint no-undef: 0 */ // --> OFF
export const useGpsTrackingProps = () => {
  // const {watch} = useForm()
  const locale = useGetLang();
  const role_id = authStore.userData.role_id;
  const disId = authStore.userData.id;
  const firm_id =
    role_id === `f81d3c3d-228d-479e-a2b1-9948c98640f2`
      ? authStore.userData.firm_id
      : ``;

  const { t } = useTranslation(locale, "translations");

  const [distanceParameters, setDistanceParameters] = useState({});
  const [locationNames, setLocationNames] = useState([]);
  const [checked, setChecked] = useState(true);
  const [locationData, setLocationData] = useState([]);
  const [distance, setDistance] = useState(50);
  const [closeRes, setCLoseRes] = useState(false);
  const [offset, setOffset] = useState(1);
  const [offsetCar, setOffsetCAr] = useState(0);
  const [contendSingle, setContendSingle] = useState();
  const [iconStatus, setIconStatus] = useState(``);
  const [modalType, setModalType] = useState("");
  const [centerModalType, setCenterModalType] = useState("");
  const [loadState, setLoadState] = useState({});
  const [loadHoverState, setHoverLoadState] = useState({});
  const [contendHoverState, setConHoverState] = useState();
  const [stateMap, setStateMap] = useState(false);
  const [addressAdd, setAddressAdd] = useState();
  const [loadCheck, setLoadCheck] = useState(true);
  const [refuelingState, setRefuelingState] = useState(false);
  const [data, setData] = useState([]); // Hozirgi state
  const [isLoading, setIsLoading] = useState(false); // Loading holati
  const [remainingData, setRemainingData] = useState([]);
  const [checkboxStatuses, setCheckboxStatuses] = useState({
    empty: true,
    our_cargo: true,
    someone_cargo: true,
    broke_down: true,
    waiting_for_driver: true,
  });

  const [debouncedValue] = useDebounce(distance, 500);

  useEffect(() => {
    if (checked) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [checked]);

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    fields: locations,
    append,
    remove,
    swap,
  } = useFieldArray({
    control,
    name: "locations",
  });

  const mapIcon = {
    empty: GreenMapIcon,
    waiting_for_driver: WaitingForDriverIcon,
    our_cargo: OurCargoIcon,
    someone_cargo: SomeoneCargoIcon,
    broke_down: BrokeDownIcon,
  };

  function handleAppend() {
    setLocationNames([...locationNames, ""]);
    append({ name: "" });
  }

  function handleRemove(index) {
    setLocationNames((locationNames) => {
      locationNames.splice(index, 1);
      return [...locationNames];
    });
    remove(index);
  }

  function onAdditionalAddressChange(e, index) {
    setLocationNames([
      ...locationNames.slice(0, index),
      e.target.value,
      ...locationNames.slice(index + 1),
    ]);
  }

  const multiRouteRef = useRef(null);
  const mapRef = useRef(null);

  function handleCalculate() {
    const multiRoute = multiRouteRef.current;
    if (multiRoute) {
      const intervalLocations = locationNames.filter((item) => item !== "");
      multiRoute.model.setReferencePoints([
        watch("from"),
        ...intervalLocations,
        watch("to"),
      ]);
      // if(multiRoute.getRoutes().get(0)) {
      //   const duration = multiRoute.getRoutes().get(0).properties.get("duration").text;
      //   const distance = multiRoute.getRoutes().get(0).properties.get("distance").text;
      //   setDistanceParameters({ duration, distance });
      // }
      // console.log(multiRoute.getWayPoints());
      // const locations = [watch("from"), ...locationNames, watch("to")];
      // locations.forEach((item, index) => {
      //   console.log(multiRoute.getWayPoints().get(index).properties.getAll());
      // });
      // console.log(multiRoute.getWayPoints().get(0).properties.getAll());
      // console.log(multiRoute.getWayPoints().get(1).properties.getAll());
    }
  }

  function initYmaps() {
    /**
     * Creating a multiroute.
     * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
     */

    if (window?.ymaps) {
      ymaps.ready(() => {
        var multiRoute = new ymaps.multiRouter.MultiRoute(
          { referencePoints: [[], []] },
          {
            editorMidPointsType: "via",
            routeActiveStrokeColor: "#175CD3",
            editorDrawOver: false,
          }
        );

        multiRoute.events.add("update", function () {
          if (multiRoute.getRoutes().get(0)) {
            const duration = multiRoute
              .getRoutes()
              .get(0)
              .properties.get("duration").text;
            const distance = multiRoute
              .getRoutes()
              .get(0)
              .properties.get("distance").text;
            setDistanceParameters({
              duration,
              distance,
            });
          }
        });

        const searchControl = new ymaps.control.SearchControl({
          options: { float: "right" },
        });

        // Creating the map with the button added to it.
        var myMap = new ymaps.Map(
          "map",
          {
            center: [41.40587471972005, 69.46086540238926],
            zoom: 7,
            controls: [searchControl],
          },
          { buttonMaxWidth: 500 }
        );

        // Adding a multiroute to the map.
        myMap.geoObjects.add(multiRoute);

        mapRef.current = myMap;
        multiRouteRef.current = multiRoute;
      });
    }
  }

  let draggingIndex = null;

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    draggingIndex = index;
  };

  const handleDragEnter = (e, index) => {
    if (draggingIndex && draggingIndex !== index) {
      swap(draggingIndex, index);
      setLocationNames(watch("locations").map((item) => item.name));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const yandexMapRef = useRef(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formAddressName, setFormAddressName] = useState({});

  const [yMaps, setYMaps] = useState(null);

  const [coordinates, setCoordinates] = useState([
    41.40587471972005, 69.46086540238926,
  ]);
  const [placeMarkGeometry, setPlaceMarkGeometry] = useState([
    41.34908881486223, 69.3374228085318,
  ]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setStateMap(false);
    setFormAddressName({});
  }

  function getPlaceMarkAddress(coords) {
    if (stateMap) {
      yMaps?.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);
        setAddressAdd({
          address: firstGeoObject.getAddressLine(),
          cor: coords.join(","),
        });
      });
    } else {
      yMaps?.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);
        setValue("address", firstGeoObject.getAddressLine());
        setValue("cor", coords.join(","));
      });
    }
  }

  function onMapClick(e) {
    const coordinates = e.get("coords");
    getPlaceMarkAddress(coordinates);
    setPlaceMarkGeometry(coordinates);
    if (stateMap) {
      return;
    } else {
      setValue("cor", coordinates.join(","));
    }
  }

  const getTrailerType = useGetTrailerType();

  const getLoadingTypes = useLoadingTypes();
  const carTypeOptions = getTrailerType.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));

  const loadingOptions = getLoadingTypes.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));

  const getMeasurement = useGetMeasurement();

  const weightMeasurementOptions = getMeasurement.data?.response
    ?.filter((item) => !item?.base_unit.includes("meter"))
    ?.map((item) => ({
      label: item.Symbol,
      value: item.guid,
    }));
  useEffect(() => {
    if (getMeasurement.isSuccess) {
      setValue("weight_unit", weightMeasurementOptions[0]);
    }
  }, [getMeasurement.isSuccess]);

  const [carsArr, setCarsArr] = useState([]);
  const toast = useToast();

  const { mutate: getCarRefueling } = useGetCarRefueling({
    onSuccess: (res) => {
      setRemainingData(res?.data?.data);
    },
  });

  useState(() => {
    if (remainingData.length === 0) {
      getCarRefueling({
        data: {
          object_data: {},
        },
      });
    }
  }, []);

  // useEffect(() => {
  //   let interval;

  //   if (watch(`refuelingState`)) {
  //     setIsLoading(true);
  //     // Checkbox true bo'lsa, avtomatik qo'shish jarayonini boshlaymiz
  //     interval = setInterval(() => {
  //       if (remainingData.length > 0) {
  //         const nextBatch = remainingData.slice(0, 500);
  //         setData((prev) => [...prev, ...nextBatch]);
  //         setRemainingData((prev) => prev.slice(500));
  //       } else {
  //         clearInterval(interval); // Qo'shish tugasa, intervalni to'xtatamiz
  //         setIsLoading(false);
  //       }
  //     }, 1000); // Har 1 soniyada 500 tadan qo'shish
  //   } else {
  //     // Checkbox false bo'lsa, avtomatik olib tashlash jarayonini boshlaymiz
  //     setIsLoading(true);
  //     interval = setInterval(() => {
  //       if (data.length > 0) {
  //         const toRemove = data.slice(-500);
  //         setData((prev) => prev.slice(0, -500));
  //         setRemainingData((prev) => [...toRemove, ...prev]);
  //       } else {
  //         clearInterval(interval); // Olib tashlash tugasa, intervalni to'xtatamiz
  //         setIsLoading(false);
  //       }
  //     }, 1000); // Har 1 soniyada 500 tadan olib tashlash
  //   }

  //   return () => clearInterval(interval); // Intervalni tozalash
  // }, [watch(`refuelingState`), remainingData, data]);

  const { mutate: dataMutate, isPending } = useGetCarDispatcher({
    onSuccess: (data) => {
      if (data?.response?.length) {
        let data2 = data?.response?.map((item) => ({
          user: item?.users_id_data?.[0],
          vehicles: [item?.vehicle_id_data],
          users_gps: [item],
          firm_data: item?.firm_data,
          orders: item?.order_data ? [item?.order_data] : undefined,
        }));
        setCarsArr((res) => [...res, ...data2]);
      }
    },
  });

  const dataUserID = useMemo(() => {
    let id = "";
    if (watch("users_id")) {
      id = watch("users_id");
    }

    return carsArr?.filter((item) => item?.user?.guid === id);
  }, [watch("users_id")]);

  const { mutate: getLocation, isPending: locationPending } = useLocation({
    onSuccess: (data) => {
      const data2 = data?.data?.response;
      // console.log(`dats`, data2);
      if (data?.data?.response?.length === 40) {
        setOffsetCAr(offsetCar + 1);
      }
      if (data?.data?.response?.length) {
        setLocationData((res) => [...res, ...data2]);
      }
      if (data?.data?.response?.length === null && !closeRes) {
        getLocation({ data: { object_data: { limit: 40, page: offsetCar } } });
      }
    },
  });

  const filterData = (data, checkboxStatuses) => {
    return data?.filter((item) => {
      return item?.user?.provisions?.some((status) => checkboxStatuses[status]);
    });
  };

  const filteredData = filterData(carsArr, checkboxStatuses);

  const uniqueData = filteredData.reduce((acc, current) => {
    const xistingItem = acc.find(
      (item) => item?.user?.guid === current?.user?.guid
    );
    if (!xistingItem) {
      acc.push(current);
    }
    return acc;
  }, []);

  const dataUserDataID = dataUserID.reduce((acc, current) => {
    const xistingItem = acc.find(
      (item) => item?.user?.guid === current?.user?.guid
    );
    if (!xistingItem) {
      acc.push(current);
    }
    return acc;
  }, []);

  const carTypeDataFIlter = uniqueData.filter(
    (item) =>
      item?.vehicles?.[0]?.trailer_type_id_data?.guid ===
      watch(`car_type`)?.value
  );

  const getCarListProps = useMemo(() => {
    return {
      data: watch("users_id")
        ? dataUserDataID
        : watch(`car_type`)?.value
        ? carTypeDataFIlter
        : uniqueData,
    };
  }, [
    watch("users_id"),
    watch(`car_type`)?.value,
    dataUserID,
    filteredData,
    carsArr?.length,
    uniqueData,
  ]);

  const getUserNameOptions = getCarListProps.data?.map((item) => ({
    label: item?.user?.full_name,
    value: item?.user?.guid,
  }));

  const getUserPhoneOptions = getCarListProps.data?.map((item) => ({
    label: item?.user?.phone,
    value: item?.user?.guid,
  }));

  const { mutate: userUpdate } = useUpdateUserInfo({
    onSuccess() {
      setCenterModalType(``);
      setAddressAdd("");
      if (iconStatus === "empty") {
        setModalType("driverFree");
      } else if (iconStatus === "our_cargo") {
        setModalType("driverCheck");
      } else if (iconStatus === "someone_cargo") {
        setModalType("driverQuestion");
      } else if (iconStatus === "broke_down") {
        setModalType("driverFree");
      }

      const find = getCarListProps?.data?.map((item) => {
        if (item?.user?.guid === contendSingle.user?.guid) {
          return { ...item, ...(item.user.provisions = [iconStatus]) };
        }
        return item;
      });

      setCarsArr(find);
    },
    onError() {},
  });

  const addAdress = () => {
    const body = {
      guid: contendSingle.users_id_data?.guid,
      address_name: addressAdd?.address,
    };
    userUpdate({ data: body });
  };

  const getUserOption = getUserNameOptions.concat(getUserPhoneOptions);

  useEffect(() => {
    console.log("offsetCar");
    getLocation({ data: { object_data: { limit: 40, page: offsetCar } } });
  }, [offsetCar]);

  useEffect(() => {
    if (!watch("aaddress")) {
      dataMutate({
        data: {
          object_data: {
            lat: watch("cor")?.split(",")[0],
            long: watch("cor")?.split(",")[1],
            number: distance * 4 || 100,
            load_type_id: watch("load_type_id")?.value,
            weight: watch("weight"),
            volume: watch("volume"),
            limit: 1000,
            page: offset,
            type: "customer",
            dispetchir_id: disId,
          },
        },
      });
    }
  }, [
    watch("cor")?.split(",")[0],
    debouncedValue,
    watch("load_type_id")?.value,
    watch("weight"),
    watch("volume"),
    offset,
  ]);

  const handleClear = () => {
    setOffset(0);
    setValue("cor", ``);
    setValue("address", ``);
    setValue("car_type", null);
    setValue("weight", null);
    setValue("load_type_id", null);
    setValue("volume", null);
    setDistance(50);
    setCheckboxStatuses({
      empty: true,
      our_cargo: true,
      someone_cargo: true,
      broke_down: true,
      waiting_for_driver: true,
    });
    setLoadCheck(true);
  };
  const onSubmit = (data) => {
    const [lat, long] = data.cor.split(",");
    mutate({
      data: {
        object_data: {
          lat,
          long,
          number: distance || "100",
          // car_type_id: watch("car_type")?.value,
          load_type_id: watch("load_type_id")?.value,
          weight: watch("weight"),
          volume: watch("volume"),
          limit: 40,
          page: offset,
        },
      },
    });
  };

  const statusIconChange = () => {
    const body = {
      guid: contendSingle.user?.guid,
      provisions: [iconStatus],
    };
    userUpdate({ data: body });
  };

  const handleCheckboxChange = (status) => {
    setCheckboxStatuses((prevState) => ({
      ...prevState,
      [status]: !prevState[status],
    }));
  };

  const handleInputClear = () => {
    setOffset(0);
  };

  const depArr = [typeof window !== "undefined" ? window?.ymaps : null];

  useEffect(() => {
    const ymapsScript = document.getElementById("yandex-maps-script");
    if (ymapsScript) {
      initYmaps();
    }
  }, depArr);

  return {
    register,
    locations,
    locationData,

    errors,
    handleAppend,
    handleRemove,
    onAdditionalAddressChange,
    distanceParameters,
    watch,
    handleCalculate,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    loadingOptions,
    carTypeOptions,
    handleOpenModal,
    isModalOpen,
    handleCloseModal,
    coordinates,
    onMapClick,
    placeMarkGeometry,
    setYMaps,
    yandexMapRef,
    setIsModalOpen,
    weightMeasurementOptions,
    control,
    getCarListProps,
    onSubmit,
    handleSubmit,
    driverName: true,
    isLoading: isPending,
    locationPending,
    setValue,
    setChecked,
    mapIcon,
    checked,
    getUserOption,
    setDistance,
    distance,
    handleClear,
    setContendSingle,
    contendSingle,
    setIconStatus,
    iconStatus,
    statusIconChange,
    modalType,
    setModalType,
    centerModalType,
    setCenterModalType,
    setLoadState,
    loadState,
    checkboxStatuses,
    handleCheckboxChange,
    setStateMap,
    handleInputClear,
    setConHoverState,
    contendHoverState,
    setLoadCheck,
    loadCheck,
    setOffset,
    setHoverLoadState,
    loadHoverState,
    addressAdd,
    stateMap,
    addAdress,
    setLocationData,
    refueling: remainingData,
    setRefuelingState,
    refuelingState,
    isLoadingRefueling: isLoading,
    setRefueling: setRemainingData,
  };
};
