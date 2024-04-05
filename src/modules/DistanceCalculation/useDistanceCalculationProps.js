import React, { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

/* eslint no-undef: 0 */ // --> OFF

export const useDistanceCalculationProps = () => {

  const [distanceParameters, setDistanceParameters] = React.useState({});
  const [locationNames, setLocationNames] = React.useState([]);

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

  // useEffect(() => {

  // }, [locationNames, watch("from"), watch("to")]);

  function handleCalculate () {
    const multiRoute = multiRouteRef.current;
    if(multiRoute) {
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

  return {
    register,
    locations,
    handleAppend,
    handleRemove,
    initYmaps,
    onAdditionalAddressChange,
    distanceParameters,
    watch,
    handleCalculate,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
  };
};
