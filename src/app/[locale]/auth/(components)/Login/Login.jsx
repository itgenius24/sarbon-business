"use client";

import cls from "./styles.module.scss";
import { useLoginProps } from "./useLoginProps";
import { AuthTitle } from "../AuthTitle";
import { TextField } from "@/components/TextField";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Checkbox } from "@/components/Checkbox";
import {
  ArrowLeft,
  ErroModalIcon,
  EyeIcon,
  EyeIconOff,
} from "@/assets/icons/icons";
import Link from "next/link";
import { MobileLogo } from "../MobileLogo";

export const Login = () => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    navigateRegistration,
    isPending,
    onRememberChange,
    t,
    isPasswordVisible,
    handleTogglePasswordVisibility,
    navigateToMain,
    locale,
    open,
    setOpen,
  } = useLoginProps();

  return (
    <>
      <Box
        height={`100%`}
        width={`100%`}
        display={`flex`}
        flexDirection={`column`}
        alignItems={`center`}
        justifyContent={`space-between`}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box width={`100%`}>
          <AuthTitle mb="32px" title={t("Вход в Furgo")} subtitle="" />

          <Box mb="24px" display="flex" flexDirection="column" rowGap="20px">
            <TextField
              register={register}
              rules={{
                required: {
                  value: true,
                  message: t("Это поле обязательно для заполнения"),
                },
              }}
              errors={errors}
              name="username"
              label={t("Логин")}
              placeholder={t("Введите свой логин")}
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
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              label={t("Пароль")}
              placeholder={t("Введите свой пароль")}
              addonAfter={
                <button type="button" onClick={handleTogglePasswordVisibility}>
                  {isPasswordVisible ? <EyeIconOff /> : <EyeIcon />}
                </button>
              }
            />
          </Box>
          <div className={cls.rememberWrapper}>
            <Checkbox onChange={onRememberChange}>{t("Запомнить")}</Checkbox>
            <Link className={cls.forgotLink} href={`/${locale}/auth/forgot`}>
              {t("Забыли логин или пароль?")}
            </Link>
          </div>

          <Button mt="24px" size="md" type="submit" isLoading={isPending}>
            {t("Войти")}
          </Button>
        </Box>
        <Box mt="30%" display="flex" justifyContent="center" columnGap="4px">
          <Text fontSize="14px" color="brand.600" lineHeight="20px">
            {t("Еще нет аккаунта?")}
          </Text>
          <Button variant="reset" onClick={navigateRegistration}>
            {t("Зарегистрироваться")}
          </Button>
        </Box>
      </Box>
      <Modal isOpen={open} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ErroModalIcon />
          </ModalHeader>
          <ModalCloseButton onClick={() => setOpen(false)} />
          <ModalBody>
            <Box>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: `22px`,
                }}
              >
                {t(
                  "Вы уже зарегистрированы как водитель. Войдите в аккаунт через мобильное"
                )}
                <a
                  target="_blank"
                  href="https://links.sarbon.me/"
                  style={{
                    color: `rgba(0, 122, 255, 1)`,
                    cursor: `pointer`,
                    marginLeft: `5px`,
                  }}
                >
                  {t("приложение Sarbon")}
                </a>
              </p>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
