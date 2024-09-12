import React from "react";
import cls from "./style.module.scss";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import {
  CloseIcon,
  CloseStepIcon,
  LoadStepIcon,
  NextArrowIcon,
  PlusIcon,
} from "@/assets/icons/icons";
import useStepOneProps from "./useStepOneProps";
import { Dropdown } from "@/components/Dropdown";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "react-i18next";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
const StepOne = () => {
  const {
    control,
    errors,
    register,
    setValue,
    watch,
    setSearchCargo,
    weightMeasurementOptions,
    isPackagingAndQuantity,
    isDimensionsAndDiameter,
    handleDimensionsAndDiameter,
    handlePackagingAndQuantity,
  } = useStepOneProps();
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");
  return (
    <>
      <Box className={cls.step1}>
        <Flex width={"100%"} gap={"13px"}>
          <LoadStepIcon />{" "}
          <Box width={"100%"}>
            <p className={cls.stepTitle}>Ваш груз</p>
            <Flex gap={"24px"} mt={"10px"}>
              <Box>
                <p className={cls.textFieldName}></p>
                <Dropdown
                  control={control}
                  required
                  register={register}
                  watch={watch}
                  name="cargo_type"
                  options={[]}
                  errors={errors}
                  // disabled={!canEdit}
                  className={cls.dropdown}
                  onSearchChange={(e) => setSearchCargo(e.target.value)}
                  placeholder={t("Выберите тип груза")}
                  inputPlaceholder={t("Выберите тип груза")}
                  searchable
                  searchName="cargo_type_search"
                  setValue={setValue}
                />
                <Flex gap={2} mt={2}>
                  <span className={cls.subTitle}>Например: </span>
                  <p className={cls.quickWord}>Пиломатериалы,</p>
                  <p className={cls.quickWord}>ДСП,</p>
                  <p className={cls.quickWord}>Овощи и фрукты</p>
                </Flex>
              </Box>
              <Box>
                <p className={cls.textFieldName}>В расчёте на одну машину</p>
                <TextFieldWithAddition
                  className={cls.textField}
                  errors={errors}
                  control={control}
                  name="weight_measurement"
                  register={register}
                  additionalItemName="weight_unit"
                  width="160px"
                  placeholder={t("Вес")}
                  additionalItemPlaceholder="T"
                  // additionalItemOptions={weightMeasurementOptions}
                  // disabled={!canEdit}
                  type="number"
                  zIndex={90}
                />
                <Flex ml={4} gap={2} mt={2}>
                  <p className={cls.quickWord}>20т,</p>
                  <p className={cls.quickWord}>22т,</p>
                  <p className={cls.quickWord}>23т</p>
                </Flex>
              </Box>
              <Box>
                <p className={cls.textFieldName}></p>
                <TextFieldWithAddition
                  className={cls.textField}
                  errors={errors}
                  control={control}
                  name="volume_measurement"
                  register={register}
                  width="160px"
                  placeholder={t("Объем")}
                  additionalItemPlaceholder="m³"
                  // disabled={!canEdit}
                  type="number"
                  // additionalItemName="volume_unit"
                  // additionalItemOptions={volumeMeasurementOptions}
                />
                <Flex ml={4} gap={2} mt={2}>
                  <p className={cls.quickWord}>40м³,</p>
                  <p className={cls.quickWord}>42м³,</p>
                  <p className={cls.quickWord}>43м³</p>
                </Flex>
              </Box>
            </Flex>
            <Flex mt={"30px"} gap={2}>
              {!isDimensionsAndDiameter && (
                <Button
                  justifyContent="flex-start"
                  key="diameterBtn"
                  //   isDisabled={!canEdit}
                  leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                  variant="reset"
                  onClick={handleDimensionsAndDiameter}
                  color="rgba(126, 123, 134, 1)"
                  fontWeight={400}
                >
                  {t("Габариты и диаметр")}
                </Button>
              )}
              {!isPackagingAndQuantity && (
                <Button
                  justifyContent="flex-start"
                  key="dimensionsBtn"
                  //   isDisabled={!canEdit}
                  leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
                  variant="reset"
                  onClick={handlePackagingAndQuantity}
                  color="rgba(126, 123, 134, 1)"
                  fontWeight={400}
                >
                  {t("Упаковка")}
                </Button>
              )}
            </Flex>
            {isPackagingAndQuantity && (
              <Box
                className={cls.additionalFields}
                display="flex"
                width={"100%"}
                alignItems="center"
                mt="24px"
                justifyContent={"space-between"}
                key="packaging"
              >
                <Box>
                  <p className={cls.stepTitle2}>Упаковка</p>
                  <Box
                    className={cls.fields}
                    display="flex"
                    columnGap="24px"
                    maxW="540px"
                    width="100%"
                  >
                    <Dropdown
                      errors={errors}
                      searchable
                      control={control}
                      required
                      register={register}
                      watch={watch}
                      setValue={setValue}
                      searchName="packagingSearch"
                      inputPlaceholder={t(`Выберите`)}
                      placeholder={t(`Выберите`)}
                      name="packaging"
                      options={[]}
                      // disabled={!canEdit}
                    />
                    <TextFieldWithAddition
                      className={cls.textField}
                      control={control}
                      errors={errors}
                      name="packaging_quantity"
                      register={register}
                      width="196px"
                      placeholder={t("Кол-во")}
                      additionalItemPlaceholder={t("шт.")}
                      additionalItemDefaultIndex={0}
                      additionalItemOptions={[]}
                      // disabled={!canEdit}
                    />
                  </Box>
                </Box>
                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handlePackagingAndQuantity}
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
                key="packaging"
              >
                 <Box>
                 <p className={cls.stepTitle2}>Габариты и диаметр</p>
                <Box
                  className={cls.fields}
                  display="flex"
                  columnGap="16px"
                  maxW="740px"
                  width="100%"
                >
                  <Box display="flex" flexDirection="column" rowGap="10px">
                    <TextFieldWithAddition
                      className={cls.textField}
                      control={control}
                      name="length"
                      register={register}
                      width="153px"
                      placeholder={t("Длина")}
                      additionalItemPlaceholder={t("м")}
                      //   disabled={!canEdit}
                    />
                    {/* <Checkbox register={register} name="isSpecial1" disabled={!canEdit}>{t("особые")}</Checkbox> */}
                  </Box>
                  <Box display="flex" flexDirection="column" rowGap="10px">
                    <TextFieldWithAddition
                      className={cls.textField}
                      control={control}
                      name="width"
                      register={register}
                      width="153px"
                      placeholder={t("Ширина")}
                      additionalItemPlaceholder={t("м")}
                      //   disabled={!canEdit}
                    />
                    {/* <Checkbox register={register} name="isSpecial2" disabled={!canEdit}>{t("особые")}</Checkbox> */}
                  </Box>
                  <Box display="flex" flexDirection="column" rowGap="10px">
                    <TextFieldWithAddition
                      className={cls.textField}
                      //   disabled={!canEdit}
                      control={control}
                      name="height"
                      register={register}
                      width="153px"
                      placeholder={t("Высота")}
                      additionalItemPlaceholder={t("м")}
                    />
                    {/* <Checkbox register={register} name="isSpecial3">{t("особые")}</Checkbox> */}
                  </Box>
                  <TextFieldWithAddition
                    className={cls.textField}
                    control={control}
                    // disabled={!canEdit}
                    name="diameter"
                    register={register}
                    width="153px"
                    placeholder={t("Диаметр")}
                    additionalItemPlaceholder={t("м")}
                  />
                </Box>
                 </Box>
                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={handleDimensionsAndDiameter}
                  variant={"outline"}
                />
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
      <Button rightIcon={<NextArrowIcon />} className={cls.nextBtn}>
        Далее
      </Button>
    </>
  );
};

export default StepOne;
