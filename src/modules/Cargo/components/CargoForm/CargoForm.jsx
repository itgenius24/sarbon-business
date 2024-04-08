import cls from "./styles.module.scss";
import { Dropdown } from "@/components/Dropdown";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useCargoFormProps } from "./useCargoFormProps";
import { DeleteIcon, PlusIcon } from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { DeleteButton } from "@/components/DeleteButton";

export const CargoForm = () => {

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
  } = useCargoFormProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Box py="24px" borderBottom="1px solid" borderColor="brand.200">
    <Box display="flex" alignItems="start" columnGap="32px">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">{t("Груз")}</Heading>
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">{t("В рассчёте на одну машину")}</Text>
      </Box>
      <Box display="flex" flexDirection="column" rowGap="16px" maxW="540px" width="100%" ml="auto">
        <Box display="grid" gridTemplateColumns="1fr 134px 134px" columnGap="24px" flexGrow="1">
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
          />
          <TextFieldWithAddition
            errors={errors}
            control={control}
            name="weight_measurement"
            register={register}
            additionalItemName="weight_unit"
            width="134px"
            placeholder={t("Вес")}
            additionalItemOptions={weightMeasurementOptions}
            disabled={!canEdit}
            type="number"
          />
          <TextFieldWithAddition
            errors={errors}
            control={control}
            name="volume_measurement"
            register={register}
            width="134px"
            placeholder={t("Объем")}
            additionalItemPlaceholder="m³"
            disabled={!canEdit}
            type="number"
            // additionalItemName="volume_unit"
            // additionalItemOptions={volumeMeasurementOptions}
          />
        </Box>
        <Box display="flex" columnGap="24px">
          {
            !isPackagingAndQuantity && <Button
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
      isPackagingAndQuantity && <Box display="flex" alignItems="flex-start" mt="24px" key="packaging">
        <DeleteButton
          isDisabled={!canEdit}
          visibility={canEdit ? "visible" : "hidden"}
          onClick={handlePackagingAndQuantity}
        >
          {t("Упаковка и количество")}
        </DeleteButton>
        <Box display="flex" columnGap="24px" maxW="540px" width="100%" ml="auto">
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
      isDimensionsAndDiameter && <Box display="flex" alignItems="flex-start" mt="24px" key="dimensions">
        <DeleteButton
          visibility={canEdit ? "visible" : "hidden"}
          onClick={handleDimensionsAndDiameter}
        >
          {t("Габариты и диаметр")}
        </DeleteButton>
        <Box display="flex" columnGap="16px" maxW="540px" width="100%" ml="auto">
          <Box display="flex" flexDirection="column" rowGap="10px">
            <TextFieldWithAddition
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
