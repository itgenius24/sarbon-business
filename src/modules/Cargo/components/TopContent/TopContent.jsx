"use client";
import cls from "./styles.module.scss";
import { useTranslation } from "@/app/i18n/client";
import { DataList } from "@/components/DataList";
import { Rating } from "@/components/Rating";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetDriverLocation, useGetSortedGPSHistory } from "@/services/api";
import { Box, Button, Text, useMediaQuery } from "@chakra-ui/react";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useAddCargoContext } from "../../providers";
import { useRouter } from "next/navigation";

/* eslint no-undef: 0 */ // --> OFF

export const TopContent = ({
  address1,
  address2,
  proposedAmount,
  userName,
  rating,
  transportModel,
  phoneNumber,
  prepayment,
  paymentAfterFinish,
  driverComment,
  status,
  permission,
  currency,
  distance,
  city1,
  city2,
  userId2,
}) => {

  const { watch } = useAddCargoContext();

  const [showNumber, setShowNumber] = useState(false);

  const router = useRouter();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const list = [
    {
      title: t("Водитель: "),
      value: userName || "",
    },
    {
      title: t("Модель транспорта: "),
      value: transportModel || "",
    },
    {
      title: t("Предлагаемая сумма: "),
      value: proposedAmount ? proposedAmount + " " + (currency ? currency : "") : "",
    },
    {
      title: t("Рейтинг водителя: "),
      value: <Rating value={Math.round(rating)} />,
    },
    {
      title: t("Предоплата: "),
      value: `${prepayment ? prepayment : ""} ${permission === "in_percentages" ? "%" : currency ? currency : ""}`,
    },
    {
      title: t("Оплата после завершения: "),
      value: `${paymentAfterFinish ? paymentAfterFinish : ""} ${permission === "in_percentages" ? "%" : currency || ""}`,
    },
    {
      title: t("Комментария водителя: "),
      value: driverComment || "",
      grow: true,
    },
  ];

  const getDriverLocation = useGetDriverLocation(
    { data: JSON.stringify({ users_id: userId2 }), },
    { enabled: !!(status === "performed" && userId2) }
  );

  // const getGPSHistory = useGetGPSHistory(
  //   { data: JSON.stringify({ user_id: userId2 }) },
  //   { enabled: !!(status === "performed" && userId2) }
  // );
  const [gpsHistory, setGpsHistory] = useState([]);
  const [page, setPage] = useState(0);

  const [breakRequest, setBreakRequest] = useState(false);

  const getGPSHistory = useGetSortedGPSHistory({
    onSuccess(data) {
      if(data?.response?.length === 100) {
        setPage(page + 1);
      }
      if(data.response) {
        setGpsHistory(prev => [...prev, ...data.response.map(item => [item?.lat, item?.long])]);
      }
      if(data.response === null && !breakRequest) {
        setBreakRequest(true);
        getGPSHistory.mutate({
          data: {
            object_data: {
              user_id: userId2,
              page,
              limit: 100
            }
          }
        });
      }

    }
  });

  const driverPosition = [getDriverLocation.data?.response?.[0]?.lat, getDriverLocation.data?.response?.[0]?.long];

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  var myMap = useRef(null);
  var multiRoute = useRef(null);
  var myPolyline = useRef(null);
  var myPlaceMark = useRef(null);

  useEffect(() => {
    if(status === "performed" && userId2) {
      getGPSHistory.mutate({
        data: {
          object_data:
        {
          user_id: userId2,
          page,
          limit: 100
        }
        }
      });
    }
  }, [status, userId2, page]);

  function initYmaps() {
    if(window?.ymaps) {
      ymaps.ready(() => {
        myPolyline.current = new ymaps.Polyline(
          [],
          { balloonContent: "Polyline" },
          {
            balloonCloseButton: false,
            strokeColor: "#009241",
            strokeWidth: 4,
            strokeOpacity: 1
          });

        multiRoute.current = new ymaps.multiRouter.MultiRoute({ referencePoints: [watch("loadings")?.[0]?.cor, watch("unloading")?.[0]?.cor] }, {
          editorMidPointsType: "via",
          routeActiveStrokeColor: "#007AFF",
          editorDrawOver: false,
        });

        myMap.current = new ymaps.Map("topContentMap", {
          center: [41.40587471972005, 69.46086540238926],
          zoom: 15,
          controls: [],
        }, { buttonMaxWidth: 300 });

        myPlaceMark.current = new ymaps.Placemark([], { hintContent: "Driver", }, {
          iconLayout: "default#image",
          iconImageHref: "/images/navigation.png",
          iconImageSize: [37, 37],
          iconImageOffset: [-5, -38]
        }),
        myMap.current.geoObjects.add(myPolyline.current);
        myMap.current.geoObjects.add(multiRoute.current);
        myMap.current.geoObjects.add(myPlaceMark.current);
      });
    }
  }

  useEffect(() => {
    if(myPolyline.current) {
      myPolyline.current.geometry.setCoordinates(gpsHistory ? gpsHistory : []);
    }
    if(multiRoute.current) {
      if(watch("loadings")?.[0]?.cor && watch("unloading")?.[0]?.cor) {
        multiRoute.current.model.setReferencePoints([
          watch("loadings")?.[0]?.cor,
          watch("unloading")?.[0]?.cor,
        ]);
      }
    }

  }, [watch("loadings"), watch("unloading"), gpsHistory]);

  useEffect(() => {
    if(myMap.current) {
      if(driverPosition.some(item => item)) {
        myMap.current.setCenter(driverPosition, 15);
      }
    }

    if(driverPosition.some(item => item) && myPlaceMark.current) {
      myPlaceMark.current.geometry.setCoordinates(driverPosition);
    }
  }, [driverPosition]);


  useEffect(() => {
    const timer = setInterval(() => {
      getDriverLocation.refetch();
    }, 50000);

    const historyTimer = setInterval(() => {
      getDriverLocation.refetch();
    }, 50000);

    return () => {
      clearInterval(timer);
      clearInterval(historyTimer);
    };
  }, []);

  const depArr = [typeof window !== "undefined" ? window?.ymaps : null];

  useEffect(() => {
    const ymapsScript = document.getElementById("yandex-maps-script");
    if(ymapsScript) {
      initYmaps();
    }
  }, depArr);

  return <Box>
    {
      status === "performed" && <>
        <div id="topContentMap" style={{ width: "100%", height: isLargerThan845 ? "419px" : "300px" }} />
      </>
    }
    <Box p="24px" bgColor="baseWhite" borderRadius="12px" mb="16px">
      <h2 className={cls.address}>
        <span className={cls.addressText}>
          <span className={cls.addressCountry}>
            <span className={cls.addressCity}>{city1}</span>
            <span>{address1}</span>
          </span>
          <span>-&gt;</span>
          <span className={cls.addressCountry}>
            <span className={cls.addressCity}>{city2}</span>
            <span>{address2}</span>
          </span>
          {/* {address_id_data?.name} -&gt; {address_id_2_data?.name} */}
        </span>
        <Text as="span" color="brand.500"> {distance} km</Text>
      </h2>
      <DataList list={list} />
      {
        status === "performed" && <Button maxW="278px" mt="20px" onClick={() => setShowNumber(!showNumber)}>
          { showNumber ? phoneNumber : t("Показать номер") }
        </Button>
      }
    </Box>
  </Box>;
};
