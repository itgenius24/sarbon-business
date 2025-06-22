"use client";

import { Box } from "@chakra-ui/react";
import "./style.css";
import { Select } from "chakra-react-select";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { SelectedTopArrow, SelectionArrow } from "@/assets/icons/icons";

export const ChakraSelect = ({
  control,
  size = "sm",
  name = "select",
  isClearable = true,
  options,
  defaultValue,
  customOnChange = () => {},
  ...props
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { control: control2 } = useForm();

  return (
    <Controller
      name={name}
      control={control || control2}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        return (
          <Select
            onMenuOpen={() => setIsDropdownOpen(true)}
            onMenuClose={() => setIsDropdownOpen(false)}
            components={{
              DropdownIndicator: () => (
                <Box p={`0px 15px`}>
                  {isDropdownOpen ? <SelectedTopArrow /> : <SelectionArrow />}
                </Box>
              ),
            }}
            onChange={(val) => {
              onChange(val ? val?.value : "");
              customOnChange(val ? val : {});
            }}
            options={options}
            value={options?.filter((option) => option.value === value)?.[0]}
            menuPortalTarget={typeof document !== "undefined" && document.body}
            classNamePrefix="chakra-select"
            useBasicStyles
            isClearable={isClearable}
            size={size}
            chakraStyles={{
              control: (base, state) => ({
                ...base,
                height: "50px", // yoki '2.5rem', yoki theme dan `h: "10"` kabi
                minHeight: "`50px",
                fontSize:`16px`,
                _focus: {
                  boxShadow:
                    "0px 0px 0px 4px #E3F0FF, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                  border: "1px solid #D0D5DD",
                },
              }),
            }}
            {...props}
          />
        );
      }}
    />
  );
};
