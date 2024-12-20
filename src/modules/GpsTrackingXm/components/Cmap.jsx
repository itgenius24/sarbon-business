"use client";
import {
  BlueFuraIcon,
  BluePendingIcon,
  BluePhoneIcon,
  CencelMapIcon,
  CheckBlueIcon,
  FilterIcon,
  GoodsFuraIcon,
  GoodsPhoneIcon,
  GreenCarIcon,
  GreenFuraIcon,
  GreenPhoneIcon,
  LoadOulineIcon,
  MapCargoGreenIcon,
  MapCargoLoadGoodsIcon,
  QuestionBlueIcon,
  StoneIcon,
  GreenMapIcon,
  RefuelingIcon,
  RefuelingIconMap,
} from "@/assets/icons/icons";
import ReactDOMServer from "react-dom/server";
import { Box, Flex } from "@chakra-ui/react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Clusterer,
  Map,
  ObjectManager,
  Placemark,
  SearchControl,
  TypeSelector,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import copy from "copy-to-clipboard";
import { FixedSizeList as List } from "react-window";

const Cmap = memo(
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
    setContendSingle,
    contendHoverState,
  }) => {
    const mapRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const [refuelData, setRefuelData] = useState({});

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (refuelData) {
        const element = document.getElementById("#click");
        console.log("element", element);
        // element.addEventListener("click", () => {
        //   copy(
        //     `https://yandex.com/maps/?ll=${
        //       refuelData?.cords?.split(",")?.[1]
        //     },${refuelData?.cords?.split(",")?.[0]}&z=15&pt=${
        //       refuelData?.cords?.split(",")?.[1]
        //     },${refuelData?.cords?.split(",")?.[0]},pm2rdm`
        //   );
        // });
      }
    }, refuelData);


    if (!isClient) {
      return null; // Render nothing during SSR
    }

    const getSVGIcon = (tempValue = "$2000", type) => {
      const svgStringBlue = `
       <svg width="50" height="35" viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2001_4093)">
<mask id="path-1-outside-1_2001_4093" maskUnits="userSpaceOnUse" x="2" y="1" width="46" height="31" fill="black">
<rect fill="white" x="2" y="1" width="46" height="31"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3C7.13401 3 4 6.13401 4 10V16C4 19.866 7.13401 23 11 23H21.8688L24.8003 27.8858L27.7318 23H39C42.866 23 46 19.866 46 16V10C46 6.13401 42.866 3 39 3H11Z"/>
</mask>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3C7.13401 3 4 6.13401 4 10V16C4 19.866 7.13401 23 11 23H21.8688L24.8003 27.8858L27.7318 23H39C42.866 23 46 19.866 46 16V10C46 6.13401 42.866 3 39 3H11Z" fill="#C1BB20"/>
<path d="M21.8688 23L23.5838 21.971L23.0012 21H21.8688V23ZM24.8003 27.8858L23.0854 28.9148L24.8003 31.7731L26.5153 28.9148L24.8003 27.8858ZM27.7318 23V21H26.5994L26.0168 21.971L27.7318 23ZM6 10C6 7.23858 8.23858 5 11 5V1C6.02944 1 2 5.02944 2 10H6ZM6 16V10H2V16H6ZM11 21C8.23858 21 6 18.7614 6 16H2C2 20.9706 6.02944 25 11 25V21ZM21.8688 21H11V25H21.8688V21ZM26.5153 26.8568L23.5838 21.971L20.1539 24.029L23.0854 28.9148L26.5153 26.8568ZM26.0168 21.971L23.0854 26.8568L26.5153 28.9148L29.4468 24.029L26.0168 21.971ZM39 21H27.7318V25H39V21ZM44 16C44 18.7614 41.7614 21 39 21V25C43.9706 25 48 20.9706 48 16H44ZM44 10V16H48V10H44ZM39 5C41.7614 5 44 7.23858 44 10H48C48 5.02944 43.9706 1 39 1V5ZM11 5H39V1H11V5Z" fill="white" mask="url(#path-1-outside-1_2001_4093)"/>
</g>
<defs>
<filter id="filter0_d_2001_4093" x="0" y="0" width="50" height="34.7729" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2001_4093"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2001_4093" result="shape"/>
</filter>
</defs>
   <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="11" font-weight="600"  font-family="sans-serif" fill="#fff">$${tempValue}</text>
</svg>
`;

      const svgStringGreen = `
<svg width="50" height="35" viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_274_4505)">
<mask id="path-1-outside-1_274_4505" maskUnits="userSpaceOnUse" x="2" y="1" width="46" height="31" fill="black">
<rect fill="white" x="2" y="1" width="46" height="31"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3C7.13401 3 4 6.13401 4 10V16C4 19.866 7.13401 23 11 23H21.8688L24.8003 27.8858L27.7318 23H39C42.866 23 46 19.866 46 16V10C46 6.13401 42.866 3 39 3H11Z"/>
</mask>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3C7.13401 3 4 6.13401 4 10V16C4 19.866 7.13401 23 11 23H21.8688L24.8003 27.8858L27.7318 23H39C42.866 23 46 19.866 46 16V10C46 6.13401 42.866 3 39 3H11Z" fill="#15BA4D"/>
<path d="M21.8688 23L23.5838 21.971L23.0012 21H21.8688V23ZM24.8003 27.8858L23.0854 28.9148L24.8003 31.7731L26.5153 28.9148L24.8003 27.8858ZM27.7318 23V21H26.5994L26.0168 21.971L27.7318 23ZM6 10C6 7.23858 8.23858 5 11 5V1C6.02944 1 2 5.02944 2 10H6ZM6 16V10H2V16H6ZM11 21C8.23858 21 6 18.7614 6 16H2C2 20.9706 6.02944 25 11 25V21ZM21.8688 21H11V25H21.8688V21ZM26.5153 26.8568L23.5838 21.971L20.1539 24.029L23.0854 28.9148L26.5153 26.8568ZM26.0168 21.971L23.0854 26.8568L26.5153 28.9148L29.4468 24.029L26.0168 21.971ZM39 21H27.7318V25H39V21ZM44 16C44 18.7614 41.7614 21 39 21V25C43.9706 25 48 20.9706 48 16H44ZM44 10V16H48V10H44ZM39 5C41.7614 5 44 7.23858 44 10H48C48 5.02944 43.9706 1 39 1V5ZM11 5H39V1H11V5Z" fill="white" mask="url(#path-1-outside-1_274_4505)"/>
</g>
<defs>
<filter id="filter0_d_274_4505" x="0" y="0" width="50" height="34.7729" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_274_4505"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_274_4505" result="shape"/>
</filter>
</defs>
   <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="11" font-family="sans-serif" font-weight="600" fill="#fff">$${
     tempValue || `------`
   }</text>

</svg>

`;

      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        type === "occupied_cargo" ? svgStringBlue : svgStringGreen
      )}`;
    };

    let click = document.getElementById(`click`);

    click?.addEventListener(`click`, (e) => {
      e.stopPropagation();
      // console.log("contendHoverState",contendHoverState?.users_id_data?.phone)
      copy(contendHoverState?.users_id_data?.phone);
    });

    const copyFn =() => {
      copy(
        `https://yandex.com/maps/?ll=${
              refuelData?.cords?.split(",")?.[1]
            },${refuelData?.cords?.split(",")?.[0]}&z=15&pt=${
              refuelData?.cords?.split(",")?.[1]
            },${refuelData?.cords?.split(",")?.[0]},pm2rdm`
      )
    }

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
            clusterIconColor: "rgba(52, 199, 89, 1)",
            style: {
              backgroundColor: "rgba(52, 199, 89, 1)",
              color: "white",
              borderRadius: "50%",
            },
          }}
        >
          {watch(`refuelingState`) &&
            refueling.map((refuel) => {
              const BalloonContent = () => (
                <div className={cls.wrapRefueling}>
                  <div className={cls.topTetxWrap}>
                    <>
                      <RefuelingIcon />
                    </>
                    <p className={cls.zTitle}>АЗС</p>
                    <div onclick="copyFn()">copy</div>
                  </div>
                  <p className={cls.zTitle}>{refuel?.name}</p>
                  <p className={cls.zAdress}>{refuel?.address}</p>
                </div>
              );
              const balloonContent3 = ReactDOMServer.renderToString(
                <BalloonContent />
              );
              return (
                <Placemark
                  onClick={() => setRefuelData(refuel)}
                  key={refuel.guid}
                  properties={{ balloonContent: balloonContent3 }}
                  modules={["geoObject.addon.balloon"]}
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
              const BalloonContent = () => (
                <div id="balloon-content" className={cls.balloon_content_empty}>
                  <div className={cls.wrap} style={{ height: "45px" }}>
                    {carInfo?.user?.provisions?.[0] === "empty" ? (
                      <>
                        <GreenCarIcon />
                        <span className={cls.balloonName}>Свободен</span>
                      </>
                    ) : carInfo?.user?.provisions?.[0] ===
                      "waiting_for_driver" ? (
                      <>
                        <BluePendingIcon />
                        <span
                          style={{ color: "rgba(0, 122, 255, 1)" }}
                          className={cls.balloonName}
                        >
                          Ожидание
                        </span>
                      </>
                    ) : carInfo?.user?.provisions?.[0] === "our_cargo" ? (
                      <>
                        <CheckBlueIcon />
                        <span
                          style={{ color: "rgba(0, 122, 255, 1)" }}
                          className={cls.balloonName}
                        >
                          Занят
                        </span>
                      </>
                    ) : carInfo?.user?.provisions?.[0] === "someone_cargo" ? (
                      <>
                        <QuestionBlueIcon />
                        <span
                          style={{ color: "rgba(0, 122, 255, 1)" }}
                          className={cls.balloonName}
                        >
                          Занят
                        </span>
                      </>
                    ) : carInfo?.user?.provisions?.[0] === "broke_down" ? (
                      <>
                        <CencelMapIcon />
                        <span
                          style={{ color: "rgba(126, 123, 134, 1)" }}
                          className={cls.balloonName}
                        >
                          Сломалась
                        </span>
                      </>
                    ) : (
                      <>
                        <GreenCarIcon />
                        <span className={cls.balloonName}>Свободен</span>
                      </>
                    )}

                    <div className={cls.loadIconWrap}>
                      <Box className={cls.conWrap}>
                        <StoneIcon />{" "}
                        <span> {carInfo?.vehicles?.[0]?.height} т.</span>
                      </Box>

                      <Box
                        className={cls.conWrap}
                        gap={1}
                        alignItems={"center"}
                      >
                        <LoadOulineIcon />{" "}
                        <span>{carInfo?.vehicles?.[0]?.capacity} m3</span>
                      </Box>
                    </div>
                  </div>
                  <p className={cls.balloon_fulName}>
                    {carInfo?.user?.full_name}
                  </p>
                  {carInfo?.user?.provisions?.[0] === "empty" ? (
                    <>
                      <div className={cls.flex}>
                        <GreenPhoneIcon />
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          className={cls.footerBoxLink}
                        >
                          {formatPhoneNumber(carInfo?.user?.phone)}
                        </a>
                      </div>
                      <p className={cls.footerBox}>
                        <GreenFuraIcon />
                        {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          : `Пока нет машины.`}
                      </p>
                    </>
                  ) : carInfo?.user?.provisions?.[0] ===
                    "waiting_for_driver" ? (
                    <>
                      <div className={cls.flex}>
                        <BluePhoneIcon />{" "}
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          className={cls.footerBoxLink}
                        >
                          {formatPhoneNumber(carInfo?.user?.phone)}
                        </a>
                      </div>

                      <p className={cls.footerBox}>
                        <BlueFuraIcon />
                        {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          : `Пока нет машины.`}
                      </p>
                    </>
                  ) : carInfo?.user?.provisions?.[0] === "our_cargo" ? (
                    <>
                      <div className={cls.flex}>
                        <BluePhoneIcon />
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          className={cls.footerBoxLink}
                        >
                          {formatPhoneNumber(carInfo?.user?.phone)}
                        </a>
                      </div>

                      <p className={cls.footerBox}>
                        <BlueFuraIcon />
                        {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          : `Пока нет машины.`}
                      </p>
                    </>
                  ) : carInfo?.user?.provisions?.[0] === "someone_cargo" ? (
                    <>
                      <div className={cls.flex}>
                        <BluePhoneIcon />
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          className={cls.footerBoxLink}
                        >
                          {formatPhoneNumber(carInfo?.user?.phone)}
                        </a>
                      </div>

                      <p className={cls.footerBox}>
                        <BlueFuraIcon />
                        {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          : `Пока нет машины.`}
                      </p>
                    </>
                  ) : carInfo?.user?.provisions?.[0] === "broke_down" ? (
                    <>
                      <div className={cls.flex}>
                        <BluePhoneIcon />{" "}
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          className={cls.footerBoxLink}
                        >
                          {formatPhoneNumber(carInfo?.user?.phone)}
                        </a>
                      </div>
                      <p className={cls.footerBox}>
                        <BlueFuraIcon />
                        {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          : `Пока нет машины.`}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={cls.flex}>
                        <GreenPhoneIcon />
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          className={cls.footerBoxLink}
                        >
                          {formatPhoneNumber(carInfo?.user?.phone)}
                        </a>
                      </div>

                      <p className={cls.footerBox}>
                        <GreenFuraIcon />
                        {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                          : `Пока нет машины.`}
                      </p>
                    </>
                  )}
                </div>
              );
              const balloonContent2 = ReactDOMServer.renderToString(
                <BalloonContent />
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
                      setContendSingle(carInfo);
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
        </Clusterer>

        {locationData &&
          locationData.map((item) => {
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
                      item.location_name.split(" ")[0] * 1,
                      item.location_name.split(" ")[1] * 1,
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
