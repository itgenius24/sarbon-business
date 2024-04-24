import cls from "./styles.module.scss";
import { Dropdown } from "@/components/Dropdown";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Box, Button, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useCargoFormProps } from "./useCargoFormProps";
import { DeleteIcon, PlusIcon } from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { DeleteButton } from "@/components/DeleteButton";

export const CargoForm = () => {

  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  const {
    errors,
    control,
    register,
    setValue,
    watch,
    handleDimensionsAndDiameter,
    handlePackagingAndQuantity,
    isDimensionsAndDiameter,
    isPackagingAndQuantity,
    cargoTypeOptions,
    weightMeasurementOptions,
    volumeMeasurementOptions,
    packageOptions,
    canEdit,
    isEditing,
  } = useCargoFormProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Box py="24px" borderBottom="1px solid" borderColor="brand.200">
    <Box className={cls.fieldsWrapper} display="flex" alignItems="start" columnGap="32px">
      <Box
        width="280px"
        flexShrink="0"
      >
        <Heading
          color="brand.700"
          fontSize="14px"
          fontWeight="600"
          lineHeight="20px"
        >
          {t("Груз")}
        </Heading>
        <Text
          color="brand.600"
          fontSize="14px"
          fontWeight="400"
          lineHeight="20px"
        >
          {t("В рассчёте на одну машину")}
        </Text>
      </Box>
      <Box className={cls.fields} display="flex" flexDirection="column" rowGap="16px" maxW={isEditing ? "856px" : "540px"} width="100%">
        <Box className={cls.cargoFields} display="grid" gridTemplateColumns="1fr 1fr 1fr" columnGap="24px" flexGrow="1">
          <Dropdown
            control={control}
            required
            register={register}
            watch={watch}
            name="cargo_type"
            options={cargoTypeOptions}
            errors={errors}
            disabled={!canEdit}
            className={cls.dropdown}
            placeholder={t("Выберите тип груза")}
          />
          <TextFieldWithAddition
            className={cls.textField}
            errors={errors}
            control={control}
            name="weight_measurement"
            register={register}
            additionalItemName="weight_unit"
            // width="134px"
            placeholder={t("Вес")}
            additionalItemOptions={weightMeasurementOptions}
            disabled={!canEdit}
            type="number"
          />
          <TextFieldWithAddition
            className={cls.textField}
            errors={errors}
            control={control}
            name="volume_measurement"
            register={register}
            // width="134px"
            placeholder={t("Объем")}
            additionalItemPlaceholder="m³"
            disabled={!canEdit}
            type="number"
            // additionalItemName="volume_unit"
            // additionalItemOptions={volumeMeasurementOptions}
          />
        </Box>
        <Box display="grid" gridTemplateColumns={isLargerThan600 ? "1fr 1fr 1fr" : "1fr"} columnGap="24px">
          {
            !isPackagingAndQuantity && <Button
              justifyContent="flex-start"
              key="dimensionsBtn"
              isDisabled={!canEdit}
              leftIcon={<PlusIcon color="#007AFF" />}
              variant="reset"
              onClick={handlePackagingAndQuantity}
            >
              {t("Упаковка и кол-во")}
            </Button>
          }
          {
            !isDimensionsAndDiameter && <Button
              justifyContent="flex-start"
              key="diameterBtn"
              isDisabled={!canEdit}
              leftIcon={<PlusIcon color="#007AFF" />}
              variant="reset"
              onClick={handleDimensionsAndDiameter}
            >
              {t("Габариты и диаметр")}
            </Button>
          }
        </Box>
      </Box>
    </Box>
    {
      isPackagingAndQuantity && <Box className={cls.additionalFields} display="flex" columnGap="32px" alignItems="center" mt="24px" key="packaging">
        <DeleteButton
          width="280px"
          justifyContent="flex-start"
          isDisabled={!canEdit}
          visibility={canEdit ? "visible" : "hidden"}
          onClick={handlePackagingAndQuantity}
        >
          {t("Упаковка и количество")}
        </DeleteButton>
        <Box className={cls.fields} display="flex" columnGap="24px" maxW="540px" width="100%">
          <Dropdown
            errors={errors}
            searchable
            control={control}
            required
            register={register}
            watch={watch}
            setValue={setValue}
            searchName="packagingSearch"
            name="packaging"
            options={packageOptions}
            disabled={!canEdit}
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
            disabled={!canEdit}
          />
        </Box>
      </Box>
    }
    {
      isDimensionsAndDiameter && <Box className={cls.additionalFields} display="flex" columnGap="32px" alignItems="flex-start" mt="24px" key="dimensions">
        <DeleteButton
          width="280px"
          justifyContent="flex-start"
          visibility={canEdit ? "visible" : "hidden"}
          onClick={handleDimensionsAndDiameter}
        >
          {t("Габариты и диаметр")}
        </DeleteButton>
        <Box className={cls.fields} display="flex" columnGap="16px" maxW="540px" width="100%">
          <Box display="flex" flexDirection="column" rowGap="10px">
            <TextFieldWithAddition
              className={cls.textField}
              control={control}
              name="length"
              register={register}
              width="123px"
              placeholder={t("Длина")}
              additionalItemPlaceholder={t("м")}
              disabled={!canEdit}
            />
            {/* <Checkbox register={register} name="isSpecial1" disabled={!canEdit}>{t("особые")}</Checkbox> */}
          </Box>
          <Box display="flex" flexDirection="column" rowGap="10px">
            <TextFieldWithAddition
              className={cls.textField}
              control={control}
              name="width"
              register={register}
              width="123px"
              placeholder={t("Ширина")}
              additionalItemPlaceholder={t("м")}
              disabled={!canEdit}
            />
            {/* <Checkbox register={register} name="isSpecial2" disabled={!canEdit}>{t("особые")}</Checkbox> */}
          </Box>
          <Box display="flex" flexDirection="column" rowGap="10px">
            <TextFieldWithAddition
              className={cls.textField}
              disabled={!canEdit}
              control={control}
              name="height"
              register={register}
              width="123px"
              placeholder={t("Высота")}
              additionalItemPlaceholder={t("м")}
            />
            {/* <Checkbox register={register} name="isSpecial3">{t("особые")}</Checkbox> */}
          </Box>
          <TextFieldWithAddition
            className={cls.textField}
            control={control}
            disabled={!canEdit}
            name="diameter"
            register={register}
            width="123px"
            placeholder={t("Диаметр")}
            additionalItemPlaceholder={t("м")}
          />
        </Box>
      </Box>
    }
  </Box>;
};
