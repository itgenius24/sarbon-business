import { LoadSvgIcon, EndIcon, StartIcon } from "@/assets/icons/icons";
import {
  Map,
  Placemark,
  Polyline,
  TypeSelector,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";

import { useEffect, useRef } from "react";

export const AccordionMap = ({
  startPoint,
  endPoint,
  gpsHistory,
  driverPosition,
  getMaps,
}) => {
  const map = useRef(null);
  const mapState = {
    center: gpsHistory.length > 1 ? gpsHistory[0] : [41.3405737, 69.2928081],
    zoom: 11,
  };


  const startLocation = getMaps?.data?.response[getMaps?.data?.response.length - 1];
  const endLocation = getMaps?.data?.response[0];
  const line  = getMaps?.data?.response.map(item => [item.lat,item.long]);




  useEffect(() => {
    
    const ymaps = window.ymaps;

    if (map.current && ymaps) {
      ymaps.route([
        [startLocation?.lat,startLocation?.long], // Boshlanish nuqtasi
        [endLocation.lat,endLocation.long], // Tugash nuqtasi
        ])
        .then((route) => {
          map.current.geoObjects.add(route);
          const startPoint = route.getWayPoints().get(0);
          const endPoint = route.getWayPoints().get(1);
          startPoint.options.set({
            iconLayout: "default#image",
            iconImageHref:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(StartIcon),
            iconImageSize: [30, 42],
            iconImageOffset: [-10, -22],
          });

          // B nuqtasi uchun ikona
          endPoint.options.set({
            iconLayout: "default#image",
            iconImageHref:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(EndIcon),
              iconImageSize: [30, 42],
            iconImageOffset: [-12, -38],
          });
        });
    }
  }, [gpsHistory]);

  const polylineOptions = {
    strokeColor: "rgba(0, 122, 255, 1)", // Color of the polyline
    strokeWidth: 6, // Width of the polyline
    strokeOpacity: 1, // Opacity of the polyline
  };

  const polylineGeruzOptions = {
    strokeColor: "#000000", // Color of the polyline
    strokeWidth: 4, // Width of the polyline
    strokeOpacity: 1, // Opacity of the polyline
  };
  return (
    <YMaps>
      <Map
        width={"100%"}
        height={"600px"}
        modules={["multiRouter.MultiRoute"]}
        state={mapState}
        instanceRef={map}
        options={{
          maxZoom: 17,
          minZoom: 2,
        }}
      >
        <Polyline geometry={gpsHistory} options={polylineOptions} />
        {/* <Polyline geometry={line} options={polylineGeruzOptions} /> */}
        <ZoomControl options={{ position: { bottom: "30vh", right: 4 } }} />

        <TypeSelector
          mapTypes={[
            "yandex#map",
            "yandex#satellite",
            "yandex#hybrid",
            "yandex#publicMap",
          ]}
        />
          <Placemark
          geometry={driverPosition ? driverPosition: []}
          options={{
            iconLayout: "default#image",
            iconImageHref:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(LoadSvgIcon),
            iconImageSize: [60, 72],
            iconImageOffset: [-15, -42],
          }}
        />
        {/* <Placemark
          geometry={startLocation ? [startLocation.lat,startLocation.long] : []}
          options={{
            iconLayout: "default#image",
            iconImageHref:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(StartIcon),
            iconImageSize: [30, 42],
            iconImageOffset: [-10, -22],
          }}
        />
        <Placemark
          geometry={endLocation ? [endLocation.lat,endLocation.long] : []}
          options={{
            iconLayout: "default#image",
            iconImageHref:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(EndIcon),
              iconImageSize: [30, 42],
            iconImageOffset: [-12, -38],
          }}
        /> */}
      </Map>
    </YMaps>
  );
};
