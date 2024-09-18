import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import cls from "./style.module.scss";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { useAddCargoContext } from "../../providers";
import authStore from "@/store/auth.store";
import { useGetStoreData } from "@/hooks/useGetStoreData";
import { allowOnlyNumbers } from "@/utils/allowOnlyNumbers";
import { CustomTextarea } from "@/components/CustomTextarea";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/Checkbox";
const StepFive = () => {
  const { t } = useTranslation();
  const { register, setValue, watch, canEdit } = useAddCargoContext();
  const { value: userData } = useGetStoreData(authStore, "userData");
  return (
<>
<Box className={cls.step1}>
      <Flex alignItems={'center'} justifyContent={'flex-start'}>
        <Box className={cls.box} width={'40%'}>
          <h2 className={cls.title}>Ваши контакты</h2>
          <p className={cls.deck}>укажите, к кому обратиться по объявлению</p>
        </Box>
        <Box width={'50%'}>
          <TextFieldWithAddition
          // disabled={!canEdit}
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
              },
            }}
          />
        </Box>
      </Flex>
      <Flex mt={4} alignItems={'center'} justifyContent={'flex-start'}>
        <Box className={cls.box} width={'40%'}>
          <h2 className={cls.title}>Комментарий</h2>
          <p className={cls.deck}>Не указывайте контакты (телефоны, скайп и пр.), иначе ваш груз удалит модератор.</p>
        </Box>
        <Box width={'50%'}>
          <CustomTextarea
            // disabled={!canEdit}
            name={"note1"}
            watch={watch}
            placeholder={t("Пишите здесь")}
            onChange={(e) => {
              const value = e.target.value;
              if(value.length <= 1000) {
                setValue("note1", value);
              }
            }}
            value={watch("note1")}
            height={'10px'}
          />
        </Box>
      </Flex>
    </Box>

</>
  );
};

export default StepFive;
