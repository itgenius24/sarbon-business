"use client";

import clsx from "clsx";
import cls from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import authStore from "@/store/auth.store";
import { Container } from "../Container";
import { Box, Button, IconButton, ListItem, UnorderedList } from "@chakra-ui/react";
import { LanguageIcon } from "@/assets/icons/icons";
import { usePathname } from "next/navigation";
import { Logo } from "../Logo";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const Header = observer(({ elements }) => {

  const [isAuth, setAuth] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setAuth(authStore.getIsAuth);
  }, [authStore.getIsAuth]);

  return (
    <Box
      as="header"
      className={cls.header}
      borderBottom="1px solid"
      borderBottomColor="brand.200"
    >
      <Container>
        <Box as="nav" className={cls.nav}>
          <Box className={cls.leftBox}>
            <Box className={cls.logo}>
              <Logo />
            </Box>
            <UnorderedList className={cls.list}>
              {elements?.map((element, index) => (
                <ListItem className={cls.listItem} key={element.path}>
                  <Link
                    href={element.path}
                    className={clsx(cls.itemLink, { [cls.activeLink]: index ? pathname.includes(element.path) : pathname === element.path, })}
                  >
                    {element.label}
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          <Box className={cls.rightBox}>
            <Box className={cls.buttonBox}>
              {!isAuth && (
                <Link
                  className={clsx(cls.registerLink)}
                  title={"Зарегистрироваться"}
                  href="/auth"
                >
                  Зарегистрироваться
                </Link>
              )}
              <Box display="flex" columnGap="4px">
                {/* <IconButton variant="reset">
                <SettingIcon />
              </IconButton> */}
                {/* <IconButton variant="reset">
                  <LanguageIcon />
                </IconButton> */}
              </Box>
              <Box className={cls.userIcon} ml="16px">
                {isAuth ? (
                  <Image
                    src="/svg/userIcon.svg"
                    alt="ww"
                    width={35}
                    height={35}
                  />
                ) : (
                  <Image
                    src="/svg/userIcon.svg"
                    alt="ww"
                    width={35}
                    height={35}
                  />
                )}
              </Box>
              {isAuth && (
                <Box ml="16px">
                  <LogOutBtn />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

export default Header;




export const LogOutBtn = () => {

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
      Выйти
    </Button>
  );
};

