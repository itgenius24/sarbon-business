import { Map,YMaps } from "@pbe/react-yandex-maps";
import { useEffect, useRef } from "react";


export const AccordionMap = ({ startPoint, endPoint }) => {
  const map = useRef(null);
  const mapState = {
    center: [55.739625, 37.5412],
    zoom: 10
  };

  const addRoute = (ymaps) => {
    const pointA = [55.749, 37.524]; // Москва
    const pointB = [59.918072, 30.304908]; // Санкт-Петербург

    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [pointA, pointB],
        params: { routingMode: "pedestrian" }
      },
      { boundsAutoApply: true }
    );

    map.current.geoObjects.add(multiRoute);
  };

  return <YMaps query={{ apikey:"5f706e9b-f2ba-421c-a085-c08246bfecd3" }}>
    <Map
    width={`100%`}
    height={`600px`}
      modules={["multiRouter.MultiRoute"]}
      state={mapState}
      instanceRef={map}
      onLoad={addRoute}
    ></Map>
  </YMaps>;
};
