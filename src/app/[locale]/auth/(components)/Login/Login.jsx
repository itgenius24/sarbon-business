"use client";

import {
    ErroModalIcon,
    EyeIcon,
    EyeIconOff
} from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";
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
    Text
} from "@chakra-ui/react";
import Link from "next/link";
import { AuthTitle } from "../AuthTitle";
import cls from "./styles.module.scss";
import { useLoginProps } from "./useLoginProps";

export const Login = () => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    navigateRegistration,
    isLoading,
    onRememberChange,
    t,
    isPasswordVisible,
    handleTogglePasswordVisibility,
    navigateToMain,
    locale,
    open,
    setOpen,
    handleGoogleLogin
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
          <AuthTitle mb="32px" title={t("Вход в Sarbon")} subtitle="" />

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

          <Button mt="24px" size="md" type="submit" isLoading={isLoading}>
            {t("Войти")}
          </Button>
        </Box>
        <Box mt="10%" display="flex" flexDirection="column" alignItems="center" rowGap="16px">
          <Box display="flex" justifyContent="center" columnGap="16px" flexWrap="wrap">
            <Link href={`/${locale}/privacy-policy`}>
              <Button variant="ghost" size="sm" fontSize="12px" color="brand.500">
                {t("Политика конфиденциальности")}
              </Button>
            </Link>
            <Link href={`/${locale}/terms`}>
              <Button variant="ghost" size="sm" fontSize="12px" color="brand.500">
                {t("Условия использования")}
              </Button>
            </Link>
          </Box>
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
