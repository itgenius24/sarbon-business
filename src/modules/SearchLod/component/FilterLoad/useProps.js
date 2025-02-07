"use client";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetCargoList } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export const useProps = ({ setValue }) => {
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");
  const [activeIndex, setActiveIndex] = useState(null);
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placeMarkGeometry, setPlaceMarkGeometry] = useState([
    41.34908881486223, 69.3374228085318,
  ]);
  const [coordinates, setCoordinates] = useState([
    41.40587471972005, 69.46086540238926,
  ]);
  const [nameState, setNameState] = useState("");
  const [debouncedValue] = useDebounce(address, 500);

  const [type, setType] = useState("");
  const [yMaps, setYMaps] = useState(null);
  const [results, setResults] = useState([]);
  const yandexMapRef = useRef(undefined);

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
  function getPlaceMarkAddress(coords) {
    yMaps?.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);
      setValue(nameState, firstGeoObject.getAddressLine());
    });
  }
  function onMapClick(e) {
    const coordinates = e.get("coords");
    getPlaceMarkAddress(coordinates);
    setPlaceMarkGeometry(coordinates);

    setValue("cor", coordinates.join(","));
  }

  const hanleAdress = (location, name) => {
    setValue(
      name,
      `${location?.GeoObject?.name}`
    );
    // setValue(
    //   name.slice(0,-2),
    //   `${location?.GeoObject?.name}${
    //     location?.GeoObject?.description ? ` ,${location?.GeoObject?.description}` : ``
    //   }`
    // );
    setResults([]);
  };

  useEffect(() => {
   window.addEventListener(`click`,() =>{
    setResults([])
   })
  },[])

  function handleOpenModal(name, type) {
    setNameState(name);
    setIsModalOpen(true);
    setType(type);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
    // setStateMap(false);
    // setFormAddressName({});
  }

  useEffect(() => {
    if (address) {
      handleGeocode();
    

    }
    if(activeIndex){
      setValue(activeIndex,debouncedValue)
    }
  }, [debouncedValue]);

  return {
    t,
    activeIndex,
    setActiveIndex,
    address,
    setAddress,
    isModalOpen,
    setIsModalOpen,
    handleOpenModal,
    results,
    hanleAdress,
    onMapClick,
    handleCloseModal,
    setYMaps,
    yandexMapRef,
    placeMarkGeometry,
    coordinates,
  };
};
