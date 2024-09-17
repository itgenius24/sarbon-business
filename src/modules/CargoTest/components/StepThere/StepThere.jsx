import React, { useState } from "react";
import cls from "./style.module.scss";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import {
  CarStaepIcon,
  CloseStepIcon,
  DeleteIcon,
  FurStepIcon,
  LoadStepIcon,
  NextArrowIcon,
  PlusIcon,
  StepLinkIcon,
  UploadCloudBlueIcon,
  UploadCloudIcon,
} from "@/assets/icons/icons";

import { Dropdown } from "@/components/Dropdown";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "react-i18next";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import Image from "next/image";
import useStepThereProps from "./useSteThereProps";
import { TextField } from "@/components/TextField";
import { Checkbox } from "@/components/Checkbox";

const StepThere = ({ setCargoIndex }) => {
  const {
    control,
    setValue,
    isRequirementOpen,
    isAccessOpen,
    isBeltsOpen,
    isLiftingCapacityOpen,
    carTypeOptions,
    register,
    handleOpenRequirement,
    handleCloseRequirement,
    handleOpenAccess,
    handleCloseAccess,
    handleOpenBelts,
    handleCloseBelts,
    handleOpenLiftingCapacity,
    handleCloseLiftingCapacity,
    errors,
    canEdit,
    handleCheckboxChange,
    isEditing,
    watch,
    setHoverIndex,
    hoverIndex,
    clickIndex,
    boxes,
    onMouseLeave,
    onMouseEnter,
    handleNumClick
  } = useStepThereProps();

  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");


  return (
    <>
      <Box className={cls.step1}>
        <Flex width={"100%"} gap={"13px"}>
          <CarStaepIcon />
          <Box width={"100%"}>
            <Flex width={"100%"}>
              <Box width={"100%"}>
                <p className={cls.stepTitle}>Машина</p>
                <Flex gap={"24px"} mt={"10px"}>
                  <Box width={"90%"}>
                  {
                    console.log("car_type",carTypeOptions,1)
                  }
                    <Dropdown
                      control={control}
                      required
                      register={register}
                      watch={watch}
                      placeholder={t("Транспорт")}
                      name="car_type"
                      options={carTypeOptions}
                      errors={errors}
                      width={"300px"}
                      // disabled={!canEdit}
                      className={cls.dropdown}
                      // placeholder={t("Выберите тип груза")}
                      // inputPlaceholder={t("Выберите тип груза")}
                      // searchable
                      searchName="cargo_type_search"
                      // setValue={setValue}
                    />
                    <Flex gap={2} mt={2}>
                      <span className={cls.subTitle}>Частые:: </span>
                      <p
                        onClick={() =>
                          setValue("car_type", {
                            label: "Тентованный полуприцеп",
                            value: "3be76fbd-ec69-42c6-ac16-23a9ab454826",
                          })
                        }
                        className={cls.quickWord}
                      >
                        Тентованный полуприцеп,
                      </p>
                      <p
                        onClick={() =>
                          setValue("car_type", {
                            label: "Рефрижератор",
                            value: "c16ddeb4-2d7c-47b6-a82e-d8ba567128e8",
                          })
                        }
                        className={cls.quickWord}
                      >
                        Рефрижератор
                      </p>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
              <Box width={"100%"}>
                <p className={cls.stepTitle}>Количество машин</p>
                <Flex gap={"24px"} mt={"10px"} alignItems={"center"}>
                  <Box width={"80px"}>
                    <TextField
                      disabled={!canEdit}
                      register={register}
                      type="number"
                      errors={errors}
                      name="transport_count"
                      placeholder={t("15")}
                    />
                  </Box>
                  <Flex alignItems={"center"}>
                    {boxes.map((item, index) => (
                      <Box
                        paddingRight={2}
                        cursor={"pointer"}
                        key={index}
                        onMouseLeave={onMouseLeave}
                        onMouseEnter={() => onMouseEnter(item)}
                        onClick={() => handleNumClick(item)}
                      >
                        <FurStepIcon
                          num={watch("transport_count") > 10 ? item === 10 ?  '10+' : item : item}
                          color={
                            item <= hoverIndex
                              ? "rgba(0, 122, 255, 1)"
                              : item <= clickIndex ? 'rgba(0, 122, 255, 1)':  "#B2B0B6"
                          }
                        />
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            <Flex mt="30px" gap={2}>
              {!isAccessOpen && (
                <Button
                  key="packagingBtn1"
                  leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                  variant="reset"
                  onClick={handleOpenAccess}
                  color="rgba(126, 123, 134, 1)"
                  fontWeight={400}
                >
                  {t("FTL/LTL")}
                </Button>
              )}
              {!isRequirementOpen && (
                <Button
                  key="packagingBtn2"
                  leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                  variant="reset"
                  onClick={handleOpenRequirement}
                  color="rgba(126, 123, 134, 1)"
                  fontWeight={400}
                >
                  {t("TIR, CMR, T1, Медкнижка")}
                </Button>
              )}
              {!isBeltsOpen && (
                <Button
                  key="packagingBtn3"
                  leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                  variant="reset"
                  onClick={handleOpenBelts}
                  color="rgba(126, 123, 134, 1)"
                  fontWeight={400}
                >
                  {t("Ремней (шт)")}
                </Button>
              )}
            </Flex>
            {isAccessOpen && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="packagingBtn1"
              >
                <Box>
                  <p className={cls.stepTitle2}>{t("Тип загрузки")}</p>
                  <Box display="flex" columnGap="10px" flexGrow={1}>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="tir"
                    >
                      {t("Верхняя")}
                    </Checkbox>
                    <Checkbox disabled={!canEdit} register={register} name="t1">
                      {t("Боковая")}
                    </Checkbox>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="cmr"
                    >
                      {t("Задняя")}
                    </Checkbox>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="medic_certificate"
                    >
                      {t("Со снятием стоек")}
                    </Checkbox>
                  </Box>
                </Box>

                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleCloseAccess} // Toggles the packaging section
                  variant={"outline"}
                />
              </Box>
            )}
            {isRequirementOpen && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="packagingBtn2"
              >
                <Box>
                  <p className={cls.stepTitle2}>{t("Требования")}</p>
                  <Box display="flex" columnGap="10px" flexGrow={1}>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="hitch"
                    >
                      {t("Сцепка")}
                    </Checkbox>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="pneumatic"
                    >
                      {t("Пневмоход")}
                    </Checkbox>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="bunks"
                    >
                      {t("Коники")}
                    </Checkbox>
                  </Box>
                </Box>

                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleCloseRequirement} // Toggles the packaging section
                  variant={"outline"}
                />
              </Box>
            )}
            {isBeltsOpen && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="packagingBtn2"
              >
                <Box>
                  <p className={cls.stepTitle2}>{t("ADR")}</p>
                  <Box display="flex" columnGap="10px" alignItems={"center"}>
                    <Box width={"100px"}>
                      <TextField
                        disabled={!canEdit}
                        placeholder={t("0-9")}
                        type="number"
                        register={register}
                        name="straps_number"
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

                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleCloseBelts} // Toggles the packaging section
                  variant={"outline"}
                />
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
      <Button
        onClick={() => setCargoIndex(2)}
        rightIcon={<NextArrowIcon />}
        className={cls.nextBtn}
      >
        Далее
      </Button>
    </>
  );
};

export default StepThere;
