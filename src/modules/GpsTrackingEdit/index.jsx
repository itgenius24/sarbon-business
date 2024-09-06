"use client";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";

import {
  Box,
  Flex,
} from "@chakra-ui/react";
import{
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

} from "@/assets/icons/icons";
import React, { useEffect, useRef } from "react";

import cls from "./style.module.scss";
import { Modal } from "@/components/Modal";
import ReactDOMServer from "react-dom/server";

import Filter from "./components/Filter";
import DriverFree from "./components/DriverFree";
import SelectCargo from "./components/SelectCargo";
import ChangeIconModal from "./components/ChangeIconModal";

import DriverExpectation from "./components/DriverExpectation";
import DriverCheck from "./components/DriverCheck";
import DriverQuestion from "./components/DriverQuestion";
import DriverGruz from "./components/DriverGruz";
import DriverGruzGoods from "./components/DriverGruzGoods";
import Cmap from "./components/Cmap";
import { useGpsTrackingProps } from "./useGpsTrackingProps";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { LoadingSpinnerMap } from "@/components/LoadingSpinnerMap";
import LoadingMap from "../Cargo/components/LoadingMap";

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
    locationPending,
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
    setStateMap,
    handleInputClear,
    setConHoverState,
    contendHoverState,
    setLoadCheck,
    loadCheck,
    setOffset,
    setHoverLoadState,loadHoverState,addressAdd,stateMap,addAdress
  } = useGpsTrackingProps();

  const locale = useGetLang();

  // const handlePlacemarkClick = (map, location) => {
  //   map.setCenter(location, 15); // 15 darajadagi zoom
  // };

  const cargoRef = useRef(null);

  const handleMouseEnter = (e, carInfo) => {
    e.preventDefault();
    const placemark = e.get("target");


    if (placemark && placemark.balloon) {
      placemark.balloon.open();
    } else {
      console.error("Placemark or balloon is undefined");
    }

    if (carInfo) {
      setConHoverState(carInfo);
    } else {
      console.error("carInfo is undefined");
    }
  };

  
  const handleMouseEnterCargo = (e, carInfo) => {
    e.preventDefault();
    const placemark = e.get("target");
    placemark.balloon.open();
    setHoverLoadState(carInfo);
  };

  const type = contendHoverState?.users_id_data?.provisions?.[0];
  const typeCargo = loadHoverState?.new_status?.[0];

  const BalloonContent = () => (
    <div id="balloon-content" className={cls.balloon_content_empty}>
      <div className={cls.wrap} style={{ height: "45px" }}>
        {type === "empty" ? (
          <>
            <GreenCarIcon /> <span className={cls.balloonName}>Свободен</span>
          </>
        ) : type === "waiting_for_driver" ? (
          <>
            <BluePendingIcon />
            <span
              style={{ color: "rgba(0, 122, 255, 1)" }}
              className={cls.balloonName}
            >
              Ожидание
            </span>
          </>
        ) : type === "our_cargo" ? (
          <>
            <CheckBlueIcon />
            <span
              style={{ color: "rgba(0, 122, 255, 1)" }}
              className={cls.balloonName}
            >
              Занят
            </span>
          </>
        ) : type === "someone_cargo" ? (
          <>
            <QuestionBlueIcon />
            <span
              style={{ color: "rgba(0, 122, 255, 1)" }}
              className={cls.balloonName}
            >
              Занят
            </span>
          </>
        ) : type === "broke_down" ? (
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
            <GreenCarIcon /> <span className={cls.balloonName}>Свободен</span>
          </>
        )}

        <div className={cls.loadIconWrap}>
          <Box className={cls.conWrap}>
            <StoneIcon /> <span> 22 т.</span>
          </Box>

          <Box className={cls.conWrap} gap={1} alignItems={"center"}>
            <LoadOulineIcon /> <span>86 m3</span>
          </Box>
        </div>
      </div>
      <p className={cls.balloon_fulName}>
        {contendHoverState?.users_id_data?.full_name}
      </p>
      {type === "empty" ? (
        <>
          <p className={cls.footerBox}>
            <GreenPhoneIcon /> { formatPhoneNumber(contendHoverState?.users_id_data?.phone)}
          </p>
          <p className={cls.footerBox}>
            <GreenFuraIcon />
            {contendHoverState?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : type === "waiting_for_driver" ? (
        <>
          <p className={cls.footerBox}>
            <BluePhoneIcon /> {formatPhoneNumber(contendHoverState?.users_id_data?.phone)}
          </p>
          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {contendHoverState?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : type === "our_cargo" ? (
        <>
          <p className={cls.footerBox}>
            <BluePhoneIcon /> {formatPhoneNumber(contendHoverState?.users_id_data?.phone)}
          </p>
          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {contendHoverState?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : type === "someone_cargo" ? (
        <>
          <p className={cls.footerBox}>
            <BluePhoneIcon /> {formatPhoneNumber(contendHoverState?.users_id_data?.phone)}
          </p>
          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {contendHoverState?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : type === "broke_down" ? (
        <>
          <p className={cls.footerBox}>
            <BluePhoneIcon /> {formatPhoneNumber(contendHoverState?.users_id_data?.phone)}
          </p>
          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {contendHoverState?.users_id_data?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : (
        <>
          <p className={cls.footerBox}>
            <GreenPhoneIcon /> {formatPhoneNumber(contendHoverState?.users_id_data?.phone)}
          </p>
          <p className={cls.footerBox}>
            <GreenFuraIcon />
            {contendHoverState?.users_id_data?.vehicle_type_id_data?.name}
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
            <MapCargoLoadGoodsIcon />
            <span
              style={{ color: "rgba(193, 187, 32, 1)" }}
              className={cls.balloonName}
            >
              {loadHoverState?.bid_cash}
            </span>
          </>
        ) : (
          <>
            <MapCargoGreenIcon />
            <span className={cls.balloonName}>
              {loadHoverState?.bid_cash} {loadHoverState?.currency_id_data?.code}
            </span>
          </>
        )}

        <Flex style={{ gap:"4px" }} alignItems={"center"}>
          <Box className={cls.conWrap}>
            <StoneIcon /> <span> 22 т.</span>
          </Box>
          <p className={cls.conWrap}> </p>
          <p className={cls.conWrap} gap={1} alignItems={"center"}>
            <LoadOulineIcon /> <span>86 m3</span>
          </p>
        </Flex>
      </div>
      <p className={cls.balloon_fulName}>Оборудование и запчасти</p>
      {typeCargo === "occupied_cargo" ? (
        <>
          <p className={cls.footerBox}>
            <GoodsPhoneIcon /> {formatPhoneNumber(loadHoverState?.users_id_data?.phone)}
          </p>
          <p className={cls.footerBox}>
            <GoodsFuraIcon />
            {loadHoverState?.vehicle_type_id_data?.name}
          </p>
        </>
      ) : (
        <>
          <p className={cls.footerBox}>
            <GreenPhoneIcon /> { formatPhoneNumber(loadHoverState?.users_id_data?.phone)}
          </p>
          <p className={cls.footerBox}>
            <GreenFuraIcon />
            {loadHoverState?.vehicle_type_id_data?.name}
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
        {/* { isLoading &&  <LoadingSpinnerMap />} */}
        <Cmap
          getCarListProps={!isLoading ? getCarListProps : []}
          coordinates={coordinates}
          balloonContent={balloonContent}
          balloonContentCargo={balloonContentCargo}
          handleMouseEnter={handleMouseEnter}
          locationData={loadCheck ? (!isLoading ? locationData : []) : []}
          setLoadState={setLoadState}
          setModalType={setModalType}
          handleMouseEnterCargo={handleMouseEnterCargo}
          mapIcon={mapIcon}
          watch={watch}
          isLoading={isLoading}
          setContendSingle={setContendSingle}

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
                  setLoadCheck={setLoadCheck}
                  loadCheck={loadCheck}
                  t={t}
                  setModalType={setModalType}
                  handleInputClear={handleInputClear}
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
                  setIconStatus={setIconStatus}
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
                  setIconStatus={setIconStatus}
                />
              )}
              {modalType === "driverQuestion" && (
                <DriverQuestion
                  setModalType={setModalType}
                  addressAdd={addressAdd}
                  cls={cls}
                  contendSingle={contendSingle}
                  setCenterModalType={setCenterModalType}
                  setStateMap={setStateMap}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  setIconStatus={setIconStatus}
                  stateMap={stateMap}
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
              setOffset={setOffset}
              statusIconChange={statusIconChange}
              setIconStatus={setIconStatus}


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
        secondBtnCallback={() => {
          setIsModalOpen(false);
          if(stateMap){
            addAdress();
          }
        }}
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
