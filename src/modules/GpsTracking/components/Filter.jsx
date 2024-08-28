import { FilterIconBlack, LocationMarkIcon } from "@/assets/icons/icons";
import { ChakraSelect } from "@/components/ChakraSelect";
import { Checkbox } from "@/components/Checkbox";
import { Dropdown } from "@/components/Dropdown";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React from "react";

const Filter = ({
  cls,
  t,
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
  handleClear
}) => {
  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={4} alignItems={"flex-start"}>
        <Flex
          mb={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Flex onClick={() => handleClear()} alignItems={"center"} gap={"10px"}>
         
            <FilterIconBlack /> <span className={cls.filterText}>
              Фильтр
            </span>
          </Flex>
          <p className={cls.clearBtn}>Сбросить</p>
        </Flex>
        <Box className={cls.cardWrap}>
          <TextFieldWithAddition
            placeholder={t("Адрес")}
            // required={true}
            rules={{ required: true }}
            label={t("Поиск в радиусе")}
            additionalItemTheme="white"
            register={register}
            name={"address"}
            additionalOnclick={() => handleOpenModal()}
            onClick={() => handleOpenModal()}
            error={errors["address"]}
            onlyFieldDisabled={true}
            // disabled={!canEdit}
            additionalItemPlaceholder={
              <span className={cls.additionalIcons}>
                <LocationMarkIcon />
              </span>
            }
          />
          <Flex mt={5} justifyContent={"space-between"} width={"100%"}>
            <p>{t("Дистанция")}</p>
            <span className={cls.disNum}>{distance * 2} km</span>
          </Flex>
          <Slider onChange={(e) => setDistance(e*2)} mt={1} aria-label="slider-ex-1" defaultValue={30}>
            <SliderTrack bg="rgba(0, 122, 255, 0.3)">
              <SliderFilledTrack bg={"rgba(0, 122, 255, 1)"} />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <Box className={cls.cardWrap}>
          <p className={cls.checkCardTitle}>Отображать на карте</p>
          <Flex mt={2} flexDirection={"column"} rowGap={2}>
            <Checkbox width={"16px"} height={"16px"}>
              {t("Свободные машины")}
            </Checkbox>
            <Checkbox width={"16px"} height={"16px"}>
              {t("Занятые с нашим грузом")}
            </Checkbox>
            <Checkbox width={"16px"} height={"16px"}>
              {t("Занятые с чужим грузом")}
            </Checkbox>
            <Checkbox width={"16px"} height={"16px"}>
              {t("Сломанные машины")}
            </Checkbox>
            <Checkbox width={"16px"} height={"16px"}>
              {t("Грузы")}
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
              clearable
            />
            <Box>
              <p className={cls.checkCardTitle}>Поиск по водителю</p>
              <ChakraSelect
                options={getUserOption}
                name="users_id"
                placeholder={t("Введите тип имя")}
                control={control}
              />

            </Box>
          </Flex>

        </Box>
        <Box className={cls.cardWrap}>
          <p className={cls.label}>
          Параметры груза
          </p>
          <Flex gap={4}>

            <TextFieldWithAddition
              className={cls.textField}
              errors={errors}
              control={control}
              name="weight"
              register={register}
              additionalItemName="weight_unit"
              // width="134px"
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
              // width="134px"
              placeholder={t("Объем")}
              additionalItemPlaceholder="m³"
              type="number"
            />
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default Filter;
