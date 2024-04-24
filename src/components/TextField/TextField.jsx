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
  rules = {},
  placeholder = "",
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
          className={clsx(
            cls.fieldInput,
            inputClassName,
            addonBefore ? cls.hasAddonBefore : ""
          )}
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, rules)}
          {...props}
        />
        {addonAfter && (
          <span className={cls.after}>{addonAfter}</span>
        )}
        {/* {errors?.[name] && (
          <span className={cls.after}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.99967 5.33301V7.99967M7.99967 10.6663H8.00634M14.6663 7.99967C14.6663 11.6816 11.6816 14.6663 7.99967 14.6663C4.31778 14.6663 1.33301 11.6816 1.33301 7.99967C1.33301 4.31778 4.31778 1.33301 7.99967 1.33301C11.6816 1.33301 14.6663 4.31778 14.6663 7.99967Z"
                stroke="#F04438"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )} */}
        {errors?.[name] && (
          <span className={clsx(cls.errorMessage, errorClassName)}>
            {errors?.[name]?.message}
          </span>
        )}
      </div>
      {bottomText && !errors?.[name] && <span className={cls.bottomText}>{bottomText}</span>}
    </div>
  );
};
