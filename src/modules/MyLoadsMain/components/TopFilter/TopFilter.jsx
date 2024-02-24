import clsx from "clsx";
import cls from "./styles.module.scss";
import { useTopFilterProps } from "./useTopFilterProps";

export const TopFilter = ({ onChange = () => {} }) => {

  const {
    activeTab,
    filterTabs,
    handleTabClick
  } = useTopFilterProps();


  return <div className={cls.topFilter}>
    {
      filterTabs.map(({ label, value }) => {
        return <div key={value} className={cls.tabWrap}>
          <button
            className={clsx(cls.tab, { [cls.active]: activeTab.value === value })}
            onClick={() => {
              handleTabClick({ label, value });
              onChange({ label, value });
            }}
          >
            {label}
          </button>
        </div>;
      })
    }
  </div>;
};
