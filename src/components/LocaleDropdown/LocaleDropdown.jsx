import cls from "./styles.module.scss";
import { CheckIcon, SelectionArrow } from "@/assets/icons/icons";
import UzbFlagImg from "@/assets/images/uz.png";
import RFFlagImg from "@/assets/images/ru.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import localeStore from "@/store/locale.store";

export const LocaleDropdown = ({ locale = "ru" }) => {

  const [isOpen, setOpen] = useState(false);

  const langs = [
    {
      value: "ru",
      label: "Русский",
      shortName: "Ру",
      icon: RFFlagImg,
    },
    {
      value: "uz",
      label: "Узбекский",
      shortName: "Уз",
      icon: UzbFlagImg,
    }
  ];

  const router = useRouter();
  const pathname = usePathname();

  const activeLangIndex = langs.findIndex(lang => lang.value === locale);
  const activeLang = langs[activeLangIndex];

  function handleChangeLocale(value) {
    router.push(pathname.replace(locale, value));
    localeStore.setLocale(value);
    setOpen(false);
  }

  return <div className={cls.localeDropdown}>
    <span className={cls.localeDropdownHeader} onClick={() => setOpen(!isOpen)}>
      <span>
        <Image src={activeLang?.icon} alt={activeLang?.label} width={18} height={18} />
      </span>
      <span>
        {activeLang?.shortName}
      </span>
      <span>
        <SelectionArrow />
      </span>
    </span>
    {
      isOpen && <div className={cls.localeDropdownList}>
        {
          langs.map((lang, index) => (
            <button onClick={() => handleChangeLocale(lang.value)} className={cls.localeDropdownItem} key={lang.value}>
              <span className={cls.localeDropdownItemIcon}>
                <Image src={lang.icon} alt={lang} width={18} height={18} />
              </span>
              <span className={cls.localeDropdownItemLabel}>
                {lang.label}
              </span>
              {
                index === activeLangIndex && <span><CheckIcon/></span>
              }
            </button>
          ))
        }
      </div>
    }
  </div>;
};
