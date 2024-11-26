import {
  LoadSvgIcon,
  EndIcon,
  StartIcon,
  StopIcon,
} from "@/assets/icons/icons";
import {
  Map,
  Placemark,
  Polyline,
  TypeSelector,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { format } from "date-fns";

import { useEffect, useRef } from "react";

export const AccordionMap = ({
  gpsHistory,
  driverPosition,
  periods,
  driver,
  getDriverPosition,
}) => {
  const map = useRef(null);
  const mapState = {
    center:
      driverPosition.length > 0 ? driverPosition : [41.3405737, 69.2928081],
    zoom: 11,
  };

  const shipper = periods.filter((item) => item.type?.[0] === `shipper`);

  const consignee = periods.filter((item) => item?.type?.[0] === `consignee`);

  const startLocation = shipper?.[0];
  const endLocation = consignee?.[consignee?.length - 1];
  const line = periods.slice(1, -1).map((item) => [item?.lat, item?.long]);

  console.log(`getDriverPosition`, getDriverPosition);

  useEffect(() => {
    const ymaps = window.ymaps;

    setTimeout(() => {
      if (map.current && ymaps) {
        // First route: from startLocation to endLocation
        ymaps
          .route([
            [startLocation?.lat, startLocation?.long], // Start point
            [endLocation?.lat, endLocation?.long], // End point
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
              balloonContentLayout: ymaps.templateLayoutFactory.createClass(
                `<div style='padding: 10px; font-size: 14px;'> 
                      <p>Старт:</p>
                      <p style='font-weight: 600;'>${startLocation?.name}</p>
                </div>`
              ),
            });
            endPoint.options.set({
              iconLayout: "default#image",
              iconImageHref:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(EndIcon),

              iconImageSize: [30, 42],
              iconImageOffset: [-12, -38],
              balloonContentLayout: ymaps.templateLayoutFactory.createClass(
                `<div style='padding: 10px; font-size: 14px;'> 
                      <p>Финиш:</p>
                      <p style='font-weight: 600;'>${endLocation?.name}</p>
                </div>`
              ),
            });
            route.getPaths().options.set({
              strokeColor: "#000000", // Black color
              strokeWidth: 4,
              strokeOpacity: 1,
              strokeStyle: "dash",
            });
          });

        // Second route: from startLocation to specified location with blue line, independent of the first route
        // ymaps
        //   .route([
        //     [startLocation?.lat, startLocation?.long], // Start from startLocation
        //     driverPosition, // End at specified location
        //   ])
        //   .then((secondRoute) => {
        //     map.current.geoObjects.add(secondRoute);
        //     const startPoint = secondRoute.getWayPoints().get(0);
        //     const endPoint = secondRoute.getWayPoints().get(1);
        //     startPoint.options.set({
        //       iconLayout: "default#image",
        //       iconImageHref:
        //         "data:image/svg+xml;charset=UTF-8," +
        //         encodeURIComponent(StartIcon),
        //       iconImageSize: [30, 42],
        //       iconImageOffset: [-10, -22],
        //       balloonContentLayout: ymaps.templateLayoutFactory.createClass(
        //         `<div style='padding: 10px; font-size: 14px;'>
        //               <p>Финиш:</p>
        //               <p style='font-weight: 600;'>${startLocation?.name}</p>
        //         </div>`
        //       ),
        //     });
        //     // endPoint.options.set({
        //     //   iconLayout: "default#image",
        //     //   iconImageHref:
        //     //     "data:image/svg+xml;charset=UTF-8," +
        //     //     encodeURIComponent(LoadSvgIcon),
        //     //   iconImageSize: [60, 72],
        //     //   iconImageOffset: [-15, -42],
        //     //   balloonContentLayout: ymaps.templateLayoutFactory.createClass(
        //     //     `<div style='padding: 10px; font-size: 14px;'>
        //     //           <p style='font-weight: 600;color:rgba(0, 122, 255, 1)'>${
        //     //             driver?.location_name
        //     //           }</p>
        //     //           <p>Время в пути:</p>
        //     //           <p style='font-weight: 600;'>${format(
        //     //             driver?.update_time,
        //     //             "yyyy-MM-dd"
        //     //           )}</p>

        //     //     </div>`
        //     //   ),
        //     // });
        //     // secondRoute.getPaths().options.set({
        //     //   strokeColor: "#0000FF", // Blue color
        //     //   strokeWidth: 4,
        //     //   strokeOpacity: 1,
        //     // });
        //   });
      }
    }, 3000);
  }, [periods]);

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
    // <YMaps>
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
      <Polyline
        geometry={[getDriverPosition || []]}
        options={polylineOptions}
      />
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
        geometry={getDriverPosition ? getDriverPosition?.[0] : []}
        properties={{
          balloonContent: `<div style='padding: 10px; font-size: 14px;'>
                  <p style='font-weight: 600;color:rgba(0, 122, 255, 1)'>erer</p>
                  <p>Время в пути:</p>
                 <p style='font-weight: 600;'>wefwef</p>

            </div>`,
          iconContent: "2000",
        }}
        options={{
          iconLayout: "default#image",
          iconImageHref:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(LoadSvgIcon),
          iconImageSize: [60, 72],
          iconImageOffset: [-15, -42],
        }}
      />

      {line?.length > 0 &&
        line?.map((item) => (
          <Placemark
            key={item.lat}
            geometry={item}
            options={{
              iconLayout: "default#image",
              iconImageHref:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(StopIcon),
              iconImageSize: [30, 42],
              iconImageOffset: [-10, -22],
            }}
          />
        ))}
    </Map>
    // </YMaps>
  );
};
