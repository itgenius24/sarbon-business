"use client";

import cls from "./styles.module.scss";
// import { elements } from "./elements";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useElements } from "./elements";
import clsx from "clsx";

export const MainLayout = ({ children }) => {

  const elements = useElements();

  const pathname = usePathname();

  const isAuthPage = pathname.includes("auth") || pathname.includes(`share-location`); 
  const isAuthPageFooter = pathname.includes("auth") || pathname.includes(`add-cargo`);

  return <div className={clsx(cls.layout, "fade-in")}>
    {
      !isAuthPage && <Header elements={elements} />
    }
    <article className={cls.main}>
      {children}
    </article>
    {
      !isAuthPageFooter && <Footer />
    }
  </div>;
};
