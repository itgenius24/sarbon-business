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
import { useGetNoteList } from "@/services/api";
import authStore from "@/store/auth.store";

export const MainLayout = ({ locale, children }) => {
  const elements = useElements(locale);

  const pathname = usePathname();

  const { data } = useGetNoteList({
    params: {
      data: JSON.stringify({
        user_id_2: authStore.userData?.guid,
        is_read:false
      }),
    },
    querySettings: {
      enabled: Boolean(
        authStore.userData?.role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
      ),
      refetchInterval:30000,
    },

  });

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
