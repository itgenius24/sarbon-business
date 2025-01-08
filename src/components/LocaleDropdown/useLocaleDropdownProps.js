import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import nookies from "nookies"; // nookies kutubxonasini import qilish

import UzbFlagImg from "@/assets/images/uz.png";
import RFFlagImg from "@/assets/images/ru.png";

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
      value: "ch",
      label: "Chinese",
      shortName: "Ch",
      icon: "https://flagcdn.com/w320/cn.png",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const activeLangIndex = langs.findIndex((lang) => lang.value === locale);
  const activeLang = langs[activeLangIndex];

  const dropdownRef = useRef(null);

  function handleChangeLocale(value) {
    router.push(pathname.replace(locale, value));
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    setCookie("i18next", value, { path: "/", expires });
    

    setOpen(false);

    // URL o'zgartirilgandan keyin ochilishini kutish
    // router.push(pathname.replace(locale, value)).then(() => {
    //     setOpen(false);  // Sahifa yangilangandan keyin yopiladi
    // });
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
