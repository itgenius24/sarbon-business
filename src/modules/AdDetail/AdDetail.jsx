import { Dropdown } from "@/components/Dropdown";
import FileUpload from "@/components/FileUpload";
import { TextField } from "@/components/TextField";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Box, Button, ButtonGroup, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useAdDetailProps } from "./useAdDetailProps";
import { MainContentCard } from "@/components/MainContentCard";
import { CustomTextarea } from "@/components/CustomTextarea";
import { useTranslation } from "react-i18next";

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
    disabled,
    statusOptions,
  } = useAdDetailProps({ id });

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
 const {t} = useTranslation();
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
          {t(`Отмена`)}
        </Button>
        <Button
         isDisabled={disabled}
          type="submit"
          fontSize="16px"
          h="40px"
          p="10px 16px"
          variant="solid"
        >
          {
            id ? t("Сохранить") : t("Создать")
          }
        </Button>
      </ButtonGroup>

      }
    >
      <Flex gap="24px" flexDirection={isLargerThan845 ? "row" : "column"}>
        <Dropdown
          label={t("Выберите тип ТС")}
          control={control}
          required
          register={register}
          watch={watch}
          name="vehicle_type_id"
          placeholder={t("Выберите тип ТС")}
          options={TCOptions}
          errors={errors}
        />
        <TextField
          placeholder={t("Марка")}
          register={register}
          errors={errors}
          name="name"
          label={t("Информация о ТС")}
          rules={rules}
        />
      </Flex>
      <Box mt="24px">
        <Dropdown
          label={t("Выберите город, страну")}
          control={control}
          required
          register={register}
          watch={watch}
          name="address"
          placeholder={t("Выберите город, страну")}
          options={addressOptions}
          errors={errors}
        />
      </Box>
      {
        id && <Box mt="24px">
          <Dropdown
            label={t("Статус")}
            control={control}
            register={register}
            watch={watch}
            name="status"
            placeholder={t("Статус")}
            options={statusOptions}
          />
        </Box>
      }
      <Box mt="24px">
        <CustomTextarea
          maxHeight="46px"
          value={watch("desc")}
          watch={watch}
          withLimit
          placeholder={t("Введите")}
          register={register}
          errors={errors}
          name="desc"
          label={t("Описание")}
          onChange={(e) => {
            const value = e.target.value;
            if(value.length <= 1000) {
              setValue("desc", value.replace(/\d/g, ""));
            }
          }}
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
      <Flex gap="24px" mt="16px" flexDirection={isLargerThan845 ? "row" : "column"}>
        <TextFieldWithAddition
          additionalItemLabel={t("Стоимость")}
          name="price"
          register={register}
          control={control}
          additionalItemName="currency_id"
          additionalItemDefaultIndex={0}
          placeholder={t("Введите сумму")}
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
          label={t("Контакт")}
          rules={rules}
        />
      </Flex>
    </MainContentCard>
  );
};

function FileUploadPlaceholder() {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  return (
    <Box fontSize={isLargerThan845 ? "14px" : "10px"} lineHeight={isLargerThan845 ? "20px" : "16px"}>
        Нажмите, чтобы изменить фото{" "}
      <Text as="span" color="brand.600">
          или перетащите
      </Text>
      <Text color="brand.600" fontSize={isLargerThan845 ? "14px" : "8px"}>
          SVG, PNG, JPG or GIF (max. 800x400px)
      </Text>
    </Box>
  );
}
