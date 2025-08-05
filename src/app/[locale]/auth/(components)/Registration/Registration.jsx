import { useRegistrationProps } from "./useRegistrationProps";

import {
  ErroModalIcon,
  TelegramIcon
} from "@/assets/icons/icons";
import FormInternationInput from "@/components/Input/FormInternationalInput";
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
  useMediaQuery
} from "@chakra-ui/react";
import { AuthTitle } from "../AuthTitle";
import cls from "./styles.module.scss";


import { useCreateApkDownloadMutation } from "@/services/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const Registration = () => {
  const {
    submitPhone,
    handleSubmit,
    isLoading,
    t,
    control,
    closeModal,
    setOpen,
    open,
    watch,
    register,
    locale,
    setType,
    handleGoogleLogin,
    handleAppleLogin,
  } = useRegistrationProps();
  const searchParams = useSearchParams();

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const { mutate: apkData } = useCreateApkDownloadMutation({});

  const downloadFn = () => {
    apkData({
      data: {
        app_name: navigator.userAgent,
        count: 1,
        create_time: new Date(),
      },
    });
  };

  return (
    <>
      <Box
        display={`flex`}
        alignItems={`center`}
        flexDirection={`column`}
        justifyContent={`space-between`}
        width={`100%`}
        height={"100%"}
      >
        <Box width={`100%`}>
          <AuthTitle mb="32px" title={t(`Создать аккаунт на Sarbon`)} />
                <Box mb="24px">
                  <Box>
                    <p className={cls.textFieldName}>
                      {t("Мобильный телефон")} *
                    </p>
                    <FormInternationInput
                      register={register}
                      control={control}
                      name={`phone`}
                      rules={{ require: false }}
                    />
                  </Box>
                </Box>

                <Button
                  onClick={() => submitPhone(`PHONE`)}
                  size="md"
                  isLoading={isLoading}
                >
                  {t("Получить код по SMS")}
                </Button>
                <Button
                  leftIcon={<TelegramIcon />}
                  onClick={() => submitPhone(`TELEGRAM`)}
                  size="md"
                  mt={`10px`}
                  isLoading={isLoading}
                  className={cls.btnTelegram}
                >
                  {t("Получить код через Telegram")}
                </Button>
        </Box>
        <Box mt="20%" display="flex" flexDirection="column" alignItems="center" rowGap="16px">
          <Link
            href={`/${locale}/auth`}
            style={{
              cursor: `pointer`,
              fontWeight: 600,
              fontSize: `14px`,
              color: "var(--primary)",
              lineHeight: "20px",
            }}
          >
            {t("У меня уже есть аккаунт")}
          </Link>

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

      <Modal isOpen={open} isCentered onClose={() => setOpen(false)}>
        <ModalOverlay onClick={closeModal} />
        <ModalContent>
          <ModalHeader>
            <ErroModalIcon />
          </ModalHeader>
          <ModalCloseButton onClick={() => closeModal()} />
          <ModalBody>
            {open === `driver` && (
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
            )}

            {open === `exspiditor` && (
              <Box>
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: `22px`,
                  }}
                >
                  {t("Аккаунт с этим номером уже существует.")}
                  <Link
                    href={`/${locale}/auth`}
                    style={{
                      color: `rgba(0, 122, 255, 1)`,
                      cursor: `pointer`,
                      marginLeft: `5px`,
                    }}
                  >
                    {t("Войдите или восстановите доступ.")}
                  </Link>
                </p>
              </Box>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
