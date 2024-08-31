"use client";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import { Container } from "@/components/Container";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  Tooltip,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { TextField } from "@/components/TextField";
import { Checkbox } from "@/components/Checkbox";
import {
  BlueFuraIcon,
  BluePendingIcon,
  BluePhoneIcon,
  CencelMapIcon,
  CheckBlueIcon,
  FilterIcon,
  FilterIconBlack,
  GoodsFuraIcon,
  GoodsPhoneIcon,
  GreenCarIcon,
  GreenFuraIcon,
  GreenMapIcon,
  GreenPhoneIcon,
  LoadOulineIcon,
  LocationMarkIcon,
  MapCargoGreenIcon,
  MapCargoLoadGoodsIcon,
  MapLoadGreenIcon,
  MapLoadIcon,
  QuestionBlueIcon,
  StoneIcon,
  loadIcon,
} from "@/assets/icons/icons";
import React, { useCallback, useRef, useState } from "react";

import cls from "./style.module.scss";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Modal } from "@/components/Modal";
import LoadingMap from "@/modules/Cargo/components/LoadingMap";
import { Dropdown } from "@/components/Dropdown";
import { CarList } from "@/modules/SearchCar/component/CarList/CarList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { UseIcon } from "@/assets/icons/icons";
import ReactDOMServer from "react-dom/server";
import {
  Clusterer,
  Map,
  Placemark,
  SearchControl,
  TypeSelector,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import styled from "@emotion/styled";
import PlacemarkItem from "./PlacemarkItem";
import { SingleCar } from "../SearchCar/component/SingleCar/SingleCar";
import { ChakraSelect } from "@/components/ChakraSelect";
import Filter from "./components/Filter";
import DriverFree from "./components/DriverFree";
import SelectCargo from "./components/SelectCargo";
import ChangeIconModal from "./components/ChangeIconModal";
import { format } from "date-fns";
import DriverExpectation from "./components/DriverExpectation";
import DriverCheck from "./components/DriverCheck";
import DriverQuestion from "./components/DriverQuestion";
import DriverGruz from "./components/DriverGruz";
import DriverGruzGoods from "./components/DriverGruzGoods";
import Cmap from "./components/Cmap";
import { useGpsTrackingProps } from "./useGpsTrackingProps";

/* eslint no-undef: 0 */ // --> OFF

export default function GpsTrackingModuleTets() {
  const {
    register,
    errors,
    handleCalculate,
    handleOpenModal,
    isModalOpen,
    handleCloseModal,
    coordinates,
    onMapClick,
    placeMarkGeometry,
    setYMaps,
    yandexMapRef,
    setIsModalOpen,
    carTypeOptions,
    loadingOptions,
    weightMeasurementOptions,
    control,
    getCarListProps,
    onSubmit,
    handleSubmit,
    driverName,
    isLoading,
    watch,
    setValue,
    setChecked,
    checked,
    locationData,
    getUserOption,
    setDistance,
    distance,
    mapIcon,
    handleClear,
    setContendSingle,
    contendSingle,
    setIconStatus,
    iconStatus,
    statusIconChange,
    modalType,
    setModalType,
    centerModalType,
    setCenterModalType,
    setLoadState,
    loadState,
    checkboxStatuses,
    handleCheckboxChange,
    setStateMap
  } = useGpsTrackingProps();

  const locale = useGetLang();

  // const handlePlacemarkClick = (map, location) => {
  //   map.setCenter(location, 15); // 15 darajadagi zoom
  // };
  const cargoRef = useRef(null);

  const handleMouseEnter = (e, carInfo) => {
    e.preventDefault();
    const placemark = e.get("target");
    placemark.balloon.open();
    // cargoRef.current = carInfo;
    setContendSingle(carInfo);
  };

  // console.log("cargoRef",cargoRef);

  const handleMouseEnterCargo = (e, carInfo) => {
    e.preventDefault();
    const placemark = e.get("target");
    placemark.balloon.open();
    setLoadState(carInfo);
  };

  const type = contendSingle?.users_id_data?.provisions?.[0];
  const typeCargo = loadState?.order_status?.[0];

  const BalloonContent = () => (
    <div id="balloon-content" className={cls.balloon_content_empty}>
      <div className={cls.wrap} style={{ height: "45px" }}>
        {type === "empty" ? (
          <>
            {" "}
            <GreenCarIcon /> <span className={cls.balloonName}>Свободен</span>
          </>
        ) : type === "waiting_for_driver" ? (
          <>
            {" "}
            <BluePendingIcon />{" "}
            <span
              style={{ color: "rgba(0, 122, 255, 1)" }}
              className={cls.balloonName}
            >
              Ожидание
            </span>
          </>
        ) : type === "our_cargo" ? (
          <>
            {" "}
            <CheckBlueIcon />{" "}
            <span
              style={{ color: "rgba(0, 122, 255, 1)" }}
              className={cls.balloonName}
            >
              Занят
            </span>
          </>
        ) : type === "someone_cargo" ? (
          <>
            {" "}
            <QuestionBlueIcon />{" "}
            <span
              style={{ color: "rgba(0, 122, 255, 1)" }}
              className={cls.balloonName}
            >
              Занят
            </span>
          </>
        ) : type === "broke_down" ? (
          <>
            {" "}
            <CencelMapIcon />{" "}
            <span
              style={{ color: "rgba(126, 123, 134, 1)" }}
              className={cls.balloonName}
            >
              Сломалась
            </span>
          </>
        ) : (
          <>
            {" "}
            <GreenCarIcon /> <span className={cls.balloonName}>Свободен</span>
          </>
        )}

        <Flex>
          <p
            className={cls.conWrap}
            gap={1}
            alignItems={"center"}
            flexWrap={"nowrap"}
          >
            <StoneIcon /> <span>22 т</span>
          </p>
          <p className={cls.conWrap} gap={1} alignItems={"center"}>
            <LoadOulineIcon /> 86m3
          </p>
        </Flex>
      </div>
      <p className={cls.balloon_fulName}>
        {contendSingle?.users_id_data?.full_name}
      </p>
      {type === "empty" ? (
        <>
          <p className={cls.footerBox}>
            <GreenPhoneIcon /> {contendSingle?.users_id_data?.phone}
          </p>
          <p className={cls.footerBox}>
            <GreenFuraIcon />
            {contendSingle?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : type === "waiting_for_driver" ? (
        <>
          {" "}
          <p className={cls.footerBox}>
            <BluePhoneIcon /> {contendSingle?.users_id_data?.phone}
          </p>
          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {contendSingle?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : type === "our_cargo" ? (
        <>
          {" "}
          <p className={cls.footerBox}>
            <BluePhoneIcon /> {contendSingle?.users_id_data?.phone}
          </p>
          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {contendSingle?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : type === "someone_cargo" ? (
        <>
          {" "}
          <p className={cls.footerBox}>
            <BluePhoneIcon /> {contendSingle?.users_id_data?.phone}
          </p>
          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {contendSingle?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : type === "broke_down" ? (
        <>
          {" "}
          <p className={cls.footerBox}>
            <BluePhoneIcon /> {contendSingle?.users_id_data?.phone}
          </p>
          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {contendSingle?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : (
        <>
          <p className={cls.footerBox}>
            <GreenPhoneIcon /> {contendSingle?.users_id_data?.phone}
          </p>
          <p className={cls.footerBox}>
            <GreenFuraIcon />
            {contendSingle?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      )}
    </div>
  );

  const BalloonContentCargo = () => (
    <div id="balloon-content_cargo" className={cls.balloon_content_empty}>
      <div className={cls.wrap} style={{ height: "45px" }}>
        {typeCargo === "occupied_cargo" ? (
          <>
            {" "}
            <MapCargoLoadGoodsIcon />{" "}
            <span
              style={{ color: "rgba(193, 187, 32, 1)" }}
              className={cls.balloonName}
            >
              {loadState?.bid_cash}
            </span>
          </>
        ) : (
          <>
            {" "}
            <MapCargoGreenIcon />{" "}
            <span className={cls.balloonName}>
              {loadState?.bid_cash} {loadState?.currency_id_data?.code}
            </span>
          </>
        )}

        <Flex>
          <p
            className={cls.conWrap}
            gap={1}
            alignItems={"center"}
            flexWrap={"nowrap"}
          >
            <StoneIcon /> <span>22 т</span>
          </p>
          <p className={cls.conWrap} gap={1} alignItems={"center"}>
            <LoadOulineIcon /> 86m3
          </p>
        </Flex>
      </div>
      <p className={cls.balloon_fulName}>Оборудование и запчасти</p>
      {typeCargo === "occupied_cargo" ? (
        <>
          <p className={cls.footerBox}>
            <GoodsPhoneIcon /> {loadState?.users_id_data?.phone}
          </p>
          <p className={cls.footerBox}>
            <GoodsFuraIcon />
            {loadState?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : (
        <>
          {" "}
          <p className={cls.footerBox}>
            <GreenPhoneIcon /> {loadState?.users_id_data?.phone}
          </p>
          <p className={cls.footerBox}>
            <GreenFuraIcon />
            {loadState?.vehicle_type_id_data?.name}
          </p>
        </>
      )}
    </div>
  );

  const balloonContent = ReactDOMServer.renderToString(<BalloonContent />);
  const balloonContentCargo = ReactDOMServer.renderToString(
    <BalloonContentCargo />
  );

  const { t } = useTranslation(locale, "translations");
  return (
    <>
      <Box className={cls.box} width={"100%"} height={"400vh"}>
        <Cmap
          getCarListProps={getCarListProps}
          coordinates={coordinates}
          balloonContent={balloonContent}
          balloonContentCargo={balloonContentCargo}
          handleMouseEnter={handleMouseEnter}
          locationData={locationData}
          setLoadState={setLoadState}
          setModalType={setModalType}
          handleMouseEnterCargo={handleMouseEnterCargo}
          mapIcon={mapIcon}
          watch={watch}
        />
    
        <div className={cls.modalWrap}>
          <Flex>
            <Box width={"100%"}>
              {modalType === "" && (
                <div
                  onClick={() => setModalType("filter")}
                  className={cls.filterBtn}
                >
                  <FilterIcon /> Фильтр
                </div>
              )}
              {modalType === "filter" && (
                <Filter
                  cls={cls}
                  watch={watch}
                  setValue={setValue}
                  getUserOption={getUserOption}
                  loadingOptions={loadingOptions}
                  register={register}
                  setDistance={setDistance}
                  distance={distance}
                  handleClear={handleClear}
                  t={t}
                  setModalType={setModalType}

                  control={control}
                  handleOpenModal={handleOpenModal}
                  errors={errors}
                  carTypeOptions={carTypeOptions}
                  checkboxStatuses={checkboxStatuses}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}
              {modalType === "driverFree" && (
                <DriverFree
                  cls={cls}
                  setModalType={setModalType}
                  contendSingle={contendSingle}
                  setCenterModalType={setCenterModalType}
                />
              )}
              {modalType === "driverExpectation" && (
                <DriverExpectation
                  setModalType={setModalType}
                  cls={cls}
                  contendSingle={contendSingle}
                  setCenterModalType={setCenterModalType}
                />
              )}
              {modalType === "driverCheck" && (
                <DriverCheck
                  cls={cls}
                  contendSingle={contendSingle}
                  setCenterModalType={setCenterModalType}
                  setModalType={setModalType}
                />
              )}
              {modalType === "driverQuestion" && (
                <DriverQuestion
                  setModalType={setModalType}
                  cls={cls}
                  contendSingle={contendSingle}
                  setCenterModalType={setCenterModalType}
                  setStateMap={setStateMap}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                />
              )}
              {modalType === "driverGruz" && (
                <DriverGruz
                  cls={cls}
                  setModalType={setModalType}
                  loadState={loadState}
                />
              )}
              {modalType === "driverGruzGoods" && (
                <DriverGruzGoods
                  setModalType={setModalType}
                  loadState={loadState}
                  cls={cls}
                />
              )}
            </Box>
          </Flex>
        </div>
        {centerModalType === "selectCargo" && (
          <div className={cls.leftModal}>
            <SelectCargo
              cls={cls}
              contendSingle={contendSingle}
              setCenterModalType={setCenterModalType}
            />
          </div>
        )}
        {centerModalType === "changeIcon" && (
          <div className={cls.leftModal}>
            <ChangeIconModal
              setCenterModalType={setCenterModalType}
              statusIconChange={statusIconChange}
              iconStatus={iconStatus}
              setIconStatus={setIconStatus}
              cls={cls}
            />
          </div>
        )}
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        firstBtnCallback={handleCloseModal}
        secondBtnCallback={() => setIsModalOpen(false)}
        title={t("Точка маршрута")}
        size="xxl"
      >
        <LoadingMap
          onMapClick={onMapClick}
          setYMaps={setYMaps}
          yandexMapRef={yandexMapRef}
          placeMarkGeometry={placeMarkGeometry}
          defaultState={{
            center: coordinates,
            zoom: 15,
          }}
        />
      </Modal>
    </>
  );
}
