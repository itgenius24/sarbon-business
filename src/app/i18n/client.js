"use client";

import { useEffect, useState } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages, cookieName } from "./settings";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    locale: undefined, 
    detection: { order: ["path", "htmlTag", "cookie", "navigator"], },
    preload: runsOnServerSide ? languages : []
  });

export function useTranslation(locale, ns, options) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  useEffect(() => {
    if (locale && i18n.resolvedLanguage !== locale) {
      i18n.changeLanguage(locale).then(() => {
        setCookie(cookieName, locale, { path: "/" });
      });
    }
  }, [locale, i18n, setCookie]);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCookie(cookieName, lng, { path: "/" });
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, setCookie]);

  return ret;
}
