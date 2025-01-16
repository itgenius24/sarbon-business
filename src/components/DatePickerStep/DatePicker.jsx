"use client";


import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Controller } from "react-hook-form";
import React from "react";
import { CustomInputDate } from "./components/CustomInputDate";

export const DatePickerComponent = ({
  control,
  name,
  onChange,
  isDisabled,
  width=154,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <DatePicker
            disabled={isDisabled}
            selected={field.value ? new Date(field.value) : field.value}
            onChange={(date) => {
              field.onChange(date), onChange(date);
            }}
            placeholderText="Select date"
            dateFormat="dd.MM.yyyy HH:mm"
            // dateFormat="dd.MM.yyyy"
            customInput={<CustomInputDate width={`${width}px`} />}
            {...props}
          />
        </>
      )}
    />
  );
};

// {isClearable && <span
//   onClick={(e) => {
//     e.stopPropagation();
//     setStartDate(() => "");
//     setEndDate(() => "");
//   }}
//   className={cls.clear}>
//   <CloseIcon />
// </span>}
