import cls from "./styles.module.scss";
import {
  Email,
  EyeIcon,
  EyeIconOff,
  PasswordIconNav,
  PhotoIcon,
} from "@/assets/icons/icons";
import { TextField } from "@/components/TextField";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";
import { useProfileInfoFormProps } from "./useProfileInfoFormProps";
import { useTranslation } from "react-i18next";
import { TextFieldWithAdditionAut } from "@/components/TextFieldWithAddition/TextFieldWithAdditionAut";
import authStore from "@/store/auth.store";

export const ProfileInfoForm = ({
  errors,
  watch,
  reset,
  register,
  setValue,
}) => {
  const {
    rules,
    full_name,
    email,
    login,
    photo,
    isLoading,
    handleImageUpload,
    isOpen,
    onClose,
    onOpen,
    isPasswordVisible,
    setPasswordVisible,
    isPasswordVisible2,
    setPasswordVisible2,
    changePass,
    formatPhoneNumber,
  } = useProfileInfoFormProps(setValue, reset, watch);

  console.log(`watch`, watch(`fill_name`));

  const { t } = useTranslation();

  

  if (isLoading) return <SkeletonComp />;

  return (
    <div className={cls.profileInfo}>
      <Text
        marginBottom={`20px`}
        fontWeight={600}
        fontSize={`22px`}
        color={`rgba(33, 31, 38, 1)`}
      >
        {watch(`tip_account`)?.[0] === `legal_owner`
          ? `Мои данные`
          : `Персональные данные`}
      </Text>

      {watch(`tip_account`)?.[0] === `legal_owner` && authStore?.userData?.role_id === "f81d3c3d-228d-479e-a2b1-9948c98640f2" ? (
        <Box>
          <div className={cls.fields}>
            <TextFieldWithAdditionAut
              label={t("Название орзанизации *")}
              name="company_name"
              register={register}
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
            <TextField
              register={register}
              errors={errors}
              name="tin"
              label={t("ИНН организации *")}
              defaultValue={full_name?.split(" ")?.[1]}
              placeholder="Введите номер ИНН..."
            />
          </div>
          <div className={cls.fields}>
            <TextField
              register={register}
              errors={errors}
              name="phone_number"
              label={t("Номер телефона")}
              defaultValue={full_name?.split(" ")?.[1]}
              placeholder="Введите номер для связи..."
            />
            <TextField
              register={register}
              errors={errors}
              name="full_name"
              label={t("Имя и фамилия руководителя ")}
              defaultValue={full_name?.split(" ")?.[1]}
              placeholder="Имя фамилия..."
            />
          </div>
          <div className={cls.fields}>
            <TextField
              addonBefore={<Email />}
              register={register}
              errors={errors}
              type="email"
              name="email"
              label={t("Почта")}
              rules={rules}
              defaultValue={email}
              placeholder="artlaliwer@gmail.com"
            />
            <TextField
              register={register}
              errors={errors}
              name="building_address"
              label={t("Юридический адрес")}
              defaultValue={full_name?.split(" ")?.[1]}
              placeholder="Страна, город улица, дом..."
            />
          </div>
        </Box>
      ) : (
        <Box>
          <div className={cls.fields}>
            <TextField
              register={register}
              errors={errors}
              name="full_name"
              label={t("Фамилия, имя")}
              placeholder="Фамилия, имя"
            />
            <Box width={`100%`}>
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
                      /^\d{3} \d{2} \d{2}$/.test(formatPhoneNumber(value)) ||
                      "Format noto‘g‘ri",
                    onChange: (e) => {
                      e.target.value = formatPhoneNumber(e.target.value);
                    },
                  }}
                />
              </Flex>
            </Box>
          </div>
          <div className={cls.fields}>
            <TextField
              register={register}
              errors={errors}
              name="phone_number"
              label={t("Номер телефона")}
              placeholder="Введите номер для связи..."
            />
            <TextField
              register={register}
              errors={errors}
              name="pnfl"
              label={t("ПИНФЛ")}
              placeholder="ПИНФЛ"
            />
          </div>
          <div className={cls.fields}>
            <TextField
              addonBefore={<Email />}
              register={register}
              errors={errors}
              type="email"
              name="email"
              label={t("Почта")}
              rules={rules}
              defaultValue={email}
              placeholder="Email"
            />
            <Box width={`100%`}></Box>
          </div>
        </Box>
      )}

      <Box className={cls.loginWrap} mt={`40px`}>
        <Text
          marginBottom={`20px`}
          fontWeight={600}
          fontSize={`22px`}
          color={`rgba(33, 31, 38, 1)`}
        >
          Учётные данные для входа
        </Text>
        <Flex alignItems={`self-end`} gap={`32px`}>
          <TextField
            disabled
            register={register}
            errors={errors}
            name="login"
            label={t("Логин")}
            // defaultValue={login}
            placeholder={login}
          />
          <TextField
            disabled
            register={register}
            errors={errors}
            name="password"
            label={t("Пароль")}
            placeholder="•••••••"
          />
          <Flex
            onClick={onOpen}
            borderRadius={`6px`}
            border={`1px solid rgba(0, 122, 255, 1)`}
            color={`rgba(0, 122, 255, 1)`}
            fontWeight={600}
            padding={`9px 22px`}
            background={`white`}
            width={`100%`}
            as={`button`}
            type="button"
            gap={`6px`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            <PasswordIconNav />
            Сменить пароль
          </Flex>
        </Flex>
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text mt={`10px`} fontSize={`18px`} fontWeight={600}>
              Сменить пароль
            </Text>
          </ModalHeader>

          <ModalBody>
            <Flex rowGap={`30px`} flexDirection={`column`}>
              <TextField
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: t("Это поле обязательно для заполнения"),
                  },
                }}
                errors={errors}
                name="old_password"
                type={isPasswordVisible ? "text" : "password"}
                label={t("Старый пароль")}
                placeholder={t("Введите текущий пароль...")}
                addonAfter={
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <EyeIconOff /> : <EyeIcon />}
                  </button>
                }
              />
              <TextField
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: t("Это поле обязательно для заполнения"),
                  },
                }}
                errors={errors}
                name="new_password"
                type={isPasswordVisible ? "text" : "password"}
                label={t("Новый пароль")}
                placeholder={t("Минимум 6 символов...")}
                addonAfter={
                  <button
                    type="button"
                    onClick={() => setPasswordVisible2(!isPasswordVisible2)}
                  >
                    {isPasswordVisible ? <EyeIconOff /> : <EyeIcon />}
                  </button>
                }
              />
            </Flex>
          </ModalBody>

          <ModalFooter gap={`12px`}>
            <Button onClick={changePass}>Сохранить пароль</Button>
            <Button
              onClick={onClose}
              _hover={{
                background: `white`,
              }}
              backgroundColor={`white`}
              color={`black`}
              border={`1px solid rgba(208, 213, 221, 1)`}
            >
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
