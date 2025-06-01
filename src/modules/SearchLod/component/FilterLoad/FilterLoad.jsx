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
  } = useProps({ setValue, watch });
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
            label={t("Откуда")}
            placeholder={t("Укажите пункт назначения")}
            additionalItemTheme={`light`}
            register={register}
            onChange={(e) => {
              setActiveIndex(`from`),
                setAddress(e.target.value)
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
                {results?.map((location, idx) => {
                  const text = location?.GeoObject?.name || "";
                  const highlightText = (text, search) => {
                    if (!search) return text;
                    const regex = new RegExp(`(${search})`, "gi");
                    return text.replace(
                      regex,
                      `<span class="${cls.bold}">$1</span>`
                    );
                  };

                  return (
                    <Flex
                      onClick={() => hanleAdress(location, `from`, "loading")}
                      key={idx}
                      gap={3}
                      alignItems={"center"}
                    >
                      <p
                        className={cls.item}
                        dangerouslySetInnerHTML={{
                          __html: highlightText(text, address),
                        }}
                      />
                    </Flex>
                  );
                })}
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
                setActiveIndex(`to`),
                setAddress(e.target.value)
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
                {results?.map((location, idx) => {
                  const text = location?.GeoObject?.name || "";
                  const highlightText = (text, search) => {
                    if (!search) return text;
                    const regex = new RegExp(`(${search})`, "gi");
                    return text.replace(
                      regex,
                      `<span class="${cls.bold}">$1</span>`
                    );
                  };

                  return (
                    <Flex
                      onClick={() => hanleAdress(location, `to`, "loading")}
                      key={idx}
                      gap={3}
                      alignItems={"center"}
                    >
                      <p
                        className={cls.item}
                        dangerouslySetInnerHTML={{
                          __html: highlightText(text, address),
                        }}
                      />
                    </Flex>
                  );
                })}
              </Box>
            )}
        </Box>

        <Box width={"100%"}>
          <p style={{ color: `var(--primary-text)` }}>{t("Тип оплаты")}</p>
          <Flex mt={1} gap={3}>
            <Checkbox
              defaultChecked={watch(`prepayment2`)}
              register={register}
              name={`prepayment`}
            >
              {t("Только с предоплатой")}
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`spot`)}
              register={register}
              name={`spot`}
            >
              {t("Наличными")}
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`in_spot`)}
              register={register}
              name={`in_spot`}
            >
              {t("Безналичными")}
            </Checkbox>
          </Flex>
        </Box>
      </Flex>

      <Flex gap={"30px"} mt={"25px"}>
        <Box width={"100%"}>
          <DropdownWrapperCar
            control={control}
            register={register}
            watch={watch}
            label={t("Транспорт")}
            name="vehicle_type_id"
            className={cls.dropdown}
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
            label={t("Объем с:")}
            control={control}
            name="min_volume"
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
            label={t("Объем по:")}
            name="max_volume"
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
            label={t("Вес с:")}
            control={control}
            name="min_weight"
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
            label={t("Вес по:")}
            name="max_weight"
            register={register}
            placeholder={t("максимум")}
            additionalItemTheme={`light`}
            additionalItemPlaceholder={t("т")}
            type="number"
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
            <FurgoIconLoad />{" "}
            {t("Только грузы, подходящие под параметры моих машин")}
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
