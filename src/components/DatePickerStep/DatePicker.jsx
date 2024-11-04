"use client";

import cls from "./styles.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Controller } from "react-hook-form";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { DateIcon } from "@/assets/icons/icons";
import { CustomInputDate } from "./components/CustomInputDate";

// const CustomDateInput = React.forwardRef(({ value, onClick,onChange }, ref) => (
//   <Flex width={'154px'} background={'red'} onClick={onClick} ref={ref}>
//     <input

//       value={value}
//       onChange={onChange}
//       readOnly
//       style={{ paddingRight: "30px",width:'100%' }} // Add padding for icon
//     />
//     <DateIcon />
//   </Flex>
// ));
export const DatePickerComponent = ({ control,name,onChange,isDisabled,...props }) => {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        
      <>
     
          <DatePicker
          disabled={isDisabled}
          selected={field.value}
          onChange={(date) => {field.onChange(date),onChange(date)}}
          placeholderText="Select date"
          dateFormat="dd.MM.yyyy"
          customInput={<CustomInputDate width={'154px'} />}
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
