"use client";
import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { DropdownWrapper } from "@/components/DropdownWrapper";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";

import { Box, Button, Heading, SimpleGrid, VStack } from "@chakra-ui/react";

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

  return (
    <Box as="article" borderRadius="12px" padding="24px" bgColor="baseWhite">
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        align="stretch"
        spacing="24px"
      >
        <>
          <Heading size="sm">Детали маршрута</Heading>
          <SimpleGrid columns={[2, null, 3]} spacing="24px">
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
          <Heading size="sm">Параметры машин</Heading>
          <SimpleGrid columns={[2, null, 5]} spacing="24px">
            <TextFieldWithAddition
              errors={errors}
              control={control}
              name="weight_measurement"
              register={register}
              additionalItemName="weight_unit"
              width="224px"
              placeholder="Вес"
              additionalItemPlaceholder="T"
              type="number"
            />
            <TextFieldWithAddition
              errors={errors}
              control={control}
              name="volume_measurement"
              register={register}
              width="224px"
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
          </SimpleGrid>
        </>
        <>
          <Button isLoading={isPending} type="submit" maxW="180px">
            Найти машину
          </Button>
        </>
      </VStack>
    </Box>
  );
};
