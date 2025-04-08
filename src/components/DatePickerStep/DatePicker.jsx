"use client";


import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Controller } from "react-hook-form";
import React from "react";
import { CustomInputDate } from "./components/CustomInputDate";
import { Box } from "@chakra-ui/react";

export const DatePickerComponent = ({
  control,
  name,
  onChange,
  isDisabled,
  handleDisabled = () => {},
  canEdit,
  width=154,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Box onClick={() => !canEdit ? handleDisabled() : null  }>
          <DatePicker
            disabled={!canEdit ? !canEdit : isDisabled}
            selected={field.value ? new Date(field.value) : field.value}
            onChange={(date) => {
              field.onChange(date), onChange(date);
            }}
            placeholderText="Select date"
            dateFormat="dd.MM.yyyy HH:mm"
            // dateFormat="dd.MM.yyyy"
            customInput={<CustomInputDate canEdit={canEdit}   width={`${width}px`} />}
            {...props}
          />
        </Box>
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
