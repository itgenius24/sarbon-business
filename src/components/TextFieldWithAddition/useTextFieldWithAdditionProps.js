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

  function onWindowClick () {
    setOpen(false);
  }

  useEffect(() => {
    document.addEventListener("click", onWindowClick);
    return () => {
      document.removeEventListener("click", onWindowClick);
    };
  }, []);

  return {
    isOpen,
    handleToggle,
    handleClose,
    dropdownControl
  };
};
