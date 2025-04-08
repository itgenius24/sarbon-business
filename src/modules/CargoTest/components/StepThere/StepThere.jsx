import React, { useState } from "react";
import cls from "./style.module.scss";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import {
  CarStaepIcon,
  CloseStepIcon,
  DeleteIcon,
  DeleteStepIcon,
  FurStepIcon,
  HelpCircleIcon,
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

const StepThere = ({ status }) => {
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
    handleIsGradusOpen,
    handleCloseIsGradus,
    isGradusOpen,
    isFtlOpen,
    isReymenOpen,
    handleIsFtlOpen,
    handleCloseIsFtlOpen,
    handleIsReymenOpen,
    handleCloseIsReymenOpen,

    errors,
    canEdit,
    handleCheckboxChange,
    isEditing,
    watch,
    clickNum,
    setHoverIndex,
    hoverIndex,
    clickIndex,
    boxes,
    onMouseLeave,
    onMouseEnter,
    disabled,
    handleNumClick,
    onSubmit,
    handleResetForm,
    setEditModal
  } = useStepThereProps();

  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");

  console.log("carTypeOptions", carTypeOptions);

  return (
    <Box className={cls.containerCards}>
      <Box className={cls.step1}>
        <Flex width={"100%"} gap={"13px"}>
          <Box className={cls.logoWrap}>
            <CarStaepIcon />
          </Box>

          <Box width={"100%"}>
            <Flex
              className={cls.inputWrap}
              rowGap={`20px`}
              gap={"24px"}
              width={"100%"}
            >
              <Box width={"100%"}>
                <Flex gap={"14px"}>
                  <Box className={cls.logoWrapMobile}>
                    <CarStaepIcon />
                  </Box>
                  <p className={cls.stepTitle}>{t(`Машина`)}</p>
                </Flex>

                <Flex width={`100%`} gap={"24px"} mt={"24px"}>
                  <Box width={"100%"}>
                    <Dropdown
                      control={control}
                      handleDisabled={() => setEditModal(true)}
                      required
                      register={register}
                      watch={watch}
                      placeholder={t("Транспорт")}
                      name="car_type"
                      options={carTypeOptions}
                      errors={errors}
                      width={"300px"}
                      disabled={!canEdit}
                      className={cls.dropdown}
                      // placeholder={t("Выберите тип груза")}
                      // inputPlaceholder={t("Выберите тип груза")}
                      // searchable
                      searchName="cargo_type_search"
                      // setValue={setValue}
                    />
                    {canEdit && (
                      <Flex gap={2} mt={2}>
                        <span className={cls.subTitle}>{t(`Частые`)}: </span>
                        <p
                          onClick={() =>
                            setValue("car_type", {
                              label: "Тентованный полуприцеп",
                              value: "3be76fbd-ec69-42c6-ac16-23a9ab454826",
                            })
                          }
                          className={cls.quickWord}
                        >
                          {t(`Тентованный полуприцеп`)},
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
                          {t(`Рефрижератор`)}
                        </p>
                      </Flex>
                    )}
                  </Box>
                </Flex>
              </Box>
              <Box width={"100%"}>
                <p className={cls.stepTitle}>{t(`Количество машин`)}</p>
                <Flex
                  className={cls.inputWrap}
                  gap={"24px"}
                  mt={"24px"}
                  alignItems={"center"}
                >
                  <Box width={"80px"}>
                    <TextField
                      onClick={() => !canEdit ? setEditModal(true) :null}
                      disabled={!canEdit}
                      register={register}
                      type="number"
                      errors={errors}
                      name="transport_count"
                      placeholder={t("0")}
                    />
                  </Box>
                  <Flex alignItems={"center"}>
                    {boxes.map((item, index) => (
                      <Box
                        paddingRight={2}
                        cursor={"pointer"}
                        key={index}
                        onMouseLeave={() => (canEdit ? onMouseLeave() : {})}
                        onMouseEnter={() => (canEdit ? onMouseEnter(item) : {})}
                        onClick={() => (canEdit ? handleNumClick(item) : {})}
                      >
                        <FurStepIcon
                          num={
                            watch("transport_count") > 10
                              ? item === 10
                                ? "10+"
                                : item
                              : item
                          }
                          color={
                            item <= hoverIndex
                              ? !canEdit
                                ? `rgba(0, 122, 255, 0.4)`
                                : "rgba(38, 189, 73, 1)"
                              : item <= clickIndex
                              ? !canEdit
                                ? `rgba(0, 122, 255, 0.4)`
                                : "rgba(38, 189, 73, 1)"
                              : "#B2B0B6"
                          }
                        />
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            {canEdit && (
              <Flex className={cls.plusWrap} mt="30px" gap={2}>
                {!isLiftingCapacityOpen && (
                  <Button
                    key="packagingBtn1"
                    leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                    variant="reset"
                    onClick={handleOpenLiftingCapacity}
                    color="rgba(126, 123, 134, 1)"
                    fontWeight={400}
                    className={cls.button}
                  >
                    {t("Тип загрузки")}
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
                    className={cls.button}
                  >
                    {t("Сцепка,Пневмоход, Коники")}
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
                    className={cls.button}
                  >
                    {t("ADR")}
                  </Button>
                )}
                {!isAccessOpen && (
                  <Button
                    key="packagingBtn4"
                    leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                    variant="reset"
                    onClick={handleOpenAccess}
                    color="rgba(126, 123, 134, 1)"
                    fontWeight={400}
                    className={cls.button}
                  >
                    {t("TIR, CMR, T1, Медкнижка")}
                  </Button>
                )}
                {!isFtlOpen && (
                  <Button
                    key="packagingBtn5"
                    leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                    variant="reset"
                    onClick={handleIsFtlOpen}
                    color="rgba(126, 123, 134, 1)"
                    fontWeight={400}
                    className={cls.button}
                  >
                    {t("FTL/LTL")}
                  </Button>
                )}
                {!isReymenOpen && (
                  <Button
                    key="packagingBtn6"
                    leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                    variant="reset"
                    onClick={handleIsReymenOpen}
                    color="rgba(126, 123, 134, 1)"
                    fontWeight={400}
                    className={cls.button}
                  >
                    {t("Ремней, шт")}
                  </Button>
                )}
                {!isGradusOpen && (
                  <Button
                    key="packagingBtn7"
                    leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                    variant="reset"
                    onClick={handleIsGradusOpen}
                    color="rgba(126, 123, 134, 1)"
                    fontWeight={400}
                    className={cls.button}
                  >
                    {t("Температурный режим")}
                  </Button>
                )}
              </Flex>
            )}
            {isLiftingCapacityOpen && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="packagingBtn1"
              >
                <Box width={`100%`}>
                  <Flex
                    alignItems={`center`}
                    width={`100%`}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.stepTitle2}>{t("Тип загрузки")}</p>
                    <IconButton
                      border={"none"}
                      width={"fit-content"}
                      icon={<CloseStepIcon />}
                      onClick={handleCloseLiftingCapacity} // Toggles the packaging section
                      variant={"outline"}
                      className={cls.closeMobileIcon}
                    />
                  </Flex>
                  <Box
                    className={cls.contendWrap}
                    display="flex"
                    columnGap="10px"
                    flexGrow={1}
                  >
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="top"
                    >
                      {t("Верхняя")}
                    </Checkbox>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="side"
                    >
                      {t("Боковая")}
                    </Checkbox>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="back"
                    >
                      {t("Задняя")}
                    </Checkbox>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="with_removal"
                    >
                      {t("Со снятием стоек")}
                    </Checkbox>
                  </Box>
                </Box>

                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleCloseLiftingCapacity} // Toggles the packaging section
                  variant={"outline"}
                  className={cls.closeDecktopIcon}
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
                <Box width={`100%`}>
                  <Flex
                    alignItems={`center`}
                    width={`100%`}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.stepTitle2}>{t("Требования")}</p>
                    <IconButton
                      border={"none"}
                      width={"fit-content"}
                      icon={<CloseStepIcon />}
                      onClick={handleCloseRequirement} // Toggles the packaging section
                      variant={"outline"}
                      className={cls.closeMobileIcon}
                    />
                  </Flex>
                  <Box
                    className={cls.contendWrap}
                    display="flex"
                    columnGap="10px"
                    flexGrow={1}
                  >
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
                  className={cls.closeDecktopIcon}
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
                key="packagingBtn3"
              >
                <Box width={`100%`}>
                  <Flex
                    alignItems={`center`}
                    width={`100%`}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.stepTitle2}>{t("ADR")}</p>
                    <IconButton
                      border={"none"}
                      width={"fit-content"}
                      icon={<CloseStepIcon />}
                      onClick={handleCloseBelts} // Toggles the packaging section
                      variant={"outline"}
                      className={cls.closeMobileIcon}
                    />
                  </Flex>
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
                  className={cls.closeDecktopIcon}
                />
              </Box>
            )}
            {isAccessOpen && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="packagingBtn4"
              >
                <Box width={`100%`}>
                  <Flex
                    alignItems={`center`}
                    width={`100%`}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.stepTitle2}>
                      {t("TIR, CMR, T1, Медкнижка")}
                    </p>
                    <IconButton
                      border={"none"}
                      width={"fit-content"}
                      icon={<CloseStepIcon />}
                      onClick={handleCloseAccess} // Toggles the packaging section
                      variant={"outline"}
                      className={cls.closeMobileIcon}
                    />
                  </Flex>

                  <Box
                    className={cls.contendWrap}
                    display="flex"
                    columnGap="10px"
                  >
                    {/* <Box display="flex" columnGap="10px" flexGrow={1}> */}
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="tir"
                    >
                      {t("TIR")}
                    </Checkbox>
                    <Checkbox disabled={!canEdit} register={register} name="t1">
                      {t("T1")}
                    </Checkbox>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="cmr"
                    >
                      {t("CMR")}
                    </Checkbox>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      name="medic_certificate"
                    >
                      {t("Медкнижка")}
                    </Checkbox>
                    {/* </Box> */}
                  </Box>
                </Box>

                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleCloseAccess} // Toggles the packaging section
                  variant={"outline"}
                  className={cls.closeDecktopIcon}
                />
              </Box>
            )}
            {isFtlOpen && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="packagingBtn5"
              >
                <Box width={`100%`}>
                  <Flex
                    alignItems={`center`}
                    width={`100%`}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.stepTitle2}>{t("FTL/LTL")}</p>
                    <IconButton
                      border={"none"}
                      width={"fit-content"}
                      icon={<CloseStepIcon />}
                      onClick={handleCloseIsFtlOpen} // Toggles the packaging section
                      variant={"outline"}
                      className={cls.closeMobileIcon}
                    />
                  </Flex>
                  <Box
                    width={"100%"}
                    display="flex"
                    flexDirection={`column`}
                    rowGap={`10px`}
                    columnGap="10px"
                  >
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      onChange={handleCheckboxChange}
                      defaultChecked={!canEdit}
                      name="is_ftl"
                    >
                      <Box display="flex" alignItems="center">
                        <span>{t("отдельной машиной (FTL)")}</span>
                        <HelpCircleIcon />
                      </Box>
                    </Checkbox>
                    <Checkbox
                      disabled={!canEdit}
                      register={register}
                      onChange={handleCheckboxChange}
                      name="is_ltl"
                    >
                      {t("отдельной машиной или догрузом (FTL или LTL)")}
                    </Checkbox>
                  </Box>
                </Box>

                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleCloseIsFtlOpen} // Toggles the packaging section
                  variant={"outline"}
                  className={cls.closeDecktopIcon}
                />
              </Box>
            )}
            {isReymenOpen && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="packagingBtn6"
              >
                <Box width={`100%`}>
                  <Flex
                    alignItems={`center`}
                    width={`100%`}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.stepTitle2}>{t("Ремней, шт")}</p>
                    <IconButton
                      border={"none"}
                      width={"fit-content"}
                      icon={<CloseStepIcon />}
                      onClick={handleCloseIsReymenOpen} // Toggles the packaging section
                      variant={"outline"}
                      className={cls.closeMobileIcon}
                    />
                  </Flex>
                  <TextField
                    disabled={!canEdit}
                    placeholder={t("Штук")}
                    type="number"
                    register={register}
                    name="straps_number"
                  />
                </Box>

                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleCloseIsReymenOpen} // Toggles the packaging section
                  variant={"outline"}
                  className={cls.closeDecktopIcon}
                />
              </Box>
            )}
            {isGradusOpen && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="packagingBtn7"
              >
                <Box width={`100%`}>
                  <Flex
                    alignItems={`center`}
                    width={`100%`}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.stepTitle2}>{t("Температурный режим")}</p>
                    <IconButton
                      border={"none"}
                      width={"fit-content"}
                      icon={<CloseStepIcon />}
                      onClick={handleCloseIsGradus} // Toggles the packaging section
                      variant={"outline"}
                      className={cls.closeMobileIcon}
                    />
                  </Flex>
                  <Flex gap={`20px`} width={`30%`}>
                  <TextFieldWithAddition
                      className={cls.textField2}
                      errors={errors}
                      control={control}
                      name="gradusFrom"
                      register={register}
                      additionalItemName="weight_unit"
                      width="160px"
                      placeholder={t("от")}
                      additionalItemPlaceholder="°C"
                      // additionalItemOptions={[{label:`°C`,values:`°C`}]}
                      disabled={!canEdit}
                      additionalItemTheme={"light"}
                      type="number"
                      zIndex={90}
                     
                    />
                    <TextFieldWithAddition
                      className={cls.textField2}
                      errors={errors}
                      control={control}
                      name="gradusTo"
                      additionalItemTheme={"light"}
                      register={register}
                      additionalItemName="weight_unit"
                      width="160px"
                      placeholder={t("до")}
                      additionalItemPlaceholder="°C"
                      // additionalItemOptions={[{label:`°C`,values:`°C`}]}
                      disabled={!canEdit}
                      type="number"
                      zIndex={90}
                    />
                  </Flex>
                </Box>

                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleCloseIsGradus} // Toggles the packaging section
                  variant={"outline"}
                  className={cls.closeDecktopIcon}
                />
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
      {!status && (
        <Flex flexDirection={`column`} rowGap={`10px`}>
          <Button
            isDisabled={disabled}
            onClick={() => onSubmit()}
            rightIcon={<NextArrowIcon />}
            className={cls.nextBtn}
          >
            Далее
          </Button>
          <Button
            isDisabled={disabled}
            onClick={() => handleResetForm()}
            leftIcon={<DeleteStepIcon />}
            variant="secondaryWhite"
            color={`rgba(126, 123, 134, 1)`}
            fontWeight={500}
            fontSize={`14px`}
            className={cls.clearBtn}
          >
            Очистить форму
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default StepThere;
