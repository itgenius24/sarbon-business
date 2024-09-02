import clsx from "clsx";
import cls from "./styles.module.scss";

export const Checkbox = ({
  register = () => {},
  name,
  className,
  children,
  type="checkbox",
  defaultChecked=false,
  filled,
  width,
  height,
  iconSize,
  ...props
}) => {
  return <label className={clsx(cls.checkboxLabel, className, { [cls.filled]: filled })}>
    <input className={clsx("visually-hidden", cls.checkboxInput)} {...register(name)} defaultChecked={defaultChecked} type={type} {...props}/>
    <span className={cls.checkbox} style={{ width, height, backgroundSize: iconSize }}></span>
    <span className={ defaultChecked ?  cls.checkboxText : cls.checkboxTextNone}>{children}</span>
  </label>;
};
