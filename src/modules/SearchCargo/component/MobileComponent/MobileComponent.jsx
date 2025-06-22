import {
  CloseIconOutline,
  ImgploadIcon1,
  ImgUload2,
} from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";
import { Dropdown } from "@/components/Dropdown";
import { TextField } from "@/components/TextField";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { TextFieldWithAdditionCar } from "@/components/TextFieldWithAddition/TextFieldWithAdditionCar";
import { UploadImgMobile } from "@/components/UploadImgMobile";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import React from "react";

const MobileComponent = ({
  cls,
  setValue,
  control,
  t,
  register,
  watch,
  carTypeOptions,
  errors,
  setinputValue,
  countries,
  euroTypeOptions,
  locale,
  loading,
  isBtn,
  handleSubmit,
  onSubmit,
  rules,
  clearErrors,
  uploadAi,
  setLoadingFront,
  setLoadingBack,
  loadingBack,
  loadingFront,
  uploadAiFront,
}) => {
  return (
    <>
      <Flex
        width={"100%"}
        background={"white"}
        padding={`10px 10px`}
        mt={`10px`}
        flexDirection={`column`}
      >
        <Box
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          // className={cls.ImgWrap}
          width={"100%"}
        >
          <Flex mt={`10px`} gap={4} flexDirection={`column`}>
            <UploadImgMobile
              watch={watch}
              setValue={setValue}
              name={"front_side_trailer"}
              icon={<ImgploadIcon1 />}
              text={`${t("Загрузить фото спереди")} *`}
              register={register}
              errors={errors}
              rules={{ required: t("Это поле объязательно") }}
              setLoading={setLoadingFront}
              isLoading={loadingFront}
              uploadAi={uploadAiFront}
              type={`tech_pass`}
              clearErrors={clearErrors}
              isCrop
            />
            <UploadImgMobile
              watch={watch}
              setValue={setValue}
              name={"back_side_trailer"}
              icon={<ImgploadIcon1 />}
              text={`${t("Загрузить фото сзади")} *`}
              register={register}
              errors={errors}
              rules={{ required: t("Это поле объязательно") }}
              uploadAi={uploadAi}
              setLoading={setLoadingBack}
              isLoading={loadingBack}
              type={`tech_pass`}
              clearErrors={clearErrors}
              isCrop
            />
          </Flex>
        </Box>

        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          width={`100%`}
        >
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
          />
          <Flex gap={`12px`} mt={1}>
            <span className={cls.subTitle}>{t(`Пример`)}: </span>
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
        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          width={"100%"}
        >
          <p className={cls.textFieldName}>{t("Тип кузова")} *</p>
          <Dropdown
            control={control}
            register={register}
            watch={watch}
            placeholder={t("Выберите тип кузова")}
            name="trailer_type_id"
            options={carTypeOptions}
            errors={errors}
            // error={t}

            required={t("Это поле обязательно")}
            width={"100%"}
            className={cls.dropdown}
            searchName="cargo_type_search"
          />

          <Flex className={cls.primerWrap} gap={`12px`} mt={1}>
            <span className={cls.subTitle}>Пример: </span>
            <p
              onClick={() =>
                setValue(
                  "trailer_type_id",
                  {
                    label: "Тентованный полуприцеп",
                    value: "caa172e3-4c30-4fdb-a6fd-e74c0c325d0a",
                  },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
              className={cls.quickWord}
            >
              Тентованный полуприцеп,
            </p>
            <p
              onClick={() =>
                setValue(
                  "trailer_type_id",
                  {
                    label: "Рефрижератор",
                    value: "38221f2f-882c-4f15-8afe-632d20282e19",
                  },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
              className={cls.quickWord}
            >
              Рефрижератор
            </p>
          </Flex>
        </Box>
        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          width={`100%`}
        >
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
        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          width={`100%`}
        >
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
            <span className={cls.subTitle}>{t("Пример")}: </span>
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
        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          width={`100%`}
        >
          <p className={cls.textFieldName}>{t("Номер кузова (VIN)")}</p>
          <TextField
            // rules={rules}
            errors={errors}
            name="car_vin_code"
            register={register}
            placeholder={t("Необъязательно")}
            type="text"
          />
        </Box>
        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          width={`100%`}
        >
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
            <span className={cls.subTitle}>{t(`Пример`)}: </span>
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
        <Flex
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          className={cls.inputWrap}
          width={`100%`}
          gap={"24px"}
        >
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
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          width={`100%`}
        >
          <p className={cls.textFieldName}>{t("Тип топлива")}</p>
          <TextField
            // rules={rules}
            errors={errors}
            name="fuel_type"
            register={register}
            placeholder={t("Необъязательно")}
            type="text"
          />
        </Box>

        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          width={`100%`}
        >
          <Accordion allowMultiple>
            <AccordionItem border={`none`}>
              <AccordionButton
                justifyContent="space-between"
                alignItems={`center`}
                p={0}
                _hover={{ backgroundColor: `white` }}
                width={`100%`}
              >
                <p className={cls.textFieldName2}>{t("Тип загрузки")}</p>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel p={0}>
                <Box
                  mt={"20px"}
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
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          width={`100%`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
        >
          <Accordion allowMultiple>
            <AccordionItem border={`none`}>
              <AccordionButton
                justifyContent="space-between"
                alignItems={`center`}
                p={0}
                _hover={{ backgroundColor: `white` }}
                width={`100%`}
              >
                <p className={cls.textFieldName2}>{t("Дополнительно")}</p>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel p={0}>
                <Box
                  mt={"20px"}
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
                    defaultChecked={watch(`isTrilerImg`)}
                    register={register}
                    name="isTrilerImg"
                  >
                    {t("Техпаспорт прицепа")}
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
                {watch(`isTrilerImg`) && (
                  <Box
                    marginTop={`20px`}
                    paddingTop={`25px`}
                    borderTop={`1px solid rgba(219, 216, 227, 1)`}
                  >
                    <Flex
                      width={`100%`}
                      justifyContent={`space-between`}
                      alignContent={`center`}
                      marginBottom={`12px`}
                    >
                      <p className={cls.textFieldName2}>
                        {t("Фото техпаспорта прицепа")}
                      </p>
                      <Box
                        onClick={() => setValue(`isTrilerImg`, false)}
                        cursor={`pointer`}
                      >
                        <CloseIconOutline />
                      </Box>
                    </Flex>

                    <Flex mt={`10px`} gap={4} flexDirection={`column`}>
                      <UploadImgMobile
                        watch={watch}
                        setValue={setValue}
                        name={"front_side_trailer_1"}
                        icon={<ImgploadIcon1 />}
                        text={t("Фото техпаспорта спереди")}
                        register={register}
                        errors={errors}
                        rules={{ required: t("Это поле объязательно") }}
                      />
                      <UploadImgMobile
                        watch={watch}
                        setValue={setValue}
                        name={"back_side_trailer_1"}
                        icon={<ImgploadIcon1 />}
                        text={t("Фото техпаспорта сзади")}
                        register={register}
                        errors={errors}
                        rules={{ required: t("Это поле объязательно") }}
                      />
                    </Flex>
                  </Box>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Box mt={`25px`} paddingBottom={`25px`} width={"100%"}>
          <p className={cls.textFieldName}>{t("Фото машины")}</p>
          <Flex gap={4}>
            <UploadImgMobile
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
      </Flex>
      <Flex className={cls.wrapBtn}>
        <Button
          isLoading={loading}
          isDisabled={isBtn}
          onClick={handleSubmit(onSubmit)}
          className={cls.nextBtn}
        >
          {t("Сохранить авто")}
        </Button>
      </Flex>
    </>
  );
};

export default MobileComponent;
