"use client";

import { Box, Flex } from "@chakra-ui/react";
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

export const FilterLoad = ({ register, control, setValue, watch }) => {
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
      <Flex
        width={"100%"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        gap={"30px"}
      >
        <Box width={"100%"} className={cls.locationWrap}>
          <TextFieldWithAdditionMap
            label="Откуда"
            placeholder={t("Укажите пункт назначения")}
            additionalItemTheme={`light`}
            register={register}
            onChange={(e) => {
              setActiveIndex(`from`), setAddress(e.target.value);
            }}
            name={`from`}
            additionalOnclick={() => handleOpenModal(`from`, "loading")}
            additionalItemPlaceholder={
              <span className={cls.additionalIcons}>
                <LocationMarkIcon />
              </span>
            }
          />
          {activeIndex === `from` &&
            results.length > 0 &&
            address?.length > 0 && (
              <Box className={cls.optionsWrap}>
                {results?.map((location, idx) => (
                  <Flex
                    onClick={() => hanleAdress(location, `from`, "loading")}
                    key={idx}
                    gap={3}
                    alignItems={"center"}
                  >
                    <LocationIconStep />

                    <p className={cls.item}>{location?.GeoObject?.name}</p>
                  </Flex>
                ))}
              </Box>
            )}
        </Box>

        <Box width={"100%"} className={cls.locationWrap}>
          <TextFieldWithAdditionMap
            label="Куда"
            placeholder={t("Укажите пункт назначения")}
            additionalItemTheme={`light`}
            register={register}
            onChange={(e) => {
              setActiveIndex(`to`), setAddress(e.target.value);
            }}
            name={`to`}
            additionalOnclick={() => handleOpenModal(`to`, "loading")}
            additionalItemPlaceholder={
              <span className={cls.additionalIcons}>
                <LocationMarkIcon />
              </span>
            }
          />
          {activeIndex === `to` &&
            results.length > 0 &&
            address?.length > 0 && (
              <Box className={cls.optionsWrap}>
                {results?.map((location, idx) => (
                  <Flex
                    onClick={() => hanleAdress(location, `to`, "loading")}
                    key={idx}
                    gap={3}
                    alignItems={"center"}
                  >
                    <LocationIconStep />

                    <p className={cls.item}>{location?.GeoObject?.name}</p>
                  </Flex>
                ))}
              </Box>
            )}
        </Box>

        <Box width={"100%"}>
          <p>Тип оплаты</p>
          <Flex mt={1} gap={3}>
            <Checkbox
              defaultChecked={watch(`prepayment`)}
              register={register}
              name={`prepayment`}
            >
              Только с предоплатой
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`spot`)}
              register={register}
              name={`spot`}
            >
              Наличными
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`in_spot`)}
              register={register}
              name={`in_spot`}
            >
              Безналичными
            </Checkbox>
          </Flex>
        </Box>
      </Flex>

      <Flex gap={"30px"} mt={"25px"}>
        <Box width={"100%"}>
          <DropdownWrapperCar
            control={control}
            // required
            register={register}
            watch={watch}
            label={"Транспорт"}
            name="vehicle_type_id"
            // options={[]}
            // errors={errors}
            // disabled={!canEdit}
            className={cls.dropdown}
            // onSearchChange={(e) => setSearchCargo(e.target.value)}
            placeholder={t("Выберите тип груза")}
            inputPlaceholder={t("Выберите тип груза")}
            searchable
            searchName="cargo_type_search"
            setValue={setValue}
          />
        </Box>
        <Flex width={"100%"} gap={"14px"}>
          <TextFieldWithAddition
            className={cls.textField}
            label="Объём от:"
            // errors={errors}
            control={control}
            name="min_volume"
            register={register}
            additionalItemName="weight_unit"
            additionalItemTheme={`light`}
            additionalItemPlaceholder="т"
            width="100%"
            placeholder={t("минимум")}
            // additionalItemOptions={weightMeasurementOptions}
            // disabled={!canEdit}
            type="number"
            zIndex={90}
          />
          <TextFieldWithAddition
            className={cls.textField}
            // errors={errors}
            control={control}
            label="Объём до:"
            name="max_volume"
            register={register}
            width="100%"
            placeholder={t("максимум")}
            additionalItemPlaceholder="м³"
            additionalItemTheme={`light`}
            // disabled={!canEdit}
            type="number"
            // additionalItemName="volume_unit"
            // additionalItemOptions={volumeMeasurementOptions}
          />
        </Flex>
        <Flex width={"100%"} gap={"14px"}>
          <TextFieldWithAddition
            className={cls.textField}
            label="Вес до:"
            // errors={errors}
            control={control}
            name="min_weight"
            register={register}
            additionalItemName="weight_unit"
            additionalItemPlaceholder="т"
            additionalItemTheme={`light`}
            // width="134px"
            placeholder={t("минимум")}
            // additionalItemOptions={weightMeasurementOptions}
            // disabled={!canEdit}
            type="number"
            zIndex={90}
          />
          <TextFieldWithAddition
            className={cls.textField}
            // errors={errors}
            control={control}
            label="Вес до:"
            name="max_weight"
            register={register}
            // width="134px"
            placeholder={t("максимум")}
            additionalItemTheme={`light`}
            additionalItemPlaceholder="м³"
            // disabled={!canEdit}
            type="number"

            // additionalItemName="volume_unit"
            // additionalItemOptions={volumeMeasurementOptions}
          />
        </Flex>
      </Flex>
      <Box mt={`24px`}>
        <Checkbox
          defaultChecked={watch(`only_for_me`)}
          register={register}
          name={`only_for_me`}
        >
          <Flex gap={1}>
            <FurgoIconLoad /> Только грузы, подходящие под параметры моих машин
          </Flex>
        </Checkbox>
      </Box>

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
