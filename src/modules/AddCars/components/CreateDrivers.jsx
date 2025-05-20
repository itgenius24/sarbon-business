import {
  DriversIcon,
  EyeIcon,
  EyeIconOff,
  Img3UploadIcon,
  ImgploadIcon1,
  ImgploadIcon2,
  UserIcon2,
} from "@/assets/icons/icons";
import FormInternationInput from "@/components/Input/FormInternationalInput";
import { TextField } from "@/components/TextField";
import { UploadImgMobile } from "@/components/UploadImgMobile";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
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
  id,
  setLoadingDriver,
  loadingDriver,
  uploadAi,
  clearErrors,
  setLoadingFront,
  setLoadingBack,
  loadingBack,
  loadingFront,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setFileUploadLoading] = useState(false);
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
        // gap={`35px`}
        padding={`20px 10px`}
        mt={`15px`}
        flexDirection={`column`}
      >
        <Flex
          flexDirection={"column"}
          rowGap={isLargerThan845 ? "20px" : `40px`}
          width={"100%"}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(0, 0, 0, 0.1)`}
        >
          <Box>
            <Flex mb={`18px`} alignItems={`center`} gap={`6px`}>
              {/* <DriversIcon /> */}
              <Heading
                color={`var(--primary-text)`}
                fontSize={`20px`}
                fontWeight={600}
              >
                {t(`Загрузите фото`)}
                {/* {t("Добавление водителя")} */}
              </Heading>
            </Flex>
            <UploadImgMobile
            isCrop
              watch={watch}
              setValue={setValue}
              name={"drivers_license"}
              text={t("Фото водительского удостоверения *")}
              icon={<Img3UploadIcon />}
              register={register}
              errors={errors}
              rules={{ required: t("Это поле объязательно") }}
              setLoading={setLoadingDriver}
              isLoading={loadingDriver}
              type={`driver_pass`}
              uploadAi={uploadAi}
              clearErrors={clearErrors}
            />
          </Box>
        </Flex>

        <Flex mt={`10px`} gap={4} flexDirection={`column`}>
          <UploadImgMobile
          isCrop
            watch={watch}
            setValue={setValue}
            name={"front_side_trailer"}
            icon={<ImgploadIcon1 />}
            text={t("Фото техпаспорта спереди *")}
            register={register}
            errors={errors}
            rules={{ required: t("Это поле объязательно") }}
            setLoading={setLoadingFront}
            isLoading={loadingFront}
            uploadAi={uploadAi}
            type={`tech_pass`}
            clearErrors={clearErrors}
          />
          <UploadImgMobile
          isCrop
            watch={watch}
            setValue={setValue}
            name={"back_side_trailer"}
            icon={<ImgploadIcon2 />}
            text={t("Фото техпаспорта сзади *")}
            register={register}
            errors={errors}
            rules={{ required: t("Это поле объязательно") }}
            uploadAi={uploadAi}
            setLoading={setLoadingBack}
            isLoading={loadingBack}
            type={`tech_pass`}
            clearErrors={clearErrors}
          />
        </Flex>
        <Flex mt={`40px`} mb={`10px`} alignItems={`center`} gap={`6px`}>
          <DriversIcon />
          <Heading
            color={`var(--primary-text)`}
            fontSize={`20px`}
            fontWeight={600}
          >
            {t(`Водитель`)}
          </Heading>
        </Flex>
        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(0, 0, 0, 0.1)`}
        >
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
                  required: true,
                  // validate: (value) => {
                  //   // if (!/^[A-Z]*$/.test(value)) {
                  //   //   return t("Введите только буквы");
                  //   // }
                  //   if (value.length <= 1) {
                  //     return t("Введите только две буквы");
                  //   }
                  //   return true;
                  // },
                  onChange: (e) => {
                    e.target.value = e.target.value
                      .replace(/[^A-Za-z]/g, "")
                      .toUpperCase()
                      .slice(0, 2);
                  },
                }}
              />
            </Box>
            <TextField
              register={register}
              errors={errors}
              name="passport_code"
              placeholder={t("000 00 00")}
              rules={{
                required: t("Это поле объязательно "),
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
        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
        >
          <p className={cls.textFieldName}>{t("Имя и фамилия")} *</p>
          <TextField
            register={register}
            errors={errors}
            name="full_name"
            placeholder={t("Имя и фамилия водителя")}
            rules={{
              required: t("Это поле объязательно "),
            }}
          />
        </Box>

        <Box
          mt={`25px`}
          paddingBottom={`25px`}
          borderBottom={`1px solid rgba(219, 216, 227, 1)`}
        >
          <p className={cls.textFieldName}>{t("Телефон водителя")} *</p>
          <TextField
            register={register}
            errors={errors}
            name="phone"
            type="text"
            placeholder={t("Телефон водителя")}
            rules={{
              required: t("Это поле объязательно "),
            }}
          />
        </Box>

        {!id && (
          <Box
            mt={`25px`}
            paddingBottom={`25px`}
            borderBottom={`1px solid rgba(219, 216, 227, 1)`}
          >
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
        )}

        <Box mt={`25px`}>
          <p className={cls.textFieldName}>{t("Фото водителя")}</p>

          <UploadImgMobile
            isColor={true}
            watch={watch}
            setValue={setValue}
            name={"photo"}
            text={t("Загрузить фото")}
            icon={<UserIcon2 />}
            setFileUploadLoading={setFileUploadLoading}
            isLoading={isLoading}
          />
        </Box>
      </Flex>
    </>
  );
};

export default CreateDrivers;
