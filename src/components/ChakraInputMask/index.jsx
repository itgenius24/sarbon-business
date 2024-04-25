"use client";
import * as React from "react";

import InputMask from "react-input-mask";
import { Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Select } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { useTextFieldWithAdditionProps } from "@/components/TextFieldWithAddition/useTextFieldWithAdditionProps";

export const maskToCurrency = ({ nextState }) => {
  const { value } = nextState || {};

  let amountFormatted = value?.replace?.(/\D/g, "");
  amountFormatted = amountFormatted?.replace?.(/^0+/g, "");

  if (amountFormatted?.length === 2) {
    return {
      ...nextState,
      value: `R$ ${amountFormatted}`,
      selection: {
        start: amountFormatted.length + 3,
        end: amountFormatted.length + 3
      }
    };
  }

  const amountFormattedWithComma = amountFormatted?.replace?.(
    /(?=\d{2})(\d{2})$/,
    ",$1"
  );
  const amountFormattedWithDot = amountFormattedWithComma?.replace?.(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1."
  );

  if (amountFormattedWithDot) {
    return {
      ...nextState,
      value: `R$ ${amountFormattedWithDot}`,
      selection: {
        start: amountFormattedWithDot.length + 3,
        end: amountFormattedWithDot.length + 3
      }
    };
  }

  return nextState;
};
export default function ChakraInputMask({
  register = () => {
  },
  name,
  leftElement = null,
  rightElement = null,
  control,
  rules = {},
  label,
  mask,
  maskChar = null,
  additionalItemName,
  additionalItemOptions = [],
  additionalItemTheme = "gray",
  disabled,
  additionalOnclick = () => {
  },
  additionalItemDefaultIndex = null,
  additionalItemPlaceholder = "",
  ...props
}) {

  const {
    dropdownControl,
    isOpen,
    handleToggle,
    handleClose,
    additionalDropdownRef,
  } = useTextFieldWithAdditionProps();

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Box position={"relative"}>

        <InputGroup>
          {leftElement}
          <Input {...register(name, rules)} borderColor={"#D0D5DD"} as={InputMask} mask={mask}
                 maskChar={maskChar} {...props} />
          <InputRightElement width={"auto"} maxWidth={"160px"} backgroundColor={"#F9FAFB"}
                             border={"1px solid #D0D5DD"} borderRadius={"0 8px 8px 0"}>
            <Controller
              name={additionalItemName}
              control={control}
              render={({ field }) => {
                return <Select  {...field} color={"#667085"} backgroundColor={"transparent"}
                                border={"none"}>
                  {additionalItemOptions.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
                </Select>;
              }}
            />
          </InputRightElement>
        </InputGroup>
      </Box>

    </FormControl>
  );
}
