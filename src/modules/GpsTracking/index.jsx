"use client";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import { Container } from "@/components/Container";
import Script from "next/script";
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
  Text,
  VStack
} from "@chakra-ui/react";
import { TextField } from "@/components/TextField";
import { Checkbox } from "@/components/Checkbox";
import { LocationMarkIcon } from "@/assets/icons/icons";
import React from "react";
import { useGpsTrackingProps } from "@/modules/GpsTracking/useGpsTrackingProps";
import cls from "./style.module.scss";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Modal } from "@/components/Modal";
import LoadingMap from "@/modules/Cargo/components/LoadingMap";
import { Dropdown } from "@/components/Dropdown";
import { ChakraSelect } from "@/components/ChakraSelect";
import { CarList } from "@/modules/SearchCar/component/CarList/CarList";

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
    weightMeasurementOptions,
    control,
    getCarListProps,
    onSubmit,
    handleSubmit
  } = useGpsTrackingProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Container py="40px" backgroundColor={"#F6F7F8"}>
    <Script
      onLoad={() => ymaps.ready(initYmaps)}
      src={`https://api-maps.yandex.ru/2.1.79/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&lang=ru_RU`}
    />

    <Heading size="md" mb="24px">{t("gpsTracking.title")}</Heading>
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      align="stretch"
      spacing="24px"
    >
    <Box p="24px" bgColor="baseWhite" borderRadius="12px">
      <Box display="flex" mb="20px" alignItems="center" justifyContent="space-between">
        <Heading size="sm" fontSize="18px" lineHeight="28px"
                 fontWeight="600">{t("gpsTracking.machineDetails")}</Heading>
        {/*<Button onClick={handleAppend} variant="reset"*/}
        {/*  leftIcon={<PlusIcon color="#007aff"/>}>{t("Добавить доп. адрес")}</Button>*/}
      </Box>
      <Box display="flex" gap="20px" mb={"20px"}>

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

        <Box maxWidth="234px" width={"100%"}>
          <Dropdown
            placeholder={t("Введите тип кузова")}
            label={t("Тип кузова")}
            name="car_type"
            options={carTypeOptions}
            errors={errors}
            control={control}
          />
        </Box>
        <Box maxWidth="234px" width={"100%"}>
          <Dropdown
            placeholder={t("Введите тип загрузки")}
            label={t("Тип загрузки")}
            name="load_type_id"
            options={loadingOptions}
            errors={errors}
            control={control}
          />
        </Box>
      </Box>
      <Box>
        <Accordion allowToggle>
          <AccordionItem border={"none"}>
            <AccordionButton _hover={{ background: "#fff" }} width={"auto"} gap={3} alignItems={"center"} p={0}>
              <Heading fontSize={"18px"}>
                {t("gpsTracking.machineSettings")}
              </Heading>
              <AccordionIcon/>
            </AccordionButton>
            <Flex mt={"16px"} gap={3}>
              <TextFieldWithAddition
                errors={errors}
                control={control}
                name="weight_measurement"
                register={register}
                additionalItemName="weight_unit"
                width="234px"
                placeholder={t("Вес")}
                additionalItemOptions={weightMeasurementOptions}
                type="number"
              />
              <TextFieldWithAddition
                errors={errors}
                control={control}
                name="volume_measurement"
                register={register}
                width="234px"
                placeholder={t("Объем")}
                additionalItemPlaceholder="m³"
                type="number"
                // additionalItemName="volume_unit"
                // additionalItemOptions={volumeMeasurementOptions}
              />
            </Flex>
            <AccordionPanel mt={4} p={0}>
              <Flex flexDirection={"column"} gap={6}>
                <Flex gap={3}>
                  <Box width="234px" flexShrink="0">
                    <Heading color="brand.700" fontSize="16px" fontWeight="500" lineHeight="20px">{t("ADR")}</Heading>
                  </Box>
                  <Box display="flex" flexDirection="column" gap="16px" maxW="540px" width="100%">
                    <Box maxW={"234px"}>
                      <ChakraSelect
                        name="permission"
                        size={"md"}
                        control={control}
                        options={[
                          {
                            label: "1",
                            value: "adr_1"
                          },
                          {
                            label: "2",
                            value: "adr_2"
                          },
                          {
                            label: "3",
                            value: "adr_3"
                          },
                          {
                            label: "4",
                            value: "adr_4"
                          },
                          {
                            label: "5",
                            value: "adr_5"
                          },
                          {
                            label: "6",
                            value: "adr_6"
                          },
                          {
                            label: "7",
                            value: "adr_7"
                          },
                          {
                            label: "8",
                            value: "adr_8"
                          },
                          {
                            label: "9",
                            value: "adr_9"
                          },
                        ]}
                      />
                      <Text fontSize={"14px"} color="#344054" fontWeight={500}>Класс опасности груза</Text>
                    </Box>
                  </Box>
                </Flex>
                <Flex gap={3}>
                  <Box width="234px" flexShrink="0">
                    <Heading color="brand.700" fontSize="16px" fontWeight="500"
                             lineHeight="20px">{t("gpsTracking.requirements")}</Heading>
                  </Box>
                  <Box display="flex" columnGap="10px" flexGrow={1}>
                    <Checkbox register={register} name="hitch">
                      {t("Сцепка")}
                    </Checkbox>
                    <Checkbox register={register} name="pneumatic">
                      {t("Пневмоход")}
                    </Checkbox>
                    <Checkbox register={register} name="bunks">
                      {t("Коники")}
                    </Checkbox>
                  </Box>
                </Flex>
                <Flex gap={3}>
                  <Box width="234px" flexShrink="0">
                    <Heading color="brand.700" fontSize="16px" fontWeight="500"
                             lineHeight="20px">{t("gpsTracking.permissions")}</Heading>
                  </Box>
                  <Box display="flex" columnGap="10px" flexGrow={1}>
                    <Checkbox register={register} name="tir">
                      {t("TIR")}
                    </Checkbox>
                    <Checkbox register={register} name="t1">
                      {t("T1")}
                    </Checkbox>
                    <Checkbox register={register} name="cmr">
                      {t("CMR")}
                    </Checkbox>
                    <Checkbox register={register} name="medic_certificate">
                      {t("Медкнижка")}
                    </Checkbox>
                  </Box>
                </Flex>
                <Flex gap={3}>
                  <Box width="234px" flexShrink="0">
                    <Heading color="brand.700" fontSize="16px" fontWeight="500"
                             lineHeight="20px">{t("Ремней")}</Heading>
                  </Box>
                  <Box display="flex" columnGap="10px" maxW={"234px"} flexGrow={1}>
                    <TextField placeholder={t("Штук")} type="number" register={register}
                               name="straps_number"/>
                  </Box>
                </Flex>
                <Flex gap={3}>
                  <Box width="234px" flexShrink="0">
                    <Heading color="brand.700" fontSize="16px" fontWeight="500"
                             lineHeight="20px"> {t("Грузоподъемность")}</Heading>
                  </Box>
                  <Box display="flex" columnGap="10px" maxW={"234px"} flexGrow={1}>
                    <TextFieldWithAddition
                      additionalItemOptions={[{
                        label: t("т"),
                        value: "t"
                      }, {
                        label: t("кг"),
                        value: "kg"
                      }]}
                      placeholder={t("Штук")}
                      width="135px"
                      type="number"
                      register={register}
                      name="capacity"
                      additionalItemName="capacity_unit"
                      additionalItemDefaultIndex={0}
                      defaultValue=""
                    />
                  </Box>
                </Flex>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Button type={"submit"} width="234px" mt="20px" onClick={handleCalculate}>{t("gpsTracking.searchCars")}</Button>
    </Box>
    </VStack>
    <Box mt={6}>
      <CarList {...getCarListProps()} />
    </Box>
    {/*<div className={cls.map} id="map" style={{*/}
    {/*  width: "100%",*/}
    {/*  height: "500px"*/}
    {/*}}>*/}
    {/*  {*/}
    {/*    (distanceParameters.distance || distanceParameters.duration) && <div className={cls.distanceInfo}>*/}
    {/*      <div className={cls.locationNames}>*/}
    {/*        <p>{watch("from")}</p>*/}
    {/*        <span className={cls.arrow}>*/}
    {/*          <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path*/}
    {/*            d="M19.25 11H2.75M13.75 5.5l5.5 5.5-5.5 5.5" stroke="#000" strokeOpacity=".85" strokeWidth="2"*/}
    {/*            strokeLinecap="round" strokeLinejoin="round"/></svg>*/}
    {/*        </span>*/}
    {/*        <p>{watch("to")}</p>*/}
    {/*      </div>*/}
    {/*      <p className={cls.distanceParams}>*/}
    {/*        <b className={cls.distanceInfoTitle}>*/}
    {/*          <span><RouteDirectionIcon/></span>*/}
    {/*          <span>{distanceParameters.distance}</span>*/}
    {/*        </b>*/}
    {/*        <br/>*/}
    {/*        <b className={cls.distanceInfoTitle}>*/}
    {/*          <span><ClockIcon/></span>*/}
    {/*          <span>{distanceParameters.duration}</span>*/}
    {/*        </b>*/}
    {/*      </p>*/}
    {/*    </div>*/}
    {/*  }*/}
    {/*</div>*/}
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
