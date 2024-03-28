"use client";
import React from "react";
import cls from "./styles.module.scss";
import { ClockIcon, DeleteIcon, PlusIcon, RouteDirectionIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { TextField } from "@/components/TextField";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useDistanceCalculationProps } from "./useDistanceCalculationProps";
import Script from "next/script";
import { useTranslation } from "@/app/i18n/client";
import localeStore from "@/store/locale.store";

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
    handleCalculate
  } = useDistanceCalculationProps();

  const { t } = useTranslation(localeStore.locale, "translations");

  return <Container py="40px">
    <Script
      onLoad={() => ymaps.ready(initYmaps)}
      src={`https://api-maps.yandex.ru/2.1.79/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&lang=ru_RU`}
    />
    <Heading size="md" mb="24px">{t("Расчет расстояния")}</Heading>
    <Box p="24px" bgColor="baseWhite" borderRadius="12px">
      <Box display="flex" mb="20px" alignItems="center" justifyContent="space-between">
        <Heading size="sm" fontSize="18px" lineHeight="28px" fontWeight="600">{t("Детали груза")}</Heading>
        <Button onClick={handleAppend} variant="reset" leftIcon={<PlusIcon color="#007aff" />}>{t("Добавить доп. адрес")}</Button>
      </Box>
      <Box display="flex" flexDirection="column" rowGap="20px">
        <TextField register={register} name="from" label={t("Откуда")} placeholder={t("Введите город, страну")} />
        {
          locations.map((item, index) => (
            <Box key={item.id} display="flex" columnGap="16px" alignItems="center">
              <Button
                variant="reset"
                onClick={() => handleRemove(index)}
                color="brand.700"
                leftIcon={<DeleteIcon />}
              >
                {t("Удалить")}
              </Button>
              <TextField register={register} onChange={(event) => onAdditionalAddressChange(event, index)} label={t("Дополнительный адрес")} name={`locations.${index}.name`} placeholder={t("Введите город, страну")} />
            </Box>
          ))
        }
        <TextField register={register} name="to" label={t("Куда")} placeholder={t("Введите город, страну")} />
      </Box>
      <Button width="253px" mt="20px" onClick={handleCalculate}>{t("Рассчитать расстояние")}</Button>
    </Box>
    <div className={cls.map} id="map" style={{ width: "100%", height: "500px" }}>
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
