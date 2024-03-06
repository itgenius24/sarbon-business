import { useGetUserInfoHook } from "./useGetUserInfo";
import { fileUpload } from "@/services/fileUpload";

export const useProfileInfoForm = (setValue) => {
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
  };
};
