import React from "react";
import { Map, Placemark, SearchControl, TypeSelector, ZoomControl } from "@pbe/react-yandex-maps";

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
    width="100%"
    modules={["Placemark", "geocode", "control.SearchControl"]}
    options={{ minZoom: 5 }}
    style={{ width: "100%", height: "100%" }}
  >
    <SearchControl options={{ float: "right" }} />
    <TypeSelector options={{ float: "left" }} defaultMapTypes={["yandex#satellite", "yandex#map", "yandex#hybrid", "yandex#publicMap"]} />
    <ZoomControl options={{ float: "right" }} />
    <Placemark geometry={placeMarkGeometry} />
  </Map>;
});

export default LoadingMap;
