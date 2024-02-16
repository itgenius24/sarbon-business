import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useDropdownProps = () => {
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
    window.addEventListener("click", onWindowClick);

    return () => window.removeEventListener("click", onWindowClick);
  }, []);

  return {
    isOpen,
    dropdownControl,
    handleToggle,
    handleClose,
  };

};
