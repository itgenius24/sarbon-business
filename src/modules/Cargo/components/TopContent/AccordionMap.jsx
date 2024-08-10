import { LoadSvgIcon } from "@/assets/icons/icons";
import { Map, Placemark, Polyline, TypeSelector, YMaps, ZoomControl } from "@pbe/react-yandex-maps";

import { useEffect, useRef } from "react";

export const AccordionMap = ({ startPoint, endPoint,gpsHistory,driverPosition }) => {
  console.log("gpsHistory",gpsHistory);
  const map = useRef(null);
  const mapState = {
    center: gpsHistory.length > 1 ? gpsHistory[0] :  [41.3405737, 69.2928081],
    zoom: 11,
  };

  const addRoute = (ymaps) => {
    const pointA = [55.749, 37.524]; // Москва
    const pointB = [59.918072, 30.304908]; // Санкт-Петербург

    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [pointA, pointB],
        params: { routingMode: "pedestrian" },
      },
      { boundsAutoApply: true }
    );

    map.current.geoObjects.add(multiRoute);
  };

  const polylineGeometry = [
    [55.75, 37.57], // Coordinates of the first point
    [55.76, 37.64], // Coordinates of the second point
    [55.73, 37.67], // Coordinates of the third point, etc.
  ];

  const polylineOptions = {
    strokeColor: "rgba(0, 122, 255, 1)", // Color of the polyline
    strokeWidth: 6, // Width of the polyline
    strokeOpacity: 1, // Opacity of the polyline
  };
  return (
    <YMaps>
      <Map
        width={`100%`}
        height={`600px`}
        modules={["multiRouter.MultiRoute"]}
        state={mapState}
        instanceRef={map}
        onLoad={addRoute}
        options={{
                maxZoom: 17,
                minZoom: 2,
              }}
      >
        <Polyline geometry={gpsHistory} options={polylineOptions} />
        <ZoomControl
                options={{ position: { bottom: "30vh", right: 4 } }}
              />

<TypeSelector
                mapTypes={[
                  "yandex#map",
                  "yandex#satellite",
                  "yandex#hybrid",
                  "yandex#publicMap",
                ]}
              />
       {
        gpsHistory.length > 0 &&    <Placemark 
             geometry={gpsHistory.length > 1 ? driverPosition: []}
           options={{
            iconLayout: "default#image",
            iconImageHref:
              "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(LoadSvgIcon),
            iconImageSize: [60, 72],
            iconImageOffset: [-15, -42],
          }}
         /> 
       }
      </Map>
    </YMaps>
  );
};
