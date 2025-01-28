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
  } = useForgotProps();

  return (
    <>
      <PhoneForm
        // isPending={isPending}
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
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ErroModalIcon />
          </ModalHeader>
          <ModalCloseButton onClick={() => setOpen(false)} />
          <ModalBody>
            <p style={{ fontWeight: 600, fontSize: "18px" }}>
              {t("Водитель с номером")} {watch(`phone`)} {t("не зарегистрирован в системе")}
            </p>
            <Box mt={`24px`}>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: `20px`,
                }}
              >
                {t(
                  "Чтобы добавить его в свой список, пожалуйста, свяжитесь с нашей"
                )}
                <a style={{ color: `rgba(0, 122, 255, 1)`, cursor: `pointer` }}>
                  {" "}
                  {t("службой поддержки")}
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
