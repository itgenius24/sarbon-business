"use client";

import cls from "./styles.module.scss";
import { Map, Placemark, SearchControl, TypeSelector } from "@pbe/react-yandex-maps";
import { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import formStore from "@/store/form.store";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { Container } from "@/components/Container";

export default function MapPage({ params }) {
  const { location: [type, index], locale } = params;

  let placeMarCors = formStore.formData[type][index].cor;

  if(typeof placeMarCors === "string" && placeMarCors) {
    placeMarCors = placeMarCors.split(",");
  }

  const [placeMarkGeometry, setPlaceMarkGeometry] = useState(placeMarCors || []);

  const router = useRouter();

  const [ymaps, setYMaps] = useState(null);
  const yandexMapRef = useRef(null);

  const [loadings, setLoadings] = useState({});
  const [unloading, setUnloading] = useState({});

  const { t } = useTranslation(locale, "translations");

  function getPlaceMarkAddress(coords) {
    ymaps?.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);
      if(type === "loadings") {
        formStore.updateLoadings(index, {
          location: formStore.formData.loadings[index].location,
          address: firstGeoObject.getAddressLine(),
          cor: `${coords[0]},${coords[1]}`,
          search: formStore.formData.loadings[index].search
        });
        // setLoadings({
        //   location: formStore.formData.loadings[index].location,
        //   address: firstGeoObject.getAddressLine(),
        //   cor: `${coords[0]},${coords[1]}`,
        //   search: formStore.formData.loadings[index].search
        // });
      } else {
        formStore.updateUnloading(index, {
          location: formStore.formData.unloading[index].location,
          address: firstGeoObject.getAddressLine(),
          cor: `${coords[0]},${coords[1]}`,
          search: formStore.formData.unloading[index].search
        });
        // setUnloading({
        //   location: formStore.formData.unloading[index].location,
        //   address: firstGeoObject.getAddressLine(),
        //   cor: `${coords[0]},${coords[1]}`,
        //   search: formStore.formData.unloading[index].search
        // });
      }
    });
  }

  function onMapClick(e) {
    const coordinates = e.get("coords");
    setPlaceMarkGeometry(coordinates);
    getPlaceMarkAddress(coordinates);
  }

  function savePlaceMark() {
    // router.back();
    router.push(`/${locale}/add-cargo`);
    // if(type === "loadings") {
    //   formStore.updateLoadings(index, loadings);
    // } else if(type === "unloading") {
    //   formStore.updateUnloading(index, unloading);
    // }
  }

  return <Container>
    <div className={cls.map}>
      <Map
        onClick={onMapClick}
        onLoad={(ymaps) => setYMaps(ymaps)}
        defaultState={{
          center: placeMarCors?.length ? placeMarCors : [41.40587471972005, 69.46086540238926],
          zoom: 15,
        }}
        instanceRef={yandexMapRef}
        width="100%"
        height="500px"
        modules={["Placemark", "geocode", "control.SearchControl"]}
        options={{ minZoom: 5, }}
      >
        <SearchControl options={{ float: "right" }} />
        <Placemark geometry={placeMarkGeometry} />
        <TypeSelector
          mapTypes={["yandex#map", "yandex#satellite", "yandex#hybrid", "yandex#publicMap"]}
        />
      </Map>
    </div>
    <Button mt="20px" onClick={savePlaceMark} size="sm">
      {t("Сохранить")}
    </Button>
    <Button mt="8px" onClick={router.back} size="sm" variant="outline">
      {t("Отменить")}
    </Button>
  </Container>;
}
