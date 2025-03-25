import {
  EyeIcon,
  EyeIconOff,
  Img3UploadIcon,
  UserIcon2,
} from "@/assets/icons/icons";
import FormInternationInput from "@/components/Input/FormInternationalInput";
import { TextField } from "@/components/TextField";
import { UploadImg } from "@/components/UploadImg";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

const CreateDrivers = ({
  isLargerThan845,
  cls,
  register,
  errors,
  t,
  control,
  watch,
  setValue,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  function handleTogglePasswordVisibility() {
    setPasswordVisible(!isPasswordVisible);
  }

  const formatPhoneNumber = (value) => {
    let input = value.replace(/\D/g, ""); // Faqat raqamlarni olish
    if (input.length > 3) input = input.slice(0, 3) + " " + input.slice(3);
    if (input.length > 6) input = input.slice(0, 6) + " " + input.slice(6, 8);
    if (input.length > 9) input = input.slice(0, 9); // Qo'shimcha raqamlarni olib tashlash
    return input;
  };

  return (
    <>
      <Flex
        width={"100%"}
        background={"white"}
        borderRadius={"12px"}
        gap={`35px`}
        padding={`31px 10px`}
        mt={ `15px`}
        flexDirection={`column`}
      >
        <Flex
          flexDirection={"column"}
          rowGap={isLargerThan845 ? "20px" : `40px`}
          width={"100%"}
        >
    
          <Box>
            <UploadImg
              isColor={true}
              watch={watch}
              setValue={setValue}
              name={"drivers_license"}
              text={t("Фото водительского удостоверения *")}
              icon={<Img3UploadIcon />}
            />
          </Box>
  
        </Flex>
        <Flex
          flexDirection={"column"}
          rowGap={isLargerThan845 ? "20px" : `40px`}
          width={"100%"}
        >
          <Box>
            <p className={cls.textFieldName}>
              {t("Серия и номер водит. удостоверения")} *
            </p>
            <Flex gap={`20px`}>
              <Box width={`30%`}>
                <TextField
                  register={register}
                  errors={errors}
                  name="passport_scan"
                  placeholder={t("AA")}
                  rules={{
                    required: t("Это поле обязательно"),
                    validate: (value) => {
                      if (!/^[A-Z]*$/.test(value)) {
                        return t("Введите только буквы");
                      }
                      if (value.length !== 2) {
                        return t("Введите только две буквы");
                      }
                      return true;
                    },
                  }}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/[^A-Za-z]/g, "")
                      .toUpperCase()
                      .slice(0, 2);
                  }}
                />
              </Box>
              <TextField
                register={register}
                errors={errors}
                name="passport_code"
                placeholder={t("000 00 00")}
                rules={{
                  required: t("Номер телефона обязателен"),
                  validate: (value) =>
                    /^\d{3} \d{2} \d{2}$/.test(formatPhoneNumber(value)) ||
                    t("Неверный формат"),
                  onChange: (e) => {
                    e.target.value = formatPhoneNumber(e.target.value);
                  },
                }}
              />
            </Flex>
          </Box>
          <Box>
              <p className={cls.textFieldName}>{t("Имя и фамилия")} *</p>
              <TextField
                register={register}
                errors={errors}
                name="full_name"
                placeholder={t("Имя и фамилия водителя")}
              />
            </Box>

          <Box>
            <p className={cls.textFieldName}>{t("Телефон водителя")} *</p>
            <FormInternationInput control={control} name={`phone`} />
          </Box>
      
          <Box>
            <p className={cls.textFieldName}>{t("Придумайте пароль")} *</p>
            <TextField
              register={register}
              rules={{
                required: {
                  value: true,
                  message: t("Это поле обязательно для заполнения"),
                },
              }}
              errors={errors}
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder={t("Минимум 6 символов")}
              addonAfter={
                <button type="button" onClick={handleTogglePasswordVisibility}>
                  {isPasswordVisible ? <EyeIconOff /> : <EyeIcon />}
                </button>
              }
            />
          </Box>
        </Flex>
        <Flex
          flexDirection={"column"}
          rowGap={isLargerThan845 ? "10px" : 0}
          textAlign={isLargerThan845 ? "center" : `left`}
          width={isLargerThan845 ? "50%" : `100%`}
        >
          <p
            className={cls.textFieldName}
            style={{ display: isLargerThan845 ? `none` : `block` }}
          >
            {t("Фото водителя")}
            
          </p>

          <UploadImg
            isColor={true}
            watch={watch}
            setValue={setValue}
            name={"photo"}
            text={t("Загрузить фото")}
            icon={<UserIcon2 />}
          />
      
    
        </Flex>
      </Flex>
    </>
  );
};

export default CreateDrivers;
