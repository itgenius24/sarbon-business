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
  RefuelingIcon,
  RefuelingIconMap,
  RefeIcon,
} from "@/assets/icons/icons";
import ReactDOMServer from "react-dom/server";
import { Box, Flex } from "@chakra-ui/react";
import {
  Clusterer,
  Map,
  Placemark,
  SearchControl,
  TypeSelector,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import copy from "copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { BalloonContent } from "./BalloonContent";
import { getSVGIcon } from "@/utils/getSVGIcon";

const CmapAZS = memo(
  ({
    getCarListProps,
    coordinates,
    cls,
    type,
    mapIcon,
    watch,
    setModalType,
    refueling,
    locationData,
    setLoadState,
    setCurrentUserLocationData,
  }) => {
    const mapRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const { t } = useTranslation();
    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) {
      return null; // Render nothing during SSR
    }

  
    const copyFn = (refuelData) => {
      copy(
        `https://yandex.com/maps/?ll=${refuelData?.cords?.split(",")?.[1]},${
          refuelData?.cords?.split(",")?.[0]
        }&z=15&pt=${refuelData?.cords?.split(",")?.[1]},${
          refuelData?.cords?.split(",")?.[0]
        },pm2rdm`
      );
    };


    const resetMap = () => {
      if (mapRef.current) {
        mapRef.current.setCenter(coordinates, 4);
      }
    };

    return (
      <Map
        instanceRef={mapRef}
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
        ]}
      >
       <div onClick={resetMap} className={cls.backMap}>
                <RefeIcon />
              </div>
        <TypeSelector
          mapTypes={[
            "yandex#map",
            "yandex#satellite",
            "yandex#hybrid",
            "yandex#publicMap",
          ]}
        />
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

        <Clusterer
          options={{
            visible: Boolean(watch("refuelingState")),
            clusterIconColor: "rgba(52, 199, 89, 1)",
            style: {
              backgroundColor: "rgba(52, 199, 89, 1)",
              color: "white",
              borderRadius: "50%",
            },
          }}
        >
          {refueling?.map((refuel) => {
            return (
              <Placemark
                key={refuel.guid}
                properties={{
                  balloonContent: `
                  <div class="${cls.wrapRefueling}">
                      <div class="${cls.topTetxWrap}">
                          <div>${RefuelingIcon}</div>
                          <p class="${cls.zTitle}">АЗС</p>
                          <div 
                              id="copy-button-${refuel.guid}"
                              style="width:fit contend;cursor: pointer; position: relative; border-bottom:1px dashed rgba(0, 122, 255, 1);color:rgba(0, 122, 255, 1)"
                          >
                              ${t(`Поделится локацией`)}
                              <span 
                                  id="tooltip-${refuel.guid}" 
                                  style="
                                      visibility: hidden;
                                      position: absolute;
                                      bottom: -32px;
                                      right: -5%;
                                      width:fit contend;
                                      white-space: nowrap;
                                      background-color: rgba(0, 122, 255, 1);
                                      color: #fff;
                                      padding: 5px;
                                      font-weight:500;
                                      border-radius: 4px;
                                      font-size: 13px;
                                      z-index: 100000000000;
                                  "
                              >
                                Локациия скопирована
                              </span>
                          </div>
                      </div>
                      <p class="${cls.zTitle}">${refuel.name}</p>
                      <p class="${cls.zAdress}">${refuel.address}</p>
                  </div>
                `,
                }}
                modules={["geoObject.addon.balloon", `templateLayoutFactory`]}
                geometry={[
                  refuel?.cords?.split(",")?.[0],
                  refuel?.cords?.split(",")?.[1],
                ]}
                options={{
                  iconLayout: "default#image",
                  iconImageHref:
                    "data:image/svg+xml;charset=UTF-8," +
                    encodeURIComponent(RefuelingIconMap),
                  iconImageSize: [40, 42],
                  iconImageOffset: [-15, -42],
                }}
                onBalloonOpen={() => {
                  const button = document.getElementById(
                    `copy-button-${refuel.guid}`
                  );
                  const tooltip = document.getElementById(
                    `tooltip-${refuel.guid}`
                  );

                  button?.addEventListener("click", () => {
                    copyFn(refuel);
                    tooltip.style.visibility = "visible";
                    setTimeout(() => {
                      tooltip.style.visibility = "hidden";
                    }, 1500);
                  });
                }}
              />
            );
          })}
        </Clusterer>

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
                    }}
                    modules={["geoObject.addon.balloon"]}
                    onBalloonOpen={(e) => {
                      const placemark = e.get("target");
                      const balloonInstance = placemark.balloon;
                    }}
                    onClick={() => {
                      setCurrentUserLocationData(carInfo);
                      if (carInfo?.user?.provisions?.[0] === "our_cargo") {
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
            })}

          {locationData &&
            locationData.map((item,index) => {
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
                  <p className={cls.balloon_fulName}>{item.product_type}</p>
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
                        item.location_name.split(" ")[1] * 1 + index * 0.0001
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
      </Map>
    );
  }
);

export default CmapAZS;
