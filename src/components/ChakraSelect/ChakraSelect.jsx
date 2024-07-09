"use client";

import "./styles.scss";
import { Select } from "chakra-react-select";
import { Controller, useForm } from "react-hook-form";

export const ChakraSelect = ({
  control,
  size = "sm",
  name = "select",
  ...props
}) => {
  const { control: control2 } = useForm();

  return (
    <Controller
      name={name}
      control={control || control2}
      render={({ field: { ...options } }) => {
        return (
          <Select
            {...options}
            // menuIsOpen
            menuPortalTarget={ typeof document !== "undefined" && document.body}
            classNamePrefix="chakra-select"
            useBasicStyles
            isClearable={true}
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
