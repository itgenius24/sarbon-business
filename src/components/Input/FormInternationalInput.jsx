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
  errors = {}
}) => {
  console.log(`errors`, errors[name]);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{required: true}}
      render={({ field: { onChange, value } }) => (
        <PhoneInput
          disabled={disabled}
          borderColor={errors[name] ? "red" : "gray"}
          borderWidth={errors[name] ? "2px" : "1px"}
          name={name}
          defaultCountry="uz"
          value={value}
          defaultValue={""}
          type="text"
          className={`${classes ? errors[name] ? `errorInputTel` :  classes : errors[name] ? `errorInputTel` : "inputStyles"}`}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
          }}
        />
      )}
    />
  );
};

export default FormInternationInput;
