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
} from "@chakra-ui/react";
import {
  ErroModalIcon,
  PhoneIconRigister,
  QrCodeIcon,
} from "@/assets/icons/icons";
import FormInternationInput from "@/components/Input/FormInternationalInput";
import { AuthTitle } from "../AuthTitle";
import cls from "./styles.module.scss";

import qrImg from "@/assets/images/qrcode.svg";
import AppStore from "@/assets/images/app-store.svg";
import GooglePlay from "@/assets/images/google-play.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export const Registration = () => {
  const { onSubmit,handleSubmit, isPending, t, control, setOpen, open, watch, setType } =
    useRegistrationProps();
      const searchParams = useSearchParams();

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
          <AuthTitle mb="32px" title={`Создать аккаунт на Sarbon`} />
          <p className={cls.tabTitle}>Укажите ваш профиль деятельности</p>
          <Tabs defaultIndex={ searchParams.get(`type`) ? searchParams.get(`type`) * 1 : 0}  onChange={(e) => setType(e)}>
            <TabList  className={cls.tabWrap}>
              <Tab
                className={cls.btn}
                color={`rgba(126, 123, 134, 1)`}
                _selected={{
                  background: `rgba(255, 255, 255, 1)`,
                  boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.18)`,
                  color: `rgba(33, 31, 38, 1)`,
                }}
              >
                Перевозчик
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
                Водитель
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
                 Заказчик
              </Tab>
            </TabList>
              <TabPanels>
              <TabPanel padding={0} margin={0}>
              
                  <Box  mb="24px">
                    <Box>
                      <p className={cls.textFieldName}>
                        {t("Мобильный телефон")} *
                      </p>
                      <FormInternationInput control={control} name={`phone`} />
                    </Box>
                  </Box>
                  <Button onClick={handleSubmit(onSubmit)} size="md" type="submit" isLoading={isPending}>
                    Регистрация
                  </Button>
             
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
                  <Flex gap={`29px`} mt={`39px`}>
                    <Image className={cls.imageQr} src={qrImg} alt="qrImg" />
                    <Box>
                      <p className={cls.qrDeck}>
                        Чтобы зарегистрироваться и начать получать заказы,
                        скачайте наше приложение Sarbon.
                      </p>
                      <Flex mt={`30px`} gap={`16px`} alignItems={`center`}>
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
                          />
                        </a>

                        <a
                          style={{ cursor: `pointer` }}
                          className={cls.mobileAppLink}
                          href="https://play.google.com/store/apps/details?id=uz.sarbon.mobile&pcampaignid=web_share"
                          target="_blank"
                        >
                          <Image
                            src={GooglePlay}
                            alt="Google play"
                            width={135}
                            height={40}
                          />
                        </a>
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
                  <p className={cls.qrDeck}>
                    Если у вас имеется груз которого нужно доставить быстро и с
                    возможностью отслеживания обратитесь к нам по номеру:
                  </p>

                  <a href={`tel:+998974140180`}>
                    <Flex className={cls.phone}>
                      <PhoneIconRigister />
                      +998 97 414 0180
                    </Flex>
                  </a>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Text
          cursor={`pointer`}
          fontWeight={600}
          mt="20%"
          fontSize="14px"
          color="var(--primary)"
          lineHeight="20px"
        >
          {t("У меня уже есть аккаунт")}
        </Text>
      </Box>

      <Modal isOpen={open} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ErroModalIcon />
          </ModalHeader>
          <ModalCloseButton onClick={() => setOpen(false)} />
          <ModalBody>
            <p style={{ fontWeight: 600, fontSize: "18px" }}>
              {t("Водитель с номером")} {watch(`phone`)}{" "}
              {t("уже регистрирован в Sarbon")}
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
