"use client";

import { useTranslation } from "@/app/i18n/client";
import { AddDillerMunu } from "@/assets/icons/icons";
import UserImg from "@/assets/images/user.png";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import authStore from "@/store/auth.store";
import { roleName } from "@/utils/roleName";
import {
  Box,
  Button,
  Flex,
  ListItem,
  UnorderedList,
  useMediaQuery
} from "@chakra-ui/react";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ContainerNav } from "../ContainerNav/Container";
import { LocaleDropdown } from "../LocaleDropdown";
import { Logo } from "../Logo/Logo";
import cls from "./styles.module.scss";

const Header = observer(({ elements }) => {
  const router = useRouter();
  const isHydrated = useStoreHydration();

  // const [isAuth, setAuth] = useState(false);

  const isAuth = isHydrated ? authStore.getIsAuth : false;
  const pathname = usePathname();
  const role_id = authStore.userData.role_id;
  const locale = useGetLang();
  const [isLargerThan1024] = useMediaQuery("(min-width: 1025px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { t } = useTranslation(locale, "translations");

  const goToProfile = () => {
    router.push(`/${locale ? locale : `ru`}/profile-new`);

    // if (authStore.userData.role_id === "f81d3c3d-228d-479e-a2b1-9948c98640f2") {
    //   router.push(`/${locale ? locale : `ru`}/profile-new`);
    // } else {
    //   router.push(`/${locale ? locale : `ru`}/profile`);
    // }
  };

  const dispacherType = authStore?.userData?.dispatcher_type;

  const userData = useGetUserInfoHook();

  const photo = userData.data?.photo;

  const [isNavOpen, setNavOpen] = useState(false);
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

  function handleToggleNav() {
    setNavOpen(!isNavOpen);
  }

  function handleToggleMoreMenu() {
    setMoreMenuOpen(!isMoreMenuOpen);
  }

  return (
    <Box
      as="header"
      className={cls.header}
      borderBottom="1px solid"
      borderBottomColor="brand.200"
    >
      <ContainerNav>
        <Box as="nav" className={clsx(cls.nav, { [cls.open]: isNavOpen })}>
          <Box className={cls.leftBox}>
            <Box className={cls.logo}>
              <Logo />
            </Box>

            <Box className={cls.content}>
              <UnorderedList className={cls.list}>
                {elements?.map((element, index) => {
                  // Add responsive classes based on item position
                  const responsiveClass =
                    index >= elements.length - 1 ? cls.hideAt1380
                    : index >= elements.length - 2 ? cls.hideAt1280
                    : index >= elements.length - 3 ? cls.hideAt1180
                    : index >= elements.length - 4 ? cls.hideAt1080 : '';

                  return (
                    <ListItem
                      className={clsx(cls.listItem, responsiveClass)}
                      key={element.path}
                    >
                      <Link
                        onClick={() => setNavOpen(false)}
                        href={element.path}
                        className={clsx(cls.itemLink, {
                          [cls.activeLink]: index
                            ? pathname.includes(element.path)
                            : pathname === element.path,
                          //  ||
                          //   (pathname.slice(3) === `` && index === 0),
                        })}
                      >
                        {t(element.label)}
                      </Link>
                      {/* {
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
                    } */}
                    </ListItem>
                  );
                })}
                {isAuth && (
                  <ListItem
                    className={clsx(cls.listItem, cls.profile)}
                    key="profile"
                  >
                    <Link
                      onClick={() => setNavOpen(false)}
                      href={`/${locale}/profile-new`}
                      className={clsx(cls.itemLink, { [cls.activeLink]: pathname === `/${locale}/profile-new`, })}
                    >
                      {t("Профиль")}
                    </Link>
                  </ListItem>
                )}
              </UnorderedList>
              <Box className={cls.rightBox}>
                <Box className={cls.buttonBox}>
                  {!isAuth && (
                    <>
                      <Link
                        // className={clsx(cls.loginLink)}
                        className={clsx(cls.registerLink)}
                        title={t("Вход")}
                        href={`/${locale ? locale : `ru`}/auth/login`}
                      >
                        {t("Вход")}
                      </Link>
                      <Link
                        className={clsx(cls.registerLink)}
                        title={t("Регистрация")}
                        href={`/${locale ? locale : `ru`}/auth/registration`}
                      >
                        {t("Регистрация")}
                      </Link>
                    </>
                  )}
                  <Box className={cls.localeBox} display="flex" columnGap="4px">
                    <LocaleDropdown locale={locale} />
                  </Box>
                  {/* <Box>
                    <ChatPopover locale={locale} />
                  </Box> */}

                  {isAuth && (
                    <Flex
                      cursor={`pointer`}
                      onClick={goToProfile}
                      gap={`9px`}
                      alignItems="center"
                    >
                      <Box className={cls.userIcon} ml="16px">
                        <Image
                          src={
                            photo === "photo" || photo === ""
                              ? UserImg
                              : !photo?.includes("http")
                              ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${
                                photo || ""
                              }`
                              : photo?.includes("http")
                              ? photo
                              : UserImg
                          }
                          alt="ww"
                          width={40}
                          height={40}
                          objectFit="cover"
                          style={{ height: "100%" }}
                        />
                      </Box>
                      <Box>
                        <p className={cls.full_name}>
                          {userData?.data?.full_name}
                        </p>
                        <p className={cls.role}>
                          {roleName[authStore.userData.role_id]}
                        </p>
                      </Box>
                    </Flex>
                  )}
                </Box>
              </Box>
            </Box>
            <Flex alignItems="center">
              {!isAuth && !pathname?.includes("app-download") && (
                <Flex>
                  <Link
                    // className={clsx(cls.loginLink,cls.registerLinkMobile2)}
                    className={clsx(cls.registerLink, cls.registerLinkMobile)}
                    title={t("Вход")}
                    href={`/${locale}/auth`}
                  >
                    {t("Вход")}
                  </Link>
                  <Link
                    className={clsx(
                      cls.registerLink,
                      cls.registerLinkMobile,
                      cls.registerLinkMobileRes
                    )}
                    title={t("Регистрация")}
                    href={`/${locale}/auth/registration`}
                  >
                    {t("Регистрация")}
                  </Link>
                </Flex>
              )}

              {role_id === "6a88112a-d543-4e6e-8f77-18149c82d99b" &&
                !isLargerThan1024 && (
                <Box
                  mr={`20px`}
                  onClick={() => {
                    router.push(`/${locale}/add-cars`);
                    setNavOpen(false);
                  }}
                  as="button"
                >
                  <AddDillerMunu />
                </Box>
              )}

              {!pathname?.includes("app-download") &&
               !(isAuth && !isLargerThan768) && ( // Hide hamburger on mobile when authenticated
                <button className={cls.burgerBtn} onClick={handleToggleNav}>
                  <svg id="hamburger" viewBox="0 0 60 40">
                    <g
                      stroke="rgba(33, 31, 38, 1)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        className={cls.topLine}
                        id="top-line"
                        d="M10,10 L50,10 Z"
                      ></path>
                      <path
                        className={cls.middleLine}
                        id="middle-line"
                        d="M10,20 L50,20 Z"
                      ></path>
                      <path
                        className={cls.bottomLine}
                        id="bottom-line"
                        d="M10,30 L50,30 Z"
                      ></path>
                    </g>
                  </svg>
                </button>
              )}
            </Flex>
          </Box>
        </Box>
      </ContainerNav>

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
