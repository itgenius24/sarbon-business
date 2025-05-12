"use client";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { PhoneForm } from "../PhoneForm";
import { useForgotProps } from "./useForgotProps";
import { ErroModalIcon } from "@/assets/icons/icons";

export const Forgot = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    navigateLogin,
    t,
    control,
    setOpen,
    open,
    watch,
    closeModal,isLoading
  } = useForgotProps();

  return (
    <>
      <PhoneForm
        isLoading={isLoading}
        navigateLogin={navigateLogin}
        onSubmit={handleSubmit(onSubmit)}
        backText={t("Вернуться на Войти")}
        errors={errors}
        firstBtnText={t("Продолжить")}
        title={t("Забыли пароль")}
        register={register}
        control={control}
      />

      <Modal isOpen={open} isCentered>
        <ModalOverlay onClick={closeModal} />
        <ModalContent>
          <ModalHeader>
            <ErroModalIcon />
          </ModalHeader>
          <ModalCloseButton onClick={() => closeModal()} />
          <ModalBody>
            <Box>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: `22px`,
                }}
              >
               { open === `vodetel` ?  t(
                  "Вы уже зарегистрированы как водитель. Войдите в аккаунт через мобильное"
                ): t(`Данный телефон не прошёл регистрацию в контрольной системе`)}
              {
                open === `vodetel` &&   <a
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
              }
              </p>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
