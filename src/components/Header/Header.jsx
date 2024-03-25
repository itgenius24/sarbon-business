"use client";

import clsx from "clsx";
import cls from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import authStore from "@/store/auth.store";
import { Container } from "../Container";
import { Box, Button, IconButton, ListItem, UnorderedList } from "@chakra-ui/react";
import { LanguageIcon } from "@/assets/icons/icons";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "../Logo";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";

const Header = observer(({ elements }) => {
  const router = useRouter();

  const [isAuth, setAuth] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setAuth(authStore.getIsAuth);
  }, [authStore.getIsAuth]);

  const goToProfile=()=>{
    router.push("/profile");
  };

  const userData = useGetUserInfoHook();

  const photo = userData.data?.photo;

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
                    className={clsx(cls.itemLink, {
                      [cls.activeLink]: index
                        ? pathname.includes(element.path)
                        : pathname === element.path,
                    })}
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
              {/*<Box display="flex" columnGap="4px">
                 <IconButton variant="reset">
                <SettingIcon />
              </IconButton>
                 <IconButton variant="reset">
                  <LanguageIcon />
                </IconButton>
              </Box>*/}
              {isAuth && (
                <>
                  <Box onClick={goToProfile} className={cls.userIcon} ml="16px">
                    <Image
                      src={photo ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${photo}` : "/images/user.png"}
                      alt="ww"
                      width={40}
                      height={40}
                      objectFit="cover"
                      style={{ height: "100%" }}
                    />
                  </Box>
                  {/* <Box ml="16px">
                    <LogOutBtn />
                  </Box> */}
                </>
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

