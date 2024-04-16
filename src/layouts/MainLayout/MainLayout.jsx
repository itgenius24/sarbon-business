"use client";

import cls from "./styles.module.scss";
// import { elements } from "./elements";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useElements } from "./elements";

export const MainLayout = ({ children }) => {

  const elements = useElements();

  const pathname = usePathname();

  const isAuthPage = pathname.includes("auth");

  return <div className={cls.layout}>
    {
      !isAuthPage && <Header elements={elements} />
    }
    <article className={cls.main}>
      {children}
    </article>
    {
      !isAuthPage && <Footer />
    }
  </div>;
};
