import React from "react";
import { Map, Placemark, SearchControl } from "@pbe/react-yandex-maps";

const LoadingMap = React.memo(({
  onMapClick,
  defaultState,
  setYMaps,
  yandexMapRef,
  placeMarkGeometry
}) => {

  return <Map
    onClick={onMapClick}
    onLoad={(ymaps) => setYMaps(ymaps)}
    defaultState={defaultState}
    instanceRef={yandexMapRef}
    width="100%"
    modules={["Placemark", "geocode", "control.SearchControl"]}
  >
    <SearchControl options={{ float: "right" }} />
    <Placemark geometry={placeMarkGeometry} />
  </Map>;
});

export default LoadingMap;
