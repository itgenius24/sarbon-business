import { useRegistrationProps } from "./useRegistrationProps";

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  AppleAuthIcon,
  ErroModalIcon,
  GoogleIcon,
  PhoneIconRigister,
} from "@/assets/icons/icons";
import FormInternationInput from "@/components/Input/FormInternationalInput";
import { AuthTitle } from "../AuthTitle";
import cls from "./styles.module.scss";

import qrImg from "@/assets/images/qrcode.svg";
import AppStore from "@/assets/images/app-store.svg";
import GooglePlay from "@/assets/images/google-play.svg";
import AndroidPlay from "@/assets/images/android_apk.svg";
import Getapps from "@/assets/images/getapps.svg";
import RuStore from "@/assets/images/RuStore.svg";
import GalaxyStore from "@/assets/images/galaxy-store.svg";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCreateApkDownloadMutation } from "@/services/api";

export const Registration = () => {
  const {
    onSubmit,
    handleSubmit,
    isLoading,
    t,
    control,
    closeModal,
    setOpen,
    open,
    watch,
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
          <p className={cls.tabTitle}>
            {t(`Укажите ваш профиль деятельности`)}
          </p>
          <Tabs
            defaultIndex={
              searchParams.get(`type`) ? searchParams.get(`type`) * 1 : 0
            }
            onChange={(e) => setType(e)}
          >
            <TabList borderBottom={`0px`} className={cls.tabWrap}>
              <Tab
                className={cls.btn}
                color={`rgba(126, 123, 134, 1)`}
                _selected={{
                  background: `rgba(255, 255, 255, 1)`,
                  boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.18)`,
                  color: `rgba(33, 31, 38, 1)`,
                }}
              >
                {t(`Перевозчик`)}
              </Tab>
              <Tab
                color={`rgba(126, 123, 134, 1)`}
                _selected={{
                  background: `rgba(255, 255, 255, 1)`,
                  boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.18)`,
                  color: `rgba(33, 31, 38, 1)`,
                }}
                className={cls.btn}
              >
                {t(`Водитель`)}
              </Tab>
              <Tab
                color={`rgba(126, 123, 134, 1)`}
                _selected={{
                  background: `rgba(255, 255, 255, 1)`,
                  boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.18)`,
                  color: `rgba(33, 31, 38, 1)`,
                }}
                className={cls.btn}
              >
                {t(`Заказчик`)}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel padding={0} margin={0}>
                <Box mb="24px">
                  <Box>
                    <p className={cls.textFieldName}>
                      {t("Мобильный телефон")} *
                    </p>
                    <FormInternationInput control={control} name={`phone`} />
                  </Box>
                </Box>

                <Button
                  onClick={handleSubmit(onSubmit)}
                  size="md"
                  type="submit"
                  isLoading={isLoading}
                >
                  {t(`Регистрация`)}
                </Button>
                <div className={cls.divider}>
                  <span>{t(`Регистрация через соцсеть`)}</span>
                </div>
                <Flex
                  mt={`24px`}
                  width={`100%`}
                  gap={`15px`}
                  justifyContent={`space-between`}
                  className={cls.btnAuthGroup}
                >
                  <Button
                    onClick={handleGoogleLogin}
                    leftIcon={<GoogleIcon />}
                    className={cls.btnAuth}
                  >
                    {t(`Продолжить с Google`)}
                  </Button>
                  <Button
                    onClick={handleAppleLogin}
                    leftIcon={<AppleAuthIcon />}
                    className={cls.btnAuth}
                    isDisabled
                  >
                    {t(`Продолжить с Apple`)}
                  </Button>
                </Flex>
              </TabPanel>
              <TabPanel padding={0} margin={0}>
                <Box width={`100%`}>
                  <Text
                    fontWeight={600}
                    lineHeight={`28px`}
                    fontSize={`20px`}
                    color={`rgba(33, 31, 38, 1)`}
                  >
                    {t(
                      "Регистрация для водителей только через приложение Sarbon"
                    )}
                  </Text>
                  <Flex alignItems={`center`} gap={`29px`} mt={`39px`}>
                    <Image className={cls.imageQr} src={qrImg} alt="qrImg" />
                    <Box>
                      <p className={cls.qrDeck}>
                        {t(
                          `Чтобы зарегистрироваться и начать получать заказы, скачайте наше приложение Sarbon`
                        )}
                        .
                      </p>
                      <Flex
                        flexDirection={`column`}
                        mt={`30px`}
                        rowGap={`10px`}
                        className={cls.linkWrap}
                      >
                        <Flex gap={`10px`}>
                          <a
                            className={cls.mobileAppLink}
                            href={
                              "https://apps.apple.com/uz/app/furgo/id6475668788"
                            }
                            target="_blank"
                          >
                            <Image
                              src={AppStore}
                              alt="App store"
                              width={135}
                              height={40}
                              className={cls.img}

                            />
                          </a>
                          <a
                            className={cls.mobileAppLink}
                            href={
                              "https://play.google.com/store/apps/details?id=uz.udevs.xlogistic_driver_mobile"
                            }
                            target="_blank"
                          >
                            <Image
                              src={GooglePlay}
                              alt="Google play"
                              width={135}
                              height={40}
                              className={cls.img}
                            />
                          </a>
                          <a
                            className={cls.mobileAppLink}
                            href={
                              "https://www.rustore.ru/catalog/app/uz.udevs.xlogistic_driver_mobile"
                            }
                            target="_blank"
                          >
                            <Image
                              src={RuStore}
                              alt="Ru store"
                              width={111}
                              height={40}
                               className={`${cls.img} ${cls.ruStore}`}
                            />
                          </a>
                        </Flex>
                        <Flex gap={`10px`}>
                          <a
                            className={cls.mobileAppLink}
                            href={
                              "https://global.app.mi.com/details?lo=ID&la=ru_RU&id=uz.udevs.xlogistic_driver_mobile"
                            }
                            target="_blank"
                          >
                            <Image
                              src={Getapps}
                              alt="Getapps store"
                              width={135}
                              height={40}
                              className={cls.img}

                            />
                          </a>
                          <a
                            className={cls.mobileAppLink}
                            href={
                              "https://galaxystore.samsung.com/detail/uz.udevs.xlogistic_driver_mobile"
                            }
                            target="_blank"
                          >
                            <Image
                              src={GalaxyStore}
                              alt="GalaxyStore"
                              width={147}
                              height={40}
                              className={`${cls.img} ${cls.galaxyStore}`}
                            />
                          </a>
                        </Flex>

                        {/* <a
                          onClick={() => downloadFn()}
                          style={{ cursor: `pointer` }}
                          className={cls.mobileAppLink}
                          download
                          href="https://pub-ad3c9716f37e4196af319dc25ffb8404.r2.dev/Sarbon%20mobile%201.0.5%20%2812%29-release.apk"
                          target="_blank"
                        >
                          <Image
                            src={AndroidPlay}
                            alt="Google play"
                            width={135}
                            height={40}
                          />
                        </a> */}
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </TabPanel>
              <TabPanel padding={0} margin={0}>
                <Box width={`100%`}>
                  <Text
                    fontWeight={600}
                    lineHeight={`28px`}
                    fontSize={`20px`}
                    color={`rgba(33, 31, 38, 1)`}
                    mb={`20px`}
                  >
                    {t("Регистрация заказчиков временно приостановленна")}
                  </Text>
                  <p className={cls.qrDeck}>{t(`re1Text`)}:</p>

                  <a href={`tel:+998950056611`}>
                    <Flex className={cls.phone}>
                      <PhoneIconRigister />
                      +998 95 005 66 11
                    </Flex>
                  </a>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Link
          href={`/${locale}/auth`}
          style={{
            cursor: `pointer`,
            fontWeight: 600,
            marginTop: `20%`,
            fontSize: `14px`,
            color: "var(--primary)",
            lineHeight: "20px",
          }}
        >
          {t("У меня уже есть аккаунт")}
        </Link>
      </Box>

      <Modal isOpen={open} isCentered>
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
