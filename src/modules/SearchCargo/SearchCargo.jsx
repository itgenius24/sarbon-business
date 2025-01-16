"use client";

import { Container } from "@/components/Container";
import { useTranslation } from "@/app/i18n/client";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import cls from "./style.module.scss";
import { useSearchCargo } from "./useSearchCargo";
import { Dropdown } from "@/components/Dropdown";
import { useForm } from "react-hook-form";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Checkbox } from "@/components/Checkbox";
import { TextField } from "@/components/TextField";
import {
  CheckModalIcon,
  ImgploadIcon1,
  ImgUload2,
  StepLinkIcon,
} from "@/assets/icons/icons";
import { UploadImg } from "@/components/UploadImg";
import { useState } from "react";
import { countries } from "@/utils/country";
import { TextFieldWithAdditionCar } from "@/components/TextFieldWithAddition/TextFieldWithAdditionCar";
import { ChakraSelect } from "@/components/ChakraSelect";
import { useGetLang } from "@/hooks/useGetLang";
import MobileComponent from "./component/MobileComponent/MobileComponent";

export const SearchCargoModule = () => {
  const locale = useGetLang();
  const { t } = useTranslation(locale);
  const {
    setValue,
    register,
    watch,
    control,
    reset,
    loading,
    errors,
    carTypeOptions,
    weightMeasurementOptions,
    packageOptions,
    handleSubmit,
    onSubmit,
    setIsPopupOpen,
    isPopupOpen,
    adrOptions,
    euroTypeOptions,
    fuels,
    router,
    isBtn,
    setError,
    setinputValue,
    getValues,
  } = useSearchCargo();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const rules = {
    required: {
      value: true,
      message: t("Это поле обязательно"),
    },
  };

  console.log(`isLargerThan845`, isLargerThan845);

  return (
    <>
      <Container my={isLargerThan845 ? "24px" : "24px"}>
        <Heading
          size={isLargerThan845 ? "md" : "sm"}
          mb={isLargerThan845 ? "24px" : "12px"}
          // color={`var(--primary-text)`}
          // fontSize={isLargerThan845 ? "" : "20px"}
        >
          {t("Добавить машину")}
        </Heading>
        {isLargerThan845 && (
          <>
            <Box className={cls.box}>
              <Flex
                alignItems={`flex-start`}
                width={`100%`}
                gap={"56px"}
                mt={"10px"}
              >
                <Box width={`50%`} className={cls.left}>
                  <Box width={"100%"}>
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

                    <Flex gap={`12px`} mt={1}>
                      <span className={cls.subTitle}>{t(`Пример`)}: </span>
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
                        {t(`Тентованный полуприцеп`)},
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
                        {t(`Рефрижератор`)}
                      </p>
                    </Flex>
                  </Box>
                </Box>

                <Box width={`50%`} className={cls.regit}>
                  <Flex width={`100%`} gap={"24px"}>
                    <Box width={`100%`}>
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
                  </Flex>
                </Box>
              </Flex>

              <Flex gap={"56px"} mt={`27px`}>
                <Box width={`50%`}>
                  <Flex width={`100%`} gap={"24px"}>
                    <Box width={`100%`}>
                      <p className={cls.textFieldName}>
                        {t("Грузоподъёмность, т")} *
                      </p>
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
                        // width="160px"
                        placeholder={t("Вес")}
                        additionalItemPlaceholder="т"
                        // additionalItemOptions={weightMeasurementOptions}
                        type="number"
                        zIndex={90}
                      />
                      <Flex gap={`12px`} mt={1}>
                        <span className={cls.subTitle}>{t("Пример")}: </span>
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
                      <p className={cls.textFieldName}>
                        {t("Объём кузова, м3")} *
                      </p>
                      <TextFieldWithAddition
                        className={cls.textField}
                        errors={errors}
                        control={control}
                        name="height"
                        register={register}
                        rules={{
                          required: t("Это поле обязательно"),
                        }}
                        // width="160px"
                        placeholder={t("Объем")}
                        additionalItemTheme={`light`}
                        additionalItemPlaceholder="м³"
                        type="number"
                        // additionalItemName="volume_unit"
                        // additionalItemOptions={volumeMeasurementOptions}
                      />
                      <Flex gap={`12px`} mt={1}>
                        <span className={cls.subTitle}>{t("Пример")}: </span>
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
                </Box>
                <Box width={`50%`}>
                  <p className={cls.textFieldName}>{t("Марка машины")}</p>
                  <TextField
                    rules={rules}
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
              </Flex>

              <Flex mt={`10px`} gap={"56px"}>
                <Box width={`100%`} mt={`20px`}>
                  <p className={cls.textFieldName}>{t("Требования")}</p>
                  <Box mt={"15px"} display="flex" columnGap="24px" flexGrow={1}>
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

                <Flex gap={"24px"} width={`100%`} mt={`20px`}>
                  <Box width={`50%`}>
                    <p className={cls.textFieldName}>{t("Euro type")}</p>

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
                  <Box width={`50%`}>
                    <p className={cls.textFieldName}>{t("Тип топлива")}</p>
                    <Dropdown
                      control={control}
                      register={register}
                      watch={watch}
                      placeholder={t("Название")}
                      name="fuel_id"
                      options={fuels?.map((item) => ({
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
                      <span className={cls.subTitle}>{t(`Пример`)}: </span>
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

                  {/* <p className={cls.textFieldName}>{t("ADR")}</p>
              <Box display="flex" columnGap="22px" alignItems={"center"}>
                <Box width={"100px"}>
                  <Dropdown
                    control={control}
                    required
                    register={register}
                    watch={watch}
                    placeholder={t("Выберите ARD")}
                    name="adr"
                    options={adrOptions}
                    errors={errors}
                    width={"100%"}
                    className={cls.dropdown}
                    searchName="cargo_type_search"
                  />
                </Box>
                <p className={cls.link}>
                  Класс{" "}
                  <a href="https://ru.wikipedia.org/wiki/%D0%95%D0%B2%D1%80%D0%BE%D0%BF%D0%B5%D0%B9%D1%81%D0%BA%D0%BE%D0%B5_%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BE_%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%D0%BD%D0%B0%D1%80%D0%BE%D0%B4%D0%BD%D0%BE%D0%B9_%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D0%BE%D0%B9_%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B7%D0%BA%D0%B5_%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D1%8B%D1%85_%D0%B3%D1%80%D1%83%D0%B7%D0%BE%D0%B2">
                    {" "}
                    опасности груза
                  </a>{" "}
                  <StepLinkIcon />
                </p>
              </Box> */}
                </Flex>
              </Flex>

              <Flex gap={"56px"} mt={`20px`}>
                <Box width={`50%`}>
                  <p className={cls.textFieldName}>{t("Тип загрузки")}</p>
                  <Box mt={"15px"} display="flex" columnGap="24px" flexGrow={1}>
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
                <Flex gap={"24px"} width={`50%`} mt={`20px`}></Flex>
              </Flex>

              <Flex
                alignItems={`flex-start`}
                width={`100%`}
                gap={"24px"}
                mt={"32px"}
              >
                <Box width={"100%"} mt={"17px"}>
                  <p className={cls.textFieldName}>{t("Фото Техпаспорта")} *</p>
                  <Flex gap={4} className={cls.ImgWrap}>
                    <UploadImg
                      watch={watch}
                      setValue={setValue}
                      name={"front_side_trailer"}
                      icon={<ImgploadIcon1 />}
                      text={t("Загрузить фото спереди")}
                      errors={errors}
                    />
                    <UploadImg
                      watch={watch}
                      setValue={setValue}
                      name={"back_side_trailer"}
                      icon={<ImgploadIcon1 />}
                      text={t("Загрузить фото сзади")}
                      errors={errors}
                    />
                  </Flex>
                </Box>
                <Box width={"100%"} mt={"17px"}>
                  <p className={cls.textFieldName}>{t("Фото машины")} *</p>
                  <Flex gap={4} className={cls.ImgWrap}>
                    <UploadImg
                      watch={watch}
                      setValue={setValue}
                      name={"car_photo"}
                      icon={<ImgUload2 />}
                      text={t("Загрузить фото машины")}
                      errors={errors}
                      setinputValue={setinputValue}
                      countries={countries}
                      locale={locale}
                    />
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Button
              isLoading={loading}
              isDisabled={isBtn}
              onClick={handleSubmit(onSubmit)}
              className={cls.nextBtn}
            >
              {t("Сохранить авто")}
            </Button>
          </>
        )}

        {isLargerThan845 ? (
          <Modal isOpen={isPopupOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <CheckModalIcon />
              </ModalHeader>
              <ModalCloseButton onClick={() => setIsPopupOpen(false)} />
              <ModalBody>
                <p style={{ fontWeight: 600, fontSize: "18px" }}>
                  {t("Машина успешно добавлена!")}
                </p>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => router.push(`/${locale}/my-cars`)}
                  style={{
                    background: "white",
                    border: "1px solid rgba(208, 213, 221, 1)",
                    color: "black",
                  }}
                  className={cls.btnOutline}
                  mr={3}
                >
                  {t("Посмотреть детали")}
                </Button>
                <Button
                  style={{
                    background: "white",
                    border: "1px solid rgba(208, 213, 221, 1)",
                    color: "black",
                  }}
                  className={cls.btngreen}
                  onClick={() => setIsPopupOpen(false)}
                >
                  {t("Добавить еще")}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ) : (
          <Drawer placement="bottom" isOpen={isPopupOpen}>
            <DrawerOverlay />
            <DrawerContent borderRadius="12px 12px 0 0">
              <DrawerHeader>
                <CheckModalIcon />
              </DrawerHeader>
              <DrawerCloseButton
                top={`15px`}
                onClick={() => setIsPopupOpen(false)}
              />
              <DrawerBody>
                <p style={{ fontWeight: 600, fontSize: "18px" }}>
                  {t("Машина успешно добавлена!")}
                </p>
              </DrawerBody>
              <DrawerFooter mb={`20px`}>
                <Flex width={`100%`} rowGap={`10px`} flexDirection={`column`}>
                  <Button
                    onClick={() => router.push(`/${locale}/my-cars`)}
                    style={{
                      width: `100%`,
                      background: "var(--primary-text)",
                      border: "1px solid rgba(208, 213, 221, 1)",
                      color: "white",
                    }}
                    className={cls.btnOutline}
                    mr={3}
                  >
                    {t("Посмотреть детали")}
                  </Button>
                  <Button
                    style={{
                      width: `100%`,
                      background: "white",
                      border: "1px solid rgba(208, 213, 221, 1)",
                      color: "black",
                    }}
                    className={cls.btngreen}
                    onClick={() => setIsPopupOpen(false)}
                  >
                    {t("Добавить еще")}
                  </Button>
                </Flex>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </Container>
      {!isLargerThan845 && (
        <MobileComponent
          cls={cls}
          setValue={setValue}
          t={t}
          control={control}
          register={register}
          watch={watch}
          carTypeOptions={carTypeOptions}
          errors={errors}
          fuels={fuels}
          euroTypeOptions={euroTypeOptions}
          loading={loading}
          isBtn={isBtn}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setinputValue={setinputValue}
          locale={locale}
          countries={countries}
        />
      )}
    </>
  );
};
