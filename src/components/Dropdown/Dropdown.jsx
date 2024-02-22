"use client";

import { Controller } from "react-hook-form";
import cls from "./styles.module.scss";
import { useDropdownProps } from "./useDropdownProps";
import clsx from "clsx";
import { CircleCloseIcon, SearchIcon, SelectionArrow } from "@/assets/icons/icons";
import { useMemo } from "react";
import { convertLatinToCyril } from "@/utils/convertLatinToCyril";


export const Dropdown = ({
  options = [],
  placeholder = "Выберите",
  defaultValueIndex,
  label,
  control,
  name = "select",
  register = () => {},
  required,
  searchable,
  searchName = "search",
  inputPlaceholder = "Выберите",
  setValue = () => {},
  watch = () => {},
  errors,
}) => {

  const height = Math.floor(options && options.length * 50 / 2);

  const optionsHeight = `${height > 200 ? 200 : height}px`;

  const checkedOptions = useMemo(() => {
    if(searchable && watch(searchName)) {
      return options.filter(option => option.label.toLowerCase().includes(convertLatinToCyril(watch(searchName)).toLowerCase()));
    } else {
      return options;
    }

  }, [watch(searchName), options]);

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
    rules={{ required }}
    render={({ field: { value, onChange, ...props }, }) => (
      <div className={cls.dropdown} {...props}>
        {label && <span className={cls.label}>{label}</span>}
        <div className={cls.controlWrap} >
          <div
            className={clsx(cls.control, { [cls.open]: isOpen, [cls.searchable]: searchable })}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            <>
              {
                searchable
                  ? <div className={cls.inputWrap}>
                    <input className={cls.input} {...register(searchName)} placeholder={inputPlaceholder} />
                    <span className={cls.leftIcon}><SearchIcon /></span>
                    {
                      watch(searchName) && <span className={cls.rightIcon} onClick={() => setValue(searchName, "")}><CircleCloseIcon /></span>
                    }
                  </div>
                  : <>
                    {
                      (value?.label || !isNaN(defaultValueIndex))
                        ? <span className={cls.value}>{value?.label || options[defaultValueIndex]?.label}</span>
                        : <span className={cls.placeholder}>{placeholder}</span>
                    }
                    <span className={clsx(cls.arrow, { [cls.open]: isOpen })}>
                      {<SelectionArrow />}
                    </span>
                  </>
              }
            </>
          </div>
          {isOpen && (
            <div
              className={cls.options}
              style={{ maxHeight: options.length > 2 ? optionsHeight : "auto" }}
              onClick={handleClose}
            >
              {
                checkedOptions.map((option, index) => (
                  <div
                    className={clsx(cls.option, { [cls.selected]: option.value === value?.value })}
                    key={index}
                    onClick={() => {
                      if(searchable) {
                        setValue(searchName, option.label);
                      }
                      onChange(option);
                      handleToggle();
                    }}
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
