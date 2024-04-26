"use client";
import React from "react";
import cls from "./styles.module.scss";
import { ClockIcon, DeleteIcon, PlusIcon, RouteDirectionIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { TextField } from "@/components/TextField";
import { Box, Button, Heading, useMediaQuery } from "@chakra-ui/react";
import { useDistanceCalculationProps } from "./useDistanceCalculationProps";
import Script from "next/script";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { DeleteButton } from "@/components/DeleteButton";

/* eslint no-undef: 0 */ // --> OFF

export const DistanceCalculation = () => {

  const {
    register,
    locations,
    handleAppend,
    handleRemove,
    initYmaps,
    onAdditionalAddressChange,
    distanceParameters,
    watch,
    handleCalculate,
    handleDragOver,
    handleDragStart,
    handleDragEnter,
    isLargerThan845,
  } = useDistanceCalculationProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Container py={isLargerThan845 ? "40px" : "24px"}>
    <Script
      onLoad={() => ymaps.ready(initYmaps)}
      src={`https://api-maps.yandex.ru/2.1.79/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&suggest_apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_KEY}&lang=ru_RU`}
    />
    <Heading size={isLargerThan845 ? "md" : "sm"} mb={isLargerThan845 ? "24px" : "12px"}>{t("Расчет расстояния")}</Heading>
    <Box p={isLargerThan845 ? "24px" : "0"} bgColor={isLargerThan845 ? "baseWhite" : "transparent"} borderRadius={isLargerThan845 ? "16px" : "0"}>
      <Box display="flex" mb="20px" alignItems="center" justifyContent="space-between">
        <Heading size="sm" fontSize={isLargerThan845 ? "16px" : "14px"} lineHeight="28px" fontWeight="600">{t("Детали груза")}</Heading>
        <Button onClick={handleAppend} fontSize={isLargerThan845 ? "14px" : "12px"} variant="reset" leftIcon={<PlusIcon color="#007aff" />}>{t("Добавить доп. адрес")}</Button>
      </Box>
      <Box display="flex" flexDirection="column" rowGap="20px">
        <TextField register={register} name="from" label={t("Откуда")} placeholder={t("Введите город, страну")} />
        {
          locations.map((item, index) => (
            <Box
              key={item.id}
              display="flex"
              columnGap="16px"
              alignItems="flex-end"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
            >
              <DeleteButton
                mb="20px"
                variant="reset"
                onClick={() => handleRemove(index)}
              >
                {t("Удалить")}
              </DeleteButton>
              <TextField register={register} onChange={(event) => onAdditionalAddressChange(event, index)} label={t("Дополнительный адрес")} name={`locations.${index}.name`} placeholder={t("Введите город, страну")} />
            </Box>
          ))
        }
        <TextField register={register} name="to" label={t("Куда")} placeholder={t("Введите город, страну")} />
      </Box>
      <Button className={cls.distanceCount} mt="20px" onClick={handleCalculate}>{t("Рассчитать расстояние")}</Button>
    </Box>
    <div className={cls.map} id="map" style={{ width: "100%", height: isLargerThan845 ? "500px" : "300px" }}>
      {
        (distanceParameters.distance || distanceParameters.duration) && <div className={cls.distanceInfo}>
          <div className={cls.locationNames}>
            <p>{watch("from")}</p>
            <span className={cls.arrow}>
              <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.25 11H2.75M13.75 5.5l5.5 5.5-5.5 5.5" stroke="#000" strokeOpacity=".85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <p>{watch("to")}</p>
          </div>
          <p className={cls.distanceParams}>
            <b className={cls.distanceInfoTitle}>
              <span><RouteDirectionIcon /></span>
              <span>{distanceParameters.distance}</span>
            </b>
            <br />
            <b className={cls.distanceInfoTitle}>
              <span><ClockIcon /></span>
              <span>{distanceParameters.duration}</span>
            </b>
          </p>
        </div>
      }
    </div>
  </Container>;
};
