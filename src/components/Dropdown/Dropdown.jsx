"use client";

import { Controller } from "react-hook-form";
import cls from "./styles.module.scss";
import { useDropdownProps } from "./useDropdownProps";
import clsx from "clsx";
import {
  CircleCloseIcon,
  SearchIcon,
  SelectionArrow,
} from "@/assets/icons/icons";
import { useMemo } from "react";
import { convertLatinToCyril } from "@/utils/convertLatinToCyril";
import { useTranslation } from "react-i18next";
import { Spinner } from "@chakra-ui/react";

export const Dropdown = ({
  options = [],
  placeholder = "Выберите",
  defaultValueIndex,
  defaultValue,
  label,
  control,
  name = "select",
  register = () => {},
  required,
  searchable,
  searchName = "search",
  clearFn = () => {},
  isClear = false,
  inputPlaceholder = "Выберите",
  setValue = () => {},
  watch = () => {},
  errors,
  error,
  disabled,
  className,
  onSearchChange = () => {},
  handleInputClear = () => {},
  onChangeSelect = () => {},
  handleDisabled = () => {},
  index,
  isMulti,
  clearable,
  isLoading = false,
  isTop = false,
  isCheck = true,
}) => {
  const height = Math.floor(options && (options.length * 100) / 2);

  const optionsHeight = `${height > 200 ? 200 : height}px`;
  const { t } = useTranslation();
  const checkedOptions = useMemo(() => {
    if (searchable && watch(searchName)) {
      return options.filter((option) =>
        option.label
          .toLowerCase()
          .includes(convertLatinToCyril(watch(searchName)).toLowerCase())
      );
    } else {
      return options;
    }
  }, [watch(searchName), options]);

  const optionLen = !!options?.length;
  const { isOpen, dropdownControl, handleToggle, handleClose, dropdownRef } =
    useDropdownProps();

  return (
    <Controller
      name={name}
      control={control || dropdownControl}
      defaultValue={
        defaultValue?.value ? defaultValue : options[defaultValueIndex]
      }
      rules={{ required }}
      render={({ field: { value, onChange, ...props } }) => (
        <div className={clsx(cls.dropdown, className)} {...props}>
          {label && <span className={cls.label}>{label}</span>}
          <div className={cls.controlWrap}>
            <div
              className={clsx(cls.control, {
                [cls.open]: isOpen,
                [cls.searchable]: searchable,
                [cls.error]: errors?.[name] || !!error,
                [cls.disabled]: disabled,
              })}
              onClick={(e) => {
                if (!disabled) {
                  // e.stopPropagation();
                  handleToggle(e);
                } else {
                  handleDisabled();
                }
              }}
              data-id={name}
              ref={dropdownRef}
            >
              <>
                {searchable ? (
                  <div
                    onClick={() => {
                      if (disabled) {
                        return handleDisabled();
                      }
                    }}
                    className={cls.inputWrap}
                  >
                    <input
                      className={cls.input}
                      {...register(searchName)}
                      defaultValue={watch(searchName) || defaultValue?.label}
                      onInput={(e) => onSearchChange(e, searchName, index)}
                      placeholder={
                        inputPlaceholder
                          ? inputPlaceholder
                          : t(inputPlaceholder)
                      }

                      autoComplete="off"
                    />

                    {isLoading && (
                      <span className={cls.rightIcon}>
                        <Spinner size={`sm`} />
                      </span>
                    )}
                    <span className={cls.leftIcon}>
                      <SearchIcon />
                    </span>

                    {(watch(searchName) || defaultValue?.value) && (
                      <span
                        className={cls.rightIcon}
                        onClick={() => {
                          setValue(searchName, "");
                          setValue(name, {});
                          clearFn();
                        }}
                      >
                        <CircleCloseIcon />
                      </span>
                    )}
                  </div>
                ) : (
                  <>
                    {isMulti ? (
                      <div className={cls.multiValueWrap}>
                        {watch(name)?.length ? (
                          watch(name)?.map((item, index) => (
                            <span className={cls.multiValue} key={index}>
                              <span>{item?.label}</span>
                              <button
                                type="button"
                                disabled={disabled}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onChange(
                                    watch(name)?.filter(
                                      (selected) =>
                                        selected?.value !== item?.value
                                    )
                                  );
                                }}
                              >
                                <CircleCloseIcon />
                              </button>
                            </span>
                          ))
                        ) : (
                          <span className={cls.placeholder}>
                            {placeholder ? placeholder : t(placeholder)}
                          </span>
                        )}
                      </div>
                    ) : value?.label || !isNaN(defaultValueIndex) ? (
                      <span className={cls.value}>
                        {value?.label || options[defaultValueIndex]?.label}
                      </span>
                    ) : (
                      <span className={cls.placeholder}>
                        {placeholder ? placeholder : t(placeholder)}
                      </span>
                    )}

                    {watch(name)?.label && isClear ? (
                      <span
                        className={cls.rightIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          setValue(
                            name,
                            {},
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            }
                          );
                          clearFn(name);
                        }}
                      >
                        <CircleCloseIcon />
                      </span>
                    ) : (
                      <span className={clsx(cls.arrow, { [cls.open]: isOpen })}>
                        {<SelectionArrow />}
                      </span>
                    )}

                    {clearable && watch(name)?.value && (
                      <span
                        className={cls.rightIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          setValue(name, {});
                          handleInputClear();
                        }}
                      >
                        <CircleCloseIcon />
                      </span>
                    )}
                  </>
                )}
              </>
            </div>
            {error ? (
              <span className={cls.errorText}>{error?.message}</span>
            ) : (
              errors?.[name] && (
                <span className={cls.errorText}>{errors?.[name].message}</span>
              )
            )}
            {isOpen && optionLen && (
              <div
                className={cls.options}
                style={{ maxHeight: options.length > 2 ? optionsHeight : "auto", }}
                onClick={handleClose}
              >
                {options.map((option, index) => (
                  <div
                    className={clsx(cls.option, { [cls.selected]: option.value === value?.value, })}
                    key={index}
                    onClick={() => {
                      if (searchable) {
                        setValue(searchName, option.label);
                      }

                      if (isMulti) {
                        if (
                          watch(name)?.find(
                            (item) => item.value === option.value
                          )
                        ) {
                          onChange(
                            watch(name).filter(
                              (item) => item.value !== option.value
                            )
                          );

                          onChangeSelect(
                            watch(name).filter(
                              (item) => item.value !== option.value
                            )
                          );

                          return;
                        } else {
                          const value = watch(name)
                            ? [...watch(name), option]
                            : [option];

                          onChange(value);
                          onChangeSelect(value);
                        }
                      } else {
                        onChange(option);
                        onChangeSelect(option);

                        handleToggle();
                      }
                    }}
                  >
                    {option.label}
                    {(option.guid
                      ? option.guid === value?.guid
                      : option.value === value?.value) &&
                      isCheck && (
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="#007AFF"
                            strokeWidth="1.6666"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};
