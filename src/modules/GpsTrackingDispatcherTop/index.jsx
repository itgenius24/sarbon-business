"use client";
import { useTranslation } from "@/app/i18n/client";

import { Box, Flex } from "@chakra-ui/react";
import { FilterIcon } from "@/assets/icons/icons";
import React from "react";

import cls from "./style.module.scss";
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
import LoadingMap from "../Cargo/components/LoadingMap";
import { ModalS } from "@/components/Modal";
import CmapAZS from "./components/CmapAZS";

export default function GpsTrackingDispatcherTop({ locale }) {
  const {
    register,
    errors,
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
    control,
    getCarListProps,
    isLoading,
    watch,
    setValue,
    locationData,
    getUserOption,
    setDistance,
    distance,
    mapIcon,
    handleClear,
    setCurrentUserLocationData,
    currentUserLocationData,
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
    contendHoverState,
    setLoadCheck,
    loadCheck,
    setOffset,
    addressAdd,
    stateMap,
    addAdress,
    setLocationData,
    refueling,
    locationPending,
    dataDis,
    setCarsArr,
    isBalloonOpened,
    setIsBalloonOpened,
    mapRef,
    setDisVal,
    setDriverVal,
    disVal,
    driverVal,
    isFuelMap,
    setIsFuelMap,
  } = useGpsTrackingProps();

  const { t } = useTranslation(locale, "translations");

  return (
    <>
      <Box className={cls.box} width={"100%"} height={"400vh"}>
        {isFuelMap ? (
          <CmapAZS
            refueling={refueling}
            cls={cls}
            getCarListProps={!isLoading ? getCarListProps : []}
            coordinates={coordinates}
            locationData={!locationPending && loadCheck ? locationData : []}
            setLoadState={setLoadState}
            setModalType={setModalType}
            mapIcon={mapIcon}
            watch={watch}
            isLoading={isLoading}
            setCurrentUserLocationData={setCurrentUserLocationData}
            contendHoverState={contendHoverState}
          />
        ) : (
          <Cmap
            cls={cls}
            getCarListProps={!isLoading ? getCarListProps : []}
            coordinates={coordinates}
            locationData={!locationPending && loadCheck ? locationData : []}
            setLoadState={setLoadState}
            setModalType={setModalType}
            mapIcon={mapIcon}
            watch={watch}
            isLoading={isLoading}
            setCurrentUserLocationData={setCurrentUserLocationData}
            contendHoverState={contendHoverState}
            isBalloonOpened={isBalloonOpened}
            setIsBalloonOpened={setIsBalloonOpened}
            currentUserLocationData={currentUserLocationData}
            mapRef={mapRef}
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
                  <FilterIcon /> {t(`Фильтр`)}
                </div>
              )}

              {modalType === "filter" && (
                <Filter
                  cls={cls}
                  getUserOption={getUserOption}
                  loadingOptions={loadingOptions}
                  setDistance={setDistance}
                  distance={distance}
                  handleClear={handleClear}
                  setLoadCheck={setLoadCheck}
                  loadCheck={loadCheck}
                  t={t}
                  setModalType={setModalType}
                  handleInputClear={handleInputClear}
                  handleOpenModal={handleOpenModal}
                  carTypeOptions={carTypeOptions}
                  checkboxStatuses={checkboxStatuses}
                  handleCheckboxChange={handleCheckboxChange}
                  dataDis={dataDis}
                  setCarsArr={setCarsArr}
                  mapRef={mapRef}
                  setDisVal={setDisVal}
                  setDriverVal={setDriverVal}
                  disVal={disVal}
                  driverVal={driverVal}
                  isFuelMap={isFuelMap}
                  setIsFuelMap={setIsFuelMap}
                />
              )}
              {modalType === "driverFree" && (
                <DriverFree
                  cls={cls}
                  setModalType={setModalType}
                  currentUserLocationData={currentUserLocationData}
                  setCenterModalType={setCenterModalType}
                  setIconStatus={setIconStatus}
                  errors={errors}
                  control={control}
                  register={register}
                  watch={watch}
                />
              )}
              {modalType === "driverExpectation" && (
                <DriverExpectation
                  setModalType={setModalType}
                  cls={cls}
                  currentUserLocationData={currentUserLocationData}
                  setCenterModalType={setCenterModalType}
                />
              )}
              {modalType === "driverCheck" && (
                <DriverCheck
                  cls={cls}
                  currentUserLocationData={currentUserLocationData}
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
                  currentUserLocationData={currentUserLocationData}
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
                  control={control}
                  register={register}
                  errors={errors}
                  watch={watch}
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
              currentUserLocationData={currentUserLocationData}
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
