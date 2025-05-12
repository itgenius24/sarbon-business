"use client";
import {
  EyeIcon,
  EyeIconOff,
  GoogleIcon,
  QuestionIcon,
} from "@/assets/icons/icons";
import { Dropdown } from "@/components/Dropdown";
import { TextField } from "@/components/TextField";
import { TextFieldWithAdditionAut } from "@/components/TextFieldWithAddition/TextFieldWithAdditionAut";
import { UploadImg } from "@/components/UploadImg";
import { UploadImgRigister } from "@/components/UploadImgRigister";
import {
  Avatar,
  Box,
  Flex,
  Radio,
  RadioGroup,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

const MobileRegistrationForm = ({
  cls,
  errors,
  register,
  isPasswordVisible,
  t,
  handleTogglePasswordVisibility,
  formatPhoneNumber,
  value,
  status,
  setValueR,
  control,
  companyOptions,
  setStatus,
  watch,
  setValue,
  authStore,
}) => {
  return (
    <Box
      className={cls.registerWrap}
      display="flex"
      justifyContent={`space-between`}
      flexDirection={`column`}
      rowGap={`40px`}
      mb="24px"
    >
      <Box width={`100%`}>
        <p className={cls.title}>Учётные данные для входа</p>

        {authStore?.authData?.mediaAuth ? (
          <Box className={cls.box}>
            <Flex
              width={`fit-content`}
              justifyContent={`space-around`}
              alignItems={`center`}
              className={cls.authWrap}
            >
              <Avatar
                size="sm"
                src=""
                name={authStore?.authData?.mediaAuth?.full_name}
              />
              <Box>
                <Text lineHeight={`18px`} fontSize={`14px`} fontWeight={`600`}>
                  {authStore?.authData?.mediaAuth?.full_name}
                </Text>
                <Text lineHeight={`15px`} fontSize={`13px`} fontWeight={`400`}>
                  {authStore?.authData?.mediaAuth?.email}
                </Text>
              </Box>
              <GoogleIcon />
            </Flex>
          </Box>
        ) : (
          <Box className={cls.box}>
            <Box>
              <Flex gap={1}>
                <p className={cls.label}>Логин</p>
                <Tooltip
                  background={`rgba(21, 186, 77, 1)`}
                  borderRadius={`6px`}
                  lineHeight={`18px`}
                  color={`#fff`}
                  fontSize={`14px`}
                  placement="top"
                  top={`10px`}
                  label={
                    <p className={cls.label}>
                      Вы можете использовать для логина номер телефона, email
                      или уникальное имя пользователя
                    </p>
                  }
                >
                  <div>
                    <QuestionIcon />
                  </div>
                </Tooltip>
              </Flex>
              <TextField
                label=""
                name="login"
                register={register}
                placeholder={t("Введите свое логин")}
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
              <p className={cls.label}>Придумайте пароль *</p>
              <TextField
                label=""
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
          </Box>
        )}
      </Box>

      <Box width={`100%`}>
        <Box>
          <p className={cls.title}>Тип аккаунта</p>
          <Flex flexDirection={`column`} rowGap={`40px`} mt={`13px`}>
            <div className={cls.tabWrap}>
              <div
                onClick={() => {
                  setStatus(1);
                  setValueR(`C1`);
                }}
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

            {/* <Box>
              <p className={cls.label}>Профиль деятельности</p>
              <RadioGroup value={value} onChange={setValueR}>
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
                      Заказчик
                    </span>
                  </Radio>
                </Flex>
              </RadioGroup>
            </Box> */}
            {status === 1 ? (
              <Flex flexDirection={`column`} rowGap={`40px`}>
                <Box>
                  <p className={cls.label}>Название орзанизации *</p>
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
                    rules={{
                      required: {
                        value: true,
                        message: t("Это поле обязательно"),
                      },
                    }}
                    additionalItemOptions={[{ label: `OOO`, value: `OOO` }]}
                    zIndex={20}
                    // after={watch(`price_prepayment_unit`)?.label}
                  />
                </Box>

                <Box>
                  <p className={cls.label}>ИНН организации *</p>
                  <TextField
                    // label="Имя"
                    type="number"
                    name="inn"
                    register={register}
                    placeholder={t("Введите номер ИНН...")}
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
                    name="full_name"
                    register={register}
                    placeholder={t("Имя фамилия...")}
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
                    placeholder={t("Страна, город улица, дом...")}
                    errors={errors}
                    rules={{
                      required: {
                        value: true,
                        message: t("Это поле обязательно"),
                      },
                    }}
                  />
                </Box>
              </Flex>
            ) : (
              <Flex flexDirection={`column`} rowGap={`40px`}>
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
                  <p
                    style={{ marginBottom: `10px` }}
                    className={cls.textFieldName}
                  >
                    Ваше имя и фамилия *
                  </p>
                  <TextField
                    register={register}
                    errors={errors}
                    name="full_name"
                    placeholder="Ваше имя..."
                  />
                </Box>
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
                          required: "Это поле обязательно",
                          validate: (value) => {
                            if (!/^[A-Z]*$/.test(value)) {
                              return "Faqat harflar kiriting";
                            }
                            if (value.length !== 2) {
                              return "Faqat ikkita harf kiriting";
                            }
                            return true;
                          },
                        }}
                        onChange={(e) => {
                          e.target.value = e.target.value
                            .replace(/[^A-Za-z]/g, "") // Remove any non-letter characters
                            .toUpperCase()
                            .slice(0, 2); // Limit to 2 characters
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

      <Box width={`100%`}>
        <Box>
          <p className={cls.title}>Логотип компании</p>
          <Flex
            width={"100%"}
            mt={`15px`}
            // background={'red'}
          >
            <UploadImg
              watch={watch}
              setValue={setValue}
              name={`img`}
              icon={`YOUR LOGO`}
              text={`Загрузить лого`}
              isColor
            />
          </Flex>
        </Box>
      </Box>

      <Box>
        <TextField
          label="Email"
          name="email"
          register={register}
          disabled={authStore?.authData?.mediaAuth && true}
          placeholder={t("Введите свое имя")}
          errors={errors}
          // rules={{
          //   required: {
          //     value: true,
          //     message: t("Это поле обязательно"),
          //   },
          // }}
        />
      </Box>
      <Box>
        <TextField
          label="Номер телефона *"
          name="tel"
          disabled={authStore?.authData?.mediaAuth && false}
          register={register}
          placeholder={t("+998 99 123 4567")}
          errors={errors}
          rules={
            authStore?.authData?.mediaAuth
              ? {
                  required: {
                    value: true,
                    message: t("Это поле обязательно"),
                  },
                }
              : false
          }
        />
      </Box>
    </Box>
  );
};

export default MobileRegistrationForm;
