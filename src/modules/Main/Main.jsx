"use client";
import clsx from "clsx";
import { MobileApp } from "./components/MobileApp";
import { News } from "./components/News";
import styles from "./styles.module.scss";
import { useMainProps } from "./useMainProps";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";

export function Main() {

  const { banner } = useMainProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return (
    <article className={clsx(styles.main, "fade-in")}>
      <MobileApp description={banner?.description} description1={banner?.description_1} photo={banner?.photo} />
      <News t={t} />
    </article>
  );
}
