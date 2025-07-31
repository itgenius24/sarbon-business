import { useTranslation } from "@/app/i18n/client";
import {
  EditIcon,
  UserProfileIcon
} from "@/assets/icons/icons";
import UserImg from "@/assets/images/user.png";
import { Container } from "@/components/Container";
import { UploadImg } from "@/components/UploadImg";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";
import { useGetFirmInfo, useUpdateUserInfo } from "@/services/api";
import authStore from "@/store/auth.store";
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
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { LeftHeaderCard } from "./components/LeftHeaderCard";
import { Navbar } from "./components/Navbar";
import cls from "./styles.module.scss";

// Role mapping for display
const roleName = {
  "f81d3c3d-228d-479e-a2b1-9948c98640f2": "Перевозчик",
  // Add other role mappings as needed
};

export const ProfileLayout = ({ children, variant = "simple" }) => {
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

  // Get firm data for advanced variant
  const { data: firmData } = useGetFirmInfo(authStore?.userData?.firm_id, { enabled: Boolean(authStore?.userData?.role_id === "f81d3c3d-228d-479e-a2b1-9948c98640f2") && variant === "advanced" });

  // Photo upload mutation for advanced variant
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
          {variant === "advanced" ? (
            // Advanced header with balance and plan info
            <>
              {isLargerThan845 ? (
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
                        {/* <ProfilePlusIcon /> */}
                      </Flex>
                      {/* <CkoraIcon /> */}
                    </Flex>
                  </Box>
                </Flex>
              ) : (
                // Mobile header for advanced variant - similar to simple variant
                pathname === `/${locale}/profile-new` && (
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
                            ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${data?.photo || ""}`
                            : "/images/avatar.png"
                        }
                        alt="avatar"
                      />
                      <Text>
                        {firmData?.response?.tip_account?.[0] === `legal_owner` &&
                         authStore?.userData?.role_id === "f81d3c3d-228d-479e-a2b1-9948c98640f2"
                          ? firmData?.response?.company_name
                          : data?.full_name}
                      </Text>
                    </Box>
                    <Link href={`/${locale}/profile-new/personal-data`}>
                      <EditIcon />
                    </Link>
                  </Box>
                )
              )}
            </>
          ) : (
            // Simple header
            <>
              {isLargerThan845 && (
                <Heading color={`var(--primary-text)`} size="md" mb="24px">
                  {t("Профиль компании")}
                </Heading>
              )}
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
                          ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${data?.photo || ""}`
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
            </>
          )}
          <div className={cls.contentWrapper}>
            {variant === "advanced" ? (
              // Advanced layout with profile cards
              <>
                {(pathname === `/${locale}/profile-new` || isLargerThan845) && (
                  <Box flexGrow={isLargerThan845 ? 0 : 1}>
                    {isLargerThan845 ? (
                      // Desktop layout - show full profile cards
                      firmData?.response?.tip_account?.[0] === `legal_owner` &&
                      authStore?.userData?.role_id === "f81d3c3d-228d-479e-a2b1-9948c98640f2" ? (
                        <Box className={cls.leftContend}>
                          <Box className={cls.profileNameWrap}>
                            <Text className={cls.profileName}>
                              {firmData?.response?.company_name}
                            </Text>
                            <Flex alignItems={`center`} mt={`16px`} gap={`12px`}>
                              <Box className={cls.imgUploadWrap} onClick={onOpen}>
                                <Box className={cls.imgUpload}>
                                  {/* <UploadProfileIcon /> */}
                                </Box>
                                {data?.photo ? (
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
                                ) : (
                                  <Image
                                    src={UserImg}
                                    alt="profileImg"
                                    width={200}
                                    height={200}
                                  />
                                )}
                              </Box>
                              <Box>
                                <Text className={cls.profileName}>
                                  {firmData?.response?.company_name}
                                </Text>
                                <Text className={cls.profileType}>
                                  {firmData?.response?.tip_account?.[0] === `legal_owner`
                                    ? `Юридическое лицо`
                                    : `Физическое лицо`}
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
                            <Flex alignItems={`center`} mt={`16px`} gap={`12px`}>
                              <Box className={cls.imgUploadWrap} onClick={onOpen}>
                                <Box className={cls.imgUpload}>
                                  {/* <UploadProfileIcon /> */}
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
                                  {authStore.userData.firm_id &&
                                   authStore?.userData?.role_id === "f81d3c3d-228d-479e-a2b1-9948c98640f2"
                                    ? `Перевозчик / Физ. лицо`
                                    : roleName[authStore.userData.role_id]}
                                </Text>
                                <Text className={cls.profileId}>
                                  ID: {data?.your_id}
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                          <Navbar locale={locale} />
                        </Box>
                      )
                    ) : (
                      // Mobile layout - show simplified navigation similar to simple variant
                      <Flex justifyContent="center" gap={4} mb="16px">
                        <LeftHeaderCard title={t("Ваш ID:")} value={data?.your_id} />
                        <LeftHeaderCard title={t("Баланс")} value="0 сум" />
                      </Flex>
                    )}
                    {!isLargerThan845 && (
                      <Flex justifyContent="center">
                        <Navbar locale={locale} />
                      </Flex>
                    )}
                  </Box>
                )}
              </>
            ) : (
              // Simple layout
              (pathname === defaultPath || isLargerThan845) && (
                <Box flexGrow={isLargerThan845 ? 0 : 1}>
                  <Flex justifyContent={isLargerThan845 ? "flex-start" : "center"} gap={4} mb="16px">
                    <LeftHeaderCard title={t("Ваш ID:")} value={data?.your_id} />
                    <LeftHeaderCard title={t("Баланс")} value={data?.balance} />
                  </Flex>
                  <Flex justifyContent={isLargerThan845 ? "flex-start" : "center"}>
                    <Navbar locale={locale} />
                  </Flex>
                </Box>
              )
            )}

            {/* Children content */}
            {variant === "advanced" ? (
              // Advanced variant children handling
              <>
                {pathname !== `/${locale}/profile-new` && !isLargerThan845 && (
                  <Box flexGrow={1}>{children}</Box>
                )}
                {isLargerThan845 && <Box flexGrow={1}>{children}</Box>}
              </>
            ) : (
              // Simple variant children handling
              <>
                {pathname !== defaultPath && !isLargerThan845 && (
                  <Box flexGrow={1}>{children}</Box>
                )}
                {isLargerThan845 && <Box flexGrow={1}>{children}</Box>}
              </>
            )}
          </div>
        </Container>
      </div>

      {/* Photo upload modal for advanced variant */}
      {variant === "advanced" && (
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
                {firmData?.response?.tip_account?.[0] === `legal_owner` &&
                 authStore?.userData?.role_id === "f81d3c3d-228d-479e-a2b1-9948c98640f2"
                  ? `Лого компании`
                  : `Фото профиля`}
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UploadImg
                watch={watch}
                setValue={setValue}
                name={`img`}
                icon={<UserProfileIcon />}
                text={`Загрузить фото`}
                isCrop={true}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                onClick={handleUpload}
                colorScheme="blue"
                mr={3}
              >
                Сохранить
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Отмена
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
