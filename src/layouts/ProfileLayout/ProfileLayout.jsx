import { Container } from "@/components/Container";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";
import { LeftHeaderCard } from "./components/LeftHeaderCard";
import { Navbar } from "./components/Navbar";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export const ProfileLayout = ({ children }) => {

  const { data } = useGetUserInfoHook();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Container my="40px">
    <Heading size="md" mb="24px">
      {t("Профиль")}
    </Heading>
    <Flex alignItems="flex-start" columnGap="24px">
      <Box>
        <Flex gap={4} mb="16px">
          <LeftHeaderCard title="Ваш ID:" value={data?.your_id} />
          <LeftHeaderCard title="Баланс" value={data?.balance} />
        </Flex>
        <Navbar locale={locale} />
      </Box>
      <Box flexGrow={1}>
        {children}
      </Box>
    </Flex>
  </Container>;
};
