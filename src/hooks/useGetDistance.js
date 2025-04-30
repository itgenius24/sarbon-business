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
  }, [origin?.lat, destination?.lat, referencePoints?.[0]?.[0],referencePoints?.[1]?.[1]]);

  


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
