import { useGetDirectory } from "@/services/api";
import { useEffect, useState } from "react";

export const useContactProps = () => {

  const [address, setAddress] = useState(null);

  const crumbs = [
    {
      title: "Главная",
      href: "/",
    },
    { title: "Контактная информация", },
  ];

  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAP_KEY;

  function getUrl(lat, lon) {
    return `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${lon},${lat}`;
  }

  async function getLocationName([latitude, longitude]) {
    const url = getUrl(latitude, longitude);

    try {

      const response = await fetch(url);
      const data = await response.json();
      const locationName = data.response.GeoObjectCollection.featureMember[0].GeoObject.name;

      return locationName;

    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  const directory = useGetDirectory({ data: JSON.stringify({ status:["contact_information"], with_relations: true }), });

  const latLong = directory.data?.response?.[0]?.location;
  useEffect(() => {
    (
      async () => {

        if(latLong) {
          const data = await getLocationName(latLong?.split(","));
          setAddress(data);
        }

      }
    )();

  }, [latLong]);

  return {
    crumbs,
    directory: directory.data?.response?.[0],
    address,
  };
};
