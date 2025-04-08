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
  onClick,
  rules = {},
  placeholder = "",
  disabled,
  ...props
}) => {
  return (
    <div className={clsx(cls.inputControl, wrapperClassName)}>
      {label && (
        <label className={cls.label} htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={clsx(cls.inputWrapper, { [cls.error]: !!errors?.[name] })}
      >
        {addonBefore && <span className={cls.before}>{addonBefore}</span>}
        <input
         onClick={onClick}
          onWheel={(e) => e.target.blur()}
          className={clsx(
            cls.fieldInput,
            inputClassName,
            addonBefore ? cls.hasAddonBefore : ""
          )}
          id={name}
          type={type}
          disabled={onClick ? false : disabled}
          placeholder={placeholder}
          {...register(name, rules)}
          {...props}


        />
        {addonAfter && (
          <span className={cls.after}>{addonAfter}</span>
        )}
        
      
      </div>
      {errors?.[name] && (
          <span className={clsx(cls.errorMessage, errorClassName)}>
            {errors?.[name]?.message}
          </span>
        )}
      {bottomText && !errors?.[name] && <span className={cls.bottomText}>{bottomText}</span>}
    </div>
  );
};
