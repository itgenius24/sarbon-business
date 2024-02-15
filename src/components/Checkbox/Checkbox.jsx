import clsx from "clsx";
import cls from "./styles.module.scss";

export const Checkbox = ({ register = () => {}, name, className, children, ...props }) => {

  return <label className={clsx(cls.checkboxLabel, className)}>
    <input className={clsx("visually-hidden", cls.checkboxInput)} {...register(name)} type="checkbox" {...props}/>
    <span className={cls.checkbox}></span>
    <span className={cls.checkboxText}>{children}</span>
  </label>;
};
