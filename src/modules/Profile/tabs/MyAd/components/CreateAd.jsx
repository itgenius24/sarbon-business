import { Dropdown } from "@/components/Dropdown";
import FileUpload from "@/components/FileUpload";
import { TextField } from "@/components/TextField";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Box, Flex, Text } from "@chakra-ui/react";

const CreateAd = ({
  watch,
  errors,
  control,
  setValue,
  register,
  TCOptions,
  currencyOptions,
  handleImageUpload,
  rules,
}) => {
  return (
    <div>
      <Flex gap="24px">
        <Dropdown
          label="Выберите тип ТС"
          control={control}
          required
          register={register}
          watch={watch}
          name="vehicle_type_id"
          placeholder="Выберите город, страну"
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
          type="number"
          errors={errors}
          name="contact"
          label="Контакт"
          rules={rules}
        />
      </Flex>
    </div>
  );
};

export default CreateAd;


function FileUploadPlaceholder() {
  return (
    <>
      <Box fontSize="14px" lineHeight="20px">
        Нажмите, чтобы изменить фото{" "}
        <Text as="span" color="brand.600">
          или перетащите
        </Text>
        <Text color="brand.600" fontSize="12px">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </Text>
      </Box>
    </>
  );
}
