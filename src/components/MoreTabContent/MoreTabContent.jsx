"use client";

import {
  CloseIcon,
  DriversIcon,
  FuraNavIcon,
  LocationIcon,
  RouteDirectionIcon,
  SettingIcon,
  TruckIcon
} from "@/assets/icons/icons";
import { useGetLang } from "@/hooks/useGetLang";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import { useElements } from "@/layouts/MainLayout/elements";
import authStore from "@/store/auth.store";
import { Box, Flex, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import cls from "./styles.module.scss";

// Icon mapping for different navigation items
const getIconForPath = (path) => {
  if (path.includes("/drivers")) return <DriversIcon />;
  if (path.includes("/my-cars")) return <FuraNavIcon />;
  if (path.includes("/distance-calculation")) return <RouteDirectionIcon />;
  if (path.includes("/gps-tracking")) return <LocationIcon />;
  if (path.includes("/add-cargo")) return <TruckIcon />;
  if (path.includes("/my-loads")) return <TruckIcon />;
  if (path.includes("/legal")) return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
        stroke="#7E7B86"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2V8H20"
        stroke="#7E7B86"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 13H8"
        stroke="#7E7B86"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17H8"
        stroke="#7E7B86"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9H9H8"
        stroke="#7E7B86"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return <SettingIcon />;
};

export const MoreTabContent = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const locale = useGetLang();
  const isHydrated = useStoreHydration();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  // Language switcher functionality
  const { useCookies } = require("react-cookie");
  const { useRouter, usePathname } = require("next/navigation");
  const [, setCookie] = useCookies(["i18next"]);
  const router = useRouter();
  const pathname = usePathname();

  const langs = [
    {
      value: "ru",
      label: "Русский",
      shortName: "Ру",
      icon: "https://flagcdn.com/w320/ru.png",
    },
    {
      value: "uz",
      label: "O'zbekcha",
      shortName: "Uz",
      icon: "https://flagcdn.com/w320/uz.png",
    },
    {
      value: "en",
      label: "English",
      shortName: "En",
      icon: "https://flagcdn.com/w320/gb.png",
    },
    {
      value: "tr",
      label: "Türkçe",
      shortName: "Tr",
      icon: "https://flagcdn.com/w320/tr.png",
    },
    {
      value: "zh",
      label: "简体中文",
      shortName: "Ch",
      icon: "https://flagcdn.com/w320/cn.png",
    },
  ];

  const activeLang = langs.find((lang) => lang.value === locale) || langs[0];

  const handleChangeLocale = (value) => {
    router.push(pathname.replace(locale, value));
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    setCookie("i18next", value, { path: "/", expires });
    onClose(); // Close the modal after language change
  };

  // Get navigation elements from the existing layout
  const elements = useElements(locale);

  // Don't render on desktop
  if (isLargerThan768 || !isHydrated) {
    return null;
  }

  const isAuth = authStore?.token?.access_token;

  // Don't show if not authenticated
  if (!isAuth) {
    return null;
  }

  // Filter out the main tabs that are already in bottom navigation
  const excludedPaths = ["/cargos", "/performed", "/profile"];
  const moreItems = elements?.filter(element =>
    !excludedPaths.some(path => element.path.includes(path))
  ) || [];

  if (!isOpen) {
    return null;
  }

  return (
    <Box className={cls.overlay} onClick={onClose}>
      <Box className={cls.moreTabContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <Flex className={cls.header}>
          <Text className={cls.title}>{t("Ещё")}</Text>
          <Box className={cls.closeButton} onClick={onClose}>
            <CloseIcon />
          </Box>
        </Flex>

        {/* Navigation Items */}
        <VStack className={cls.itemsList} spacing={0}>
          {moreItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={cls.itemLink}
              onClick={onClose}
            >
              <Flex className={cls.item}>
                <Box className={cls.itemIcon}>
                  {getIconForPath(item.path)}
                </Box>
                <Text className={cls.itemLabel}>
                  {t(item.label)}
                </Text>
                <Box className={cls.arrow}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="#7E7B86"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
              </Flex>
            </Link>
          ))}
        </VStack>

        {/* Language Switcher */}
        <Box className={cls.languageSection}>
          <Text className={cls.sectionTitle} mb="12px">
            {t("Язык")}
          </Text>
          <Flex className={cls.languageItem} onClick={() => {}}>
            <Box className={cls.languageIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.87 15.07L10.33 12.56L10.36 12.53C12.1 10.59 13.34 8.36 14.07 6H17V4H10V2H8V4H1V6H12.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8H4.69C5.42 9.63 6.42 11.17 7.67 12.56L2.58 17.58L4 19L9 14L12.11 17.11L12.87 15.07ZM18.5 10H16.5L12 22H14L15.12 19H19.87L21 22H23L18.5 10ZM15.88 17L17.5 12.67L19.12 17H15.88Z"
                  stroke="#7E7B86"
                  strokeWidth="1.5"
                  fill="#7E7B86"
                />
              </svg>
            </Box>
            <Flex direction="column" flex="1">
              <Text className={cls.languageLabel}>
                {activeLang.label}
              </Text>
              <Text className={cls.languageSubtext}>
                {t("Текущий язык")}
              </Text>
            </Flex>
            <Box className={cls.arrow}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#7E7B86"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          </Flex>

          {/* Language Options */}
          <VStack spacing={2} mt="8px">
            {langs.map((lang) => (
              <Flex
                key={lang.value}
                className={cls.languageOption}
                onClick={() => handleChangeLocale(lang.value)}
                opacity={lang.value === locale ? 0.5 : 1}
                cursor={lang.value === locale ? "default" : "pointer"}
              >
                <Box className={cls.flagIcon} mr="12px">
                  <img
                    src={lang.icon}
                    alt={lang.label}
                    style={{
                      width: "20px",
                      height: "20px",
                      objectFit: "cover",
                      borderRadius: "50%"
                    }}
                  />
                </Box>
                <Text className={cls.languageOptionLabel}>
                  {lang.label}
                </Text>
                {lang.value === locale && (
                  <Box ml="auto">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                        fill="#26BD49"
                      />
                    </svg>
                  </Box>
                )}
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Footer with app info */}
        <Box className={cls.footer}>
          <Text className={cls.footerText}>
            {t("Версия приложения")} 1.0.0
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
