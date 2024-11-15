"use client";
import { useEffect, useState } from "react";

/* eslint no-undef: 0 */ // --> OFF
export const useGetDistance = ({ origin, destination, referencePoints }) => {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  useEffect(() => {
    const ymapsScript = document.getElementById("yandex-maps-script");
    if(ymapsScript) {
      calculateDistance();
    }
  }, [origin, destination, referencePoints]);

  console.log(`referencePoints`,destination)

  const calculateDistance = () => {
    if(window?.ymaps) {
      ymaps.ready(() => {
        if(origin && destination || referencePoints) {
          const route = new ymaps.multiRouter.MultiRoute(
            {
              referencePoints: referencePoints ? referencePoints : [
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

          // const map = new ymaps.Map("map", {
          //   center: referencePoints ? referencePoints[0] : [origin.lat, origin.lng],
          //   zoom: 10,
          // });

          // map.geoObjects.add(route);
        }
      });
    }
  };

  const milesToKm = miles => miles * 1.609344;

  const dist = distance?.replace("mi", "");

  return {
    distance: milesToKm(Number(dist?.replace(",", ""))),
    duration
  };
};
