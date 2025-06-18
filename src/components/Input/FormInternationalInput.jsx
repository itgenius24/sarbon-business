import { t } from "i18next";
import React from "react";
import { Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const FormInternationInput = ({
  name,
  defaultValue = "",
  placeholder = "",
  control,
  classes,
  disabled = false,
  rules = {},
  errors = {},
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <PhoneInput
            {...field}
            inputProps={{
              id: name,
            }}
            // hideDropdown={true}
            disabled={disabled}
            defaultCountry="uz"
            value={field?.value}
            onChange={(e) => {
              if (e.length > 4) {
                field?.onChange(e, {});
              } else {
                field?.onChange("");
              }
            }}
            type="text"
            className={`${
              classes
                ? errors[name]
                  ? `errorInputTel`
                  : classes
                : errors[name]
                ? `errorInputTel`
                : "inputStyles"
            }`}
            placeholder={placeholder}
          />
        );
      }}
    />
  );
};

export default FormInternationInput;
