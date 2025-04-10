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
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Checkbox } from "@/components/Checkbox";
import { TextField } from "@/components/TextField";
import { CheckModalIcon, CloseIconOutline, ImgploadIcon1, ImgUload2 } from "@/assets/icons/icons";
import { UploadImg } from "@/components/UploadImg";
import { countries } from "@/utils/country";
import { TextFieldWithAdditionCar } from "@/components/TextFieldWithAddition/TextFieldWithAdditionCar";
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
    loading,
    errors,
    carTypeOptions,
    handleSubmit,
    onSubmit,
    setIsPopupOpen,
    isPopupOpen,
    euroTypeOptions,
    fuels,
    router,
    isBtn,
    setinputValue,
    loadingFront,
    setLoadingFront,
    loadingBack,
    setLoadingBack,
    uploadAi,
  } = useSearchCargo();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const rules = {
    required: {
      value: true,
      message: t("Это поле обязательно"),
    },
  };

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
                        placeholder={t("Вес")}
                        additionalItemPlaceholder="т"
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
                        placeholder={t("Объем")}
                        additionalItemTheme={`light`}
                        additionalItemPlaceholder="м³"
                        type="number"
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
                <Flex width={`50%`} gap={"24px"}>
                  <Box width={`100%`}>
                    <p className={cls.textFieldName}>{t("Госномер")} *</p>
                    <TextField
                      register={register}
                      errors={errors}
                      name="car_number"
                      placeholder={t("Введите госномер...")}
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
                    <p className={cls.textFieldName}>
                      {t("Номер кузова (VIN)")}
                    </p>
                    <TextField
                      rules={rules}
                      errors={errors}
                      name="car_vin_number"
                      register={register}
                      placeholder={t("Необъязательно")}
                      type="text"
                    />
                  </Box>
                </Flex>
              </Flex>

              <Flex alignItems={`center`} mt={`10px`} gap={"56px"}>
                <Box width={`100%`}>
                  <p className={cls.textFieldName}>{t("Тип загрузки")}</p>
                  <Box
                    width={`100%`}
                    mt={`20px`}
                    display="flex"
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

                <Flex gap={"24px"} width={`100%`} mt={`20px`}>
                  <Box width={`50%`}>
                    <p className={cls.textFieldName}>{t("Экологический класс")}</p>

                    <Dropdown
                      control={control}
                      register={register}
                      watch={watch}
                      placeholder={t("Название")}
                      name="eco_standart"
                      options={euroTypeOptions}
                      errors={errors}
                      width={"50%"}
                      className={cls.dropdown}
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
                    <TextField
                      // rules={rules}
                      errors={errors}
                      name="fuel_type"
                      register={register}
                      placeholder={t("Название")}
                      type="text"
                    />
                  </Box>
                </Flex>
              </Flex>

              <Flex gap={"56px"} mt={`20px`}>
                <Box width={`50%`} mt={`15px`}>
                  <p className={cls.textFieldName}>{t("Дополнительно")}</p>
                  <Box
                    mt={"15px"}
                    display="flex"
                    columnGap="24px"
                    rowGap={`14px`}
                    flexWrap={`wrap`}
                  >
                    <Checkbox
                      defaultChecked={watch(`isTrilerImg`)}
                      register={register}
                      name="isTrilerImg"
                    >
                      {t("Техпаспорт прицепа")}
                    </Checkbox>
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
                      register={register}
                      rules={{ required: t("Это поле объязательно") }}
                      type={`tech_pass`}
                      isLoading={loadingFront}
                      setLoading={setLoadingFront}
                      uploadAi={uploadAi}
                    />
                    <UploadImg
                      watch={watch}
                      setValue={setValue}
                      name={"back_side_trailer"}
                      icon={<ImgploadIcon1 />}
                      text={t("Загрузить фото сзади")}
                      errors={errors}
                      register={register}
                      isLoading={loadingBack}
                      setLoading={setLoadingBack}
                      uploadAi={uploadAi}
                      type={`tech_pass`}
                      rules={{ required: t("Это поле объязательно") }}
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
              {watch(`isTrilerImg`) && (
                <Flex
                  alignItems={`flex-start`}
                  width={`50%`}
                  gap={"24px"}
                  mt={"32px"}
                >
                  <Box className={cls.ImgWrap_2} width={"50%"} mt={"17px"}>
                    <Flex
                      width={`100%`}
                      alignItems={`center`}
                      justifyContent={`space-between`}
                    >
                      <p className={cls.textFieldName}>
                        {t("Фото техпаспорта прицепа")}
                      </p>
                      <Box
                        cursor={`pointer`}
                        onClick={() => setValue(`isTrilerImg`, false)}
                      >
                        <CloseIconOutline />
                      </Box>
                    </Flex>
                    <Flex mt={`20px`} gap={4}>
                      <UploadImg
                        watch={watch}
                        setValue={setValue}
                        name={"front_side_trailer_1"}
                        icon={<ImgploadIcon1 />}
                        text={t("Загрузить фото спереди")}
                        errors={errors}
                        register={register}
                      />
                      <UploadImg
                        watch={watch}
                        setValue={setValue}
                        name={"back_side_trailer_1"}
                        icon={<ImgploadIcon1 />}
                        text={t("Загрузить фото сзади")}
                        errors={errors}
                        register={register}
                      />
                    </Flex>
                  </Box>
                </Flex>
              )}
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
          rules={rules}
        />
      )}
    </>
  );
};
