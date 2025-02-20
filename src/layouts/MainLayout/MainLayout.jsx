"use client";

import cls from "./styles.module.scss";
// import { elements } from "./elements";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useElements } from "./elements";
import clsx from "clsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetNoteList, useUpdateNoteData } from "@/services/api";
import authStore from "@/store/auth.store";

const notificationSound = "/new.mp3";

export const MainLayout = ({ locale, children }) => {
  const elements = useElements(locale);

 

  const pathname = usePathname();



  const {mutate} = useUpdateNoteData()

  const { data, isFetching } = useGetNoteList({
    params: {
      data: JSON.stringify({
        users_id_2: authStore.userData?.guid,
        views: false,
        with_relations: true
      }),
    },
    querySettings: {
      enabled: Boolean(
        authStore.userData?.role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
      ), 
      onSuccess: (res) => {
        if(res.response?.length > 0){
          notificationFn(res);
        }
      },
      refetchInterval: 30000,
    },
  });

  const notificationFn = (res) => {
    // mutate({
    //   data:{
    //     views: true,
    //     guid:res?.response?.[0]?.guid
    //   }
    // })
    Notification.requestPermission();
    const audio = new Audio(notificationSound); // O'zingizga kerakli audio fayl yo'lini kiriting
    audio.play();
    new Notification(res?.response?.[0]?.title, {
      body: res?.response?.[0]?.notification,
      icon: "/custom-icon.png", // Maxsus ikonka
      vibrate: [200, 100, 200], // Vibration (mobil qurilmalar uchun)
    });
  };


  const isAuthPage =
    pathname.includes("auth") || pathname.includes(`share-location`);
  const isAuthPageFooter =
    pathname.includes("auth") ||
    pathname.includes(`add-cargo`) ||
    pathname.includes(`app-download`);

  return (
    <div className={clsx(cls.layout, "fade-in")}>
      {!isAuthPage && <Header elements={elements} />}
      <article className={cls.main}>{children}</article>
      {!isAuthPageFooter && <Footer />}
    </div>
  );
};
