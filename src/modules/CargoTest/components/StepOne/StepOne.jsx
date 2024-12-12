import React, { useState } from "react";
import cls from "./style.module.scss";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import {
  CloseStepIcon,
  DeleteIcon,
  LoadStepIcon,
  NextArrowIcon,
  PlusIcon,
  UploadCloudBlueIcon,
  UploadCloudIcon,
} from "@/assets/icons/icons";
import useStepOneProps from "./useStepOneProps";
import { Dropdown } from "@/components/Dropdown";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "react-i18next";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import Image from "next/image";

const StepOne = ({ status }) => {
  const {
    control,
    errors,
    register,
    setValue,
    watch,
    setSearchCargo,
    isPackagingAndQuantity,
    isDimensionsAndDiameter,
    isFileUploader,
    handleIsFileUploader,
    handleDimensionsAndDiameter,
    handlePackagingAndQuantity,
    weightMeasurementOptions,
    optionCargoType,
    packageOptions,
    canEdit,
    imageLoader,
    disabledBtn,
    handleImageUpload,
    onSubmit,
  } = useStepOneProps();

  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");

  return (
    <Box className={cls.containerCards}>
      <Box className={cls.step1}>
        <Flex width={"100%"} gap={"13px"}>
          <Box className={cls.logoWrap}>
            <LoadStepIcon />
          </Box>
          <Box width={"100%"}>
            <Flex gap={"14px"}>
              <Box className={cls.logoWrapMobile}>
                <LoadStepIcon />
              </Box>
              <p className={cls.stepTitle}>Ваш груз</p>
            </Flex>

            <Flex className={cls.inputWrap} gap={"24px"} mt={"10px"}>
              <Box width={`100%`}>
                <p className={cls.textFieldName}></p>
                <Dropdown
                  control={control}
                  required
                  register={register}
                  watch={watch}
                  name="cargo_type"
                  options={optionCargoType}
                  errors={errors}
                  disabled={!canEdit}
                  className={cls.dropdown}
                  onSearchChange={(e) => setSearchCargo(e.target.value)}
                  placeholder={t("Выберите тип груза")}
                  inputPlaceholder={t("Выберите тип груза")}
                  searchable
                  searchName="cargo_type_search"
                  setValue={setValue}
                />
                {canEdit && (
                  <Flex gap={2} mt={2}>
                    <span className={cls.subTitle}>Например: </span>
                    <p
                      onClick={() => {
                        setValue(`cargo_type_search`, "Пиломатериалы");
                        setValue(`cargo_type`, {
                          label: "Пиломатериалы",
                          value: "1a9ffa9a-6472-4d76-a07a-d7db8e7acb15",
                        });
                      }}
                      className={cls.quickWord}
                    >
                      Пиломатериалы,
                    </p>
                    <p
                      onClick={() => {
                        setValue(`cargo_type_search`, "ДСП");

                        setValue(`cargo_type`, {
                          label: "ДСП",
                          value: "b059f178-1cc2-4867-a9c2-81f483e3fe39",
                        });
                      }}
                      className={cls.quickWord}
                    >
                      ДСП,
                    </p>
                    <p o className={cls.quickWord}>
                      Овощи и фрукты
                    </p>
                  </Flex>
                )}
              </Box>
              <Flex gap={"14px"} className={cls.rightContend} width={`100%`}>
                <Box>
                  <p className={cls.textFieldName}>В расчёте на одну машину</p>
                  <TextFieldWithAddition
                    className={cls.textField2}
                    errors={errors}
                    control={control}
                    name="weight_measurement"
                    register={register}
                    additionalItemName="weight_unit"
                    width="160px"
                    placeholder={t("Вес")}
                    additionalItemPlaceholder="T"
                    additionalItemOptions={weightMeasurementOptions}
                    disabled={!canEdit}
                    type="number"
                    zIndex={90}
                  />
                  {canEdit && (
                    <Flex ml={4} gap={2} mt={2}>
                      <p
                        onClick={() => setValue(`weight_measurement`, `20`)}
                        className={cls.quickWord}
                      >
                        20т,
                      </p>
                      <p
                        onClick={() => setValue(`weight_measurement`, `22`)}
                        className={cls.quickWord}
                      >
                        22т,
                      </p>
                      <p
                        onClick={() => setValue(`weight_measurement`, `23`)}
                        className={cls.quickWord}
                      >
                        23т
                      </p>
                    </Flex>
                  )}
                </Box>
                <Box>
                  <p className={cls.textFieldName}></p>
                  <TextFieldWithAddition
                    className={cls.textField2}
                    errors={errors}
                    control={control}
                    name="volume_measurement"
                    register={register}
                    width="160px"
                    placeholder={t("Объем")}
                    additionalItemPlaceholder="m³"
                    disabled={!canEdit}
                    type="number"
                  />
                  {canEdit && (
                    <Flex ml={4} gap={2} mt={2}>
                      <p
                        onClick={() => setValue(`volume_measurement`, `40`)}
                        className={cls.quickWord}
                      >
                        40м³,
                      </p>
                      <p
                        onClick={() => setValue(`volume_measurement`, `42`)}
                        className={cls.quickWord}
                      >
                        42м³,
                      </p>
                      <p
                        onClick={() => setValue(`volume_measurement`, `43`)}
                        className={cls.quickWord}
                      >
                        43м³
                      </p>
                    </Flex>
                  )}
                </Box>
              </Flex>
            </Flex>

            {canEdit && (
              <Flex className={cls.plusWrap} mt={"30px"} gap={2}>
                {!isPackagingAndQuantity && (
                  <Button
                    className={cls.button}
                    isDisabled={!canEdit}
                    key="packagingBtn"
                    leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                    variant="reset"
                    onClick={handlePackagingAndQuantity}
                    color="rgba(126, 123, 134, 1)"
                    fontWeight={400}
                  >
                    {t("Упаковка")}
                  </Button>
                )}

                {!isDimensionsAndDiameter && (
                  <Button
                    className={cls.button}
                    isDisabled={!canEdit}
                    key="dimensionsBtn"
                    leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                    variant="reset"
                    onClick={handleDimensionsAndDiameter}
                    color="rgba(126, 123, 134, 1)"
                    fontWeight={400}
                  >
                    {t("Габариты и диаметр")}
                  </Button>
                )}
                {!isFileUploader && (
                  <Button
                    className={cls.button}
                    isDisabled={!canEdit}
                    key="dimensionsBtn2"
                    leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                    variant="reset"
                    onClick={handleIsFileUploader}
                    color="rgba(126, 123, 134, 1)"
                    fontWeight={400}
                  >
                    {t("Фото груза")}
                  </Button>
                )}
              </Flex>
            )}

            {isPackagingAndQuantity && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="packagingBtn"
              >
                <Box>
                  <p className={cls.stepTitle2}>{t("Упаковка")}</p>
                  <Box
                    className={cls.fields}
                    display="flex"
                    columnGap="24px"
                    maxW="540px"
                    width="100%"
                    flexWrap={`wrap`}
                  >
                    <Dropdown
                      errors={errors}
                      searchable
                      control={control}
                      register={register}
                      watch={watch}
                      setValue={setValue}
                      name="packaging"
                      options={packageOptions}
                      placeholder={t("Выберите")}
                      disabled={!canEdit}
                    />
                    <TextFieldWithAddition
                      control={control}
                      errors={errors}
                      name="packaging_quantity"
                      register={register}
                      width="196px"
                      placeholder={t("Кол-во")}
                      additionalItemPlaceholder={t("шт.")}
                      disabled={!canEdit}
                    />
                  </Box>
                </Box>
                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handlePackagingAndQuantity} // Toggles the packaging section
                  variant={"outline"}
                />
              </Box>
            )}

            {isDimensionsAndDiameter && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="dimensionsBtn"
              >
                <Box>
                  <p className={cls.stepTitle2}>{t("Габариты и диаметр")}</p>
                  <Box
                    className={cls.fields}
                    display="flex"
                    columnGap="16px"
                    maxW="740px"
                    width="100%"
                  >
                    <TextFieldWithAddition
                      control={control}
                      name="length"
                      register={register}
                      width="153px"
                      placeholder={t("Длина")}
                      additionalItemPlaceholder={t("м")}
                      disabled={!canEdit}
                    />
                    <TextFieldWithAddition
                      control={control}
                      name="width"
                      register={register}
                      width="153px"
                      placeholder={t("Ширина")}
                      additionalItemPlaceholder={t("м")}
                      disabled={!canEdit}
                    />
                    <TextFieldWithAddition
                      control={control}
                      name="height"
                      register={register}
                      width="153px"
                      placeholder={t("Высота")}
                      additionalItemPlaceholder={t("м")}
                      disabled={!canEdit}
                    />
                  </Box>
                </Box>
                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleDimensionsAndDiameter} // Toggles the dimensions section
                  variant={"outline"}
                />
              </Box>
            )}

            {isFileUploader && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="dimensionsBtn2"
              >
                <p className={cls.stepTitle2}>
                  {t("Прикрепить фото")} <br />{" "}
                  <span>Фото груза или документа до 10 МБ.</span>
                </p>
                <Box
                  className={cls.fields}
                  display="flex"
                  columnGap="24px"
                  maxW="540px"
                  width="100%"
                >
                  {watch("image") ? (
                    <Box
                      display="flex"
                      position="relative"
                      alignItems="center"
                      justifyContent="center"
                      ml="auto"
                      maxWidth={"540px"}
                      width="100%"
                      height="150px"
                      borderRadius="12px"
                      border="1px solid"
                      borderColor="brand.200"
                      padding="16px 24px"
                    >
                      <Image
                        loader={imageLoader}
                        className={cls.img}
                        src={watch("image")}
                        alt="cargo"
                        width={150}
                        height={150}
                      />
                      <Button
                        onClick={() => {
                          setValue("image", null);
                        }}
                        position="absolute"
                        top="10px"
                        left="10px"
                        variant="reset"
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      padding="16px 24px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mt="24px"
                      border="1px dashed var(--quat_grey, rgba(219, 216, 227, 1))"
                      borderRadius="8px"
                      background={"rgba(16, 24, 40, 0.05)"}
                      as="label"
                      ml="auto"
                      width="100%"
                      cursor={"pointer"}
                    >
                      <input
                        className="visually-hidden"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageUpload(e);
                        }}
                      />
                      <Box>
                        <Box
                          mx="auto"
                          mb="12px"
                          width="40px"
                          height="40px"
                          p="10px"
                          borderRadius="8px"
                        >
                          <UploadCloudBlueIcon />
                        </Box>
                        <Box
                          fontSize={"14px"}
                          fontWeight={400}
                          color="rgba(126, 123, 134, 1)"
                          textAlign="center"
                        >
                          {t(`Загрузите или перетащите изображения сюда`)}
                        </Box>
                      </Box>
                    </Box>
                  )}
                  {/* </Box> */}
                </Box>
                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleIsFileUploader} // Toggles the packaging section
                  variant={"outline"}
                />
              </Box>
            )}
          </Box>
        </Flex>
      </Box>

      {!status && (
        <Button
          isDisabled={disabledBtn}
          onClick={() => onSubmit()}
          rightIcon={<NextArrowIcon />}
          className={cls.nextBtn}
        >
          Далее
        </Button>
      )}
    </Box>
  );
};

export default StepOne;
