import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetCarType, useGetMeasurement, useGetVehicle, useLoadingTypes, useLogistikaGpsTrackingFilterDriver } from "@/services/api";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useGetLang } from "@/hooks/useGetLang";


/* eslint no-undef: 0 */ // --> OFF
export const useGpsTrackingProps = () => {

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const [distanceParameters, setDistanceParameters] = useState({});
  const [locationNames, setLocationNames] = useState([]);

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const {
    fields: locations,
    append,
    remove,
    swap
  } = useFieldArray({
    control,
    name: "locations",
  });

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
    setLocationNames([...locationNames.slice(0, index), e.target.value, ...locationNames.slice(index + 1)]);
  }

  const multiRouteRef = useRef(null);
  const mapRef = useRef(null);

  // useEffect(() => {

  // }, [locationNames, watch("from"), watch("to")]);

  function handleCalculate() {
    const multiRoute = multiRouteRef.current;
    if (multiRoute) {
      const intervalLocations = locationNames.filter(item => item !== "");
      multiRoute.model.setReferencePoints([watch("from"), ...intervalLocations, watch("to")]);
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

    ymaps.ready(() => {
      var multiRoute = new ymaps.multiRouter.MultiRoute({ referencePoints: [[], []] }, {
        editorMidPointsType: "via",
        routeActiveStrokeColor: "#175CD3",
        editorDrawOver: false,
      });

      multiRoute.events.add("update", function () {
        if (multiRoute.getRoutes().get(0)) {
          const duration = multiRoute.getRoutes().get(0).properties.get("duration").text;
          const distance = multiRoute.getRoutes().get(0).properties.get("distance").text;
          setDistanceParameters({
            duration,
            distance
          });
        }
      });

      const searchControl = new ymaps.control.SearchControl({ options: { float: "right", } });

      // Creating the map with the button added to it.
      var myMap = new ymaps.Map("map", {
        center: [41.40587471972005, 69.46086540238926],
        zoom: 7,
        controls: [searchControl],
      }, { buttonMaxWidth: 300 });

      // Adding a multiroute to the map.
      myMap.geoObjects.add(multiRoute);

      mapRef.current = myMap;
      multiRouteRef.current = multiRoute;
    });
  }

  let draggingIndex = null;

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    draggingIndex = index;
  };

  const handleDragEnter = (e, index) => {
    if (draggingIndex && draggingIndex !== index) {
      swap(draggingIndex, index);
      setLocationNames(watch("locations").map(item => item.name));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const yandexMapRef = useRef(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formAddressName, setFormAddressName] = useState({});

  const [yMaps, setYMaps] = useState(null);

  const [coordinates, setCoordinates] = useState([41.40587471972005, 69.46086540238926]);
  const [placeMarkGeometry, setPlaceMarkGeometry] = useState([41.34908881486223, 69.3374228085318]);

  function handleOpenModal() {

    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setFormAddressName({});
  }

  function getPlaceMarkAddress(coords) {
    yMaps?.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);
      setValue("address", firstGeoObject.getAddressLine());
      setValue("cor", coords.join(","));
    });
  }

  function onMapClick(e) {
    const coordinates = e.get("coords");
    getPlaceMarkAddress(coordinates);
    setPlaceMarkGeometry(coordinates);
    setValue("cor", coordinates.join(","));
  }

  const getCarType = useGetCarType();
  const getLoadingTypes = useLoadingTypes();
  const carTypeOptions = getCarType.data?.response?.map(item => ({
    label: item?.name,
    value: item?.guid
  }));

  const loadingOptions = getLoadingTypes.data?.response?.map(item => ({
    label: item?.name,
    value: item?.guid
  }));
  const getMeasurement = useGetMeasurement();

  const weightMeasurementOptions = getMeasurement.data?.response
    ?.filter(item => !item?.base_unit.includes("meter"))
    ?.map(item => ({
      label: item.Symbol,
      value: item.guid
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
      if (data?.response?.length) {
        setCarsArr(data?.response);
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
    },
  });
  const getCarListProps = () => {
    return { data: carsArr };
  };

  const onSubmit = (data) => {
    const [lat, long] = data.cor.split(",");
    mutate({
      data:{
        object_data:{
          lat,
          long,
          number: data.distance || "100",
        }
      }
    });
  };

  useEffect(() => {
    if(ymaps) {
      initYmaps();
    }
  }, []);

  return {
    register,
    locations,
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
  };
};
