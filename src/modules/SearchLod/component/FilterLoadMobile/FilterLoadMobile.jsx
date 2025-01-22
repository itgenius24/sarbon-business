"use client";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import cls from "./style.module.scss";
import { TextFieldWithAdditionMap } from "@/components/TextFieldWithAddition/TextFieldWithAdditionMap";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import {
  LocationMarkIcon,
  LocationIconStep,
  FurgoIconLoad,
  CloseIcon,
} from "@/assets/icons/icons";
import { useProps } from "./useProps";
import { ModalS } from "@/components/Modal";
import LoadingMap from "@/modules/Cargo/components/LoadingMap";
import { Checkbox } from "@/components/Checkbox";
import { Dropdown } from "@/components/Dropdown";
import { DropdownWrapperCar } from "@/components/DropdownWrapperCar/DropdownWrapperCar";

export const FilterLoadMobile = ({
  register,
  control,
  setValue,
  watch,
  openFilter,
  setOpenFilter,
  onSubmit
}) => {
  const {
    t,
    onMapClick,
    handleCloseModal,
    setYMaps,
    placeMarkGeometry,
    coordinates,
    yandexMapRef,
    activeIndex,
    setActiveIndex,
    address,
    setAddress,
    isModalOpen,
    setIsModalOpen,
    handleOpenModal,
    results,
    hanleAdress,
    data,
  } = useProps({ setValue });
  return (
    <>
      <Drawer placement="bottom" isOpen={openFilter}>
        <DrawerOverlay />
        <DrawerContent borderRadius="12px 12px 0 0">
          <DrawerHeader borderBottom={`1px solid rgba(226, 228, 234, 1)`}>
            {t("Фильтр")}
          </DrawerHeader>
          <DrawerCloseButton
            top={`15px`}
            onClick={() => setOpenFilter(false)}
          />
          <DrawerBody mt={`15px`}>
            <Flex
              marginBottom={`20px`}
              flexDirection={`column`}
              rowGap={`40px`}
              width={`100%`}
            >
              <Box width={"100%"} className={cls.locationWrap}>
                <TextFieldWithAdditionMap
                  label={t("Откуда")}
                  placeholder={t("Укажите пункт назначения")}
                  additionalItemTheme={`light`}
                  register={register}
                  onChange={(e) => {
                    setActiveIndex(`from2`), setAddress(e.target.value);
                  }}
                  name={`from2`}
                  additionalOnclick={() => handleOpenModal(`from2`, "loading")}
                  additionalItemPlaceholder={
                    <span className={cls.additionalIcons}>
                      <LocationMarkIcon />
                    </span>
                  }
                />
                {activeIndex === `from2` &&
                  results.length > 0 &&
                  address?.length > 0 && (
                    <Box className={cls.optionsWrap}>
                      {results?.map((location, idx) => (
                        <Flex
                          onClick={() =>
                            hanleAdress(location, `from2`, "loading")
                          }
                          key={idx}
                          gap={3}
                          alignItems={"center"}
                        >
                          <LocationIconStep />

                          <p className={cls.item}>
                            {location?.GeoObject?.name}
                          </p>
                        </Flex>
                      ))}
                    </Box>
                  )}
              </Box>

              <Box width={"100%"} className={cls.locationWrap}>
                <TextFieldWithAdditionMap
                  label={t("Куда")}
                  placeholder={t("Укажите пункт назначения")}
                  additionalItemTheme={`light`}
                  register={register}
                  onChange={(e) => {
                    setActiveIndex(`to2`), setAddress(e.target.value);
                  }}
                  name={`to2`}
                  additionalOnclick={() => handleOpenModal(`to2`, "loading")}
                  additionalItemPlaceholder={
                    <span className={cls.additionalIcons}>
                      <LocationMarkIcon />
                    </span>
                  }
                />
                {activeIndex === `to2` &&
                  results.length > 0 &&
                  address?.length > 0 && (
                    <Box className={cls.optionsWrap}>
                      {results?.map((location, idx) => (
                        <Flex
                          onClick={() => hanleAdress(location, `to2`, "loading")}
                          key={idx}
                          gap={3}
                          alignItems={"center"}
                        >
                          <LocationIconStep />

                          <p className={cls.item}>
                            {location?.GeoObject?.name}
                          </p>
                        </Flex>
                      ))}
                    </Box>
                  )}
              </Box>

              <Box width={"100%"}>
                <DropdownWrapperCar
                  control={control}
                  register={register}
                  watch={watch}
                  label={t("Транспорт")}
                  name="vehicle_type_id2"
                  className={cls.dropdown}
                  placeholder={t("Выберите тип груза")}
                  inputPlaceholder={t("Выберите тип груза")}
                  searchable
                  searchName="cargo_type_search"
                  setValue={setValue}
                />
              </Box>
              <Box width={"100%"}>
                <p className={cls.label}>{t("Тип оплаты")}</p>
                <Flex flexDirection={`column`} rowGap={`25px`}>
                  <Checkbox
                    defaultChecked={watch(`prepayment2`)}
                    register={register}
                    name={`prepayment2`}
                  >
                    {t("Только с предоплатой")}
                  </Checkbox>
                  <Checkbox
                    defaultChecked={watch(`spot2`)}
                    register={register}
                    name={`spot2`}
                  >
                    {t("Наличными")}
                  </Checkbox>
                  <Checkbox
                    defaultChecked={watch(`in_spot2`)}
                    register={register}
                    name={`in_spot2`}
                  >
                    {t("Безналичными")}
                  </Checkbox>
                </Flex>
              </Box>
              <Flex width={"100%"} gap={"14px"}>
                <TextFieldWithAddition
                  className={cls.textField}
                  label={t("Объём от:")}
                  control={control}
                  name="min_volume2"
                  register={register}
                  additionalItemName="weight_unit"
                  additionalItemTheme={`light`}
                  additionalItemPlaceholder={t("м³")}
                  width="100%"
                  placeholder={t("минимум")}
                  type="number"
                  zIndex={90}
                />
                <TextFieldWithAddition
                  className={cls.textField}
                  control={control}
                  label={t("Объём до:")}
                  name="max_volume2"
                  register={register}
                  width="100%"
                  placeholder={t("максимум")}
                  additionalItemPlaceholder={t("м³")}
                  additionalItemTheme={`light`}
                  type="number"
                />
              </Flex>
              <Flex width={"100%"} gap={"14px"}>
                <TextFieldWithAddition
                  className={cls.textField}
                  label={t("Вес от:")}
                  control={control}
                  name="min_weight2"
                  register={register}
                  additionalItemName="weight_unit"
                  additionalItemPlaceholder={t("т")}
                  additionalItemTheme={`light`}
                  placeholder={t("минимум")}
                  type="number"
                  zIndex={90}
                />
                <TextFieldWithAddition
                  className={cls.textField}
                  control={control}
                  label={t("Вес до:")}
                  name="max_weight2"
                  register={register}
                  placeholder={t("максимум")}
                  additionalItemTheme={`light`}
                  additionalItemPlaceholder={t("т")}
                  type="number"
                />
              </Flex>
              <Box>
                <Checkbox
                  defaultChecked={watch(`only_for_me2`)}
                  register={register}
                  name={`only_for_me2`}
                >
                  <Flex gap={1}>
                    <FurgoIconLoad />{" "}
                    {t("Только грузы, подходящие под параметры моих машин")}
                  </Flex>
                </Checkbox>
              </Box>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => onSubmit()} width={`100%`}>{t("Применить фильтр")}</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <ModalS
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        firstBtnCallback={handleCloseModal}
        secondBtnCallback={() => {
          setIsModalOpen(false);
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
};
