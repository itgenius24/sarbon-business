import clsx from "clsx";
import cls from "./styles.module.scss";

export const CheckboxComment = ({
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
   
    <span style={{opacity:isDisabled && 0.5}} className={ defaultChecked ?  cls.checkboxText : cls.checkboxTextNone}>{children}</span>
    <input id={id} disabled={isDisabled}  className={clsx("visually-hidden", cls.checkboxInput)} {...register(name)} defaultChecked={defaultChecked} type={type} {...props}/>

    {
      !isLoading && <span className={cls.checkbox} style={{ width, height, backgroundSize: iconSize }}></span> 
    }
    {
      isLoading && <span className={cls.checkbox2} style={{ width, height, backgroundSize: iconSize }}></span> 
    }

  </label>;
};
