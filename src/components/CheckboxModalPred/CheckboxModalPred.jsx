import clsx from "clsx";
import cls from "./styles.module.scss";

export const CheckboxModalPred = ({
  register = () => {},
  name,
  className,
  children,
  type="checkbox",
  defaultChecked=false,
  filled,
  width,
  isError,
  height,
  iconSize,
  isDisabled = false,
  id=`1`,
  ...props
 
}) => {
  return <label className={clsx(cls.checkboxLabel, className, { [cls.filled]: filled })}>
    <input  id={id} disabled={isDisabled}  className={clsx("visually-hidden", cls.checkboxInput)} {...register(name)} defaultChecked={defaultChecked} type={type} {...props}/>
    <span className={cls.checkbox} style={{ width, height, backgroundSize: iconSize }}></span>
    <span className={ defaultChecked ?  cls.checkboxText : cls.checkboxTextNone}>{children}</span>
  </label>;
};
