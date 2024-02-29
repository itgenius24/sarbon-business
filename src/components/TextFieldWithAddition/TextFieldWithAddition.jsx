"use client";

import clsx from "clsx";
import cls from "./styles.module.scss";
import { useTextFieldWithAdditionProps } from "./useTextFieldWithAdditionProps";
import { Controller } from "react-hook-form";
import { CheckIcon, SelectionArrow } from "@/assets/icons/icons";

export const TextFieldWithAddition = ({
  register = () => {},
  control,
  name = "input",
  type = "text",
  placeholder = "",
  before,
  after,
  label,
  errors = {},
  rules = {},
  additionalItemLabel,
  additionalItemPosition,
  additionalItemTheme = "gray",
  additionalItemOptions = [],
  additionalItemName = "additionalItem",
  additionalItemPlaceholder = "",
  additionalItemDefaultIndex,
  width = "",
  additionalOnclick = () => {},
  ...props
}) => {

  const { dropdownControl, isOpen, handleToggle, handleClose } = useTextFieldWithAdditionProps();

  return <div className={cls.field} style={{ width }}>
    {
      label || additionalItemLabel && <div className={clsx(cls.fieldTop)}>
        {label && <span className={cls.fieldLabel}>{label}</span>}
        {additionalItemLabel && <span className={cls.additionalItemLabel}>{additionalItemLabel}</span>}
      </div>
    }
    <div className={clsx(cls.contentWrapper, { [cls.leftPosition]: additionalItemPosition === "left", [cls.rightPosition]: additionalItemPosition === "right", [cls.error]: !!errors?.[name] })}>
      <div className={clsx(cls.inputWrapper, { [cls.error]: !!errors?.[name] })}>
        {after && <span className={cls.after}>{after}</span>}
        <input className={cls.fieldInput} {...register(name, rules)} type={type} placeholder={placeholder} {...props} />
        {before && <span className={cls.before}>{before}</span>}
      </div>
      <Controller
        name={additionalItemName}
        control={control || dropdownControl}
        render={({ field }) => {
          return <div className={clsx(cls.additionalItem, { [cls.lightTheme]: additionalItemTheme === "light" })}>
            <button
              className={cls.additionalItemContent}
              type="button"
              onClick={() => {
                if(additionalItemOptions.length > 0) {
                  handleToggle();
                }
                additionalOnclick();
              }}
            >
              <span className={cls.additionalItemLabelWrapper}>
                <span>{field.value?.label || additionalItemOptions?.[additionalItemDefaultIndex]?.label || additionalItemPlaceholder}</span>
                {
                  additionalItemOptions.length > 0 && <span><SelectionArrow /></span>
                }
              </span>
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
    </div>
  </div>;
};
