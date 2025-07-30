"use client";

import { Box, Flex, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import clsx from "clsx";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import { useElements } from "@/layouts/MainLayout/elements";
import {
  CloseIcon,
  TruckIcon,
  User2,
  LocationIcon,
  SettingIcon,
  DriversIcon,
  FuraNavIcon,
  RouteDirectionIcon
} from "@/assets/icons/icons";
import cls from "./styles.module.scss";

// Icon mapping for different navigation items
const getIconForPath = (path) => {
  if (path.includes("/drivers")) return <DriversIcon />;
  if (path.includes("/my-cars")) return <FuraNavIcon />;
  if (path.includes("/distance-calculation")) return <RouteDirectionIcon />;
  if (path.includes("/gps-tracking")) return <LocationIcon />;
  if (path.includes("/add-cargo")) return <TruckIcon />;
  if (path.includes("/my-loads")) return <TruckIcon />;
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
