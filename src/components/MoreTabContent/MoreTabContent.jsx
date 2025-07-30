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
