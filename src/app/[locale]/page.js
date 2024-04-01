"use client";
import { Main } from "@/modules/Main";
import { useTranslation } from "../i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export default function Home() {

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Main t={t} />;
}
