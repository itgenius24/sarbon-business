import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const useTextFieldWithAdditionProps = () => {

  const [isOpen, setOpen] = useState(false);

  const { control: dropdownControl } = useForm();

  const additionalDropdownRef = useRef(null);

  function handleToggle () {
    setOpen(!isOpen);
  }

  function handleClose () {
    setOpen(false);
  }

  function onWindowClick (e) {
    const dropdown = additionalDropdownRef.current;
    if(!e.target.closest(`.${dropdown?.className}`)) {
      handleClose();
    }
  }

  useEffect(() => {
    window.addEventListener("click", onWindowClick);

    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  });

  return {
    isOpen,
    handleToggle,
    handleClose,
    dropdownControl,
    additionalDropdownRef,
  };
};
