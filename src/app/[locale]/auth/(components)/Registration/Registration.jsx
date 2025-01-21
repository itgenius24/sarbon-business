import { useRegistrationProps } from "./useRegistrationProps";
import { PhoneForm } from "../PhoneForm";
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
import { ErroModalIcon } from "@/assets/icons/icons";

export const Registration = () => {
  const {
    handleSubmit,
    register,
    errors,
    navigateLogin,
    onSubmit,
    isPending,
    t,
    control,
    setOpen,
    open,
    watch,
  } = useRegistrationProps();

  return (
    <>
      <PhoneForm
        isPending={isPending}
        navigateLogin={navigateLogin}
        onSubmit={handleSubmit(onSubmit)}
        backText={t("Вернуться на Войти")}
        errors={errors}
        firstBtnText={t("Зарегистрироваться")}
        title={t("Регистрация нового участника на Sarbon")}
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
              {t("Водитель с номером")} { watch(`phone`)} {t("уже регистрирован в Sarbon")}
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
