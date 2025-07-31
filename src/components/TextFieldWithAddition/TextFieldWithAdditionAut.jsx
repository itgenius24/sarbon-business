"use client";

import clsx from "clsx";
import cls from "./styles.module.scss";
import { useTextFieldWithAdditionProps } from "./useTextFieldWithAdditionProps";
import { Controller } from "react-hook-form";
import { CheckIcon, SelectionArrow } from "@/assets/icons/icons";

export const TextFieldWithAdditionAut = ({
  register = () => {},
  control,
  name = "input",
  type = "text",
  placeholder = "",
  before,
  after,
  label,
  errors = {},
  error,
  additionalItemLabel,
  additionalItemPosition,
  additionalItemTheme = "gray",
  additionalItemOptions = [],
  additionalItemName = "additionalItem",
  additionalItemPlaceholder = "",
  additionalItemDefaultIndex,
  width = "",
  additionalOnclick = () => {},
  disabled,
  onlyFieldDisabled,
  onClick,
  rules = {},
  className,
  zIndex = 9,
  ...props
}) => {

  const { dropdownControl, isOpen, handleToggle, handleClose, additionalDropdownRef, } = useTextFieldWithAdditionProps();

  return <div className={clsx(cls.field, className, { [cls.disabled]: disabled })} style={{ width }}>
    {
      label || additionalItemLabel && <div className={clsx(cls.fieldTop)}>
        {label && <span className={cls.fieldLabel}>{label}</span>}
        {additionalItemLabel && <span className={cls.additionalItemLabel}>{additionalItemLabel}</span>}
      </div>
    }
    <div
      className={clsx(cls.contentWrapper, { [cls.leftPosition]: additionalItemPosition === "left", [cls.rightPosition]: additionalItemPosition === "right", [cls.error]: !!errors?.[name] || error })}
      style={{ zIndex }}
    >
      <Controller
        name={additionalItemName}
        control={control || dropdownControl}
        render={({ field }) => {
          return <div ref={additionalDropdownRef} className={clsx(cls.additionalItem2, { [cls.lightTheme]: additionalItemTheme === "light" })}>
            <button
              disabled={disabled}
              className={clsx(cls.additionalItemContent)}
              type="button"
              onClick={() => {
                if(additionalItemOptions.length > 0) {
                  handleToggle();
                }
                additionalOnclick();
              }}
            >
              <div className={cls.additionalItemLabelWrapper2}>
                <span className={cls.additionalItemLabelText}>{field.value?.label || additionalItemOptions?.[additionalItemDefaultIndex]?.label || additionalItemPlaceholder}</span>
                {
                  additionalItemOptions.length > 0 && <span><SelectionArrow /></span>
                }
              </div>
            </button>
            {
              additionalItemOptions.length > 0 && isOpen && <div className={cls.additionalItemOptions}>
                {additionalItemOptions.map((item, index) => {
                  return <button
                    key={index}
                    className={clsx(cls.additionalItemOption, { [cls.active]: item.value === field?.value?.value })}
                    onClick={() => {
                      field.onChange(item);

                      handleClose();
                    }}
                  >
                    <span className={cls.additionalItemOptionLabel}>
                      <span>{item.label}</span>
                      {item.value === field?.value?.value && <CheckIcon />}
                    </span>
                  </button>;
                })}
              </div>
            }
          </div>;
        }}
      />
      <div className={clsx(cls.inputWrapper2, { [cls.error]: !!errors?.[name] })}>
        {after && <span className={cls.after}>{after}</span>}
        <input
          className={cls.fieldInput}
          onClick={onClick}
          {...register(name, rules)}
          disabled={onClick ? false : disabled || onlyFieldDisabled}
          type={type}
          placeholder={placeholder}
          onWheel={(e) => e.target.blur()}
          {...props}
        />

        {before && <span className={cls.before}>{before}</span>}
        {after && <span className={cls.after}>{after}</span>}
      </div>

    </div>
    {
        error
          ? <span className={cls.errorText}>{error?.message}</span>
          : errors?.[name] && <span className={cls.errorText}>{errors?.[name]?.message}</span>
    }
  </div>;
};
