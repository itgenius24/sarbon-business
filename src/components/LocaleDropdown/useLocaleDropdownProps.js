import { useGetLang } from "@/hooks/useGetLang";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export const useLocaleDropdownProps = ({ locale }) => {
  const [cookies, setCookie] = useCookies(["i18next"]);

  const [isOpen, setOpen] = useState(false);

  const langs = [
    {
      value: "ru",
      label: "Русский",
      shortName: "Ру",
      icon: "https://flagcdn.com/w320/ru.png",
    },
    {
      value: "uz",
      label: "Узбекский",
      shortName: "Уз",
      icon: "https://flagcdn.com/w320/uz.png",
    },
    {
      value: "en",
      label: "English",
      shortName: "En",
      icon: "https://flagcdn.com/w320/gb.png",
    },
    {
      value: "tr",
      label: "Turkish",
      shortName: "Tr",
      icon: "https://flagcdn.com/w320/tr.png",
    },
    {
      value: "zh",
      label: "Chinese",
      shortName: "Ch",
      icon: "https://flagcdn.com/w320/cn.png",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const activeLangIndex = langs.findIndex((lang) => lang.value === locale);
  const activeLang = langs[activeLangIndex] || {
    value: "ru",
    label: "Русский",
    shortName: "Ру",
    icon: "https://flagcdn.com/w320/ru.png",
  };

  const lan = useGetLang()

  useEffect(() => {
    if (!lan) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      setCookie("i18next", `ru`, { path: "/", expires });
    }
  }, []);

  const dropdownRef = useRef(null);

  function handleChangeLocale(value) {
    router.push(pathname.replace(locale, value));
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    setCookie("i18next", value, { path: "/", expires });
    setOpen(false);
  }

  function onWindowClick(e) {
    if (!e.target.closest(dropdownRef.current?.className)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", onWindowClick);

    return () => window.removeEventListener("click", onWindowClick);
  }, []);

  return {
    isOpen,
    setOpen,
    langs,
    activeLang,
    activeLangIndex,
    handleChangeLocale,
    dropdownRef,
  };
};
