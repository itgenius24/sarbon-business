"use client";
import { DatePicker } from "@/components/DatePicker";
import { DropdownWrapper } from "@/components/DropdownWrapper";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";

import { Box, Button, Heading, SimpleGrid, VStack, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const Search = (props={}) => {
  const {
    handleSubmit,
    onSubmit,
    control,
    register,
    watch,
    errors,
    isLoading,
    startDate,
    setStartDate,
    volumeMeasurementOptions,
    setValue,
  } = props;

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const {t} = useTranslation();

  return (
    <Box as="article" borderRadius="12px" padding={isLargerThan845 ? "24px" : "10px"} bgColor="baseWhite">
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        align="stretch"
        spacing={isLargerThan845 ? "24px" : "12px"}
      >
        <>
          <Heading size="sm" fontSize={isLargerThan845 ? "20px" : "16px"}>{t("Детали маршрута")}</Heading>
          <SimpleGrid columns={isLargerThan845 ? [2, null, 3] : [1, null, 2]} spacing={isLargerThan845 ? "24px" : "12px"}>
            <DropdownWrapper
              searchable
              label={t("Откуда")}
              control={control}
              // required
              register={register}
              watch={watch}
              name="from"
              placeholder={t("Выберите город, страну")}
              inputPlaceholder={t("Выберите город, страну")}
              // options={getAddressOptions}
              searchName="from_search"
              errors={errors}
              setValue={setValue}
            />
            <DropdownWrapper
              searchable
              label={t("Куда")}
              control={control}
              // required
              register={register}
              watch={watch}
              name="to"
              placeholder={t("Выберите город, страну")}
              inputPlaceholder={t("Выберите город, страну")}

              searchName="to_search"
              // options={getAddressOptions}
              errors={errors}
              setValue={setValue}
            />
            <DatePicker
              label={t("Дата")}
              placeholder={t("Выберите дату")}
              startDate={startDate}
              setStartDate={setStartDate}
              isClearable
            />
          </SimpleGrid>
        </>
        <>
          <Heading size="sm" fontSize={isLargerThan845 ? "20px" : "16px"}>{t("Параметры машин")}</Heading>
          <Box display="flex" flexDirection={isLargerThan845 ? "row" : "column"} columnGap={isLargerThan845 ? "24px" : "0"} rowGap={isLargerThan845 ? "0" : "12px"}>
            <TextFieldWithAddition
              errors={errors}
              control={control}
              name="weight_measurement"
              register={register}
              additionalItemName="weight_unit"
              width={isLargerThan845 ? "224px" : "100%"}
              placeholder={t("Вес")}
              additionalItemPlaceholder="T"
              type="number"
            />
            <TextFieldWithAddition
              errors={errors}
              control={control}
              name="volume_measurement"
              register={register}
              width={isLargerThan845 ? "224px" : "100%"}
              placeholder={t("Объем")}
              additionalItemPlaceholder={
                <span>
                  м<sup>3</sup>
                </span>
              }
              additionalItemName="volume_unit"
              additionalItemOptions={volumeMeasurementOptions}
              type="number"
            />
          </Box>
        </>
        <>
          <Button isLoading={isLoading} type="submit" maxW={isLargerThan845 ? "180px" : "100%"}>
           {t(
            "Найти машину"
           )}
          </Button>
        </>
      </VStack>
    </Box>
  );
};
