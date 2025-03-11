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
  WatsapIcon,
  TelegramIcon,
  RefeIcon,
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
import React, { memo, useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import copy from "copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { getSVGIcon } from "@/utils/getSVGIcon";

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

    setContendSingle,
    contendHoverState,
  }) => {
    const mapRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const { t } = useTranslation();
    const [zoom, setZoom] = useState(5);

    useEffect(() => {
      setIsClient(true);
    }, []);


    console.log(`locationData`,locationData)

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

    if (!isClient) {
      return null; // Render nothing during SSR
    }

    let click = document.getElementById(`click`);

    click?.addEventListener(`click`, (e) => {
      e.stopPropagation();
      // console.log("contendHoverState",contendHoverState?.users_id_data?.phone)
      copy(contendHoverState?.users_id_data?.phone);
    });

    const resetMap = () => {
      if (mapRef.current) {
        mapRef.current.setCenter(coordinates, 4);
      }
    };

    return (
      <Map
        instanceRef={mapRef}
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

        {zoom >= 20 ? (
          getCarListProps?.data &&
          getCarListProps?.data?.map((carInfo) => {
            const BalloonContent = () => (
              <div id="balloon-content" className={cls.balloon_content_empty}>
                <div className={cls.wrap} style={{ height: "45px" }}>
                  {!carInfo?.order_data &&
                  carInfo?.user?.provisions?.[0] === "empty" ? (
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
                  ) : carInfo?.order_data ||
                    carInfo?.user?.provisions?.[0] === "our_cargo" ? (
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
                        {t(`Сломалась`)}
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
                      <span> {carInfo?.vehicles?.[0]?.capacity} т.</span>
                    </Box>

                    <Box className={cls.conWrap} gap={1} alignItems={"center"}>
                      <LoadOulineIcon />
                      <span>{carInfo?.vehicles?.[0]?.height} m3</span>
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
                        onCopy={(event) => {
                          event.preventDefault();
                          console.log(
                            `selectedText`,
                            window.getSelection().toString()
                          );

                          const selectedText = window
                            .getSelection()
                            .toString()
                            .replace(/\s+/g, "");
                          event.clipboardData.setData(
                            "text/plain",
                            selectedText
                          );
                        }}
                      >
                        {formatPhoneNumber(carInfo?.user?.phone)}
                      </a>
                      <div className={cls.flex}>
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <TelegramIcon />
                        </a>
                        <a
                          target="_blank"
                          href={`https://wa.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <WatsapIcon />
                        </a>
                      </div>
                    </div>
                    <p className={cls.footerBox}>
                      <GreenFuraIcon />
                      {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        : t(`Пока нет машины`)}
                    </p>
                  </>
                ) : carInfo?.user?.provisions?.[0] === "waiting_for_driver" ? (
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
                      <div className={cls.flex}>
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <TelegramIcon />
                        </a>
                        <a
                          target="_blank"
                          href={`https://wa.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <WatsapIcon />
                        </a>
                      </div>
                    </div>

                    <p className={cls.footerBox}>
                      <BlueFuraIcon />
                      {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        : t(`Пока нет машины`)}
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
                      <div className={cls.flex}>
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <TelegramIcon />
                        </a>
                        <a
                          target="_blank"
                          href={`https://wa.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <WatsapIcon />
                        </a>
                      </div>
                    </div>

                    <p className={cls.footerBox}>
                      <BlueFuraIcon />
                      {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        : t(`Пока нет машины`)}
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
                      <div className={cls.flex}>
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <TelegramIcon />
                        </a>
                        <a
                          target="_blank"
                          href={`https://wa.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <WatsapIcon />
                        </a>
                      </div>
                    </div>

                    <p className={cls.footerBox}>
                      <BlueFuraIcon />
                      {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        : t(`Пока нет машины`)}
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
                      <div className={cls.flex}>
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <TelegramIcon />
                        </a>
                        <a
                          target="_blank"
                          href={`https://wa.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <WatsapIcon />
                        </a>
                      </div>
                    </div>
                    <p className={cls.footerBox}>
                      <BlueFuraIcon />
                      {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        : t(`Пока нет машины`)}
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
                      <div className={cls.flex}>
                        <a
                          target="_blank"
                          href={`https://t.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <TelegramIcon />
                        </a>
                        <a
                          target="_blank"
                          href={`https://wa.me/${carInfo?.user?.phone}`}
                          id="click"
                          // className={cls.footerBoxLink}
                        >
                          <WatsapIcon />
                        </a>
                      </div>
                    </div>

                    <p className={cls.footerBox}>
                      <GreenFuraIcon />
                      {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                        : t(`Пока нет машины`)}
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
                const BalloonContent = () => (
                  <div
                    id="balloon-content"
                    className={cls.balloon_content_empty}
                  >
                    <div className={cls.wrap} style={{ height: "45px" }}>
                      {!carInfo?.order_data &&
                      carInfo?.user?.provisions?.[0] === "empty" ? (
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
                      ) : carInfo?.order_data ||
                        carInfo?.user?.provisions?.[0] === "our_cargo" ? (
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
                            {t(`Сломалась`)}
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
                          <span> {carInfo?.vehicles?.[0]?.capacity} т.</span>
                        </Box>

                        <Box
                          className={cls.conWrap}
                          gap={1}
                          alignItems={"center"}
                        >
                          <LoadOulineIcon />
                          <span>{carInfo?.vehicles?.[0]?.height} m3</span>
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
                            onCopy={(event) => {
                              event.preventDefault();
                              console.log(
                                `selectedText`,
                                window.getSelection().toString()
                              );

                              const selectedText = window
                                .getSelection()
                                .toString()
                                .replace(/\s+/g, "");
                              event.clipboardData.setData(
                                "text/plain",
                                selectedText
                              );
                            }}
                          >
                            {formatPhoneNumber(carInfo?.user?.phone)}
                          </a>
                          <div className={cls.flex}>
                            <a
                              target="_blank"
                              href={`https://t.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <TelegramIcon />
                            </a>
                            <a
                              target="_blank"
                              href={`https://wa.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <WatsapIcon />
                            </a>
                          </div>
                        </div>
                        <p className={cls.footerBox}>
                          <GreenFuraIcon />
                          {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            : t(`Пока нет машины`)}
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
                          <div className={cls.flex}>
                            <a
                              target="_blank"
                              href={`https://t.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <TelegramIcon />
                            </a>
                            <a
                              target="_blank"
                              href={`https://wa.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <WatsapIcon />
                            </a>
                          </div>
                        </div>

                        <p className={cls.footerBox}>
                          <BlueFuraIcon />
                          {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            : t(`Пока нет машины`)}
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
                          <div className={cls.flex}>
                            <a
                              target="_blank"
                              href={`https://t.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <TelegramIcon />
                            </a>
                            <a
                              target="_blank"
                              href={`https://wa.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <WatsapIcon />
                            </a>
                          </div>
                        </div>

                        <p className={cls.footerBox}>
                          <BlueFuraIcon />
                          {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            : t(`Пока нет машины`)}
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
                          <div className={cls.flex}>
                            <a
                              target="_blank"
                              href={`https://t.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <TelegramIcon />
                            </a>
                            <a
                              target="_blank"
                              href={`https://wa.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <WatsapIcon />
                            </a>
                          </div>
                        </div>

                        <p className={cls.footerBox}>
                          <BlueFuraIcon />
                          {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            : t(`Пока нет машины`)}
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
                          <div className={cls.flex}>
                            <a
                              target="_blank"
                              href={`https://t.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <TelegramIcon />
                            </a>
                            <a
                              target="_blank"
                              href={`https://wa.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <WatsapIcon />
                            </a>
                          </div>
                        </div>
                        <p className={cls.footerBox}>
                          <BlueFuraIcon />
                          {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            : t(`Пока нет машины`)}
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
                          <div className={cls.flex}>
                            <a
                              target="_blank"
                              href={`https://t.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <TelegramIcon />
                            </a>
                            <a
                              target="_blank"
                              href={`https://wa.me/${carInfo?.user?.phone}`}
                              id="click"
                              // className={cls.footerBoxLink}
                            >
                              <WatsapIcon />
                            </a>
                          </div>
                        </div>

                        <p className={cls.footerBox}>
                          <GreenFuraIcon />
                          {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
                            : t(`Пока нет машины`)}
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
