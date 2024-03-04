import clsx from "clsx";
import cls from "./styles.module.scss";

export const LoadBtn = ({ children, onClick = () => {}, type = "primary", icon }) => {

  return <button className={clsx(cls.cardBtn, cls[type])} type="button" onClick={onClick}>
    <span className={cls.cardBtnInner}>
      {icon}
      <span>{children}</span>
    </span>
  </button>;
};
