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
  TypeSelector,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import React, { memo, useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useTranslation } from "react-i18next";
import { BalloonContent } from "./BalloonContent";
import { getSVGIcon } from "@/utils/getSVGIcon";

const Cmap = memo(
  ({
    getCarListProps,
    coordinates,
    cls,
    mapIcon,
    watch,
    setModalType,
    locationData,
    setLoadState,
    setCurrentUserLocationData,
    mapRef,
    
  }) => {
    const [isClient, setIsClient] = useState(false);
    const { t } = useTranslation();
    const [zoom, setZoom] = useState(5);
    const [points, setPoints] = useState([]);
    const [distance, setDistance] = useState(null);
    const ymapsRef = useRef(null);
    const polylineRef = useRef(null);
    const [ballonRef, setBallonRef] = useState(null);
    const multiRouteRef = useRef(null);
    const [clickCount, setClickCount] = useState(0);
    const [pointA, setPointA] = useState(null);
    const [pointB, setPointB] = useState(null);
    const [selecting, setSelecting] = useState(false);
    const [types, setType] = useState(``);
    const [isSelectingPoints, setIsSelectingPoints] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

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

    const closeRouteBalloon = () => {
      const activeRoute = multiRouteRef.current?.getActiveRoute();

      if (activeRoute && activeRoute.balloon) {
        activeRoute.balloon.close();
      }
    };

    const drawRoute = (a, b) => {
      if (!ymapsRef.current || !a || !b) {
        mapRef.current.geoObjects.remove(multiRouteRef.current);
        multiRouteRef.current = null;
      }

      if (multiRouteRef.current) {
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

      multiRoute.model.events.add("requestsuccess", () => {
        const activeRoute = multiRoute.getActiveRoute();

        if (activeRoute && activeRoute.balloon) {
          activeRoute.balloon.open();
          setBallonRef(true);
        }
      });
    };

    useEffect(() => {
      setTimeout(() => {
        const closeBtn = document.querySelector(
          `.ymaps-2-1-79-balloon__close-button`
        );

        if (closeBtn) {
          closeBtn.addEventListener(`click`, () => {
            setClickCount(0);
            setSelecting(false);
            setPointA(null);
            setPointB(null);
            setPoints([]);
            setDistance(null);
            setType(``);
            mapRef.current.geoObjects.remove(multiRouteRef.current);
            multiRouteRef.current = null;
            // setIsBalloonOpened(false);
            closeRouteBalloon();
            setBallonRef(false);
            setSelecting(false);
            polylineRef.current = null;
          });
        }
      }, 1000);
    }, [selecting, types, points?.[0], points?.[1], ballonRef]);

    const getMiddlePoint = ([point1, point2]) => {
      const lat = (point1[0] + point2[0]) / 2;
      const lon = (point1[1] + point2[1]) / 2;
      return [lat, lon];
    };

    const handlePointSelect = (coords) => {
      if (!selecting) return;

      if (clickCount === 0) {
        setPointA(coords);
        setClickCount(1);
      } else if (clickCount === 1) {
        setIsSelectingPoints(false);
        setPointB(coords);
        setClickCount(2);
        setSelecting(false); // End selection
        getDistanceInKm(pointA, coords);
        setPoints([pointA, coords]);
        if (types === `route`) {
          drawRoute(pointA, coords);
        }
      }
    };

    useEffect(() => {
      if (types === `rules` && points.length > 0) {
        openBallon();
      } else {
        closeBallon();
      }
    }, [polylineRef.current, distance, selecting, types]);

    const openBallon = () => {
      const map = mapRef.current;
      if (!map) return;
      const balloonContent = `<p class="distance">Masofa: ${distance} km</p>`;
      map.balloon.open(getMiddlePoint(points), balloonContent, {
        closeButton: true,
      });
    };
    const closeBallon = () => {
      const map = mapRef.current;
      if (!map) return;
      map.balloon.close();
      setBallonRef(false);
      polylineRef.current = null;
    };

    const startRouteSelection = (type) => {
      setType(type);

      if (type === "rules") {
        setClickCount(0);
        setSelecting(true);
        if (multiRouteRef.current) {
          mapRef.current?.geoObjects?.remove(multiRouteRef.current);
          multiRouteRef.current = null;
        }
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
      setTimeout(() => {
        drawRoute(pointA, pointB);
      }, 500);
    };

    const handleDragEnd = (e, index) => {
      const map = mapRef.current;

      const newCoords = e.get("target").geometry.getCoordinates();
      const newPoints = [...points];
      newPoints[index] = newCoords;
      setPoints(newPoints);
      getDistanceInKm(newPoints[0], newPoints[1]);
      if (types === `route`) {
        drawRoute(newPoints[0], newPoints[1]);
      } else {
        setBallonRef(true);
        // map.balloon.close();
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
      return null;
    }

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
        onBoundsChange={(e) => setZoom(e.get("newZoom"))}
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
          "multiRouter.MultiRoute",
        ]}
      >
        <div className={cls.settWrap}>
          <div onClick={resetMap} className={cls.backMap}>
            <RefeIcon />
          </div>
          <div
            onClick={() => {
              startRouteSelection(`route`);
              setIsSelectingPoints(true);
            }}
            className={`${cls.route} ${
              types === `route` ? cls.activeRoute : ``
            }`}
          >
            <RouteIcon />
          </div>
          <div
            onClick={() => {
              startRouteSelection(`rules`);
              setIsSelectingPoints(true);
            }}
            className={`${cls.route} ${
              types === `rules` ? cls.activeRoute : ``
            } `}
          >
            <RulesIcon />
          </div>
        </div>
        <TypeSelector
          mapTypes={[
            "yandex#map",
            "yandex#satellite",
            "yandex#hybrid",
            "yandex#publicMap",
          ]}
        />
        {/* <SearchControl options={{ float: "right" }} /> */}
        <ZoomControl
          options={{
            position: {
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
            instanceRef={(ref) => (polylineRef.current = ref)}
            geometry={points}
            onClick={handlePolylineClick}
            options={{
              strokeColor: "#FF0000",
              strokeWidth: 4,
              strokeOpacity: 0.6,
            }}
          />
        )}

        {zoom >= 20 ? (
          <>
            {getCarListProps?.data &&
              getCarListProps?.data?.map((carInfo, index) => {
                const balloonContent2 = ReactDOMServer.renderToString(
                  <BalloonContent cls={cls} carInfo={carInfo} t={t} />
                );
                return (
                  <>
                    <Placemark
                      key={carInfo?.user?.guid}
                      geometry={[
                        carInfo?.users_gps?.[0]?.lat +
                          (index % 2 === 0 ? 1 : -1) * 0.00003,
                        carInfo?.users_gps?.[0]?.long +
                          (index % 3 === 0 ? 1 : -1) * 0.00003,
                      ]}
                      properties={{ balloonContent: balloonContent2 }}
                      options={{
                        iconLayout: "default#image",
                        iconImageHref:
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(
                            mapIcon[carInfo?.user?.provisions?.[0]] ||
                              GreenMapIcon
                          ),
                        iconImageSize:
                          watch("users_id")?.value || watch("users_id2")?.value
                            ? [45, 105]
                            : [40, 52],
                        iconImageOffset: [-15, -42],
                        zIndexHover: 1,
                        zIndex: 1,
                      }}
                      modules={["geoObject.addon.balloon"]}
                      onClick={(e) => {
                        if (isSelectingPoints) {
                          const coords = e
                            .get("target")
                            .geometry.getCoordinates();
                          handlePointSelect(coords);
                          e.preventDefault();
                          e.stopPropagation();

                          return;
                        } else {
                          setCurrentUserLocationData(carInfo);
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
                        }
                      }}
                    />
                  </>
                );
              })}
          </>
        ) : (
          <Clusterer
            options={{
              groupByCoordinates: false,
              gridSize: 50,
              clusterIconColor: "rgba(52, 199, 89, 1)",
              style: {
                backgroundColor: "rgba(52, 199, 89, 1)",
                color: "white",
                borderRadius: "50%",
              },
            }}
          >
            {getCarListProps?.data &&
              getCarListProps?.data?.map((carInfo, index) => {
                const balloonContent2 = ReactDOMServer.renderToString(
                  <BalloonContent cls={cls} carInfo={carInfo} t={t} />
                );
                return (
                  <>
                    <Placemark
                      key={carInfo?.user?.guid}
                      geometry={[
                        carInfo?.users_gps?.[0]?.lat +
                          (index % 2 === 0 ? 1 : -1) * 0.00003,
                        carInfo?.users_gps?.[0]?.long +
                          (index % 3 === 0 ? 1 : -1) * 0.00003,
                      ]}
                      properties={{ balloonContent: balloonContent2 }}
                      options={{
                        iconLayout: "default#image",
                        iconImageHref:
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(
                            mapIcon[carInfo?.user?.provisions?.[0]] ||
                              GreenMapIcon
                          ),
                        iconImageSize:
                          watch("users_id")?.value || watch("users_id2")?.value
                            ? [45, 105]
                            : [40, 52],
                        iconImageOffset: [-15, -42],
                        zIndexHover: 1,
                        zIndex: 1,
                      }}
                      modules={["geoObject.addon.balloon"]}
                      onBalloonOpen={(e) => {
                        const placemark = e.get("target");
                        const balloonInstance = placemark.balloon;
                      }}
                      onClick={(e) => {
                        if (isSelectingPoints) {
                          const coords = e
                            .get("target")
                            .geometry.getCoordinates();
                          handlePointSelect(coords);
                          e.preventDefault();
                          e.stopPropagation();

                          return;
                        } else {
                          setCurrentUserLocationData(carInfo);
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
                        }
                      }}
                    />
                  </>
                );
              })}
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
                        <p
                          className={cls.conWrap}
                          gap={1}
                          alignItems={"center"}
                        >
                          <LoadOulineIcon /> <span>{item?.volume_m3} m3</span>
                        </p>
                      </Flex>
                    </div>
                    <p className={cls.balloon_fulName}>
                      Оборудование и запчасти
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
                          item.location_name.split(" ")[0] * 1 + index * 0.0001,
                          item.location_name.split(" ")[1] * 1 + index * 0.0001,
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
                      />
                    )}
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
                <p className={cls.balloon_fulName}>Оборудование и запчасти</p>
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
                      item.location_name.split(" ")[0] * 1 + index * 0.0001,
                      item.location_name.split(" ")[1] * 1 + index * 0.0001,
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
