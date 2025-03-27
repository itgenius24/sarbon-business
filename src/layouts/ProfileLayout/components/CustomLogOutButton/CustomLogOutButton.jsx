"use client";

import { ExitDoor } from "@/assets/icons/icons";
import { Popup } from "@/components/Popup";
import { useGetLang } from "@/hooks/useGetLang";
import { useCreateActionHistoriesMutation } from "@/services/api";
import authStore from "@/store/auth.store";
import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const CustomLogOutButton = () => {
  const router = useRouter();
  const [isAuth, setAuth] = useState(false);

  const locale = useGetLang();
  const {t} = useTranslation();
  useEffect(() => {
    setAuth(authStore.getIsAuth);
  }, [authStore.getIsAuth]);

      const { mutate: actionCreate } = useCreateActionHistoriesMutation();
      const roleName = authStore.userData.dispatcher_type?.[0]
  
  const [isOpen, setIsOut] = useState(false);

  const handleLogOut = async () => {
  
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: authStore.userData.your_id,
          action_time: new Date(),
          role_slug: roleName ? roleName : authStore.userData?.role_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469" ? `ceo`: `customer`,
          action_comment: `log_out`,
          role_id: authStore.userData?.role_id,
          action_type: [`update`],
        },
      });
    
  
    await authStore.logout();
    router.push(`/${locale ? locale :`ru`}/auth/login`);
  };

  // const handleLogOut = () => {
  //   authStore.logout();
  //   // router.push(`/${locale}/auth`);
  //   window.location.href = `${window.location.origin}/${`${locale}/auth`}`;
  //   // window.location.replace('https://new-url.com');
  //   // setTimeout(() => {
  //   //     window.location.reload()    
  //   // },200)
  // };

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
          {t(`Выйти`)}
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
