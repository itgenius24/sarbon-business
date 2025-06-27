"use client";

import clsx from "clsx";
import cls from "./styles.module.scss";
import authStore from "@/store/auth.store";
import { Box, Button } from "@chakra-ui/react";
import { Logo } from "../Logo/Logo";
import { useTranslation } from "@/app/i18n/client";
import { ContainerNav } from "../ContainerNav/Container";

const HeaderNotFount = () => {
  return (
    <Box
      as="header"
      className={cls.header}
      borderBottom="1px solid"
      borderBottomColor="brand.200"
    >
      <ContainerNav>
        <Box as="nav" className={clsx(cls.nav)}>
          <Box className={cls.leftBox}>
            <Box className={cls.logo}>
              <Logo />
            </Box>
          </Box>
        </Box>
      </ContainerNav>
    </Box>
  );
};

export default HeaderNotFount;

export const LogOutBtn = ({ locale = "ru" }) => {
  const { t } = useTranslation(locale, "translations");

  const logout = () => {
    authStore.logout();
  };
  return (
    <Button
      width="77px"
      variant="secondaryWhite"
      border="1px solid #000"
      borderColor="brand.300"
      color="brand.500"
      onClick={logout}
    >
      {t("Выйти")}
    </Button>
  );
};
