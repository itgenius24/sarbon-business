import cls from "./styles.module.scss";
import { Container } from "@/components/Container";
import { Box, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";
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
} from "@/assets/icons/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const ProfileLayout = ({ children }) => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const {onClose,isOpen,onOpen} = useDisclosure()

  const pathname = usePathname();

  const { data } = useGetUserInfoHook();

  const locale = useGetLang();
  const defaultPath = `/${locale}/profile`;

  const { t } = useTranslation(locale, "translations");

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
            {t("Профиль компании")}
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
        <div className={cls.contentWrapper}>
          {(pathname === defaultPath || isLargerThan845) && (
            <Box flexGrow={isLargerThan845 ? 0 : 1}>
              <Box className={cls.leftContend}>
                <Box className={cls.profileNameWrap}>
                  <Text className={cls.profileName}>
                    ООО Uztrans Logistics Group
                  </Text>
                  <Flex alignItems={`center`} mt={`16px`} gap={`12px`}>
                    <Box>
                      <ProfileNoIcon />
                    </Box>
                    <Box >
                      <Text className={cls.profileType}>
                        Перевозчик / Юр. лицо
                      </Text>
                      <Text className={cls.profileId}>ID: U-000003033</Text>
                    </Box>
                  </Flex>
                </Box>
                <Navbar locale={locale} />
              </Box>
            </Box>
          )}
          {pathname !== defaultPath && !isLargerThan845 && (
            <Box flexGrow={1}>{children}</Box>
          )}
          {isLargerThan845 && <Box flexGrow={1}>{children}</Box>}
        </div>
      </Container>
      
    </div>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          
          </ModalBody>

          <ModalFooter>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
