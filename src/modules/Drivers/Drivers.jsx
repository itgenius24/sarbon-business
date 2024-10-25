"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";

import { useMyCars } from "./useMyCars";
import cls from "./style.module.scss";
import { TextField } from "@/components/TextField";
import { UploadImg } from "@/components/UploadImg";
import {
  CheckModalIcon,
  EyeIcon,
  EyeIconOff,
  Img3UploadIcon,
  UserIcon2,
} from "@/assets/icons/icons";
import { useState } from "react";
import FormInternationInput from "@/components/Input/FormInternationalInput";

export const DriversModule = () => {
  const {
    t,
    control,
    watch,
    setValue,
    register,
    errors,
    handleSubmit,
    onSubmit,
    id,
    isPopupOpen,
    setIsPopupOpen,
    router,
    locale,
    copyFunction
  } = useMyCars();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
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
      <Container my="40px">
        <Heading
          size={isLargerThan845 ? "md" : "sm"}
          mb={isLargerThan845 ? "24px" : "12px"}
        >
          {t("Добавление нового водителя")}
        </Heading>

        <Flex
          width={"100%"}
          background={"white"}
          borderRadius={"12px"}
          gap={"90px"}
          padding={"61px 53px"}
          mt={"37px"}
        >
          <Flex flexDirection={"column"} rowGap={"20px"} width={"100%"}>
            <Box>
              <p className={cls.textFieldName}>Имя и фамилия *</p>
              <TextField
                register={register}
                errors={errors}
                name="full_name"
                placeholder="Имя и фамилия водителя..."
              />
            </Box>
            <Box>
              <p className={cls.textFieldName}> Телефон водителя *</p>
              <FormInternationInput control={control} name={`phone`} />
            </Box>
            {!id && (
              <Box>
                <p className={cls.textFieldName}> Придумайте пароль *</p>
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
            )}
          </Flex>
          <Flex flexDirection={"column"} rowGap={"20px"} width={"100%"}>
            <Box>
              <p className={cls.textFieldName}>
                Серия и номер водит. удостоверения *
              </p>
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
                        value.length === 2 || "Faqat ikkita harf kiriting",
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
                      /^\d{3} \d{2} \d{2}$/.test(formatPhoneNumber(value)) ||
                      "Format noto‘g‘ri",
                    onChange: (e) => {
                      e.target.value = formatPhoneNumber(e.target.value);
                    },
                  }}
                />
              </Flex>
            </Box>
            <Box>
              <p className={cls.textFieldName}>
                Фото водительского удостоверения *
              </p>
              <UploadImg
                isColor={true}
                watch={watch}
                setValue={setValue}
                name={"drivers_license"}
                text={"Загрузить фото"}
                icon={<Img3UploadIcon />}
              />
            </Box>
          </Flex>
          <Flex
            flexDirection={"column"}
            rowGap={"10px"}
            textAlign={"center"}
            width={"50%"}
          >
            <UploadImg
              isColor={true}
              watch={watch}
              setValue={setValue}
              name={"photo"}
              text={"Загрузить фото"}
              icon={<UserIcon2 />}
            />
            <p>Фото водителя</p>
            <p className={cls.subTitle}>{"(можно позже)"}</p>
          </Flex>
        </Flex>
        <Button
          // isDisabled={disabledBtn}
          onClick={handleSubmit(onSubmit)}
          // rightIcon={<NextArrowIcon />}
          className={cls.nextBtn}
        >
          Сохранить водителя
        </Button>

        <Modal isOpen={isPopupOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <CheckModalIcon />
            </ModalHeader>
            <ModalCloseButton onClick={() => setIsPopupOpen(false)} />
            <ModalBody>
              <p style={{ fontWeight: 600, fontSize: "18px" }}>
                Водитель успешно добавлен в систему
              </p>
              <p style={{ fontWeight: 400, fontSize: "14px" }}>
                Передайти ему данные для входа в приложение Furgo:
              </p>
              <Flex gap={`20px`}>
                <Box>
                  <p style={{ fontWeight: 400, fontSize: "14px" }}>
                    Его логин:
                  </p>
                  <p style={{ fontWeight: 400, fontSize: "14px" }}>
                    {watch(`phone`)}
                  </p>
                </Box>
                <Box>
                  <p style={{ fontWeight: 400, fontSize: "14px" }}>
                    Его пароль:
                  </p>
                  <p style={{ fontWeight: 400, fontSize: "14px" }}>
                    {watch(`password`)}
                  </p>
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() =>     copyFunction
()                }
                style={{
                  background: "white",
                  border: "1px solid rgba(208, 213, 221, 1)",
                  color: "black",
                }}
                className={cls.btnOutline}
                mr={3}
              >
                Скопировать детали
              </Button>
              <Button
                style={{
                  background: "white",
                  border: "1px solid rgba(208, 213, 221, 1)",
                  color: "black",
                }}
                className={cls.btngreen}
                onClick={() => router.push(`/${locale}/drivers`)}
              >
                Отправить как смс
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
};
