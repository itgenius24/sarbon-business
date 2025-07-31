import { useEffect, useRef, useState } from "react";
import { TextFieldWithAdditionPayment } from "../../../../../components/TextFieldWithAddition/TextFieldWithAdditionPayment";
import { Controller } from "react-hook-form";
import cls from "./style.module.scss";
import clsx from "clsx";
import { CheckIcon, CloseIcon } from "@/assets/icons/icons";
import { Box, Flex } from "@chakra-ui/react";

// Global event name to signal opening/closing
const CUSTOM_DROPDOWN_EVENT = "custom-dropdown-toggle";

export const PaymentComponents = ({
  canEdit,
  order_status,
  register,
  control,
  setEditModal,
  paymentOptions,
  errors,
  t,
  disabled,
  currencyOptions = [],
  additionalItemTheme = "gray",
  index,
  additionalItemName,
  paymentName,
  name,
  removeInput = () => {},
  zIndex = 999,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false);
  const additionalDropdownRef = useRef(null);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const dropdownButtonRef = useRef(null);

  const instanceId = useRef(Math.random().toString(36).substring(2, 9)).current;

  const wrapperRef = useRef(null);

  const handleMouseLeave = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
      setShowCloseIcon(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    if (!isOpen) {
      const event = new CustomEvent(CUSTOM_DROPDOWN_EVENT, { detail: { id: instanceId }, });
      window.dispatchEvent(event);
    }
    setOpen(!isOpen);
  };

  useEffect(() => {
    const handleGlobalDropdownToggle = (event) => {
      if (event.detail.id !== instanceId && isOpen) {
        handleClose();
      }
    };

    window.addEventListener(CUSTOM_DROPDOWN_EVENT, handleGlobalDropdownToggle);

    const handleClickOutside = (event) => {
      if (
        additionalDropdownRef.current &&
        !additionalDropdownRef.current.contains(event.target) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target) &&
        isOpen
      ) {
        handleClose();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener(
        CUSTOM_DROPDOWN_EVENT,
        handleGlobalDropdownToggle
      );
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, instanceId]);

  return (
    <Box
      position={`relative`}
      onMouseEnter={() => setShowCloseIcon(true)}
      onMouseLeave={handleMouseLeave}
      ref={wrapperRef}
    >
      {showCloseIcon && index > 0 && (
        <Box
          display={`flex`}
          onClick={() => removeInput(index)}
          cursor={`pointer`}
          width={`100%`}
          height={`100%`}
          position={`absolute`}
          left={`-25px`}
          alignItems={`center`}
        >
          <CloseIcon />
        </Box>
      )}

      <TextFieldWithAdditionPayment
        {...props}

        index={index}
        onClick={() => (!canEdit ? setEditModal(true) : null)}
        isEdit={!canEdit}
        disabled={disabled}
        name={name}
        register={register}
        control={control}
        additionalItemName={additionalItemName}
        additionalItemPlaceholder={paymentOptions?.[0]?.label}
        additionalItemDefaultIndex={0}
        placeholder={t("Введите сумму")}
        errors={errors}
        onKeyDown={(e) => {
          if (e.key === "." || e.key === "," || e.key === "e") {
            e.preventDefault();
          }
        }}
        type="number"
        width="100%"
        additionalItemOptions={paymentOptions}
        zIndex={ zIndex - index}
        after2={
          <Controller
            name={paymentName}
            control={control}
            render={({ field }) => {
              return (
                <div className={cls.wrapper}>
                  <div
                    ref={additionalDropdownRef}
                    className={clsx(cls.additionalItem, { [cls.lightTheme]: additionalItemTheme === "light", })}
                  >
                    <button
                      disabled={disabled}
                      className={clsx(cls.additionalItemContent)}
                      type="button"
                      onClick={handleToggle} // Use the local toggle function
                      ref={dropdownButtonRef} // Assign ref to the button
                    >
                      <div className={cls.additionalItemLabelWrapper}>
                        <p className={cls.additionalItemLabelText}>
                          {currencyOptions.find(
                            (opt) => opt.value === field?.value?.value
                          )?.label || currencyOptions?.[2]?.label}
                        </p>
                      </div>
                    </button>
                    {currencyOptions.length > 0 && isOpen && (
                      <div className={cls.currencyOptions}>
                        {currencyOptions.map((item, index) => {
                          return (
                            <button
                              key={index}
                              className={clsx(cls.additionalItemOption, {
                                [cls.active]:
                                  item.value === field?.value?.value,
                              })}
                              onClick={() => {
                                field.onChange(item);
                                handleClose();
                              }}
                            >
                              <p className={cls.additionalItemOptionLabel}>
                                <span>{item.label}</span>
                                {item.value === field?.value?.value && (
                                  <CheckIcon />
                                )}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            }}
          />
        }
      />
    </Box>
  );
};
