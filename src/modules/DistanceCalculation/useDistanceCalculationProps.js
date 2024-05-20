import { useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

/* eslint no-undef: 0 */ // --> OFF

export const useDistanceCalculationProps = () => {

  const [distanceParameters, setDistanceParameters] = React.useState({});
  const [locationNames, setLocationNames] = React.useState([]);

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const { register, control, watch } = useForm();

  const { fields: locations, append, remove, swap } = useFieldArray({
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

  function handleCalculate () {
    const multiRoute = multiRouteRef.current;
    if(multiRoute) {
      const intervalLocations = locationNames.filter(item => item !== "");
      multiRoute.model.setReferencePoints([watch("from"), ...intervalLocations, watch("to")]);
    }
  }

  function initYmaps() {
    if(window?.ymaps) {
      ymaps.ready(() => {
        var multiRoute = new ymaps.multiRouter.MultiRoute({ referencePoints: [[], []] }, {
          editorMidPointsType: "via",
          routeActiveStrokeColor: "#175CD3",
          editorDrawOver: false,
        });

        multiRoute.events.add("update", function () {
          if(multiRoute.getRoutes().get(0)) {
            const duration = multiRoute.getRoutes().get(0).properties.get("duration").text;
            const distance = multiRoute.getRoutes().get(0).properties.get("distance").text;
            setDistanceParameters({ duration, distance });
          }
        });

        const position = isLargerThan845 ? { right: 0, top: 0 } : { right: 0, bottom: 50 };

        const searchControl = new ymaps.control.SearchControl({ options: { float: "none", position } });

        // Creating the map with the button added to it.
        var myMap = new ymaps.Map("map", {
          center: [41.40587471972005, 69.46086540238926],
          zoom: 7,
          controls: [searchControl],
        }, { buttonMaxWidth: 300, minZoom: 5 });

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
    if(draggingIndex && draggingIndex !== index) {
      swap(draggingIndex, index);
      setLocationNames(watch("locations").map(item => item.name));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const depArr = [typeof window !== "undefined" ? window?.ymaps : null];

  useEffect(() => {
    const ymapsScript = document.getElementById("yandex-maps-script");
    if(ymapsScript) {
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
  };
};
