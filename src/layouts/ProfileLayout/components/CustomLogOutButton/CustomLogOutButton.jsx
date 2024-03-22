"use client";

import { ExitDoor } from "@/assets/icons/icons";
import { Popup } from "@/components/Popup";
import authStore from "@/store/auth.store";
import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const CustomLogOutButton = () => {
  const router = useRouter();
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(authStore.getIsAuth);
  }, [authStore.getIsAuth]);

  const [isOpen, setIsOut] = useState(false);
  const handleLogOut = () => {
    authStore.logout();
    router.push("/");
  };

  if (!isAuth) return null;
  return (
    <>
      <Button
        onClick={() => setIsOut(true)}
        _hover={{ bg: "brand.50" }}
        justifyContent="flex-start"
        p="14px 16px"
        variant="ghost"
        width="100%"
      >
        <ExitDoor color="#F04438" />
        <Text lineHeight="20px" fontWeight={500} ml="10px" color="icon.base">
          Выйти
        </Text>
      </Button>
      <Popup
        icon={<ExitDoor color="#D92D20" />}
        isOpen={isOpen}
        onClose={() => setIsOut(false)}
        mainText="Вы уверены что хотите выйти из аккаунта?"
        status="delete"
        btn2Callback={handleLogOut}
        btn2Text="Выйти"
      />
    </>
  );
};
