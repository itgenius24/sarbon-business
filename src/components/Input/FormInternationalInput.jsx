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
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <PhoneInput
  
          name={name}
           defaultCountry="uz"
          value={value}
          defaultValue={""}
          type="text"
          className={`${classes ? classes : "inputStyles"}`}
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
