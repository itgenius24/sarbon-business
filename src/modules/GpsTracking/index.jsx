"use client";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import { Container } from "@/components/Container";
import Script from "next/script";
import { Box, Button, Heading } from "@chakra-ui/react";
import { ClockIcon, LocationMarkIcon, RouteDirectionIcon } from "@/assets/icons/icons";
import { TextField } from "@/components/TextField";
import React from "react";
import { useGpsTrackingProps } from "@/modules/GpsTracking/useGpsTrackingProps";
import cls from "./style.module.scss";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Modal } from "@/components/Modal";
import LoadingMap from "@/modules/Cargo/components/LoadingMap";
import { Dropdown } from "@/components/Dropdown";

/* eslint no-undef: 0 */ // --> OFF

export default function GpsTrackingModule() {
  const {
    register,
    locations,
    handleAppend,
    handleRemove,
    initYmaps,
    onAdditionalAddressChange,
    distanceParameters,
    watch,
    errors,
    handleCalculate,
    handleDragOver,
    handleDragStart,
    handleDragEnter,
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
    control
  } = useGpsTrackingProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Container py="40px">
    <Script
      onLoad={() => ymaps.ready(initYmaps)}
      src={`https://api-maps.yandex.ru/2.1.79/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&lang=ru_RU`}
    />
    <Heading size="md" mb="24px">{t("gpsTracking.title")}</Heading>
    <Box p="24px" bgColor="baseWhite" borderRadius="12px">
      <Box display="flex" mb="20px" alignItems="center" justifyContent="space-between">
        <Heading size="sm" fontSize="18px" lineHeight="28px"
                 fontWeight="600">{t("gpsTracking.machineDetails")}</Heading>
        {/*<Button onClick={handleAppend} variant="reset"*/}
        {/*  leftIcon={<PlusIcon color="#007aff"/>}>{t("Добавить доп. адрес")}</Button>*/}
      </Box>
      <Box display="flex" gap="20px">
        <TextFieldWithAddition
          placeholder={t("Адрес")}
          label={t("Адрес")}
          additionalItemTheme="white"
          register={register}
          name={"address"}
          additionalOnclick={() => handleOpenModal()}
          onClick={() => handleOpenModal()}
          error={errors["address"]}
          onlyFieldDisabled={true}
          // disabled={!canEdit}
          additionalItemPlaceholder={
            <span className={cls.additionalIcons}>
              <LocationMarkIcon/>
            </span>
          }
        />
        <Dropdown
          placeholder={t("Введите тип кузова")}
          label={t("Тип кузова")}
          name="car_type"
          options={carTypeOptions}
          errors={errors}
          control={control}
        />
        <Dropdown
          placeholder={t("Введите тип загрузки")}
          label={t("Тип загрузки")}
          name="load_type_id"
          options={loadingOptions}
          errors={errors}
          control={control}
        />
      </Box>
      <Button width="253px" mt="20px" onClick={handleCalculate}>{t("Рассчитать расстояние")}</Button>
    </Box>
    <div className={cls.map} id="map" style={{
      width: "100%",
      height: "500px"
    }}>
      {
        (distanceParameters.distance || distanceParameters.duration) && <div className={cls.distanceInfo}>
          <div className={cls.locationNames}>
            <p>{watch("from")}</p>
            <span className={cls.arrow}>
              <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path
                d="M19.25 11H2.75M13.75 5.5l5.5 5.5-5.5 5.5" stroke="#000" strokeOpacity=".85" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <p>{watch("to")}</p>
          </div>
          <p className={cls.distanceParams}>
            <b className={cls.distanceInfoTitle}>
              <span><RouteDirectionIcon/></span>
              <span>{distanceParameters.distance}</span>
            </b>
            <br/>
            <b className={cls.distanceInfoTitle}>
              <span><ClockIcon/></span>
              <span>{distanceParameters.duration}</span>
            </b>
          </p>
        </div>
      }
    </div>
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      firstBtnCallback={handleCloseModal}
      secondBtnCallback={() => setIsModalOpen(false)}
      title={t("Точка маршрута")}
      size="xl"
    >
      <LoadingMap
        onMapClick={onMapClick}
        setYMaps={setYMaps}
        yandexMapRef={yandexMapRef}
        placeMarkGeometry={placeMarkGeometry}
        defaultState={
          {
            center: coordinates,
            zoom: 15,
          }
        }
      />
    </Modal>
  </Container>;
}
