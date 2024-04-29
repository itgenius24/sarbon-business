import cls from "./styles.module.scss";
import { Container } from "@/components/Container";
import { Box, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";
import { LeftHeaderCard } from "./components/LeftHeaderCard";
import { Navbar } from "./components/Navbar";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { EditIcon } from "@/assets/icons/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const ProfileLayout = ({ children }) => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const pathname = usePathname();

  const { data } = useGetUserInfoHook();

  const locale = useGetLang();
  const defaultPath = `/${locale}/profile`;

  const { t } = useTranslation(locale, "translations");

  return <div className="fade-in">
    <Container my="40px">
      {
        isLargerThan845 && <Heading size="md" mb="24px">
          {t("Профиль")}
        </Heading>
      }
      {
        !isLargerThan845 && pathname === defaultPath && <Box display="flex" alignItems="center" justifyContent="space-between" p="12px" borderRadius="16px" bgColor="baseWhite" maxWidth="316px" margin="0 auto" mb="8px">
          <Box display="flex" alignItems="center" columnGap="8px">
            <Image width={64} height={64} src={data?.photo ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${data?.photo}` : "/images/avatar.png"} alt="avatar"/>
            <Text>{data?.full_name}</Text>
          </Box>
          <Link href={`/${locale}/profile/personal-data`}>
            <EditIcon />
          </Link>
        </Box>
      }
      <div className={cls.contentWrapper}>
        {
          (pathname === defaultPath || isLargerThan845) && <Box flexGrow={isLargerThan845 ? 0 : 1}>
            <Flex justifyContent={isLargerThan845 ? "flex-start" : "center"} gap={4} mb="16px">
              <LeftHeaderCard title="Ваш ID:" value={data?.your_id} />
              <LeftHeaderCard title="Баланс" value={data?.balance} />
            </Flex>
            <Flex justifyContent={isLargerThan845 ? "flex-start" : "center"}>
              <Navbar locale={locale} />
            </Flex>
          </Box>
        }
        {
          pathname !== defaultPath && !isLargerThan845 && <Box flexGrow={1}>
            {children}
          </Box>
        }
        {
          isLargerThan845 && <Box flexGrow={1}>
            {children}
          </Box>
        }
      </div>
    </Container>
  </div>;
};
