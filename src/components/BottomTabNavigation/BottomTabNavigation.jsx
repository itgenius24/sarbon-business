"use client";

import { SearchIcon, User } from "@/assets/icons/icons";
import { useGetLang } from "@/hooks/useGetLang";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import authStore from "@/store/auth.store";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import cls from "./styles.module.scss";

// Custom Orders Icon for bottom navigation
const OrdersIcon = ({ isActive }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17ZM17 21V11H13V7H7V19H17Z"
      stroke={isActive ? "#26BD49" : "#7E7B86"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={isActive ? "#26BD49" : "none"}
      fillOpacity={isActive ? 0.1 : 0}
    />
  </svg>
);

// Custom Chat Icon for bottom navigation
const ChatIcon = ({ isActive }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
      stroke={isActive ? "#26BD49" : "#7E7B86"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={isActive ? "#26BD49" : "none"}
      fillOpacity={isActive ? 0.1 : 0}
    />
  </svg>
);

// Custom More Icon for bottom navigation
const MoreIcon = ({ isActive }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
      fill={isActive ? "#26BD49" : "#7E7B86"}
    />
    <path
      d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
      fill={isActive ? "#26BD49" : "#7E7B86"}
    />
    <path
      d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
      fill={isActive ? "#26BD49" : "#7E7B86"}
    />
  </svg>
);

export const BottomTabNavigation = ({ onMoreTabClick }) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useGetLang();
  const isHydrated = useStoreHydration();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  // Don't render on desktop
  if (isLargerThan768) {
    return null;
  }

  // For PWA scenarios, show navigation even if not fully hydrated yet
  // This prevents users from getting stuck without navigation
  const isPWA = typeof window !== "undefined" && window.navigator?.standalone;
  if (!isHydrated && !isPWA) {
    return null;
  }

  // Check authentication status with fallback for PWA scenarios
  const isAuth = authStore?.token?.access_token;

  // For PWA scenarios, also check localStorage directly if store isn't hydrated yet
  let fallbackAuth = false;
  if (!isHydrated && isPWA) {
    try {
      const storedAuth = localStorage.getItem('authStore');
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        fallbackAuth = parsedAuth.isAuth && parsedAuth.token?.access_token;
      }
    } catch (e) {
      console.error('Error checking fallback auth:', e);
    }
  }

  const userIsAuthenticated = isAuth || fallbackAuth;

  // Show simplified tabs for unauthenticated users
  const unauthenticatedTabs = [
    {
      id: "login",
      label: t("Вход"),
      path: `/${locale}/auth`,
      icon: (isActive) => (
        <User
          style={{
            color: isActive ? "#26BD49" : "#7E7B86",
            width: "24px",
            height: "24px"
          }}
        />
      ),
      isActive: pathname.includes("/auth"),
    },
  ];

  const tabs = userIsAuthenticated ? [
    {
      id: "search",
      label: t("Грузы"),
      path: `/${locale}/cargos`,
      icon: (isActive) => (
        <SearchIcon
          style={{
            color: isActive ? "#26BD49" : "#7E7B86",
            width: "24px",
            height: "24px"
          }}
        />
      ),
      isActive: pathname.includes("/cargos"),
    },
    {
      id: "orders",
      label: t("Заказы"),
      path: `/${locale}/performed`,
      icon: (isActive) => <OrdersIcon isActive={isActive} />,
      isActive: pathname.includes("/performed"),
    },
    {
      id: "profile",
      label: t("Профиль"),
      path: `/${locale}/profile`,
      icon: (isActive) => <User isActive={isActive} />,
      isActive: pathname.includes("/profile"),
    },
    {
      id: "chat",
      label: t("Чат"),
      path: `/${locale}/chat`,
      icon: (isActive) => <ChatIcon isActive={isActive} />,
      isActive: pathname.includes("/chat"),
    },
    {
      id: "more",
      label: t("Ещё"),
      path: "#",
      icon: (isActive) => <MoreIcon isActive={isActive} />,
      isActive: false, // More tab doesn't have a specific route
      onClick: onMoreTabClick,
    },
  ] : unauthenticatedTabs;

  const handleTabClick = (tab) => {
    if (tab.onClick) {
      tab.onClick();
    } else {
      router.push(tab.path);
    }
  };

  return (
    <Box className={cls.bottomTabNavigation}>
      <Flex className={cls.tabContainer}>
        {tabs.map((tab) => (
          <Box
            key={tab.id}
            className={clsx(cls.tab, { [cls.active]: tab.isActive })}
            onClick={() => handleTabClick(tab)}
          >
            <Box className={cls.iconContainer}>
              {tab.icon(tab.isActive)}
            </Box>
            <Text className={clsx(cls.label, { [cls.activeLabel]: tab.isActive })}>
              {tab.label}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
