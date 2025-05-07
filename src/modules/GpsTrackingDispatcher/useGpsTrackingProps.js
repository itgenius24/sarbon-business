import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  useCreateActionHistoriesMutation,
  useCreateLogHistory,
  useGetCarDispatcher,
  useGetCargoById,
  useGetCarRefueling,
  useGetMeasurement,
  useGetTrailerType,
  useLoadingTypes,
  useLocation,
  useUpdateUserInfo,
} from "@/services/api";
import { useToast } from "@chakra-ui/react";

import {
  BrokeDownIcon,
  GreenMapIcon,
  OurCargoIcon,
  SomeoneCargoIcon,
  WaitingForDriverIcon,
} from "@/assets/icons/icons";
import { useDebounce } from "use-debounce";
import authStore from "@/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";

/* eslint no-undef: 0 */ // --> OFF
export const useGpsTrackingProps = (locale) => {
  const router = useRouter()
  const mapRef = useRef()
  const searchParams = useSearchParams();
  const guid = searchParams.get(`guid`);
  const provisions = searchParams.get(`provisions`);
  const full_name = searchParams.get(`full_name`);
  const battery = searchParams.get(`battery`);
  const createdAt = searchParams.get(`createdAt`);
  const os = searchParams.get(`os`);
  const lat = searchParams.get(`lat`);
  const long = searchParams.get(`long`);
  const version = searchParams.get(`version`);
  const phone = searchParams.get(`phone`);
  const car_number = searchParams.get(`car_number`);
  const car_country = searchParams.get(`car_country`);
  const type = searchParams.get(`car_type`);
  const capacity = searchParams.get(`car_capacity`);
  const height = searchParams.get(`car_height`);
  const car_type_name = searchParams.get(`car_type_name`);
  const cargo_guid = searchParams.get(`cargo_guid`);
  const dispatcher_id = searchParams.get(`dispatcher_id`);
  const disId = authStore.userData.id;
  const [distanceParameters, setDistanceParameters] = useState({});
  const [locationNames, setLocationNames] = useState([]);
  const [checked, setChecked] = useState(true);
  const [locationData, setLocationData] = useState([]);
  const [distance, setDistance] = useState(50);
  const [closeRes, setCLoseRes] = useState(false);
  const [offset, setOffset] = useState(1);
  const [remainingData, setRemainingData] = useState([]);
  const [offsetCar, setOffsetCAr] = useState(1);
  const [currentUserLocationData, setCurrentUserLocationData] = useState();
  const [iconStatus, setIconStatus] = useState(``);
  const [modalType, setModalType] = useState("");
  const [centerModalType, setCenterModalType] = useState("");
  const [loadState, setLoadState] = useState({});
  const [loadHoverState, setHoverLoadState] = useState({});
  const [contendHoverState, setConHoverState] = useState();
  const [stateMap, setStateMap] = useState(false);
  const [addressAdd, setAddressAdd] = useState();
  const [loadCheck, setLoadCheck] = useState(true);
  const [isBalloonOpened, setIsBalloonOpened] = useState(false);
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

  const getCargo = useGetCargoById(
    {
      data: JSON.stringify({
        guid: cargo_guid,
        with_relations: true,
      }),
    },

    {
      onSuccess: (res) => {
        const objContend = {
          user: {
            full_name,
            guid,
            phone,
            provisions: [provisions],
          },
          users_gps: [
            {
              battery,
              update_time: createdAt,
              os,
              lat,
              long,
              version,
            },
          ],
          vehicles: [
            {
              car_country,
              type,
              capacity,
              height,
              car_number,
              trailer_type_id_data: {
                guid: type,
                name: car_type_name,
              },
            },
          ],
          orders: [
            {
              cargo_id_data: res?.response?.[0],
            },
          ],
          disp_data: [{ users_id_2: dispatcher_id }]
        };
        setCurrentUserLocationData(objContend);
        if (provisions === "empty") {
          setModalType("driverFree");
        } else if (provisions === "our_cargo") {
          setModalType("driverCheck");
        } else if (provisions === "someone_cargo") {
          setModalType("driverQuestion");
        } else if (provisions === "broke_down") {
          setModalType("driverFree");
        }
      },
      enabled: Boolean(cargo_guid),
    }
  );

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

  const { mutate: logHistory } = useCreateLogHistory({});

  useEffect(() => {
    logHistory({
      data: {
        users_id: authStore.userData.guid,
        last_move_time: new Date(),
        menu: `gps_track`,
      },
    });
  }, []);

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

  function handleCalculate() {
    const multiRoute = multiRouteRef.current;
    if (multiRoute) {
      const intervalLocations = locationNames.filter((item) => item !== "");
      multiRoute.model.setReferencePoints([
        watch("from"),
        ...intervalLocations,
        watch("to"),
      ]);
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

  const { mutate: dataMutate, isLoading } = useGetCarDispatcher({
    onSuccess: (data) => {
      if (data?.response?.length) {
        let data2 = data?.response?.map((item) => ({
          ...item,
          user: item?.users_id_data?.[0],
          vehicles: [item?.vehicle_id_data],
          firm_data: item?.firm_data,
          users_gps: [item],
          orders: item?.order_data ? [item?.order_data] : undefined,
        }));
   
        setCarsArr((res) => [...res, ...data2]);
      }
    },
  });


  useEffect(() => {
    if (guid || !cargo_guid) {
      const objContend = {
        user: {
          full_name,
          guid,
          phone,
          provisions: [provisions],
        },
        users_gps: [
          {
            battery,
            update_time:createdAt,
            os,
            lat,
            long,
            version,
          },
        ],
        vehicles: [
          {
            car_country,
            type,
            capacity,
            height,
            car_number,
            trailer_type_id_data: {
              guid: type,
              name: car_type_name,
            },
          },
        ],
        disp_data: [{ users_id_2: dispatcher_id }]
      };
      setCurrentUserLocationData(objContend);
      if (provisions === "empty") {
        setModalType("driverFree");
      } else if (provisions === "our_cargo") {
        setModalType("driverCheck");
      } else if (provisions === "someone_cargo") {
        setModalType("driverQuestion");
      } else if (provisions === "broke_down") {
        setModalType("driverFree");
      }
    }
  }, []);


  const dataUserID = useMemo(() => {
    let id = "";
    if (watch("users_id")) {
      id = watch("users_id");
    }

    return carsArr?.filter((item) => item?.user?.guid === id);
  }, [watch("users_id")]);

  const { mutate: getLocation, isLoading: locationPending } = useLocation({
    onSuccess: (data) => {
      const data2 = data?.data?.response;
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

  const { mutate: getCarRefueling } = useGetCarRefueling({
    onSuccess: (res) => {
      setRemainingData(res?.data?.data);
    },
  });

  useEffect(() => {
    if (remainingData.length === 0) {
      getCarRefueling({
        data: {
          object_data: {},
        },
      });
    }
  }, []);

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

  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const { mutate: userUpdate } = useUpdateUserInfo({
    onSuccess() {
      router.push(`/${locale}/gps-tracking-dispatcher`);
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
        if (item?.user?.guid === currentUserLocationData.user?.guid) {
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
      guid: currentUserLocationData.users_id_data?.guid,
      address_name: addressAdd?.address,
    };
    userUpdate({ data: body });
  };

  const getUserOption = getUserNameOptions.concat(getUserPhoneOptions);

  useEffect(() => {
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
            weight: +watch("weight"),
            volume: +watch("volume"),
            limit: 1000,
            page: offset,
            type: "dispatcher",
            first_dispatcher_id: disId,
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

  const statusIconChange = () => {
    const body = {
      guid: currentUserLocationData.user?.guid,
      provisions: [iconStatus],
    };
    userUpdate({ data: body });
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: currentUserLocationData?.user.your_id,
        action_time: new Date(),
        role_slug: `first_dispatcher`,
        action_comment: `changed_driver_status`,
        role_id: authStore.userData?.role_id,
        action_type: [`update`],
      },
    });
  };

  const handleCheckboxChange = (status,status_waiting) => {
    if(status_waiting){
      setCheckboxStatuses((prevState) => ({
        ...prevState,
        [status]: !prevState[status],
        [status_waiting]: !prevState[status_waiting],
      }));
    }else{
      setCheckboxStatuses((prevState) => ({
        ...prevState,
        [status]: !prevState[status],
      }));
    }
  
  };
  const handleInputClear = () => {
    setOffset(0);
  };

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
    handleSubmit,
    driverName: true,
    isLoading: isLoading,
    locationPending,
    setValue,
    setChecked,
    mapIcon,
    checked,
    getUserOption,
    setDistance,
    distance,
    handleClear,
    setCurrentUserLocationData,
    currentUserLocationData,
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
    isBalloonOpened,
    setIsBalloonOpened,
    refueling: remainingData,
    mapRef
  };
};
