import React from "react";
import { Map, Placemark, SearchControl, TypeSelector } from "@pbe/react-yandex-maps";

const LoadingMap = React.memo(({
  onMapClick,
  defaultState,
  setYMaps,
  yandexMapRef,
  placeMarkGeometry,
  isDisabled,
}) => {

  return <Map
    onClick={isDisabled ? () => {} : onMapClick}
    onLoad={(ymaps) => setYMaps(ymaps)}
    defaultState={defaultState}
    instanceRef={yandexMapRef}
    options={{ minZoom: 5, }}
    width="100%"
    height={"400px"}
    modules={["Placemark", "geocode", "control.SearchControl"]}
  >
    <TypeSelector
      mapTypes={["yandex#map", "yandex#satellite", "yandex#hybrid", "yandex#publicMap"]}
    />
    <SearchControl options={{ float: "right" }} />
    <Placemark geometry={placeMarkGeometry} />
  </Map>;
});

export default LoadingMap;
