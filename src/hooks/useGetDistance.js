"use client";
import { useEffect, useState } from "react";

/* eslint no-undef: 0 */ // --> OFF
export const useGetDistance = ({ origin, destination }) => {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  useEffect(() => {
    const yandexMapsScript = document.createElement("script");
    yandexMapsScript.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&load=package.full&lang=en_US`;
    yandexMapsScript.async = true;
    yandexMapsScript.onload = () => {
      calculateDistance();
    };
    document.body.appendChild(yandexMapsScript);

    return () => {
      document.body.removeChild(yandexMapsScript);
    };
  }, [origin, destination]);

  const calculateDistance = () => {
    ymaps.ready(() => {
      if(origin && destination) {
        const ymaps = window.ymaps;
        const route = new ymaps.multiRouter.MultiRoute(
          {
            referencePoints: [
              [origin.lat, origin.lng],
              [destination.lat, destination.lng],
            ],
            params: { routingMode: "auto" },
          },
          { wayPointDraggable: false }
        );

        route.model.events.add("requestsuccess", () => {
          const distance = route.getRoutes()?.get(0)?.properties?.get("distance");
          const duration = route.getRoutes()?.get(0)?.properties?.get("duration");
          setDistance(distance?.text);
          setDuration(duration?.text);
        });

        route.model.events.add("requestfail", (event) => {
          console.error("Failed to calculate distance:", event);
        });

        const map = new ymaps.Map("map", {
          center: [origin.lat, origin.lng],
          zoom: 10,
        });

        map.geoObjects.add(route);
      }
    });
  };

  const milesToKm = miles => miles * 1.609344;

  const dist = distance?.replace("mi", "");

  return {
    distance: milesToKm(Number(dist?.replace(",", ""))),
    duration
  };
};
