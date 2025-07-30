import cls from "./styles.module.scss";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useAddCargoContext } from "../../providers";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import authStore from "@/store/auth.store";
import { useGetStoreData } from "@/hooks/useGetStoreData";
import { CustomTextarea } from "@/components/CustomTextarea";
import { allowOnlyNumbers } from "@/utils/allowOnlyNumbers";
import { useTranslation } from "react-i18next";

export const Contacts = () => {

  const { register, setValue, watch, canEdit } = useAddCargoContext();
  const { value: userData } = useGetStoreData(authStore, "userData");
  const { t } = useTranslation();

  return <Box pt="24px" borderTop="1px solid" borderColor="brand.200" >
    <Box className={cls.fieldsWrapper} display="flex" columnGap="32px" mb="24px">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">{t(`Контакты`)}</Heading>
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">{t(`укажите, к кому обратиться по объявлению`)}</Text>
      </Box>
      <TextFieldWithAddition
        disabled={!canEdit}
        additionalItemPosition="left"
        additionalItemTheme="light"
        additionalItemPlaceholder={userData?.full_name || userData?.login}
        onKeyDown={allowOnlyNumbers}
        placeholder="+998 (99) 999-99-99"
        name="contact"
        register={register}
        rules={{
          required: {
            value: true,
            message: "Обязательное поле",
          }
        }}
      />
    </Box>
    <Box className={cls.fieldsWrapper} display="flex" columnGap="32px">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">{t(`Примечание`)}</Heading>
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">{t(`Не указывайте контакты (телефоны, скайп и пр.), иначе ваш груз удалит модератор.`)}</Text>
      </Box>
      <CustomTextarea
        disabled={!canEdit}
        name={"note"}
        watch={watch}
        placeholder={t("Пишите здесь")}
        onChange={(e) => {
          const value = e.target.value;
          if(value.length <= 1000) {
            setValue("note", value);
          }
        }}
        value={watch("note")}
      />
      {/* <Box display="flex" flexDirection="column" rowGap="6px" alignItems="flex-start" flexGrow={1}>
        <Textarea
          isDisabled={!canEdit}
          height="154px"
          width="100%"
          borderRadius="8px"
          borderColor="brand.200"
          _placeholder={{ color: "brand.300" }}
          resize="none"
          name="note"
          placeholder="Пишите здесь"
          value={watch("note")}
          onChange={(e) => {
            const value = e.target.value;
            if(value.length <= 1000) {
              setValue("note", value.replace(/\d/g, ""));
            }
          }}
        />
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">{watch("note")?.length || 0}/1000</Text>
      </Box> */}
    </Box>
  </Box>;
};
