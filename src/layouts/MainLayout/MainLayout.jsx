"use client";

import cls from "./styles.module.scss";
import { elements } from "./elements";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export const MainLayout = ({ children, locale }) => {

  const pathname = usePathname();

  const isAuth = pathname.includes("auth");

  return <div className={cls.layout}>
    {
      !isAuth && <Header locale={locale} elements={elements} />
    }
    <article className={cls.main}>
      {children}
    </article>
    <Footer locale={locale} />
  </div>;
};
