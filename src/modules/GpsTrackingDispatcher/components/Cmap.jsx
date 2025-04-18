"use client";
import {
  GoodsFuraIcon,
  GoodsPhoneIcon,
  GreenFuraIcon,
  GreenPhoneIcon,
  LoadOulineIcon,
  MapCargoGreenIcon,
  MapCargoLoadGoodsIcon,
  StoneIcon,
  GreenMapIcon,
  RefeIcon,
  RouteIcon,
  RulesIcon,
} from "@/assets/icons/icons";
import ReactDOMServer from "react-dom/server";
import { Box, Flex } from "@chakra-ui/react";
import {
  Clusterer,
  Map,
  Placemark,
  Polyline,
  SearchControl,
  TypeSelector,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import React, { memo, useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import copy from "copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { getSVGIcon } from "@/utils/getSVGIcon";
import { BalloonContent } from "./BalloonContent";
import { useSearchParams } from "next/navigation";

const Cmap = memo(
  ({
    getCarListProps,
    coordinates,
    cls,
    type,
    mapIcon,
    watch,
    setModalType,
    locationData,
    setLoadState,
    isBalloonOpened,
    setIsBalloonOpened,
    setContendSingle,
    contendHoverState,
  }) => {
    const [isClient, setIsClient] = useState(false);
    const searchParams = useSearchParams();
    const guid = searchParams.get(`guid`);
    const { t } = useTranslation();
    const [zoom, setZoom] = useState(5);
    const [points, setPoints] = useState([]);
    const [distance, setDistance] = useState(null);
    const mapRef = useRef(null);
    const ymapsRef = useRef(null);
    const multiRouteRef = useRef(null);
    const [clickCount, setClickCount] = useState(0);
    const [pointA, setPointA] = useState(null);
    const [pointB, setPointB] = useState(null);
    const [selecting, setSelecting] = useState(false);
    const [types, setType] = useState(``);
    const placemarkRefs = useRef({});


    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (guid && getCarListProps?.data && mapRef.current && !isBalloonOpened) {
        const timeout = setTimeout(() => {
          openBalloonById(guid);
        }, 1000);

        return () => clearTimeout(timeout);
      }
    }, [guid, getCarListProps?.data, mapRef.current]);

    const openBalloonById = (id) => {
      const placemark = placemarkRefs.current[id];

      if (placemark) {
        const coords = placemark.geometry.getCoordinates();
        console.log(`coords`, placemark, coords, mapRef);

        // Balloonni ochish
        placemark.balloon.open();
        setIsBalloonOpened(true)
        // Mapni centerga o‘rnatish
        if (mapRef.current) {
          mapRef.current.setCenter(coords, 15, {
            checkZoomRange: true,
          });
        }
      }
    };

    const handleCopy = (event) => {
      const selection = window.getSelection().toString();
      if (selection) {
        event.preventDefault();
        const phoneRegex = /(?:\+\d{1,3}\s?)?(?:\d[\s-]?){7,14}\d/g; // Telefon raqamlarini aniqlash
        const match = selection.match(phoneRegex);

        if (match) {
          const cleanedText = match[0].replace(/\s+/g, ""); // Faqat topilgan raqamdan bo'sh joylarni olib tashlash
          event.clipboardData.setData("text/plain", cleanedText);
        } else {
          event.clipboardData.setData("text/plain", selection);
        }
      }
    };

    useEffect(() => {
      setTimeout(() => {
        document.addEventListener("copy", handleCopy);
        return () => {
          document.removeEventListener("copy", handleCopy);
        };
      }, 1000);
    }, []);

    const getDistanceInKm = (coordsA, coordsB) => {
      const R = 6371;
      const toRad = (val) => (val * Math.PI) / 180;

      if (coordsA && coordsB) {
        const [lat1, lon1] = coordsA;
        const [lat2, lon2] = coordsB;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dist = R * c;

        setDistance(dist.toFixed(2));
      }
    };

    const handleMapClick = (e) => {
      if (!selecting) return;

      const coords = e.get("coords");

      if (clickCount === 0) {
        setPointA(coords);
        setClickCount(1);
      } else if (clickCount === 1) {
        setPointB(coords);
        setClickCount(2);
        setSelecting(false); // End selection
        console.log(`pointA`, [pointA, coords]);
        getDistanceInKm(pointA, coords);
        setPoints([pointA, coords]);
        if (types === `route`) {
          drawRoute(pointA, coords);
        }
      }
    };

    const drawRoute = (a, b) => {
      if (!ymapsRef.current || !a || !b) {
        mapRef.current.geoObjects.remove(multiRouteRef.current);
        multiRouteRef.current = null;
      }


      if (multiRouteRef.current) {
        // Agar mavjud marshrut bo'lsa, uni xaritadan o'chirib tashlang
        mapRef.current.geoObjects.remove(multiRouteRef.current);
        multiRouteRef.current = null;
      }
      getDistanceInKm(a, b);

      const multiRoute = new ymapsRef.current.multiRouter.MultiRoute(
        {
          referencePoints: [a, b],
          params: {
            routingMode: "auto",
          },
        },
        {
          boundsAutoApply: true,
          wayPointStartVisible: false,
          wayPointFinishVisible: false,
        }
      );

      multiRouteRef.current = multiRoute;

      mapRef.current.geoObjects.add(multiRoute);
    };
    const startRouteSelection = (type) => {
      setType(type);

      if (type === "rules") {
        setClickCount(0);
        setSelecting(true);
        // Route chizig‘ini tozalaymiz
        if (multiRouteRef.current) {
          mapRef.current?.geoObjects?.remove(multiRouteRef.current);
          multiRouteRef.current = null;
        }

        // PointA/B nuqtalarini qayta o‘rnatamiz (faqat points mavjud bo‘lsa)
        if (points.length === 2) {
          setPointA(points[0]);
          setPointB(points[1]);
          getDistanceInKm(points[0], points[1]);
        }
      }

      if (type === "route") {
        setClickCount(0);
        setSelecting(true);
        setDistance("");

        // Route qayta chiziladi, agar oldingi points bor bo‘lsa
        drawRoute(points[0] || pointA, points[1] || pointB);
      }
    };

    const handleMapLoad = (ymaps) => {
      ymapsRef.current = ymaps;
      drawRoute(pointA, pointB);
    };

    const handleDragEnd = (e, index) => {
      const newCoords = e.get("target").geometry.getCoordinates();
      const newPoints = [...points];
      newPoints[index] = newCoords;
      setPoints(newPoints);
      getDistanceInKm(newPoints[0], newPoints[1]);
      if (types === `route`) {
        drawRoute(newPoints[0], newPoints[1]);
      }
    };

    const handlePolylineClick = (e) => {
      const map = mapRef.current;
      if (!map) return;

      const coords = e.get("coords");
      const balloonContent = `Masofa: ${distance} km`;

      map.balloon.open(coords, balloonContent, {
        closeButton: true,
      });
    };

    if (!isClient) {
      return null; // Render nothing during SSR
    }

    let click = document.getElementById(`click`);

    click?.addEventListener(`click`, (e) => {
      e.stopPropagation();
      copy(contendHoverState?.users_id_data?.phone);
    });

    const resetMap = () => {
      if (mapRef.current) {
        if (types?.length === 0) {
          mapRef.current.setCenter(coordinates, 4);
        }
        mapRef.current.setCenter(coordinates, 4);
        mapRef.current.balloon.close();
      }
      setType(``);
      mapRef.current.geoObjects.remove(multiRouteRef.current);
      multiRouteRef.current = null;
      setPointA(null);
      setPointB(null);
      setPoints([]);
    };

    return (
      <Map
        instanceRef={mapRef}
        onLoad={handleMapLoad}
        onClick={handleMapClick}
        onBoundsChange={(e) => setZoom(e.get("newZoom"))} // Zoom o'zgarishini olish
        defaultState={{
          center: coordinates,
          zoom: 6,
        }}
        options={{
          maxZoom: 22,
          minZoom: 2,
          restrictMapArea: [
            [-85, -179], // Chap-past (Antarktika va janubiy qutbga yaqin joy)
            [85, 179], // O'ng-yuqori (Shimoliy qutbga yaqin joy)
          ],
        }}
        width="100%"
        height={"90vh"}
        modules={[
          "Placemark",
          "geocode",
          "control.SearchControl",
          "control.ZoomControl",
          "coordSystem.geo",
          "multiRouter.MultiRoute",
        ]}
      >
        <div className={cls.settWrap}>
          <div onClick={resetMap} className={cls.backMap}>
            <RefeIcon />
          </div>
          <div
            onClick={() => startRouteSelection(`route`)}
            className={`${cls.route} ${
              types === `route` ? cls.activeRoute : ``
            }`}
          >
            <RouteIcon />
          </div>
          <div
            onClick={() => startRouteSelection(`rules`)}
            className={`${cls.route} ${
              types === `rules` ? cls.activeRoute : ``
            } `}
          >
            <RulesIcon />
          </div>
        </div>

        {pointA && (
          <Placemark
            onDragEnd={(e) => handleDragEnd(e, 0)}
            options={{
              draggable: true,
              iconImageSize: [60, 72],
              iconImageOffset: [-15, -42],
            }}
            geometry={pointA}
          />
        )}
        {pointB && (
          <Placemark
            onDragEnd={(e) => handleDragEnd(e, 1)}
            options={{
              draggable: true,
              iconImageSize: [60, 72],
              iconImageOffset: [-15, -42],
            }}
            geometry={pointB}
          />
        )}

        {types === `rules` && (
          <Polyline
            geometry={points}
            onClick={handlePolylineClick}
            options={{
              strokeColor: "#FF0000",
              strokeWidth: 4,
              strokeOpacity: 0.6,
            }}
          />
        )}

        <SearchControl options={{ float: "right" }} />
        <ZoomControl
          options={{
            position: {
              // bottom: "0vh",
              top: 350,
              right: 4,
            },
            size: "40px",
            marginBottom: "50%",
            width: "40px",
            height: "40px",
            cornerRadius: "50%",
          }}
        />

        <TypeSelector
          mapTypes={[
            "yandex#map",
            "yandex#satellite",
            "yandex#hybrid",
            "yandex#publicMap",
          ]}
        />

        {zoom >= 20 || guid ? (
          getCarListProps?.data &&
          getCarListProps?.data?.map((carInfo) => {
            const balloonContent2 = ReactDOMServer.renderToString(
              <BalloonContent cls={cls} carInfo={carInfo} t={t} />
            );
            return (
              <>
                <Placemark
                  key={carInfo?.user?.guid}
                  geometry={[
                    carInfo?.users_gps?.[0]?.lat,
                    carInfo?.users_gps?.[0]?.long,
                  ]}
                  properties={{ balloonContent: balloonContent2 }}
                  instanceRef={(ref) => {
                    if (ref) {
                      placemarkRefs.current[carInfo?.user?.guid] = ref;
                    }
                  }}
                  options={{
                    iconLayout: "default#image",
                    iconImageHref:
                      "data:image/svg+xml;charset=UTF-8," +
                      encodeURIComponent(
                        mapIcon[
                          carInfo?.order_data
                            ? `our_cargo`
                            : carInfo?.user?.provisions?.[0]
                        ] || GreenMapIcon
                      ),
                    iconImageSize:
                      watch("users_id")?.value || watch("users_id2")?.value
                        ? [45, 105]
                        : [40, 52],
                    iconImageOffset: [-15, -42],
                  }}
                  modules={["geoObject.addon.balloon"]}
                  onClick={() => {
                    setContendSingle(carInfo);
                    if (
                      carInfo?.order_data ||
                      carInfo?.user?.provisions?.[0] === "our_cargo"
                    ) {
                      setModalType("driverCheck");
                    } else if (
                      carInfo?.user?.provisions?.[0] === "someone_cargo"
                    ) {
                      setModalType("driverQuestion");
                    } else if (
                      carInfo?.user?.provisions?.[0] === "waiting_for_driver"
                    ) {
                      setModalType("driverExpectation");
                    } else {
                      setModalType("driverFree");
                    }
                  }}
                />
              </>
            );
          })
        ) : (
          <Clusterer
            options={{
              clusterIconColor: "rgba(52, 199, 89, 1)",
              style: {
                backgroundColor: "rgba(52, 199, 89, 1)",
                color: "white",
                borderRadius: "50%",
              },
            }}
          >
            {getCarListProps?.data &&
              getCarListProps?.data?.map((carInfo) => {
                const balloonContent2 = ReactDOMServer.renderToString(
                  <BalloonContent cls={cls} carInfo={carInfo} t={t} />
                );
                return (
                  <>
                    <Placemark
                      key={carInfo?.user?.guid}
                      geometry={[
                        carInfo?.users_gps?.[0]?.lat,
                        carInfo?.users_gps?.[0]?.long,
                      ]}
                      properties={{ balloonContent: balloonContent2 }}
                      instanceRef={(ref) => {
                        if (ref) {
                          placemarkRefs.current[carInfo?.user?.guid] = ref;
                        }
                      }}
                      options={{
                        iconLayout: "default#image",
                        iconImageHref:
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(
                            mapIcon[
                              carInfo?.order_data
                                ? `our_cargo`
                                : carInfo?.user?.provisions?.[0]
                            ] || GreenMapIcon
                          ),
                        iconImageSize:
                          watch("users_id")?.value || watch("users_id2")?.value
                            ? [45, 105]
                            : [40, 52],
                        iconImageOffset: [-15, -42],
                      }}
                      modules={["geoObject.addon.balloon"]}
                      onClick={() => {
                        setContendSingle(carInfo);
                        if (
                          carInfo?.order_data ||
                          carInfo?.user?.provisions?.[0] === "our_cargo"
                        ) {
                          setModalType("driverCheck");
                        } else if (
                          carInfo?.user?.provisions?.[0] === "someone_cargo"
                        ) {
                          setModalType("driverQuestion");
                        } else if (
                          carInfo?.user?.provisions?.[0] ===
                          "waiting_for_driver"
                        ) {
                          setModalType("driverExpectation");
                        } else {
                          setModalType("driverFree");
                        }
                      }}
                    />
                  </>
                );
              })}
          </Clusterer>
        )}

        {locationData &&
          locationData.map((item, index) => {
            const BalloonContentCargo = () => (
              <div
                id="balloon-content_cargo"
                className={cls.balloon_content_empty}
              >
                <div className={cls.wrap} style={{ height: "45px" }}>
                  {item?.new_status?.[0] === "occupied_cargo" ? (
                    <>
                      <MapCargoLoadGoodsIcon />
                      <span
                        style={{ color: "rgba(193, 187, 32, 1)" }}
                        className={cls.balloonName}
                      >
                        {item?.bid_cash || `$-----`}
                      </span>
                    </>
                  ) : (
                    <>
                      <MapCargoGreenIcon />
                      <span className={cls.balloonName}>
                        {item?.bid_cash || `$-----`}
                        {item?.currency_id_data?.code}
                      </span>
                    </>
                  )}

                  <Flex style={{ gap: "4px" }} alignItems={"center"}>
                    <Box className={cls.conWrap}>
                      <StoneIcon /> <span> {item?.weight} т.</span>
                    </Box>
                    <p className={cls.conWrap}> </p>
                    <p className={cls.conWrap} gap={1} alignItems={"center"}>
                      <LoadOulineIcon /> <span>{item?.volume_m3} m3</span>
                    </p>
                  </Flex>
                </div>
                <p className={cls.balloon_fulName}>
                  {t(`Оборудование и запчасти`)}
                </p>
                {item?.new_status?.[0] === "occupied_cargo" ? (
                  <>
                    <div className={cls.flex}>
                      <GoodsPhoneIcon />
                      <a
                        target="_blank"
                        href={`https://t.me/${item?.users_id_data?.phone}`}
                        className={cls.footerBoxLink}
                      >
                        {formatPhoneNumber(item?.users_id_data?.phone)}
                      </a>
                    </div>

                    <p className={cls.footerBox}>
                      <GoodsFuraIcon />
                      {item?.vehicle_type_id_data?.name}
                    </p>
                  </>
                ) : (
                  <>
                    <div className={cls.flex}>
                      <GreenPhoneIcon />
                      <a
                        target="_blank"
                        href={`https://t.me/${item?.users_id_data?.phone}`}
                        className={cls.footerBoxLink}
                      >
                        {formatPhoneNumber(item?.users_id_data?.phone)}
                      </a>
                    </div>

                    <p className={cls.footerBox}>
                      <GreenFuraIcon />
                      {item?.vehicle_type_id_data?.name}
                    </p>
                  </>
                )}
              </div>
            );
            const balloonContentCargo = ReactDOMServer.renderToString(
              <BalloonContentCargo />
            );

            return (
              <>
                {item.location_name && (
                  <Placemark
                    draggable={true}
                    onClick={() => {
                      setLoadState(item);
                      if (item?.new_status?.[0] === "occupied_cargo") {
                        setModalType("driverGruzGoods");
                      } else {
                        setModalType("driverGruz");
                      }
                    }}
                    key={item?.guid}
                    geometry={[
                      item.location_name.split(" ")[0] * 1 + index * 0.00001,
                      item.location_name.split(" ")[1] * 1 + index * 0.00001,
                    ]}
                    properties={{
                      balloonContent: balloonContentCargo,
                      iconContent: "2000",
                    }}
                    options={{
                      iconLayout: "default#image",
                      iconImageHref: getSVGIcon(
                        item?.bid_cash,
                        item?.new_status?.[0]
                      ),
                      iconImageSize: [60, 72],
                      iconImageOffset: [-15, -42],
                    }}
                    onBalloonOpen={(e) => {
                      const placemark = e.get("target");
                      const balloonInstance = placemark.balloon;
                      // balloonInstance.events.add("click", () => {
                      //   setLoadState(item);
                      //   if (item?.new_status?.[0] === "occupied_cargo") {
                      //     setModalType("driverGruzGoods");
                      //   } else {
                      //     setModalType("driverGruz");
                      //   }
                      // });
                    }}
                  />
                )}
              </>
            );
          })}
      </Map>
    );
  }
);

export default Cmap;
