"use client";

import cls from "./styles.module.scss";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";
import { useElements } from "./elements";
import clsx from "clsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetNotificationFirst, useUpdateNoteData } from "@/services/api";
import authStore from "@/store/auth.store";
import ChangelogModal from "@/components/ChangelogModal/ChangelogModal";
import { Box, IconButton } from "@chakra-ui/react";
import { ChatHeaderIcon } from "@/assets/icons/icons";
const predlojeniya = "/predlojeniya.mp3";
const predlojeniyauz = "/predlojeniyauz.mp3";
const vispolneniya = "/vispolneniya.mp3";
const vispolneniyauz = "/vispolneniyauz.mp3";
const zavishon = "/zavishon.mp3";
const zavishonuz = "/zavishonuz.mp3";

export const MainLayout = ({ locale, children }) => {
  const elements = useElements(locale);
  const pathname = usePathname();
  const router = useRouter();
  const { mutate } = useUpdateNoteData();
  const role_id = authStore?.userData.role_id;
  const token = authStore?.token?.access_token;
  const isPathChat = pathname.includes(`chat`) && ( role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" || role_id !== "527d2017-2dc2-4449-9eeb-08fc1aafa469") && token;


  const { data: data2 } = useGetNotificationFirst({
    data: {
      data: {
        object_data: {
          type: `notification`,
          user_id: authStore.userData?.guid,
          views: false,
        },
      },
    },
    querySettings: {
      enabled: Boolean(
        authStore.userData?.role_id ===
          "785678f2-fae7-4a00-8766-99ea67d3784f" &&
          !pathname.includes(`my-loads`)
      ),
      onSuccess: (res) => {
        if (res.response?.length > 0) {
          notificationFn(res);
        }
      },
      refetchInterval: 10000,
    },
  });

  const notificationFn = (res) => {
    mutate({
      data: {
        views: true,
        guid: res?.response?.[0]?.guid,
      },
    });
    let audioUrl = ``;
    Notification.requestPermission();
    if (res?.response?.[0]?.type === "предложение") {
      audioUrl = locale === `uz` ? predlojeniyauz : predlojeniya;
    } else if (res?.response?.[0]?.type === "в исполнении") {
      audioUrl = locale === `uz` ? vispolneniyauz : vispolneniya;
    } else if (res?.response?.[0]?.type === "завершенный") {
      audioUrl = locale === `uz` ? zavishonuz : zavishon;
    }

    const audio = new Audio(audioUrl);
    audio.play();
    new Notification(res?.response?.[0]?.title, {
      body: res?.response?.[0]?.notification,
      icon: "/custom-icon.png",
      vibrate: [200, 100, 200],
    });
  };

  const isAuthPage =
    pathname.includes("auth") || pathname.includes(`share-location`);
  const isAuthPageFooter = pathname?.length === 3;



  return (
    <div className={clsx(cls.layout, "fade-in")}>
      <ChangelogModal locale={locale} />

      {isPathChat && 
          <Box className={cls.chatIcon}>
            <IconButton
              onClick={() => window.location.replace(`/${locale}/chat`)}
              className={cls.iconButton}
              icon={<ChatHeaderIcon color={`white`} />}
            />
          </Box>
        }

      {!isAuthPage && <Header elements={elements} />}
      <article className={cls.main}>{children}</article>
      {isAuthPageFooter && <Footer />}
    </div>
  );
};
