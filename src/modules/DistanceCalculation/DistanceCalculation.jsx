"use client";
import React from "react";
import cls from "./styles.module.scss";
import {
  ClockIcon,
  LocationMarkIcon,
  MapNextIcon,
  PlusIcon,
  RouteDirectionIcon,
} from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { TextField } from "@/components/TextField";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useDistanceCalculationProps } from "./useDistanceCalculationProps";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { DeleteButton } from "@/components/DeleteButton";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";

export const DistanceCalculation = () => {
  const {
    register,
    locations,
    handleAppend,
    handleRemove,
    onAdditionalAddressChange,
    distanceParameters,
    watch,
    handleCalculate,
    handleDragOver,
    handleDragStart,
    handleDragEnter,
    isLargerThan845,
    setValue,
    results,
    setResults,
    address,
    setAddress,
    activeIndex,
    setActiveIndex,
    hanleAdress,
    locationNames,
  } = useDistanceCalculationProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");


  return (
    <Container py={isLargerThan845 ? "40px" : "24px"}>
      <Heading
        color={`var(--primary-text)`}
        size={isLargerThan845 ? "md" : "sm"}
        mb={isLargerThan845 ? "24px" : "12px"}
      >
        {t("Расчет расстояния")}
      </Heading>
      <Box
        p={isLargerThan845 ? "24px" : "0"}
        bgColor={isLargerThan845 ? "baseWhite" : "transparent"}
        borderRadius={isLargerThan845 ? "16px" : "0"}
      >
        <Box
          display="flex"
          mb="20px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading
            size="sm"
            fontSize={isLargerThan845 ? "16px" : "14px"}
            lineHeight="28px"
            fontWeight="600"
          >
            {t("Детали груза")}
          </Heading>
          <Button
            color={`black`}
            onClick={handleAppend}
            fontSize={isLargerThan845 ? "14px" : "12px"}
            variant="reset"
            leftIcon={<PlusIcon color={`var(--primary-text)`} />}
          >
            {t("Добавить доп. адрес")}
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" rowGap="20px">
          <Box width={`100%`} className={cls.locationWrap}>
            <TextFieldWithAddition
              placeholder={t("Откуда")}
              label={t("Откуда")}
              additionalItemTheme="white"
              register={register}
              name={"from"}
              onChange={(e) => {
                setActiveIndex(`from`), setAddress(e.target.value);
                if (e.target.value.length === 0) {
                  setValue(`from`, ``);
                }
              }}
              onlyFieldDisabled={false}
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
                        onClick={() => hanleAdress(location, "from")}
                        key={idx}
                        gap={3}
                        alignItems={"center"}
                      >
                        <p
                          className={cls.item}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(text, address),
                          }}
                        />{" "}
                      </Flex>
                    );
                  })}
                </Box>
              )}
          </Box>
          {locations.map((item, index) => (
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
              <Box flexGrow={1} cursor="grab">
                <Box width={`100%`} className={cls.locationWrap}>
                  <TextFieldWithAddition
                    placeholder={t("Введите город, страну")}
                    label={t("Дополнительный адрес")}
                    additionalItemTheme="white"
                    register={register}
                    name={`locations.${index}.name`}
                    onChange={(e) => {
                      onAdditionalAddressChange(e.target.value, index);
                      setActiveIndex(`locations.${index}.name`),
                        setAddress(e.target.value);
                      if (e.target.value.length === 0) {
                        setValue(`locations.${index}.name`, ``);
                      }
                    }}
                    onlyFieldDisabled={false}
                    additionalItemPlaceholder={
                      <span className={cls.additionalIcons}>
                        <LocationMarkIcon />
                      </span>
                    }
                  />
                  {activeIndex === `locations.${index}.name` &&
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
                              onClick={() => {
                                onAdditionalAddressChange(
                                  location?.GeoObject?.name,
                                  index
                                );
                                hanleAdress(
                                  location,
                                  `locations.${index}.name`
                                );
                              }}
                              key={idx}
                              gap={3}
                              alignItems={"center"}
                            >
                              <p
                                className={cls.item}
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(text, address),
                                }}
                              />{" "}
                            </Flex>
                          );
                        })}
                      </Box>
                    )}
                </Box>
                {/* <TextField
                  register={register}
                  onChange={(event) => onAdditionalAddressChange(event, index)}
                  label={t("Дополнительный адрес")}
                  name={`locations.${index}.name`}
                  placeholder={t("Введите город, страну")}
                /> */}
              </Box>
            </Box>
          ))}
          <Box width={`100%`} className={cls.locationWrap}>
            <TextFieldWithAddition
              placeholder={t("Куда")}
              label={t("Куда")}
              additionalItemTheme="white"
              register={register}
              name={"to"}
              onChange={(e) => {
                setActiveIndex(`to`), setAddress(e.target.value);
                if (e.target.value.length === 0) {
                  setValue(`to`, ``);
                }
              }}
              onlyFieldDisabled={false}
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
                        onClick={() => hanleAdress(location, "to")}
                        key={idx}
                        gap={3}
                        alignItems={"center"}
                      >
                        <p
                          className={cls.item}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(text, address),
                          }}
                        />{" "}
                      </Flex>
                    );
                  })}
                </Box>
              )}
          </Box>
        </Box>
        <Button
          className={cls.distanceCount}
          mt="20px"
          onClick={handleCalculate}
        >
          {t("Рассчитать расстояние")}
        </Button>
      </Box>
      <div
        className={cls.map}
        id="map"
        style={{ width: "100%", height: "500px" }}
      >
        {(distanceParameters.distance || distanceParameters.duration) && watch("from") && watch("to")  && (
          <div className={cls.distanceInfo}>
            <div className={cls.locationNames}>
              <p>{watch("from")}</p>
              <span className={cls.arrow}>
                <MapNextIcon />
              </span>
              {locationNames.length > 0 ? (
                locationNames?.map((item) => (
                  <>
                    <p>{item}</p>
                    <span className={cls.arrow}>
                      <MapNextIcon />
                    </span>
                  </>
                ))
              ) : (
                <></>
              )}
              <p>{watch("to")}</p>
            </div>
            <p className={cls.distanceParams}>
              <b className={cls.distanceInfoTitle}>
                <span>
                  <RouteDirectionIcon />
                </span>
                <span>{Math.floor(distanceParameters.distance / 1000)} km</span>
              </b>
              <br />
              <b className={cls.distanceInfoTitle}>
                <span>
                  <ClockIcon />
                </span>
                <span>{distanceParameters.duration}</span>
              </b>
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};
