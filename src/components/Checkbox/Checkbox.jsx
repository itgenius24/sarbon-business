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
  isDisabled = false,
  id=`1`,
  isLoading,
  ...props
 
}) => {
  return <label style={{cursor:isDisabled && `not-allowed`}} className={clsx(cls.checkboxLabel, className, { [cls.filled]: filled })}>
    <input id={id} disabled={isDisabled} checked={defaultChecked}  className={clsx("visually-hidden", cls.checkboxInput)}  {...register(name)} defaultChecked={defaultChecked} type={type} {...props}/>
    {
      !isLoading && <span className={cls.checkbox} style={{ width, height, backgroundSize: iconSize }}></span> 
    }
    {
      isLoading && <span className={cls.checkbox2} style={{ width, height, backgroundSize: iconSize }}></span> 
    }
    <span style={{opacity:isDisabled && 0.5}} className={ defaultChecked ?  cls.checkboxText : cls.checkboxTextNone}>{children}</span>
  </label>;
};
