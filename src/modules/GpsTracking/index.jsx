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
  Text,
  VStack,
  useMediaQuery
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
    setValue
  } = useGpsTrackingProps();

  const locale = useGetLang();

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { t } = useTranslation(locale, "translations");

  return <Container py="40px">
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
        <Box mb={"20px"}>

          <Box display="flex" flexDirection={isLargerThan768 ? "row" : "column"} gap="20px">
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
                  <LocationMarkIcon/>
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
          <Box display="flex" flexDirection={isLargerThan768 ? "row" : "column"} gap="20px" mt="20px">
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
              {/* <AccordionButton _hover={{ background: "#fff" }} width={"auto"} gap={3} alignItems={"center"} p={0}>
                <Heading fontSize={"18px"}>
                  {t("gpsTracking.machineSettings")}
                </Heading>
                <AccordionIcon/>
              </AccordionButton> */}
              <Box display="flex" flexDirection={isLargerThan768 ? "row" : "column"} gap="20px" mt="20px">
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
              {/* <AccordionPanel mt={4} p={0}>
                <Flex flexDirection={"column"} gap={6}>
                  <Flex flexWrap={"wrap"} gap={3}>
                    <Box width="234px" flexShrink="0">
                      <Heading color="brand.700" fontSize="16px" fontWeight="500" lineHeight="20px">{t("ADR")}</Heading>
                    </Box>
                    <Box display="flex" flexDirection="column" gap="16px" maxW="540px" width="100%">
                      <Box maxW={"234px"}>
                        <Text fontSize={"14px"} color="#344054" fontWeight={500}>Класс опасности груза</Text>
                      </Box>
                    </Box>
                  </Flex>
                  <Flex flexWrap={"wrap"} gap={3}>
                    <Box width="234px" flexShrink="0">
                      <Heading color="brand.700" fontSize="16px" fontWeight="500"
                        lineHeight="20px">{t("gpsTracking.requirements")}</Heading>
                    </Box>
                    <Box className={cls.requirements} display="flex" flexWrap={"wrap"} columnGap="10px" flexGrow={1}>
                      <Checkbox register={register} name="body_dimensions">
                        {t("Сцепка")}
                      </Checkbox>
                      <Checkbox register={register} name="negoitable">
                        {t("Пневмоход")}
                      </Checkbox>
                      <Checkbox register={register} name="koniki">
                        {t("Коники")}
                      </Checkbox>
                    </Box>
                  </Flex>
                  <Flex flexWrap={"wrap"} gap={3}>
                    <Box width="234px" flexShrink="0">
                      <Heading color="brand.700" fontSize="16px" fontWeight="500"
                        lineHeight="20px">{t("gpsTracking.permissions")}</Heading>
                    </Box>
                    <Box display="flex" flexWrap={"wrap"} columnGap="10px" flexGrow={1}>
                      <Checkbox register={register} name="tir">
                        {t("TIR")}
                      </Checkbox>
                      <Checkbox register={register} name="t1">
                        {t("T1")}
                      </Checkbox>
                      <Checkbox register={register} name="cmr">
                        {t("CMR")}
                      </Checkbox>
                      <Checkbox register={register} name="med">
                        {t("Медкнижка")}
                      </Checkbox>
                    </Box>
                  </Flex>
                  <Flex flexWrap={"wrap"} gap={3}>
                    <Box width="240px" flexShrink="0">
                      <Heading color="brand.700" fontSize="16px" fontWeight="500"
                        lineHeight="20px">{t("Ремней")}</Heading>
                    </Box>
                    <Box display="flex" columnGap="10px" className={cls.belts} flexGrow={1}>
                      <TextField placeholder={t("Штук")} type="number" register={register}
                        name="straps_number"/>
                    </Box>
                  </Flex>
                  <Flex flexWrap={"wrap"} gap={3}>
                    <Box width="234px" flexShrink="0">
                      <Heading color="brand.700" fontSize="16px" fontWeight="500"
                        lineHeight="20px"> {t("Грузоподъемность")}</Heading>
                    </Box>
                    <Box display="flex" columnGap="10px" className={cls.belts} flexGrow={1}>
                      <TextFieldWithAddition
                        additionalItemOptions={[{
                          label: t("т"),
                          value: "t"
                        }, {
                          label: t("кг"),
                          value: "kg"
                        }]}
                        placeholder={t("Штук")}
                        // width="135px"
                        type="number"
                        register={register}
                        name="load_capacity"
                        additionalItemName="capacity_unit"
                        additionalItemDefaultIndex={0}
                        defaultValue=""
                      />
                    </Box>
                  </Flex>
                </Flex>
              </AccordionPanel> */}
            </AccordionItem>
          </Accordion>
        </Box>
        <Button type={"submit"} className={cls.findBtn} mt="20px" onClick={handleCalculate}>{t("gpsTracking.searchCars")}</Button>
      </Box>
    </VStack>
    <Box mt={6}>
      {
        isLoading
        ? <LoadingSpinner />
        : <CarList
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
      }
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
