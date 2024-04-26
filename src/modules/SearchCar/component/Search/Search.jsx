"use client";
import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { DropdownWrapper } from "@/components/DropdownWrapper";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";

import { Box, Button, Heading, SimpleGrid, VStack, useMediaQuery } from "@chakra-ui/react";

export const Search = (props={}) => {
  const {
    handleSubmit,
    onSubmit,
    control,
    register,
    watch,
    getAddressOptions,
    errors,
    isPending,
    startDate,
    setStartDate,
    volumeMeasurementOptions,
    setValue,
  } = props;

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return (
    <Box as="article" borderRadius="12px" padding={isLargerThan845 ? "24px" : "10px"} bgColor="baseWhite">
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        align="stretch"
        spacing={isLargerThan845 ? "24px" : "12px"}
      >
        <>
          <Heading size="sm" fontSize={isLargerThan845 ? "20px" : "16px"}>Детали маршрута</Heading>
          <SimpleGrid columns={isLargerThan845 ? [2, null, 3] : [1, null, 2]} spacing={isLargerThan845 ? "24px" : "12px"}>
            <DropdownWrapper
              searchable
              label="Откуда"
              control={control}
              required
              register={register}
              watch={watch}
              name="from"
              placeholder="Выберите город, страну"
              // options={getAddressOptions}
              searchName="from_search"
              errors={errors}
              setValue={setValue}
            />
            <DropdownWrapper
              searchable
              label="Куда"
              control={control}
              required
              register={register}
              watch={watch}
              name="to"
              placeholder="Выберите город, страну"
              searchName="to_search"
              // options={getAddressOptions}
              errors={errors}
              setValue={setValue}
            />
            <DatePicker
              label="Дата"
              placeholder="Выберите дату"
              startDate={startDate}
              setStartDate={setStartDate}
              isClearable
            />
          </SimpleGrid>
        </>
        <>
          <Heading size="sm" fontSize={isLargerThan845 ? "20px" : "16px"}>Параметры машин</Heading>
          <Box display="flex" flexDirection={isLargerThan845 ? "row" : "column"} columnGap={isLargerThan845 ? "24px" : "0"} rowGap={isLargerThan845 ? "0" : "12px"}>
            <TextFieldWithAddition
              errors={errors}
              control={control}
              name="weight_measurement"
              register={register}
              additionalItemName="weight_unit"
              width={isLargerThan845 ? "224px" : "100%"}
              placeholder="Вес"
              additionalItemPlaceholder="T"
              type="number"
            />
            <TextFieldWithAddition
              errors={errors}
              control={control}
              name="volume_measurement"
              register={register}
              width={isLargerThan845 ? "224px" : "100%"}
              placeholder="Объем"
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
          <Button isLoading={isPending} type="submit" maxW={isLargerThan845 ? "180px" : "100%"}>
            Найти машину
          </Button>
        </>
      </VStack>
    </Box>
  );
};
