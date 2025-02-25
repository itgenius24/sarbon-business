"use client";

import { Input } from "@chakra-ui/react";
import "./style.css";
import { Select } from "chakra-react-select";
import { Controller, useForm } from "react-hook-form";

export const ChakraSelect = ({
  control,
  size = "sm",
  name = "select",
  isClearable = true,options,
  defaultValue,
  customOnChange = () => {},
  ...props

}) => {
  const { control: control2 } = useForm();

  return (
    <Controller
      name={name}
      control={control || control2}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        return (
          <Select
            onChange={(val) => {
              onChange(val ? val?.value : '');
              customOnChange(val ? val : {});
            }}
            options={options}
            value={options?.find((option) => option.value === value?.value)}
            // menuIsOpen
            menuPortalTarget={ typeof document !== "undefined" && document.body}
            classNamePrefix="chakra-select"
            useBasicStyles
            isClearable={isClearable}
            // customInputProps={(props) => {
            //   return <Input onChange={(e) => console.log(`el`,e)} backgroundColor={`red`} {...props} />;
            // }}
            size={size}
            chakraStyles={{
              control: (base, state) => ({
                ...base,
                _focus: { boxShadow:"0px 0px 0px 4px #E3F0FF, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",border:"1px solid #D0D5DD" },

              }),
            }}
            {...props}
          />
        );
      }}
    />
  );
};
