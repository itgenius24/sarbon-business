"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Button,
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

export const SearchCargoModule = () => {
  const {
    t,
    setValue,
    register,
    watch,
    control,
    reset,
    errors,
    carTypeOptions,
    weightMeasurementOptions,
    packageOptions,
    handleSubmit,
    onSubmit,
    setIsPopupOpen,
    isPopupOpen,
    adrOptions,
    router,locale
  } = useSearchCargo();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return (
    <>
      <Container my="40px">
        <Heading
          size={isLargerThan845 ? "md" : "sm"}
          mb={isLargerThan845 ? "24px" : "12px"}
        >
          {t("Добавить машину")}
        </Heading>
        <Box className={cls.box}>
          <Flex
            alignItems={`flex-start`}
            width={`100%`}
            gap={"24px"}
            mt={"10px"}
          >
            <Box className={cls.left}>
              <Box width={"100%"}>
                <p className={cls.textFieldName}>Тип кузова *</p>
                <Dropdown
                  control={control}
                  required
                  register={register}
                  watch={watch}
                  placeholder={t("Выберите тип кузова")}
                  name="trailer_type_id"
                  options={carTypeOptions}
                  errors={errors}
                  width={"100%"}
                  className={cls.dropdown}
                  searchName="cargo_type_search"
                />

                <Flex gap={`12px`} mt={2}>
                  <span className={cls.subTitle}>Пример: </span>
                  <p
                    onClick={() =>
                      setValue("trailer_type_id", {
                        label: "Тентованный полуприцеп",
                        value: "caa172e3-4c30-4fdb-a6fd-e74c0c325d0a",
                      })
                    }
                    className={cls.quickWord}
                  >
                    Тентованный полуприцеп,
                  </p>
                  <p
                    onClick={() =>
                      setValue("trailer_type_id", {
                        label: "Рефрижератор",
                        value: "38221f2f-882c-4f15-8afe-632d20282e19",
                      })
                    }
                    className={cls.quickWord}
                  >
                    Рефрижератор
                  </p>
                </Flex>
              </Box>
            </Box>

            <Box className={cls.regit}>
              <Flex width={`100%`} gap={"24px"}>
                <Box>
                  <p className={cls.textFieldName}>Грузоподъёмность, т *</p>
                  <TextFieldWithAddition
                    className={cls.textField}
                    errors={errors}
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
                  <Flex ml={4} gap={`12px`} mt={2}>
                    <span className={cls.subTitle}>Пример: </span>
                    <p
                      onClick={() => setValue(`capacity`, `7`)}
                      className={cls.quickWord}
                    >
                      7т,
                    </p>
                    <p
                      onClick={() => setValue(`capacity`, `10`)}
                      className={cls.quickWord}
                    >
                      10т,
                    </p>
                    <p
                      onClick={() => setValue(`capacity`, `20`)}
                      className={cls.quickWord}
                    >
                      20т
                    </p>
                    <p
                      onClick={() => setValue(`capacity`, `22`)}
                      className={cls.quickWord}
                    >
                      22т
                    </p>
                  </Flex>
                </Box>
                <Box>
                  <p className={cls.textFieldName}>Объём кузова, м3 *</p>
                  <TextFieldWithAddition
                    className={cls.textField}
                    errors={errors}
                    control={control}
                    name="height"
                    register={register}
                    // width="160px"
                    placeholder={t("Объем")}
                    additionalItemTheme={`light`}
                    additionalItemPlaceholder="м³"
                    type="number"
                    // additionalItemName="volume_unit"
                    // additionalItemOptions={volumeMeasurementOptions}
                  />
                  <Flex ml={4} gap={`12px`} mt={2}>
                    <span className={cls.subTitle}>Пример: </span>
                    <p
                      onClick={() => setValue(`height`, `20`)}
                      className={cls.quickWord}
                    >
                      20м³,
                    </p>
                    <p
                      onClick={() => setValue(`height`, `40`)}
                      className={cls.quickWord}
                    >
                      40м³,
                    </p>
                    <p
                      onClick={() => setValue(`height`, `43`)}
                      className={cls.quickWord}
                    >
                      43м³
                    </p>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>

          <Flex gap={"10px"}>
            <Box width={`50%`} mt={`37px`}>
              <p className={cls.textFieldName}>Тип загрузки </p>
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

            <Flex gap={"24px"} mt={`32px`}>
              <Box>
                <p className={cls.textFieldName}>Госномер *</p>
                <TextField
                  register={register}
                  errors={errors}
                  name="car_number"
                  placeholder="Введите госномер грузовика..."
                  // rules={rules}
                />
                <Flex ml={4} gap={2} mt={2}>
                  <span className={cls.subTitle}></span>
                </Flex>
              </Box>
              <Box>
                <p className={cls.textFieldName}>Марка машины</p>
                <TextField
                  errors={errors}
                  name="marka"
                  register={register}
                  placeholder={t("Необъязательно")}
                  type="text"
                />
                <Flex ml={4} gap={2} mt={2}>
                  <span className={cls.subTitle}>Пример: </span>
                  <p
                    onClick={() => setValue(`marka`, `Mercedes-Benz `)}
                    className={cls.quickWord}
                  >
                    Mercedes,
                  </p>
                  <p
                    onClick={() => setValue(`marka`, `Volvo`)}
                    className={cls.quickWord}
                  >
                    Volvo,
                  </p>
                  <p
                    onClick={() => setValue(`marka`, `MAN`)}
                    className={cls.quickWord}
                  >
                    MAN,
                  </p>
                  <p
                    onClick={() => setValue(`marka`, `Iveco`)}
                    className={cls.quickWord}
                  >
                    Iveco,
                  </p>
                </Flex>
              </Box>
            </Flex>
          </Flex>

          <Flex gap={"24px"}>
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

            <Box width={`100%`} mt={`20px`}>
              <p className={cls.textFieldName}>{t("ADR")}</p>
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
              </Box>
            </Box>
          </Flex>

          <Flex
            alignItems={`flex-start`}
            width={`100%`}
            gap={"24px"}
            mt={"32px"}
          >
            <Box width={"100%"} mt={"17px"}>
              <p className={cls.textFieldName}>{t("Фото Техпаспорта *")}</p>
              <Flex gap={4} className={cls.ImgWrap}>
                <UploadImg
                  watch={watch}
                  setValue={setValue}
                  name={"front_side_trailer"}
                  icon={<ImgploadIcon1 />}
                  text={"Загрузить фото спереди"}
                />
                <UploadImg
                  watch={watch}
                  setValue={setValue}
                  name={"back_side_trailer"}
                  icon={<ImgploadIcon1 />}
                  text={"Загрузить фото сзади"}
                />
              </Flex>
            </Box>
            <Box width={"100%"} mt={"17px"}>
              <p className={cls.textFieldName}>{t("Фото Техпаспорта *")}</p>
              <Flex gap={4} className={cls.ImgWrap}>
                <UploadImg
                  watch={watch}
                  setValue={setValue}
                  name={"car_photo"}
                  icon={<ImgUload2 />}
                  text={"Загрузить фото машины"}
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Button
          // isDisabled={disabledBtn}
          onClick={handleSubmit(onSubmit)}
          // rightIcon={<NextArrowIcon />}
          className={cls.nextBtn}
        >
          Сохранить авто
        </Button>

        <Modal isOpen={isPopupOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <CheckModalIcon />
            </ModalHeader>
            <ModalCloseButton onClick={() => setIsPopupOpen(false)} />
            <ModalBody>
              <p style={{ fontWeight: 600, fontSize: "18px" }}>
                Машина успешно добавлена!
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
                Посмотреть детали
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
                Добавить еще
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
};
