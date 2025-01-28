import React from "react";
import {
  Map,
  Placemark,
  SearchControl,
  TypeSelector,
  YMaps,
} from "@pbe/react-yandex-maps";

const LoadingMap = React.memo(
  ({
    onMapClick,
    defaultState,
    setYMaps,
    yandexMapRef,
    placeMarkGeometry,
    isDisabled,
    ...props
  }) => {
    return (
      // <YMaps
      //   query={{
      //     load: "Map,Placemark",
      //     apikey: process.env.NEXT_PUBLIC_YANDEX_MAP_KEY,
      //     suggest_apikey: process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_KEY,
      //   }}
      // >
      <Map
        onClick={isDisabled ? () => {} : onMapClick}
        onLoad={(ymaps) => setYMaps(ymaps)}
        defaultState={defaultState}
        instanceRef={yandexMapRef}
        options={{ minZoom: 5 }}
        width="100%"
        height={"400px"}
        modules={["Placemark", "geocode", "control.SearchControl"]}
        {...props}
      >
        <TypeSelector
          mapTypes={[
            "yandex#map",
            "yandex#satellite",
            "yandex#hybrid",
            "yandex#publicMap",
          ]}
        />
        <SearchControl options={{ float: "right" }} />
        <Placemark geometry={placeMarkGeometry} />
      </Map>

    // </YMaps>
    );
  }
);

export default LoadingMap;
