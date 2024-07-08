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
  Switch,
  Text,
  VStack,
  useMediaQuery,
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
import { CarList } from "@/modules/SearchCar/component/CarList/CarList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { UseIcon } from "@/assets/icons/icons";
import {
  Map,
  Placemark,
  SearchControl,
  TypeSelector,
} from "@pbe/react-yandex-maps";
import styled from "@emotion/styled";
import PlacemarkItem from "./PlacemarkItem";
import { SingleCar } from "../SearchCar/component/SingleCar/SingleCar";

/* eslint no-undef: 0 */ // --> OFF

export default function GpsTrackingModule() {
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
    getUserNameOptions,
    getUserPhoneOptions 
  } = useGpsTrackingProps();

  const locale = useGetLang();

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");


  const { t } = useTranslation(locale, "translations");
  console.log("getCarListProps", getCarListProps());
  return (
    <>
      <Container py="40px">
        <Flex
          mb={"0px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading size="md">{t("gpsTracking.title")}</Heading>
          <Switch onChange={(e) => setChecked(e.target.checked)}>Map</Switch>
        </Flex>
      </Container>
      {checked ? (
        <>
          <Box className={cls.mapWrap} width={"80%"} margin={`0 auto`} height={"70vh"} position={"relative"}>
            <Map
              defaultState={{
                center: coordinates,
                zoom: 5,
              }}
              width="100%"
              height={"100%"}
              modules={["Placemark", "geocode", "control.SearchControl"]}
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
              <Box className={cls.mapInputsWrap}>
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem
                    className={cls.accordionItem}
                    backgroundColor={"white"}
                    opacity={"0.9"}
                  >
                    <AccordionButton>
                      {/* <Box as="span" flex="1" textAlign="left" >
                         Section 1 title
                    </Box> */}
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel>
                      <VStack
                        as="form"
                        onSubmit={handleSubmit(onSubmit)}
                        align="stretch"
                        spacing="24px"
                      >
                        <Box p="24px" bgColor="baseWhite" borderRadius="12px">
                          <Box
                            display="flex"
                            mb="20px"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Heading
                              size="sm"
                              fontSize="18px"
                              lineHeight="28px"
                              fontWeight="600"
                            >
                              {t("gpsTracking.machineDetails")}
                            </Heading>
                          </Box>
                          <Box mb={"20px"}>
                            <Box
                              display="flex"
                              flexDirection={isLargerThan768 ? "row" : "column"}
                              gap="20px"
                            >
                              <TextFieldWithAddition
                                placeholder={t("Адрес")}
                                // required={true}
                                rules={{ required: true }}
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
                                    <LocationMarkIcon />
                                  </span>
                                }
                              />
                              <TextFieldWithAddition
                                placeholder={t("Дистанция")}
                                label={t("Дистанция")}
                                additionalItemTheme="white"
                                register={register}
                                name={"distance"}
                                additionalOnclick={() => handleOpenModal()}
                                additionalItemPlaceholder={
                                  <span className={cls.additionalIcons}>
                                    km
                                  </span>
                                }
                              />
                            </Box>
                            <Box
                              display="flex"
                              flexDirection={isLargerThan768 ? "row" : "column"}
                              gap="20px"
                              mt="20px"
                            >
                              <Box className={cls.kuzov} width={"100%"}>
                                <Dropdown
                                  placeholder={t("Введите тип кузова")}
                                  label={t("Тип кузова")}
                                  name="car_type"
                                  options={carTypeOptions}
                                  errors={errors}
                                  width="100%"
                                  control={control}
                                  watch={watch}
                                  setValue={setValue}
                                  clearable
                                />
                              </Box>
                              <Box className={cls.kuzov} width={"100%"}>
                                <Dropdown
                                  placeholder={t("Введите тип загрузки")}
                                  label={t("Тип загрузки")}
                                  name="load_type_id"
                                  options={loadingOptions}
                                  errors={errors}
                                  control={control}
                                  watch={watch}
                                  setValue={setValue}
                                  clearable
                                />
                              </Box>
                            </Box>
                          </Box>
                          <Box>
                            <Accordion allowToggle>
                              <AccordionItem border={"none"}>
                                <Box
                                  display="flex"
                                  flexDirection={
                                    isLargerThan768 ? "row" : "column"
                                  }
                                  gap="20px"
                                  mt="20px"
                                >
                                  <TextFieldWithAddition
                                    errors={errors}
                                    control={control}
                                    name="weight"
                                    className={cls.paramtersItem}
                                    register={register}
                                    additionalItemName="weight_unit"
                                    // width="100%"
                                    placeholder={t("Вес")}
                                    additionalItemOptions={
                                      weightMeasurementOptions
                                    }
                                    type="number"
                                    zIndex={10}
                                  />
                                  <TextFieldWithAddition
                                    errors={errors}
                                    control={control}
                                    name="volume"
                                    className={cls.paramtersItem}
                                    register={register}
                                    // width="100%"
                                    placeholder={t("Объем")}
                                    additionalItemPlaceholder="m³"
                                    type="number"
                                    // additionalItemName="volume_unit"
                                    // additionalItemOptions={volumeMeasurementOptions}
                                  />
                                </Box>
                              </AccordionItem>
                            </Accordion>
                          </Box>
                          <Box
                    display="flex"
                    flexDirection={isLargerThan768 ? "row" : "column"}
                    gap="20px"
                    mt="20px"
                  >
                    <Box className={cls.kuzov} width={"100%"}>
                      <Dropdown
                        placeholder={t("Введите тип имя")}
                        // label={t("Тип кузова")}
                        name="users_id"
                        options={getUserNameOptions}
                        errors={errors}
                        width="100%"
                        control={control}
                        watch={watch}
                        setValue={setValue}
                        clearable
                      />
                    </Box>
                    <Box className={cls.kuzov} width={"100%"}>
                      <Dropdown
                        placeholder={t("Введите тип номер телефона ")}
                        // label={t("Тип загрузки")}
                        name="users_id2"
                        options={getUserPhoneOptions}
                        errors={errors}
                        control={control}
                        watch={watch}
                        setValue={setValue}
                        clearable
                      />
                    </Box>
                  </Box>
                          <Button
                            type={"submit"}
                            className={cls.findBtn}
                            mt="20px"
                            onClick={handleCalculate}
                          >
                            {t("gpsTracking.searchCars")}
                          </Button>
                        </Box>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
        {
          ...getCarListProps()?.data?.map(item => {
            return(
              <>
                <SingleCar
                  withAddress={true}
                  capacity={watch("weight")}
                  height={watch("volume")}
                  carType={watch("car_type")?.value}
                  loadType={watch("load_type_id")?.value}
                  key={item}
                  carInfo={item}
                  // infoList={infoList}
                  showDistance={true}
                  oneDir={true}
                  phoneBtn={true}
                  dataAccordion={true}
                  additionalData={driverName}
                  isMap={true}
                />

              </>
            );
          })
        }


            </Map>
          </Box>
        </>
      ) : (
        <>
          <Container py="40px">
            <VStack
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              align="stretch"
              spacing="24px"
            >
              <Box p="24px" bgColor="baseWhite" borderRadius="12px">
                <Box
                  display="flex"
                  mb="20px"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Heading
                    size="sm"
                    fontSize="18px"
                    lineHeight="28px"
                    fontWeight="600"
                  >
                    {t("gpsTracking.machineDetails")}
                  </Heading>
                </Box>
                <Box mb={"20px"}>
                  <Box
                    display="flex"
                    flexDirection={isLargerThan768 ? "row" : "column"}
                    gap="20px"
                  >
                    <TextFieldWithAddition
                      placeholder={t("Адрес")}
                      // required={true}
                      rules={{ required: true }}
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
                          <LocationMarkIcon />
                        </span>
                      }
                    />
                    <TextFieldWithAddition
                      placeholder={t("Дистанция")}
                      label={t("Дистанция")}
                      additionalItemTheme="white"
                      register={register}
                      name={"distance"}
                      additionalOnclick={() => handleOpenModal()}
                      additionalItemPlaceholder={
                        <span className={cls.additionalIcons}>km</span>
                      }
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection={isLargerThan768 ? "row" : "column"}
                    gap="20px"
                    mt="20px"
                  >
                    <Box className={cls.kuzov} width={"100%"}>
                      <Dropdown
                        placeholder={t("Введите тип кузова")}
                        label={t("Тип кузова")}
                        name="car_type"
                        options={carTypeOptions}
                        errors={errors}
                        width="100%"
                        control={control}
                        watch={watch}
                        setValue={setValue}
                        clearable
                      />
                    </Box>
                    <Box className={cls.kuzov} width={"100%"}>
                      <Dropdown
                        placeholder={t("Введите тип загрузки")}
                        label={t("Тип загрузки")}
                        name="load_type_id"
                        options={loadingOptions}
                        errors={errors}
                        control={control}
                        watch={watch}
                        setValue={setValue}
                        clearable
                      />
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Accordion allowToggle>
                    <AccordionItem border={"none"}>
                      <Box
                        display="flex"
                        flexDirection={isLargerThan768 ? "row" : "column"}
                        gap="20px"
                        mt="20px"
                      >
                        <TextFieldWithAddition
                          errors={errors}
                          control={control}
                          name="weight"
                          className={cls.paramtersItem}
                          register={register}
                          additionalItemName="weight_unit"
                          // width="100%"
                          placeholder={t("Вес")}
                          additionalItemOptions={weightMeasurementOptions}
                          type="number"
                          zIndex={10}
                        />
                        <TextFieldWithAddition
                          errors={errors}
                          control={control}
                          name="volume"
                          className={cls.paramtersItem}
                          register={register}
                          // width="100%"
                          placeholder={t("Объем")}
                          additionalItemPlaceholder="m³"
                          type="number"
                          // additionalItemName="volume_unit"
                          // additionalItemOptions={volumeMeasurementOptions}
                        />
                      </Box>
                    </AccordionItem>
                  </Accordion>
                </Box>
                <Box
                    display="flex"
                    flexDirection={isLargerThan768 ? "row" : "column"}
                    gap="20px"
                    mt="20px"
                  >
                    <Box className={cls.kuzov} width={"100%"}>
                      <Dropdown
                        placeholder={t("Введите тип имя")}
                        // label={t("Тип кузова")}
                        name="users_id"
                        options={getUserNameOptions}
                        errors={errors}
                        width="100%"
                        control={control}
                        watch={watch}
                        setValue={setValue}
                        clearable
                      />
                    </Box>
                    <Box className={cls.kuzov} width={"100%"}>
                      <Dropdown
                        placeholder={t("Введите тип номер телефона ")}
                        // label={t("Тип загрузки")}
                        name="users_id2"
                        options={getUserPhoneOptions}
                        errors={errors}
                        control={control}
                        watch={watch}
                        setValue={setValue}
                        clearable
                      />
                    </Box>
                  </Box>
                <Button
                  type={"submit"}
                  className={cls.findBtn}
                  mt="20px"
                  onClick={handleCalculate}
                >
                  {t("gpsTracking.searchCars")}
                </Button>
              </Box>
            </VStack>
            <Box mt={6}>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <CarList
                  {...getCarListProps()}
                  capacity={watch("weight")}
                  height={watch("volume")}
                  carType={watch("car_type")?.value}
                  loadType={watch("load_type_id")?.value}
                  dataAccordion={true}
                  showDistance={true}
                  oneDir={true}
                  // infoList={infoList}
                  phoneBtn={true}
                  additionalData={driverName}
                />
              )}
            </Box>
          </Container>
        </>
      )}
      <Container py="40px">
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
      </Container>
    </>
  );
}
