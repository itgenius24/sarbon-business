import cls from "./styles.module.scss";
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
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";
import { LeftHeaderCard } from "./components/LeftHeaderCard";
import { Navbar } from "./components/Navbar";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import {
  CkoraIcon,
  EditIcon,
  ProfileNoIcon,
  ProfilePlusIcon,
  TextIcon,
  UploadProfileIcon,
  UserProfileIcon,
} from "@/assets/icons/icons";
import UserImg from "@/assets/images/user.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UploadImgRigister } from "@/components/UploadImgRigister";
import { useForm } from "react-hook-form";
import { UploadImg } from "@/components/UploadImg";
import { useGetFirmInfo, useUpdateUserInfo } from "@/services/api";
import authStore from "@/store/auth.store";
import { useQueryClient } from "@tanstack/react-query";

export const ProfileLayout = ({ children }) => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { onClose, isOpen, onOpen } = useDisclosure();

  const pathname = usePathname();
  const toast = useToast();

  const query = useQueryClient();

  const { data } = useGetUserInfoHook();

  const locale = useGetLang();
  const defaultPath = `/${locale}/profile`;
  const { control, watch, setValue } = useForm();

  const { t } = useTranslation(locale, "translations");

  const { data: firmData } = useGetFirmInfo(authStore?.userData?.firm_id);

  const { mutate: userData, isLoading } = useUpdateUserInfo({
    onSuccess() {
      toast({
        title: "Успешно изменено!",
        description: "Вы успешно обновили этого пользователя",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      query.invalidateQueries(["items/firm/id"]);
      query.invalidateQueries(["items/users/id"]);
      onClose();
    },
    onError() {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить пользователя!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const handleUpload = () => {
    userData({
      data: {
        guid: authStore.userData.guid,
        photo: watch(`img`),
      },
    });
  };

 

  return (
    <>
      <div className="fade-in">
        <Container my="40px">
          <Flex
            width={`100%`}
            alignItems={`center`}
            justifyContent={`space-between`}
          >
            <Heading color={`rgba(33, 31, 38, 1)`} size="md" mb="24px">
              {firmData?.response?.tip_account?.[0] === `legal_owner`
                ? t("Профиль компании")
                : t("Мой профиль")}
            </Heading>
            <Box className={cls.balanceWrap}>
              <Flex className={cls.plan}>
                <Text className={cls.planeText}>Текущий план:</Text>
                <Text className={cls.planeValue}>Бесплатный</Text>
              </Flex>
              <Flex className={cls.balance}>
                <Flex alignItems={`center`} gap={`5px`}>
                  <Text className={cls.planeText}>Баланс:</Text>
                  <Text className={cls.planeValue}>0 сум</Text>
                  <ProfilePlusIcon />
                </Flex>
                <CkoraIcon />
              </Flex>
            </Box>
          </Flex>

          {!isLargerThan845 && pathname === defaultPath && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p="12px"
              borderRadius="16px"
              bgColor="baseWhite"
              maxWidth="316px"
              margin="0 auto"
              mb="8px"
            >
              <Box display="flex" alignItems="center" columnGap="8px">
                <Image
                  width={64}
                  height={64}
                  src={
                    data?.photo
                      ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${
                          data?.photo || ""
                        }`
                      : "/images/avatar.png"
                  }
                  alt="avatar"
                />
                <Text>{data?.full_name}</Text>
              </Box>
              <Link href={`/${locale}/profile/personal-data`}>
                <EditIcon />
              </Link>
            </Box>
          )}
          <div className={cls.contentWrapper}>
            {(pathname === defaultPath || isLargerThan845) && (
              <Box flexGrow={isLargerThan845 ? 0 : 1}>
                {firmData?.response?.tip_account?.[0] === `legal_owner` ? (
                  <Box className={cls.leftContend}>
                    <Box className={cls.profileNameWrap}>
                      <Text className={cls.profileName}>
                        {firmData?.response?.company_name}
                      </Text>
                      <Flex alignItems={`center`} mt={`16px`} gap={`12px`}>
                        <Box className={cls.imgUploadWrap} onClick={onOpen}>
                          <Box className={cls.imgUpload}>
                            <UploadProfileIcon />
                          </Box>
                          {data?.photo ? (
                            <>
                              <Image
                                src={`${
                                  data?.photo?.includes(`https`)
                                    ? ``
                                    : process.env.NEXT_PUBLIC_MEDIA_URL
                                }${data?.photo || ""}`}
                                alt="profileImg"
                                width={200}
                                height={200}
                              />
                            </>
                          ) : (
                            <ProfileNoIcon />
                          )}
                        </Box>
                        <Box>
                          <Text className={cls.profileType}>
                            Перевозчик / Юр. лицо
                          </Text>
                          <Text className={cls.profileId}>
                            ID: {data?.your_id}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                    <Navbar locale={locale} />
                  </Box>
                ) : (
                  <Box className={cls.leftContend2}>
                    <Box className={cls.profileNameWrap}>
                      <Flex alignItems={`center`} mt={`10px`} gap={`12px`}>
                        <Box
                          className={cls.imgUploadWrapCricle}
                          onClick={onOpen}
                        >
                          <Box className={cls.imgUpload}>
                            <UploadProfileIcon />
                          </Box>

                          <Image
                            src={
                              data?.photo
                                ? `${
                                    data?.photo?.includes(`https`)
                                      ? ``
                                      : process.env.NEXT_PUBLIC_MEDIA_URL
                                  }${data?.photo || ""}`
                                : UserImg
                            }
                            alt="profileImg"
                            width={200}
                            height={200}
                          />
                        </Box>
                        <Box>
                          <Text>{data?.full_name}</Text>
                          <Text className={cls.profileType}>
                            Перевозчик / Физ. лицо
                          </Text>
                          <Text className={cls.profileId}>
                            ID: {data?.your_id}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>

                    <Navbar locale={locale} />
                  </Box>
                )}
              </Box>
            )}
            {pathname !== defaultPath && !isLargerThan845 && (
              <Box flexGrow={1}>{children}</Box>
            )}
            {isLargerThan845 && <Box flexGrow={1}>{children}</Box>}
          </div>
        </Container>
      </div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              mt={`10px`}
              textAlign={`center`}
              fontSize={`18px`}
              fontWeight={600}
            >
              {firmData?.response?.tip_account?.[0] === `legal_owner`
                ? `Лого компании`
                : `Фото профиля`}
            </Text>
          </ModalHeader>

          <ModalBody>
            <Flex
              width={`100%`}
              h={`100%`}
              alignItems={`center`}
              justifyContent={`center`}
              mb={`20px`}
            >
              <Box>
                <UploadImgRigister
                  icon={
                    firmData?.response?.tip_account?.[0] === `legal_owner` ? (
                      <TextIcon />
                    ) : (
                      <UserProfileIcon />
                    )
                  }
                  text={`Загрузить фото`}
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  name={`img`}
                  borderRadius={`50%`}
                  padding={0}
                />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter gap={`12px`}>
            <Button onClick={() => handleUpload()}>Сохранить</Button>
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
    </>
  );
};
