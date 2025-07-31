import cls from "./styles.module.scss";
import { CheckIcon, SelectionArrow } from "@/assets/icons/icons";
import Image from "next/image";
import { useLocaleDropdownProps } from "./useLocaleDropdownProps";
import { useTranslation } from "react-i18next";

export const LocaleDropdown = ({ locale }) => {

  const ret = useTranslation();
  const { i18n } = ret;

  const resolvedLang = i18n.resolvedLanguage;


  const {
    isOpen,
    activeLang,
    activeLangIndex,
    handleChangeLocale,
    langs,
    setOpen,
    dropdownRef
  } = useLocaleDropdownProps({ locale: locale || resolvedLang });

  return <div className={cls.localeDropdown} ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
    <span className={cls.localeDropdownHeader} onClick={() => setOpen(!isOpen)}>
      <span>
        <Image src={activeLang?.icon} alt={activeLang?.label} style={{ width:`22px`,height:`22px`,objectFit:`cover`,borderRadius:`50%` }} width={100} height={100} />
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
                <Image src={lang.icon} alt={lang} style={{ width:`22px`,height:`22px`,objectFit:`cover`,borderRadius:`50%` }} width={100} height={100} />
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
