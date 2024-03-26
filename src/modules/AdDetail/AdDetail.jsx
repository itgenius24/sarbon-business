import { Dropdown } from "@/components/Dropdown";
import FileUpload from "@/components/FileUpload";
import { TextField } from "@/components/TextField";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { useAdDetailProps } from "./useAdDetailProps";
import { MainContentCard } from "@/components/MainContentCard";

export const AdDetail = ({ id }) => {
  const {
    watch,
    errors,
    control,
    setValue,
    register,
    TCOptions,
    currencyOptions,
    handleImageUpload,
    rules,
    addressOptions,
    handleSubmit,
    onSubmit,
    router,
    statusOptions,
  } = useAdDetailProps({ id });

  return (
    <MainContentCard
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      footer={ <ButtonGroup ml="auto" spacing="2">
        <Button
          h="40px"
          p="10px 16px"
          variant="outline"
          color="brand.700"
          borderColor="brand.300"
          fontSize="16px"
          onClick={() => router.push("/profile/my-ad")}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          fontSize="16px"
          h="40px"
          p="10px 16px"
          variant="solid"
        >
          {
            id ? "Сохранить" : "Создать"
          }
        </Button>
      </ButtonGroup>

      }
    >
      <Flex gap="24px">
        <Dropdown
          label="Выберите тип ТС"
          control={control}
          required
          register={register}
          watch={watch}
          name="vehicle_type_id"
          placeholder="Выберите тип ТС"
          options={TCOptions}
          errors={errors}
        />
        <TextField
          placeholder="Марка"
          register={register}
          errors={errors}
          name="name"
          label="Информация о ТС"
          rules={rules}
        />
      </Flex>
      <Box mt="24px">
        <Dropdown
          label="Выберите город, страну"
          control={control}
          required
          register={register}
          watch={watch}
          name="address"
          placeholder="Выберите город, страну"
          options={addressOptions}
          errors={errors}
        />
      </Box>
      {
        id && <Box mt="24px">
          <Dropdown
            label="Статус"
            control={control}
            register={register}
            watch={watch}
            name="status"
            placeholder="Статус"
            options={statusOptions}
          />
        </Box>
      }
      <Box mt="24px">
        <TextField
          placeholder="Введите"
          register={register}
          errors={errors}
          name="desc"
          label="Описание"
          rules={rules}
        />
      </Box>
      <Box mt="24px">
        <FileUpload
          // defaultValue={photo}
          profilePlaceholder={<FileUploadPlaceholder />}
          variant="profile"
          name="photo"
          register={register}
          watch={watch}
          handleChange={handleImageUpload}
          setValue={setValue}
          rules={rules}
          errors={errors}
        />
      </Box>
      <Flex gap="24px" mt="16px">
        <TextFieldWithAddition
          additionalItemLabel="Стоимость"
          name="price"
          register={register}
          control={control}
          additionalItemName="currency_id"
          additionalItemDefaultIndex={0}
          placeholder="Введите сумму"
          errors={errors}
          type="number"
          width="100%"
          additionalItemOptions={currencyOptions}
          rules={rules}
        />
        <TextField
          placeholder="+998 --  ---  --  --"
          register={register}
          type="phone"
          errors={errors}
          name="contact"
          label="Контакт"
          rules={rules}
        />
      </Flex>
    </MainContentCard>
  );
};

function FileUploadPlaceholder() {
  return (
    <Box fontSize="14px" lineHeight="20px">
        Нажмите, чтобы изменить фото{" "}
      <Text as="span" color="brand.600">
          или перетащите
      </Text>
      <Text color="brand.600" fontSize="12px">
          SVG, PNG, JPG or GIF (max. 800x400px)
      </Text>
    </Box>
  );
}
