import { FilterIconBlack, LocationMarkIcon } from "@/assets/icons/icons";
import { ChakraSelect } from "@/components/ChakraSelect";
import { Checkbox } from "@/components/Checkbox";
import { Dropdown } from "@/components/Dropdown";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { useTranslation } from "@/app/i18n/client";
import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Filter = ({
  cls,
  locale,
  control,
  loadingOptions,
  watch,
  register,
  setValue,
  handleOpenModal,
  errors,
  setDistance,
  carTypeOptions,
  getUserOption,
  distance,
  handleClear,
  checkboxStatuses,
  handleCheckboxChange,
  setModalType,
  handleInputClear,
  setLoadCheck,
  loadCheck,
  dataDis,
  getCarData,
  driverLoading,
  setCarsArr

}) => {
  const { t } = useTranslation(locale);

  const handleInputChange = (newValue, { action }) => {
    console.log(`newValue`, newValue, action);
    if (action === "input-change") {
      setValue(`users_id_search`, newValue.replace(/\s+/g, ""));
    }
  };

  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={4} alignItems={"flex-start"}>
        <Flex
          mb={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Flex
            onClick={() => {
              setModalType(``);
            }}
            alignItems={"center"}
            gap={"10px"}
          >
            <FilterIconBlack />{" "}
            <span className={cls.filterText}>{t("Фильтр")}</span>
          </Flex>
          <p onClick={() => handleClear()} className={cls.clearBtn}>
            {t("Сбросить")}
          </p>
        </Flex>
        <Box display={`flex`} flexDirection={`column`} rowGap={`10px`} className={cls.cardWrap}>
          <Dropdown
            placeholder={t("Диспетчер")}
            label={t("Диспетчер")}
            name="dispatcher"
            options={dataDis}
            errors={errors}
            control={control}
            watch={watch}
            setValue={setValue}
            handleInputClear={handleInputClear}
            clearable
            onChangeSelect={(e) =>{ console.log(`val`,e); setCarsArr([]);handleInputClear}}
          />
          <Dropdown
            placeholder={t("Водитель")}
            label={t("Водитель")}
            name="driver"
            options={getCarData}
            errors={errors}
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            handleInputClear={handleInputClear}
            clearable
            searchable
            searchName="driver_search"
            isLoading={false}
            onChangeSelect={() => { setCarsArr([]);handleInputClear}}
          />
        </Box>
        <Box className={cls.cardWrap}>
          <TextFieldWithAddition
            placeholder={t("Адрес")}
            rules={{ required: true }}
            label={t("Поиск в радиусе")}
            additionalItemTheme="white"
            register={register}
            name={"address"}
            additionalOnclick={() => handleOpenModal()}
            onClick={() => handleOpenModal()}
            error={errors["address"]}
            onlyFieldDisabled={true}
            additionalItemPlaceholder={
              <span className={cls.additionalIcons}>
                <LocationMarkIcon />
              </span>
            }
          />
          <Flex mt={5} justifyContent={"space-between"} width={"100%"}>
            <p>{t("Дистанция")}</p>
            <span className={cls.disNum}>{distance * 4} km</span>
          </Flex>
          <Slider
            onChange={(e) => setDistance(e)}
            mt={1}
            aria-label="slider-ex-1"
            value={distance}
            defaultValue={30}
          >
            <SliderTrack bg="rgba(0, 255, 55, 0.3)">
              <SliderFilledTrack bg={"var(--primary)"} />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <Box className={cls.cardWrap}>
          <p className={cls.checkCardTitle}>{t("Отображать на карте")}</p>
          <Flex mt={2} flexDirection={"column"} rowGap={2}>
            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={checkboxStatuses.empty}
              onChange={() => handleCheckboxChange("empty")}
            >
              {t("Свободные машины")}
            </Checkbox>

            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={checkboxStatuses.our_cargo}
              onChange={() => handleCheckboxChange("our_cargo")}
            >
              {t("Занятые с нашим грузом")}
            </Checkbox>

            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={checkboxStatuses.someone_cargo}
              onChange={() => handleCheckboxChange("someone_cargo")}
            >
              {t("Занятые с чужим грузом")}
            </Checkbox>

            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={checkboxStatuses.broke_down}
              onChange={() => handleCheckboxChange("broke_down")}
            >
              {t("Сломанные машины")}
            </Checkbox>

            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={loadCheck}
              onChange={() => setLoadCheck(!loadCheck)}
            >
              {t("Грузы")}
            </Checkbox>
            <Checkbox
              // isLoading={isLoadingRefueling}
              // isDisabled={isLoadingRefueling}
              width={"16px"}
              height={"16px"}
              defaultChecked={Boolean(watch(`refuelingState`))}
              onChange={() =>
                setValue(`refuelingState`, !watch(`refuelingState`))
              }
            >
              {t("Заправки")}
            </Checkbox>
          </Flex>
        </Box>
        <Box className={cls.cardWrap}>
          <Flex flexDirection={"column"} rowGap={2}>
            <Dropdown
              placeholder={t("Введите тип кузова")}
              label={t("Тип кузова")}
              name="car_type"
              options={carTypeOptions}
              errors={errors}
              width="100%"
              control={control}
              watch={watch}
              handleInputClear={handleInputClear}
              setValue={setValue}
              clearable
            />
            <Dropdown
              placeholder={t("Введите тип загрузки")}
              label={t("Тип загрузки")}
              name="load_type_id"
              options={loadingOptions}
              errors={errors}
              control={control}
              watch={watch}
              setValue={setValue}
              handleInputClear={handleInputClear}
              clearable
            />
            <Box>
              <p className={cls.label}>{t("Параметры груза")}</p>
              <Flex gap={4}>
                <TextFieldWithAddition
                  className={cls.textField}
                  errors={errors}
                  control={control}
                  name="weight"
                  register={register}
                  additionalItemName="weight_unit"
                  placeholder={t("Вес")}
                  type="number"
                  zIndex={90}
                />
                <TextFieldWithAddition
                  className={cls.textField}
                  errors={errors}
                  control={control}
                  name="volume"
                  register={register}
                  placeholder={t("Объем")}
                  additionalItemPlaceholder="m³"
                  type="number"
                />
              </Flex>
            </Box>
            {/* <Box>
                   <p className={cls.checkCardTitle}>{t("Поиск по водителю")}</p>
                   <ChakraSelect
                     options={getUserOption}
                     name="users_id"
                     placeholder={t("Имя или номер телефона...")}
                     control={control}
                     // inputValue={ watch(`users_id`) ?  watch(`users_id`): watch(`users_id_search`)}
                     // onInputChange={handleInputChange}
                   />
                 </Box> */}
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default Filter;
