import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";
import { fileUpload } from "@/services/fileUpload";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export const useProfileInfoFormProps = (setValue) => {
  const {isOpen,onClose,onOpen} = useDisclosure();
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isPasswordVisible2, setPasswordVisible2] = useState(false);
  
  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    setValue("photo", result?.link);
  };

  const rules = { required: { value: true, message: "Это поле обязательно для заполнения" }, };

  const { data: { full_name, email, photo } = {}, isLoading } =
    useGetUserInfoHook();

    

  return {
    rules,
    full_name,
    email,
    photo,
    isLoading,
    handleImageUpload,
    isOpen,onClose,onOpen,
    isPasswordVisible, setPasswordVisible,isPasswordVisible2, setPasswordVisible2
  };
};
