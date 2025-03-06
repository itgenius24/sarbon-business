"use client";

import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { AuthTitle } from "../AuthTitle";
import { Dropdown } from "@/components/Dropdown";
import { useRegistrationFormProps } from "./useRegistrationFormProps";
import { TextField } from "@/components/TextField";
import {
  CheckModalIcon,
  ErroModalIcon,
  EyeIcon,
  EyeIconOff,
  GoogleIcon,
  HelpCircleIcon,
  QuestionIcon,
} from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";
import { MobileLogo } from "../MobileLogo";
import cls from "./style.module.scss";
import { useState } from "react";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { TextFieldWithAdditionAut } from "@/components/TextFieldWithAddition/TextFieldWithAdditionAut";

import { UploadImg } from "@/components/UploadImg";
import { UploadImgRigister } from "@/components/UploadImgRigister";
import MobileRegistrationForm from "./MobileRegistrationForm";
import authStore from "@/store/auth.store";

export const RegistrationForm = () => {
  const {
    clientTypeOptions,
    control,
    register,
    handleSubmit,
    onSubmit,
    companyOptions,
    t,
    errors,
    handleTogglePasswordVisibility,
    isPasswordVisible,
    watch,
    setStatus,
    setValue,
    value,
    setValueR,
    status,
    isPopupOpen,
    login,
    loadin,
    locale,
    setOpen,
    open,
    phone,
    router,
  } = useRegistrationFormProps();

  const formatPhoneNumber = (value) => {
    let input = value.replace(/\D/g, ""); // Faqat raqamlarni olish
    if (input.length > 3) input = input.slice(0, 3) + " " + input.slice(3);
    if (input.length > 6) input = input.slice(0, 6) + " " + input.slice(6, 8);
    if (input.length > 9) input = input.slice(0, 9); // Qo'shimcha raqamlarni olib tashlash
    return input;
  };
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return (
    <>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Box padding={isLargerThan845 ? 0 : `0px 16px`}>
          <AuthTitle
            w={`100%`}
            mb={isLargerThan845 ? "32px" : `10px`}
            title={t("Регистрация нового участника на Sarbon")}
          />
        </Box>
        {isLargerThan845 ? (
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
                {authStore?.authData?.mediaAuth ? (
                  <Box className={cls.box}>
                    <Flex width={`fit-content`} justifyContent={`space-around`} alignItems={`center`} className={cls.authWrap}>
                       <Avatar size='sm' src="" name={authStore?.authData?.mediaAuth?.full_name}/>
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
                              Вы можете использовать для логина номер телефона,
                              email или уникальное имя пользователя
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
                <Box mt={`35px`}>
                  <TextField
                    label="Email"
                    name="email"
                     disabled={authStore?.authData?.mediaAuth && true}
                    register={register}
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
                <Box mt={`30px`}>
                  <TextField
                    label="Номер телефона *"
                    name="tel"
                    disabled={authStore?.authData?.mediaAuth && false}
                    register={register}
                    placeholder={t("+998 99 123 4567")}
                    errors={errors}
                    rules={ authStore?.authData?.mediaAuth ? 
                      {
                        required: {
                          value: true,
                          message: t("Это поле обязательно"),
                        },
                      } : false
                    }
                  />
                </Box>
              </Box>
            </Box>
            <Box width={`100%`}>
              <Box>
                <p className={cls.title}>Тип аккаунта</p>
                <Flex flexDirection={`column`} rowGap={`24px`} mt={`13px`}>
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
                            className={
                              value === `C1` ? cls.ActiveRadio : cls.radio
                            }
                          >
                            Перевозчик
                          </span>
                        </Radio>
                        <Radio
                          isDisabled={true}
                          border={"1px solid rgba(208, 213, 221, 1)"}
                          value={`C2`}
                          size={"md"}
                        >
                          <span
                            className={
                              value === `C2` ? cls.ActiveRadio : cls.radio
                            }
                          >
                            Заказчик
                          </span>
                        </Radio>
                      </Flex>
                    </RadioGroup>
                  </Box> */}
                  {status === 1 ? (
                    <>
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
                          additionalItemOptions={[
                            { label: `OOO`, value: `OOO` },
                            { label: `MChJ`, value: `MChJ` },
                            { label: `XK`, value: `XK` },
                          ]}
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
                                e.target.value = formatPhoneNumber(
                                  e.target.value
                                );
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
                  width={"100%"}
                  mt={`15px`}
                  // background={'red'}
                >
                  <UploadImgRigister
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
          </Box>
        ) : (
          <MobileRegistrationForm
            cls={cls}
            errors={errors}
            register={register}
            isPasswordVisible={isPasswordVisible}
            t={t}
            handleTogglePasswordVisibility={handleTogglePasswordVisibility}
            formatPhoneNumber={formatPhoneNumber}
            value={value}
            status={status}
            setValueR={setValueR}
            control={control}
            companyOptions={companyOptions}
            setStatus={setStatus}
            watch={watch}
            setValue={setValue}
            authStore={authStore}
          />
        )}

        <Box display="flex" justifyContent={`space-between`} mt="30px">
          <Box mb="16px">
            {/* <Checkbox
            width={"20px"}
            height={"20px"}
            filled
            register={register}
            name="acceptTerms"
          >
            Нажимая кнопку “Сохранить профиль”, вы принимаете <br /> условия
            <span style={{ color: "rgba(0, 122, 255, 1)" }}>
              {" "}
              Пользовательская соглашения
            </span>
          </Checkbox> */}
          </Box>
          <Button
            width={isLargerThan845 ? `20%` : `100%`}
            type="submit"
            mb="16px"
            isLoading={loadin}
            backgroundColor={`var(--primary-text)`}
            // isDisabled={!watch("acceptTerms")}
          >
            {t("Сохранить профиль")}
          </Button>
        </Box>
      </Box>

      {isLargerThan845 ? (
        <Modal isOpen={isPopupOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <CheckModalIcon />
            </ModalHeader>
            {/* <ModalCloseButton onClick={() => setIsPopupOpen(false)} /> */}
            <ModalBody>
              <p style={{ fontWeight: 600, fontSize: "18px" }}>
                Профиль успешно добавлен!
              </p>
              <p style={{ fontWeight: 400, fontSize: "14px" }}>
                Теперь можно добавлять автопарк и водителей
              </p>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => login(`my-cars`)}
                style={{
                  background: "white",
                  border: "1px solid rgba(208, 213, 221, 1)",
                  color: "black",
                }}
                className={cls.btnOutline}
                mr={3}
              >
                Добавить машину
              </Button>
              <Button
                style={{
                  background: "white",
                  border: "1px solid rgba(208, 213, 221, 1)",
                  color: "black",
                }}
                className={cls.btngreen}
                onClick={() => login(`drivers`)}
              >
                Добавить водителя
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Drawer placement="bottom" isOpen={isPopupOpen}>
          <DrawerOverlay />
          <DrawerContent borderRadius="12px 12px 0 0">
            <DrawerHeader>
              <CheckModalIcon />
            </DrawerHeader>

            <DrawerBody>
              <Flex flexDirection={`column`} rowGap={`20px`}>
                <p style={{ fontWeight: 600, fontSize: "20px" }}>
                  Профиль успешно добавлен!
                </p>
                <p style={{ fontWeight: 400, fontSize: "16px" }}>
                  Теперь можно добавлять автопарк и водителей
                </p>
              </Flex>
            </DrawerBody>
            <DrawerFooter mb={`20px`}>
              <Flex width={`100%`} flexDirection={`column`} rowGap={`10px`}>
                <Button
                  onClick={() => login(`my-cars`)}
                  backgroundColor={`var(--primary-text)`}
                  mr={3}
                >
                  Добавить машину
                </Button>
                <Button
                  style={{
                    background: "white",
                    border: "1px solid rgba(208, 213, 221, 1)",
                    color: "black",
                  }}
                  className={cls.btngreen}
                  onClick={() => login(`drivers`)}
                >
                  Добавить водителя
                </Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <Modal isOpen={open} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ErroModalIcon />
          </ModalHeader>
          <ModalCloseButton onClick={() => setOpen(false)} />
          <ModalBody>
            <p style={{ fontWeight: 600, fontSize: "18px" }}>
              {t("Вы уже зарегистрировались")}
            </p>
            <Box mt={`14px`}>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: `20px`,
                }}
              >
                {t(
                  "Этот телефон или почта уже зарегистрированы! Пожалуйста, используйте другой"
                )}
              </p>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => router.push(`/${locale}/auth`)}>
              {t(`Войти`)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
