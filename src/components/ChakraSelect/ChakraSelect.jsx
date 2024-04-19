import "./styles.scss";
import { Select } from "chakra-react-select";
import { Controller, useForm } from "react-hook-form";

export const ChakraSelect = ({ control, size="sm", name = "select", ...props }) => {

  const { control: control2 } = useForm();

  return <Controller
    name={name}
    control={control || control2}
    render={({ field: { ...options } }) => {

      return (
        <Select
          {...options}
          menuPortalTarget={document.body}
          classNamePrefix="chakra-select"
          useBasicStyles
          size={size}
          {...props}
        />
      );
    }}
  />;
};
