import { Dropdown } from "@/components/Dropdown";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useCargoFormProps } from "./useCargoFormProps";
import { DeleteIcon, PlusIcon } from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";

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

  return <Box py="24px" borderBottom="1px solid" borderColor="brand.200">
    <Box display="flex" alignItems="start" columnGap="32px">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">Груз</Heading>
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">В рассчёте на одну машину</Text>
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
          />
          <TextFieldWithAddition
            rules={{
              required: {
                value: true,
                message: "Обязательное поле",
              }
            }}
            errors={errors}
            control={control}
            name="weight_measurement"
            register={register}
            additionalItemName="weight_unit"
            width="134px"
            placeholder="Вес"
            additionalItemOptions={weightMeasurementOptions}
            disabled={!canEdit}
          />
          <TextFieldWithAddition
            rules={{
              required: {
                value: true,
                message: "Обязательное поле",
              }
            }}
            errors={errors}
            control={control}
            name="volume_measurement"
            register={register}
            width="134px"
            placeholder="Объем"
            additionalItemPlaceholder={<span>м<sup>3</sup></span>}
            disabled={!canEdit}
            // additionalItemName="volume_unit"
            // additionalItemOptions={volumeMeasurementOptions}
          />
        </Box>
        <Box display="flex" columnGap="24px">
          {
            !isPackagingAndQuantity && <Button
              isDisabled={!canEdit}
              leftIcon={<PlusIcon color="#007AFF" />}
              variant="reset"
              onClick={handlePackagingAndQuantity}
            >
              Упаковка и кол-во
            </Button>
          }
          {
            !isDimensionsAndDiameter && <Button
              isDisabled={!canEdit}
              leftIcon={<PlusIcon color="#007AFF" />}
              variant="reset"
              onClick={handleDimensionsAndDiameter}
            >
              Габариты и диаметр
            </Button>
          }
        </Box>
      </Box>
    </Box>
    {
      isPackagingAndQuantity && <Box display="flex" alignItems="flex-start" mt="24px">
        <Button disabled={!canEdit} variant="reset" onClick={handlePackagingAndQuantity} color="brand.700" leftIcon={<DeleteIcon />}>Упаковка и количество</Button>
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
            placeholder="Кол-во"
            additionalItemPlaceholder="шт."
            additionalItemDefaultIndex={0}
            additionalItemOptions={[]}
            disabled={!canEdit}
          />
        </Box>
      </Box>
    }
    {
      isDimensionsAndDiameter && <Box display="flex" alignItems="flex-start" mt="24px">
        <Button variant="reset" onClick={handleDimensionsAndDiameter} color="brand.700" leftIcon={<DeleteIcon />}>Габариты и диаметр</Button>
        <Box display="flex" columnGap="16px" maxW="540px" width="100%" ml="auto">
          <Box display="flex" flexDirection="column" rowGap="10px">
            <TextFieldWithAddition
              control={control}
              name="dimensions1"
              register={register}
              width="123px"
              placeholder="Габарит"
              additionalItemPlaceholder="м"
              disabled={!canEdit}
            />
            <Checkbox register={register} name="isSpecial1" disabled={!canEdit}>особые</Checkbox>
          </Box>
          <Box display="flex" flexDirection="column" rowGap="10px">
            <TextFieldWithAddition
              control={control}
              name="dimensions2"
              register={register}
              width="123px"
              placeholder="Габарит"
              additionalItemPlaceholder="м"
              disabled={!canEdit}
            />
            <Checkbox register={register} name="isSpecial2" disabled={!canEdit}>особые</Checkbox>
          </Box>
          <Box display="flex" flexDirection="column" rowGap="10px">
            <TextFieldWithAddition
              disabled={!canEdit}
              control={control}
              name="dimensions3"
              register={register}
              width="123px"
              placeholder="Габарит"
              additionalItemPlaceholder="м"
            />
            <Checkbox register={register} name="isSpecial3">особые</Checkbox>
          </Box>
          <TextFieldWithAddition
            control={control}
            disabled={!canEdit}
            name="diameter"
            register={register}
            width="123px"
            placeholder="Диаметр"
            additionalItemPlaceholder="м"
          />
        </Box>
      </Box>
    }
  </Box>;
};
