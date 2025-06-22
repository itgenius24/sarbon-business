import { useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

/* eslint no-undef: 0 */ // --> OFF

export const useDistanceCalculationProps = () => {
  const [distanceParameters, setDistanceParameters] = React.useState({});
  const [locationNames, setLocationNames] = React.useState([]);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [address, setAddress] = useState();
  const [debouncedValue] = useDebounce(address, 800);
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const [centerMap, setCenterMap] = useState([41.40587471972005, 69.46086540238926]);
  const { register, control, watch, setValue } = useForm();

  const {
    fields: locations,
    append,
    remove,
    swap,
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
    setLocationNames([
      ...locationNames.slice(0, index),
      e,
      ...locationNames.slice(index + 1),
    ]);
  }

  const multiRouteRef = useRef(null);
  const mapRef = useRef(null);

  function handleCalculate() {
    const multiRoute = multiRouteRef.current;
       mapRef.current.setCenter(
      centerMap,
      6
    );
    if (multiRoute) {
      const intervalLocations = locationNames.filter((item) => item !== "");
      multiRoute.model.setReferencePoints([
        watch("from"),
        ...intervalLocations,
        watch("to"),
      ]);
    }
  }


  function initYmaps() {
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
              .properties.get("distance").value;
            setDistanceParameters({ duration, distance });
          }
        });

        const position = isLargerThan845
          ? { right: 0, top: 0 }
          : { right: 0, bottom: 50 };

        const searchControl = new ymaps.control.SearchControl({
          options: { float: "none", position },
        });
        var myMap = new ymaps.Map(
          "map",
          {
            center: centerMap,
            zoom: 3,
            controls: [searchControl],
          },
          { buttonMaxWidth: 300, minZoom: 2 }
        );

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

  const hanleAdress = (location, name) => {
    if(name === "from") {
      setCenterMap([
        location?.GeoObject?.Point?.pos.split(" ")[1],
        location?.GeoObject?.Point?.pos.split(" ")[0],
      ]);
    }
    setValue(
      name,
      location?.GeoObject?.name
    );
      setResults([]);
  };

  const depArr = [typeof window !== "undefined" ? window?.ymaps : null];

  const handleGeocode = async () => {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAP_KEY;
    const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${debouncedValue}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.response) {
        const geoObjects = data.response.GeoObjectCollection.featureMember;
        setResults(geoObjects);
      } else {
        console.log("Manzil topilmadi");
      }
    } catch (error) {
      console.error("Geokodlashda xatolik:", error);
    }
  };

  useEffect(() => {
    if (address && debouncedValue.length >= 3) {
      handleGeocode();
    }
  }, [debouncedValue]);

  useEffect(() => {
    const ymapsScript = document.getElementById("yandex-maps-script");
    if (ymapsScript) {
      initYmaps();
    }
  }, depArr);

  return {
    register,
    locations,
    handleAppend,
    handleRemove,
    onAdditionalAddressChange,
    distanceParameters,
    watch,
    handleCalculate,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    isLargerThan845,
    setValue,
    results,
    setResults,
    address,
    setAddress,
    activeIndex,
    setActiveIndex,
    hanleAdress,
    locationNames:locationNames?.filter(item => item)
  };
};
