import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useTextFieldWithAdditionProps = () => {

  const [isOpen, setOpen] = useState(false);

  const { control: dropdownControl } = useForm();

  function handleToggle () {
    setOpen(!isOpen);
  }

  function handleClose () {
    setOpen(false);
  }

  return {
    isOpen,
    handleToggle,
    handleClose,
    dropdownControl
  };
};
