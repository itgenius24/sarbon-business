"use client";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";

import { Box, Flex } from "@chakra-ui/react";
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
} from "@/assets/icons/icons";
import React, { useEffect, useRef } from "react";

import cls from "./style.module.scss";

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
import copy from "copy-to-clipboard";
import { ModalS } from "@/components/Modal";
import CmapAZS from "./components/CmapAZS";

/* eslint no-undef: 0 */ // --> OFF

export default function GpsTrackingXm() {
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
    setHoverLoadState,
    loadHoverState,
    addressAdd,
    stateMap,
    addAdress,
    setLocationData,
    refueling,
    setRefuelingState,
    refuelingState,
    isLoadingRefueling,
  } = useGpsTrackingProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return (
    <>
      <Box className={cls.box} width={"100%"} height={"400vh"}>
        {/* { isLoading &&  <LoadingSpinnerMap />} */}

        {watch(`refuelingState`) ? (
          <CmapAZS
            refueling={refueling}
            cls={cls}
            getCarListProps={!isLoading ? getCarListProps : []}
            coordinates={coordinates}
            locationData={loadCheck ? locationData : []}
            setLoadState={setLoadState}
            setModalType={setModalType}
            mapIcon={mapIcon}
            watch={watch}
            isLoading={isLoading}
            setContendSingle={setContendSingle}
            contendHoverState={contendHoverState}
          />
        ) : (
          <Cmap
          
            cls={cls}
            getCarListProps={!isLoading ? getCarListProps : []}
            coordinates={coordinates}
            locationData={loadCheck ? locationData : []}
            setLoadState={setLoadState}
            setModalType={setModalType}
            mapIcon={mapIcon}
            watch={watch}
            isLoading={isLoading}
            setContendSingle={setContendSingle}
            contendHoverState={contendHoverState}
          />
        )}

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
                  setRefuelingState={setRefuelingState}
                  refuelingState={refuelingState}
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
                  isLoadingRefueling={isLoadingRefueling}
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
                  setOffset={setOffset}
                  setLocationData={setLocationData}
                  locationData={locationData}
                />
              )}
              {modalType === "driverGruzGoods" && (
                <DriverGruzGoods
                  setModalType={setModalType}
                  loadState={loadState}
                  cls={cls}
                  setLocationData={setLocationData}
                  locationData={locationData}
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

      <ModalS
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        firstBtnCallback={handleCloseModal}
        secondBtnCallback={() => {
          setIsModalOpen(false);
          if (stateMap) {
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
      </ModalS>
    </>
  );
}
