import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
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

/* eslint no-undef: 0 */ // --> OFF
export const useGpsTrackingProps = () => {
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const [distanceParameters, setDistanceParameters] = useState({});
  const [locationNames, setLocationNames] = useState([]);
  const [checked, setChecked] = useState(true);
  const [locationData, setLocationData] = useState([]);
  const [distance, setDistance] = useState(50);
  const [closeRes, setCLoseRes] = useState(false);
  const [offset, setOffset] = useState(0);
  const [offsetCar, setOffsetCAr] = useState(0);
  const [contendSingle, setContendSingle] = useState();
  const [iconStatus, setIconStatus] = useState(``);
  const [modalType, setModalType] = useState("");
  const [centerModalType, setCenterModalType] = useState("");
  const [loadState,setLoadState] = useState({});
  const [stateMap,setStateMap] = useState(false)
  const [addressAdd,setAddressAdd] = useState()
  const [checkboxStatuses, setCheckboxStatuses] = useState({
    empty: true,
    our_cargo: true,
    someone_cargo: true,
    broke_down: true,
    waiting_for_driver: true,
  });

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
          { buttonMaxWidth: 300 }
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
    setStateMap(false)
    setFormAddressName({});
  }

  function getPlaceMarkAddress(coords) {
    if(stateMap){
      yMaps?.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);
        setAddressAdd({
          address: firstGeoObject.getAddressLine(),
          cor:coords.join(",")
        })
      });
     
    }else{
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
    setValue("cor", coordinates.join(","));
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

  const { mutate, isPending } = useLogistikaGpsTrackingFilterDriver({
    onSuccess(data) {
      if (data?.data?.response?.length === 40) {
        setOffset(offset + 1);
      }
      if (watch("address")) {
        console.log(`data?.data?.response?.length`, data?.response?.length);
        if (data?.response?.length) {
          setCarsArr(
            data?.response?.filter(
              (item) => item?.users_id_data?.vehicle_type_id_data
            )
          );
        } else {
          setCarsArr([]);
          toast({
            title: t("Не найдено"),
            description: t("К сожалений ничего не найдено"),
            status: "info",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      } else {
        if (data?.data?.response?.length) {
          const data2 = data?.data?.response?.filter(
            (item) => item?.users_id_data?.vehicle_type_id_data
          );
          setCarsArr((res) => [...res, ...data2]);
        } else {
          setCarsArr([]);
          toast({
            title: t("Не найдено"),
            description: t("К сожалений ничего не найдено"),
            status: "info",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
        if (data?.data?.response?.length === null && !closeRes) {
          setCLoseRes(true);
          mutate({ data: { object_data: { limit: 40, page: offset } } });
        }
      }
    },
  });

  const dataUserID = useMemo(() => {
    let id = "";
    if (watch("users_id")?.value) {
      id = watch("users_id")?.value;
    } else if (watch("users_id2")?.value) {
      id = watch("users_id2")?.value;
    }

    return carsArr?.filter((item) => item?.users_id === id);
  }, [watch("users_id")?.value, watch("users_id2")?.value]);

  const { mutate: getLocation } = useLocation({
    onSuccess: (data) => {
      const data2 = data?.data?.response;
      console.log(`dats`, data2);
      if (data?.data?.response?.length === 20) {
        setOffsetCAr(offsetCar + 1);
      }
      if (data?.data?.response?.length) {
        setLocationData((res) => [...res, ...data2]);
      }
      if (data?.data?.response?.length === null && !closeRes) {
        getLocation({ data: { object_data: { limit: 20, page: offsetCar } } });
      }
    },
  });

  // const filterData = (data, checkboxStatuses) => {
  //   return data?.filter(item => {
  //     console.log("carsArr",item?.users_id_data?.provisions?.some(status => checkboxStatuses[status]))

  //     return item?.users_id_data?.provisions?.some(status => checkboxStatuses[status]);
  //   });
  // };

  // const filteredData = filterData(carsArr, checkboxStatuses);

  const getCarListProps = useMemo(() => {
    return {
      data: watch("users_id")?.value ? dataUserID : carsArr,
    };
  }, [watch("users_id")?.value, dataUserID, carsArr]);


  

  const getUserNameOptions = getCarListProps.data?.map((item) => ({
    label: item?.users_id_data?.full_name,
    value: item?.users_id_data?.guid,
  }));

  const getUserPhoneOptions = getCarListProps.data?.map((item) => ({
    label: item?.users_id_data?.phone,
    value: item?.users_id_data?.guid,
  }));
  const { mutate: userUpdate } = useUpdateUserInfo({
    onSuccess() {
      setCenterModalType(``);
      toast({
        title: "Успешно изменено!",
        description: "Вы успешно обновили этого пользователя",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError() {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить пользователя!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const getUserOption = getUserNameOptions.concat(getUserPhoneOptions);

  useEffect(() => {
    getLocation({
      data: { object_data: { limit: 20, page: offsetCar } },
    });
  }, []);

  useEffect(() => {
    if (!watch("aaddress")) {
      mutate({
        data: {
          object_data: {
            lat: watch("cor")?.split(",")[0],
            long: watch("cor")?.split(",")[1],
            number: distance * 2 || 100,
            car_type_id: watch("car_type")?.value,
            load_type_id: watch("load_type_id")?.value,
            weight: watch("weight"),
            volume: watch("volume"),
            limit: 40,
            page: offset,
          },
        },
      });
    }
  }, [
    watch("cor")?.split(",")[0],
    distance,
    watch("car_type")?.value,
    watch("load_type_id")?.value,
    watch("weight"),
    watch("volume"),
    offset,
  ]);

  const handleClear = () => {
    setValue("cor", ``);
    setValue("address", ``);
    setValue("car_type", null);
    setValue("weight", null);
    setValue("load_type_id", null);
    setValue("volume", null);
    // setModalType('');
  };
  const onSubmit = (data) => {
    const [lat, long] = data.cor.split(",");
    mutate({
      data: {
        object_data: {
          lat,
          long,
          number: distance || "100",
          car_type_id: watch("car_type")?.value,
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
      guid:contendSingle.users_id_data.guid,
      provisions:[iconStatus]
     
    };
    userUpdate({ data: body });
  };

  const handleCheckboxChange = (status) => {
    setCheckboxStatuses(prevState => ({
      ...prevState,
      [status]: !prevState[status],
    }));
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
    modalType,setModalType,centerModalType,setCenterModalType,
    setLoadState,
    loadState,
    checkboxStatuses,
    handleCheckboxChange,
    setStateMap
  };
};
