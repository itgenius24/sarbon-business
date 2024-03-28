"use client";
import { Main } from "@/modules/Main";
import { useTranslation } from "../i18n/client";

export default function Home({ params }) {

  const { locale } = params;

  const { t } = useTranslation(locale, "translations");

  return <Main t={t} />;
}
