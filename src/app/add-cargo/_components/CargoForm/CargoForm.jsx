import { Dropdown } from "@/components/Dropdown";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useCargoFormProps } from "./useCargoFormProps";
import { DeleteIcon, PlusIcon } from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";

export const CargoForm = () => {

  const {
    weightOptions,
    errors,
    control,
    register,
    setValue,
    watch,
    handleDimensionsAndDiameter,
    handlePackagingAndQuantity,
    isDimensionsAndDiameter,
    isPackagingAndQuantity,
  } = useCargoFormProps();

  return <Box py="24px" borderBottom="1px solid" borderColor="brand.200">
    <Box display="flex" alignItems="start" columnGap="32px">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">Груз</Heading>
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">В рассчёте на одну машину</Text>
      </Box>
      <Box display="flex" flexDirection="column" rowGap="16px" maxW="540px" width="100%" ml="auto">
        <Box display="flex" columnGap="24px" flexGrow="1">
          <Dropdown
            searchable
            search
            control={control}
            required
            register={register}
            watch={watch}
            setValue={setValue}
            searchName="search"
            name="cargo"
            options={[{ label: "Тест", value: "test" }, { label: "Тест2", value: "test2" }, { label: "Тест3", value: "test3" }]}
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
            name="weight"
            register={register}
            additionalItemName="weightUnit"
            width="134px"
            placeholder="Вес"
            additionalItemDefaultIndex={0}
            additionalItemOptions={weightOptions}
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
            name="volume"
            register={register}
            width="134px"
            placeholder="Объем"
            additionalItemPlaceholder={<span>м<sup>3</sup></span>}
          />
        </Box>
        <Box display="flex" columnGap="24px">
          {
            !isPackagingAndQuantity && <Button
              leftIcon={<PlusIcon color="#007AFF" />}
              variant="reset"
              onClick={handlePackagingAndQuantity}
            >
              Упаковка и кол-во
            </Button>
          }
          {
            !isDimensionsAndDiameter && <Button
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
        <Button variant="reset" onClick={handlePackagingAndQuantity} color="brand.700" leftIcon={<DeleteIcon />}>Упаковка и количество</Button>
        <Box display="flex" columnGap="24px" maxW="540px" width="100%" ml="auto">
          <Dropdown
            searchable
            search
            control={control}
            required
            register={register}
            watch={watch}
            setValue={setValue}
            searchName="packagingSearch"
            name="packaging"
            options={[{ label: "Тест", value: "test" }, { label: "Тест2", value: "test2" }, { label: "Тест3", value: "test3" }]}
          />
          <TextFieldWithAddition
            control={control}
            name="weight"
            register={register}
            width="196px"
            placeholder="Кол-во"
            additionalItemPlaceholder="шт."
            additionalItemDefaultIndex={0}
            additionalItemOptions={weightOptions}
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
            />
            <Checkbox register={register} name="isSpecial1">особые</Checkbox>
          </Box>
          <Box display="flex" flexDirection="column" rowGap="10px">
            <TextFieldWithAddition
              control={control}
              name="dimensions2"
              register={register}
              width="123px"
              placeholder="Габарит"
              additionalItemPlaceholder="м"
            />
            <Checkbox register={register} name="isSpecial2">особые</Checkbox>
          </Box>
          <Box display="flex" flexDirection="column" rowGap="10px">
            <TextFieldWithAddition
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
