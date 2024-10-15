"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { AuthTitle } from "../AuthTitle";
import { Dropdown } from "@/components/Dropdown";
import { useRegistrationFormProps } from "./useRegistrationFormProps";
import { TextField } from "@/components/TextField";
import { EyeIcon, EyeIconOff, HelpCircleIcon } from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";
import { MobileLogo } from "../MobileLogo";
import cls from "./style.module.scss";
import { useState } from "react";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { TextFieldWithAdditionAut } from "@/components/TextFieldWithAddition/TextFieldWithAdditionAut";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { UploadImg } from "@/components/UploadImg";

export const RegistrationForm = () => {
  const {
    clientTypeOptions,
    control,
    register,
    handleSubmit,
    onSubmit,
    handleBack,
    companyOptions,
    t,
    errors,
    handleTogglePasswordVisibility,
    isPasswordVisible,
    watch,
    setStatus,
    setValue,
    status,
  } = useRegistrationFormProps();

  const [value, setValueR] = useState("");
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <MobileLogo />
      <AuthTitle
        w={`100%`}
        mb="32px"
        title={t("Регистрация нового участника на Furgo")}
      />

      <Box
        className={cls.registerWrap}
        display="flex"
        justifyContent={`space-between`}
        gap="60px"
        mb="24px"
      >
        <Box width={`100%`}>
          <Box>
            <p className={cls.title}>Учётные данные для входа</p>
            <Box className={cls.box}>
              <TextField
                label="Имя"
                name="fullName"
                register={register}
                placeholder={t("Введите свое имя")}
                errors={errors}
                rules={{
                  required: {
                    value: true,
                    message: t("Это поле обязательно"),
                  },
                }}
              />
              <TextField
                label="Придумайте пароль *"
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
                placeholder={t("Минимум 6 символов...")}
                addonAfter={
                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {isPasswordVisible ? <EyeIconOff /> : <EyeIcon />}
                  </button>
                }
              />
            </Box>
            <Box mt={`30px`}>
              <TextField
                label="Email"
                name="email"
                register={register}
                placeholder={t("Введите свое имя")}
                errors={errors}
                rules={{
                  required: {
                    value: true,
                    message: t("Это поле обязательно"),
                  },
                }}
              />
            </Box>
            <Box mt={`30px`}>
              <TextField
                label="Номер телефона *"
                name="tel"
                register={register}
                placeholder={t("+998 99 123 4567")}
                errors={errors}
                rules={{
                  required: {
                    value: true,
                    message: t("Это поле обязательно"),
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box width={`100%`}>
          <Box>
            <p className={cls.title}>Тип аккаунта</p>
            <Flex flexDirection={`column`} rowGap={`25px`} mt={`13px`}>
              <div className={cls.tabWrap}>
                <div
                  onClick={() => setStatus(1)}
                  className={status === 1 ? cls.active : ``}
                >
                  Юридическое лицо
                </div>
                <div
                  onClick={() => setStatus(2)}
                  className={status === 2 ? cls.active : ``}
                >
                  Физическое лицо / ИП
                </div>
              </div>

              <Box>
                <p className={cls.label}>Профиль деятельности</p>
                <RadioGroup onChange={setValueR}>
                  <Flex gap={"40px"}>
                    <Radio
                      border={"1px solid rgba(208, 213, 221, 1)"}
                      value={`C1`}
                      size={"md"}
                    >
                      <span
                        className={value === `C1` ? cls.ActiveRadio : cls.radio}
                      >
                        Перевозчик
                      </span>
                    </Radio>
                    <Radio
                      isDisabled={Boolean(status === 1)}
                      border={"1px solid rgba(208, 213, 221, 1)"}
                      value={`C2`}
                      size={"md"}
                    >
                      <span
                        className={value === `C2` ? cls.ActiveRadio : cls.radio}
                      >
                        Заказчик / диспетчер
                      </span>
                    </Radio>
                  </Flex>
                </RadioGroup>
              </Box>
              {status === 1 ? (
                <>
                  <Box>
                    <p className={cls.label}>Профиль деятельности</p>
                    <TextFieldWithAdditionAut
                      // disabled={!canEdit}
                      name="companyName"
                      register={register}
                      control={control}
                      additionalItemName="company_type"
                      additionalItemDefaultIndex={0}
                      placeholder={t("Введите названи...")}
                      errors={errors}
                      type="text"
                      width="100%"
                      additionalItemOptions={[{ label: `OOO`, value: `OOO` }]}
                      zIndex={20}
                      // after={watch(`price_prepayment_unit`)?.label}
                    />
                  </Box>

                  <Box>
                    <p className={cls.label}>ИНН организации *</p>
                    <TextField
                      // label="Имя"
                      name="inn"
                      register={register}
                      placeholder={t("Введите свое имя")}
                      errors={errors}
                      rules={{
                        required: {
                          value: true,
                          message: t("Это поле обязательно"),
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <p className={cls.label}>Имя и фамилия руководителя </p>
                    <TextField
                      // label="Имя"
                      name="inn"
                      register={register}
                      placeholder={t("Введите свое имя")}
                      errors={errors}
                      rules={{
                        required: {
                          value: true,
                          message: t("Это поле обязательно"),
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <p className={cls.label}>Юридический адрес</p>
                    <TextField
                      // label="Имя"
                      name="adress"
                      register={register}
                      placeholder={t("Введите свое имя")}
                      errors={errors}
                      rules={{
                        required: {
                          value: true,
                          message: t("Это поле обязательно"),
                        },
                      }}
                    />
                  </Box>
                </>
              ) : (
                <Flex flexDirection={`column`} rowGap={`20px`}>
                  {value === `C2` && (
                    <Dropdown
                      options={companyOptions}
                      control={control}
                      name="company"
                      label={t("Компания")}
                      errors={errors}
                      required={{
                        value: true,
                        message: t("Это поле обязательно"),
                      }}
                    />
                  )}
                  <Box>
                    <p className={cls.label}>Серия и номер паспорта *</p>
                    <Flex gap={`20px`}>
                      <Box width={`30%`}>
                        <TextField
                          register={register}
                          errors={errors}
                          name="passport_scan"
                          placeholder="AA"
                          rules={{
                            required: "Ism kiritish majburiy",
                            validate: (value) =>
                              value.length === 2 ||
                              "Faqat ikkita harf kiriting",
                            onChange: (e) => {
                              console.log(`value`, e);
                              e.target.value = e.target.value
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
                        placeholder="000 00 00"
                        rules={{
                          required: "Telefon raqami majburiy",
                          validate: (value) =>
                            /^\d{3} \d{2} \d{2}$/.test(
                              formatPhoneNumber(value)
                            ) || "Format noto‘g‘ri",
                          onChange: (e) => {
                            e.target.value = formatPhoneNumber(e.target.value);
                          },
                        }}
                      />
                    </Flex>
                  </Box>
                </Flex>
              )}
            </Flex>
          </Box>
        </Box>
        <Box width={`50%`}>
          <Box>
            <p className={cls.title}>Логотип компании</p>
            <Flex
              flexDirection={"column"}
              alignItems={`center`}
              justifyContent={`center`}
              rowGap={"10px"}
              textAlign={"center"}
              width={"100%"}
              mt={`15px`}
            >
              <UploadImg
                watch={watch}
                setValue={setValue}
                name={`imd`}
                icon={`YOUR LOO`}
                text={`Загрузить лого`}
                isColor
              />
            </Flex>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent={`space-between`} mt="30px">
        <Box mb="16px">
          <Checkbox filled register={register} name="acceptTerms">
            Нажимая кнопку “Сохранить профиль”, вы принимаете <br /> условия
            Пользовательская соглашения
          </Checkbox>
        </Box>
        <Button
          width={`20%`}
          type="submit"
          mb="16px"
          isDisabled={!watch("acceptTerms")}
        >
          {t("Сохранить профиль")}
        </Button>
      </Box>
    </Box>
  );
};
