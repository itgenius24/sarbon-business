"use client";

import { Controller } from "react-hook-form";
import cls from "./styles.module.scss";
import { useDropdownProps } from "./useDropdownProps";
import clsx from "clsx";
import { SelectionArrow } from "@/assets/icons/icons";

export const Dropdown = ({
  options = [],
  placeholder = "Выберите",
  defaultValueIndex,
  label,
  control,
  name = "select",
}) => {

  const optionsHeight = `${Math.floor(options && options.length * 50 / 2)}px`;

  const {
    isOpen,
    dropdownControl,
    handleToggle,
    handleClose,
  } = useDropdownProps();

  return <Controller
    name={name}
    control={control || dropdownControl}
    defaultValue={options[defaultValueIndex]}
    render={({ field: { value, onChange, ...props }, }) => (
      <div className={cls.dropdown} {...props}>
        <label className={cls.label}>{label}</label>
        <div className={cls.controlWrap} >
          <div
            className={clsx(cls.control, { [cls.open]: isOpen })}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            {
              (value?.label || !isNaN(defaultValueIndex))
                ? <span className={cls.value}>{value?.label || options[defaultValueIndex]?.label}</span>
                : <span className={cls.placeholder}>{placeholder}</span>
            }
            <span className={clsx(cls.arrow, { [cls.open]: isOpen })}>
              {<SelectionArrow />}
            </span>
          </div>
          {isOpen && (
            <div
              className={cls.options}
              style={{ maxHeight: options.length > 2 ? optionsHeight : "auto" }}
              onClick={handleClose}
            >
              {
                options.map((option, index) => (
                  <div
                    className={clsx(cls.option, { [cls.selected]: option.value === value?.value })}
                    key={index}
                    onClick={() => onChange(option)}
                  >
                    {option.label}
                    {(
                      option.value === value?.value &&
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M10 3L4.5 8.5L2 6" stroke="#007AFF" strokeWidth="1.6666" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                    )}
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>
    )}
  />;
};
