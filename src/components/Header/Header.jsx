"use client";

import clsx from "clsx";
import cls from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import authStore from "@/store/auth.store";
import { Container } from "../Container";
import { Box, Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "../Logo";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";
import { LocaleDropdown } from "../LocaleDropdown";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import UserImg from "@/assets/images/user.png";

const Header = observer(({ elements }) => {
  const router = useRouter();

  const [isAuth, setAuth] = useState(false);

  const pathname = usePathname();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  useEffect(() => {
    setAuth(authStore.getIsAuth);
  }, [authStore.getIsAuth]);

  const goToProfile=()=>{
    router.push(`/${locale}/profile`);
  };

  const userData = useGetUserInfoHook();

  const photo = userData.data?.photo;

  const [isNavOpen, setNavOpen] = useState(false);

  function handleToggleNav() {
    setNavOpen(!isNavOpen);
  }

  return (
    <Box
      as="header"
      className={cls.header}
      borderBottom="1px solid"
      borderBottomColor="brand.200"
    >
      <Container>
        <Box as="nav" className={clsx(cls.nav, { [cls.open]: isNavOpen })}>
          <Box className={cls.leftBox}>
            <Box className={cls.logo}>
              <Logo />
            </Box>
            {!isAuth && (
              <Link
                className={clsx(cls.registerLink, cls.registerLinkMobile)}
                title={t("Зарегистрироваться")}
                href={`/${locale}/auth`}
              >
                {t("Зарегистрироваться")}
              </Link>
            )}
            <Box className={cls.content}>
              <UnorderedList className={cls.list}>
                {elements?.map((element, index) => {
                  return <ListItem className={cls.listItem} key={element.path}>
                    {
                    element.path.includes("distance-calculation")
                     ? <a className={clsx(cls.itemLink, {
                       [cls.activeLink]: index
                        ? pathname.includes(element.path)
                        : pathname === element.path,
                     })}
                     href={element.path}
                     >
                       {t(element.label)}
                     </a>
                     : <Link
                       onClick={() => setNavOpen(false)}
                       href={element.path}
                       className={clsx(cls.itemLink, {
                         [cls.activeLink]: index
                        ? pathname.includes(element.path)
                        : pathname === element.path,
                       })}
                     >
                       {t(element.label)}
                     </Link>
                    }
                  </ListItem>;
                })}
                <ListItem className={clsx(cls.listItem, cls.profile)} key="profile">
                  <Link
                    onClick={() => setNavOpen(false)}
                    href={`/${locale}/profile`}
                    className={clsx(cls.itemLink, { [cls.activeLink]: pathname === `/${locale}/profile`, })}
                  >
                    {t("Профиль")}
                  </Link>
                </ListItem>
              </UnorderedList>
              <Box className={cls.rightBox}>
                <Box className={cls.buttonBox}>
                  {!isAuth && (
                    <Link
                      className={clsx(cls.registerLink)}
                      title={t("Зарегистрироваться")}
                      href={`/${locale}/auth`}
                    >
                      {t("Зарегистрироваться")}
                    </Link>
                  )}
                  <Box className={cls.localeBox} display="flex" columnGap="4px">
                    <LocaleDropdown locale={locale} />
                    {/* <IconButton variant="reset"> */}
                    {/* <LanguageIcon /> */}
                    {/* </IconButton> */}
                  </Box>
                  {isAuth && (
                    <>
                      <Box onClick={goToProfile} className={cls.userIcon} ml="16px">
                        <Image
                          src={photo ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${photo}` : UserImg}
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
            <button className={cls.burgerBtn} onClick={handleToggleNav}>
              <svg id="hamburger" viewBox="0 0 60 40">
                <g stroke="#70707B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path className={cls.topLine} id="top-line" d="M10,10 L50,10 Z"></path>
                  <path className={cls.middleLine} id="middle-line" d="M10,20 L50,20 Z"></path>
                  <path className={cls.bottomLine} id="bottom-line" d="M10,30 L50,30 Z"></path>
                </g>
              </svg>
            </button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

export default Header;




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

