import clsx from "clsx";
import cls from "./styles.module.scss";
import { useTopFilterProps } from "./useTopFilterProps";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export const TopFilter = ({
  onChange = () => {},
  filterList = [],
  disabled,
  driverCount,
  waitingDriverCount
}) => {

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const { activeTab, handleTabClick } =
    useTopFilterProps({ filterList });


  return <div className={cls.topFilter}>
    {
      filterList?.map(({ label, value }) => {
        return <div key={value} className={cls.tabWrap}>
          <button
            disabled={disabled}
            type="button"
            className={clsx(cls.tab, { [cls.active]: activeTab.value === value })}
            onClick={() => {
              handleTabClick({ label, value });
              onChange({ label, value });
            }}
          >
            {t(label)}
            {value === "new" && <div className={cls.count}>{driverCount}</div>}
            {value === "approve_from_driver" && <div className={cls.count}>{waitingDriverCount}</div>}
          </button>
        </div>;
      })
    }
  </div>;
};
