import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const useDropdownProps = () => {
  const [isOpen, setOpen] = useState(false);

  const { control: dropdownControl } = useForm();

  const dropdownRef = useRef(null);

  function handleToggle (e) {
    if(e.target.closest(`#${dropdownRef.current.id}`)) {
      setOpen(!isOpen);
    }
  }

  function handleClose () {
    setOpen(false);
  }

  function onWindowClick (e) {
    if(!dropdownRef.current.contains(e.target)) {
      handleClose();
    }
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
    dropdownRef,
  };

};
