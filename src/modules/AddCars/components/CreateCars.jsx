import {
  EyeIcon,
  EyeIconOff,
  Img3UploadIcon,
  ImgploadIcon1,
  ImgUload2,
  UserIcon2,
} from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";
import { Dropdown } from "@/components/Dropdown";
import FormInternationInput from "@/components/Input/FormInternationalInput";
import { TextField } from "@/components/TextField";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { TextFieldWithAdditionCar } from "@/components/TextFieldWithAddition/TextFieldWithAdditionCar";
import { UploadImg } from "@/components/UploadImg";
import { useGetFuelInfo } from "@/services/api";
import { countries } from "@/utils/country";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

const CreateCars = ({
  isLargerThan845,
  cls,
  register,
  errors,
  t,
  control,
  watch,
  setValue,
  locale,
  euroTypeOptions,
  setinputValue,
}) => {
  const { data: fuel } = useGetFuelInfo();
  return (
    <>
      <Flex
        width={"100%"}
        background={"white"}
        borderRadius={"12px"}
        gap={`35px`}
        padding={ `10px 10px`}
        mt={ `20px`}
        flexDirection={`column`}
      >
        <Box className={cls.ImgWrap} width={"100%"}>
          <p className={cls.textFieldName}>{t("Фото Техпаспорта спереди")}*</p>
          <Flex mt={`10px`} gap={4} flexDirection={`column`}>
            <UploadImg
              isColor={true}
              watch={watch}
              setValue={setValue}
              name={"front_side_trailer"}
              icon={<ImgploadIcon1 />}
              text={t("Загрузить фото спереди")}
              errors={errors}
            />
            <UploadImg
              isColor={true}
              watch={watch}
              setValue={setValue}
              name={"back_side_trailer"}
              icon={<ImgploadIcon1 />}
              text={t("Загрузить фото сзади")}
              errors={errors}
            />
          </Flex>
        </Box>
        <Flex className={cls.inputWrap} width={`100%`} gap={"24px"}>
          <Box width={`100%`}>
            <p className={cls.textFieldName}>{t("Грузоподъёмность")}*</p>
            <TextFieldWithAdditionCar
              className={cls.textField}
              errors={errors}
              rules={{
                required: t("Это поле обязательно"),
              }}
              control={control}
              name="capacity"
              register={register}
              additionalItemTheme={`light`}
              additionalItemName="weight_unit"
              maxWidth="165px"
              placeholder={t("Вес")}
              additionalItemPlaceholder="т"
              // additionalItemOptions={weightMeasurementOptions}
              type="number"
              zIndex={90}
            />
            <Flex gap={`17px`} mt={1}>
              <p
                onClick={() => {
                  setValue(`capacity`, `20`, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className={cls.quickWord}
              >
                20{t("т")},
              </p>
              <p
                onClick={() =>
                  setValue(`capacity`, `22`, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={cls.quickWord}
              >
                22{t("т")},
              </p>
              <p
                onClick={() =>
                  setValue(`capacity`, `23`, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={cls.quickWord}
              >
                23{t("т")}
              </p>
              <p
                onClick={() =>
                  setValue(`capacity`, `24`, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={cls.quickWord}
              >
                24{t("т")}
              </p>
            </Flex>
          </Box>
          <Box width={`100%`}>
            <p className={cls.textFieldName}>{t("Объём кузова")}*</p>
            <TextFieldWithAddition
              className={cls.textField}
              errors={errors}
              control={control}
              name="height"
              register={register}
              rules={{
                required: t("Это поле обязательно"),
              }}
              maxWidth="165px"
              placeholder={t("Объем")}
              additionalItemTheme={`light`}
              additionalItemPlaceholder="м³"
              type="number"
              // additionalItemName="volume_unit"
              // additionalItemOptions={volumeMeasurementOptions}
            />
            <Flex gap={`17px`} mt={1}>
              {/* <span className={cls.subTitle}>{t("Пример")}: </span> */}
              <p
                onClick={() =>
                  setValue(`height`, `96`, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={cls.quickWord}
              >
                96{t("м³")},
              </p>
              <p
                onClick={() =>
                  setValue(`height`, `105`, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={cls.quickWord}
              >
                105{t("м³")},
              </p>
              <p
                onClick={() =>
                  setValue(`height`, `120`, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={cls.quickWord}
              >
                120{t("м³")}
              </p>
            </Flex>
          </Box>
        </Flex>
        <Box
          // borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          width={`100%`}
        >
          <p className={cls.textFieldName}>{t("Требования")}</p>
          <Box
            mt={"5px"}
            display="flex"
            rowGap={`20px`}
            flexDirection={`column`}
            columnGap="24px"
          >
            <Checkbox
              defaultChecked={watch(`coupling`)}
              register={register}
              name="coupling"
            >
              {t("Сцепка")}
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`pneumatic`)}
              register={register}
              name="pneumatic"
            >
              {t("Пневмоход")}
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`konika`)}
              register={register}
              name="konika"
            >
              {t("Коники")}
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`tir`)}
              register={register}
              name="tir"
            >
              {t("TIR")}
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`cemt`)}
              register={register}
              name="cemt"
            >
              {t("CEMT (ЕКМТ) ")}
            </Checkbox>
          </Box>
        </Box>
        <Box width={`100%`}>
          <p className={cls.textFieldName}>
            {t("Страна регистрации автомобиля")}
          </p>

          <Dropdown
            control={control}
            register={register}
            watch={watch}
            placeholder={t("Выберите страну")}
            name="car_country"
            options={countries?.map((item) => ({
              ...item,
              label: item[`name_${locale ? locale : `ru`}`],
              value: item?.code,
            }))}
            errors={errors}
            required={t("Это поле обязательно")}
            width={"100%"}
            className={cls.dropdown}
            // searchName="cargo_type_search"
          />
          <Flex gap={`12px`} mt={1}>
            <span className={cls.subLabel}>{t(`Пример`)}: </span>
            <p
              onClick={() =>
                setValue(
                  "car_country",
                  {
                    label: t("Узбекистан"),
                    value: "UZ",
                  },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
              className={cls.quickWord}
            >
              {t("Узбекистан")},
            </p>
            <p
              onClick={() =>
                setValue(
                  "car_country",
                  {
                    label: t("Казахстан"),
                    value: "KZ",
                  },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
              className={cls.quickWord}
            >
              {t(`Казахстан`)}
            </p>
          </Flex>
        </Box>
        <Box width={`100%`}>
          <p className={cls.textFieldName}>{t("Госномер")} *</p>
          <TextField
            register={register}
            errors={errors}
            name="car_number"
            placeholder={t("Введите номер транспортного средства")}
            rules={{
              required: t("Это поле обязательно"),
            }}
            onChange={(e) => {
              console.log(`we`, e.target.value);
              e.target.value = e.target.value
                .replace(/[^A-Za-z0-9]/g, "")
                .toUpperCase();
              setinputValue(e.target.value);
            }}
          />
          <Flex ml={4} gap={2} mt={1}>
            <span className={cls.subTitle}></span>
          </Flex>
        </Box>
        <Box width={`100%`}>
          <p className={cls.textFieldName}>{t("Марка машины")}</p>
          <TextField
            // rules={rules}
            errors={errors}
            name="marka"
            register={register}
            placeholder={t("Необъязательно")}
            type="text"
          />
          <Flex gap={2} mt={1}>
            <span className={cls.subLabel}>{t("Пример")}: </span>
            <p
              onClick={() =>
                setValue(`marka`, `Mercedes-Benz `, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className={cls.quickWord}
            >
              {t("Mercedes-Benz")},
            </p>
            <p
              onClick={() =>
                setValue(`marka`, `Volvo`, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className={cls.quickWord}
            >
              {t("Volvo")},
            </p>
            <p
              onClick={() =>
                setValue(`marka`, `MAN`, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className={cls.quickWord}
            >
              {t("MAN")},
            </p>
            <p
              onClick={() =>
                setValue(`marka`, `Iveco`, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className={cls.quickWord}
            >
              {t("Iveco")}
            </p>
          </Flex>
        </Box>
        <Box width={`100%`}>
          <p className={cls.textFieldName}>{t("Экологический класс")}</p>

          <Dropdown
            control={control}
            register={register}
            watch={watch}
            placeholder={t("Название")}
            name="eco_standart"
            options={euroTypeOptions}
            errors={errors}
            // required={t("Это поле обязательно")}
            width={"50%"}
            className={cls.dropdown}
            // searchName="cargo_type_search"
          />
          <Flex gap={`12px`} mt={1}>
            <span className={cls.subLabel}>{t(`Пример`)}: </span>
            <p
              onClick={() =>
                setValue(
                  "eco_standart",
                  {
                    label: `${t(`Евро`)}-4`,
                    value: "Евро-4",
                  },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
              className={cls.quickWord}
            >
              {t(`Евро`)}-4,
            </p>
            <p
              onClick={() =>
                setValue(
                  "eco_standart",
                  {
                    label: `${t(`Евро`)}-5`,
                    value: "Евро-5",
                  },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
              className={cls.quickWord}
            >
              {t(`Евро`)}-5
            </p>
            <p
              onClick={() =>
                setValue(
                  "eco_standart",
                  {
                    label: `${t(`Евро`)}-6`,
                    value: "Евро-6",
                  },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
              className={cls.quickWord}
            >
              {t(`Евро`)}-6
            </p>
          </Flex>
        </Box>
        <Box width={`100%`}>
          <p className={cls.textFieldName}>{t("Тип топлива")}</p>
          <Dropdown
            control={control}
            register={register}
            watch={watch}
            placeholder={t("Название")}
            name="fuel_id"
            options={fuel?.response?.map((item) => ({
              ...item,
              label: item[`name_${locale}`],
              value: item?.guid,
            }))}
            errors={errors}
            // required={t("Это поле обязательно")}
            width={"50%"}
            className={cls.dropdown}
            // searchName="cargo_type_search"
          />
          <Flex gap={`12px`} mt={1}>
            <span className={cls.subLabel}>{t(`Пример`)}: </span>
            <p
              onClick={() =>
                setValue(
                  "fuel_id",
                  {
                    label: t("Дизель"),
                    value: "187c327c-626d-4531-90f8-93408a011a7b",
                  },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
              className={cls.quickWord}
            >
              {t(`Дизель`)},
            </p>
            <p
              onClick={() =>
                setValue(
                  "fuel_id",
                  {
                    label: t("Бензин"),
                    value: "5f8a08e3-c934-4149-9565-26929111a6c6",
                  },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
              className={cls.quickWord}
            >
              {t(`Бензин`)},
            </p>
            <p
              onClick={() =>
                setValue(
                  "fuel_id",
                  {
                    label: t("Метан"),
                    value: "efaf36e8-0261-4a0a-92fb-975464dbf01e",
                  },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
              className={cls.quickWord}
            >
              {t(`Метан`)}
            </p>
          </Flex>
        </Box>
        <Box width={"100%"}>
          <p className={cls.textFieldName}>{t("Фото машины")}</p>
          <Flex gap={4} className={cls.ImgWrap}>
            <UploadImg
              watch={watch}
              setValue={setValue}
              name={"car_photo"}
              icon={<ImgUload2 />}
              text={t("Загрузить фото машины")}
              errors={errors}
              countries={countries}
              locale={locale}
            />
          </Flex>
        </Box>
        <Box marginBottom={`20px`} width={`100%`}>
          <p className={cls.textFieldName}>{t("Тип загрузки")}</p>
          <Box
            mt={"5px"}
            display="flex"
            rowGap={`20px`}
            flexDirection={`column`}
            columnGap="24px"
          >
            <Checkbox
              defaultChecked={watch(`top`)}
              register={register}
              name="top"
            >
              {t("Верхняя")}
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`side`)}
              register={register}
              name="side"
            >
              {t("Боковая")}
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`back`)}
              register={register}
              name="back"
            >
              {t("Задняя")}
            </Checkbox>
            <Checkbox
              defaultChecked={watch(`with_removal`)}
              register={register}
              name="with_removal"
            >
              {t("Со снятием стоек")}
            </Checkbox>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default CreateCars;
