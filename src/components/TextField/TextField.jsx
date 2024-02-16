import clsx from "clsx";
import cls from "./styles.module.scss";

export const TextField = ({
  wrapperClassName,
  errorClassName,
  inputClassName,
  errors,
  name,
  type = "text",
  register = () => {},
  addonBefore,
  addonAfter,
  label,
  bottomText,
  ...props
}) => {

  return <div
    className={
      clsx(
        cls.inputControl,
        wrapperClassName,
        { [cls.error]: !!errors?.[name] }
      )
    }
  >
    {label && <label className={cls.label} htmlFor={name}>{label}</label>}
    <div className={cls.inputWrapper}>
      {addonBefore && <span className={cls.before}>{addonBefore}</span>}
      <input className={clsx(cls.fieldInput, inputClassName)} id={name} type={type} {...register(name)} {...props} />
      {addonAfter && <span className={cls.after}>{addonAfter}</span>}
      {errors?.[name] && <span className={clsx(cls.errorMessage, errorClassName)}>{errors?.[name]?.message}</span>}
    </div>
    {bottomText && <span className={cls.bottomText}>{bottomText}</span>}
  </div>;
};
