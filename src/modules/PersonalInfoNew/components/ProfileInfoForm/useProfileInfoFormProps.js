import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";
import { useCreateActionHistoriesMutation, useGetFirmInfo, useUpdateUserInfo } from "@/services/api";
import { fileUpload } from "@/services/fileUpload";
import authStore from "@/store/auth.store";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useProfileInfoFormProps = (setValue, reset, watch) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordVisible2, setPasswordVisible2] = useState(false);
  const toast = useToast();
  const query = useQueryClient();
  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    setValue("photo", result?.link);
  };

  const rules = {
    required: { value: true, message: "Это поле обязательно для заполнения" },
  };

  const {
    data: {
      full_name,
      email,
      photo,
      login,
      passport_code,
      passport_scan,
      pnfl,
    } = {},
    isLoading,
  } = useGetUserInfoHook();
      const { mutate: actionCreate } = useCreateActionHistoriesMutation();
  

  const { data } = useGetFirmInfo(authStore?.userData?.firm_id, {
    onSuccess: (res) => {
      reset({
        ...res?.response,
        company_name: res?.response?.company_name
          ?.split(" ")
          .slice(1)
          .join(" "),
        company_type: {
          value: res?.response?.company_name?.split(" ")?.[0],
          label: res?.response?.company_name?.split(" ")?.[0],
        },
        email: email,
        passport_code: passport_code,
        passport_scan: passport_scan,
        pnfl: pnfl,
      });
    },
    enabled: Boolean(full_name),
  });

  const { mutate: userData } = useUpdateUserInfo({
    onSuccess() {
    
      toast({
        title: "Успешно изменено!",
        description: "Вы успешно обновили этого пользователя",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      query.invalidateQueries(["items/firm/id"]);
      query.invalidateQueries(["items/users/id"]);
      onClose();
      setValue(`new_password`, ``);
      setValue(`old_password`, ``);
    },
    onError() {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить пользователя!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const changePass = () => {
    // if(watch(`new_password`) === watch(`old_password`))
    userData({
      data: {
        guid: authStore.userData.guid,
        password: watch(`new_password`),
      },
    });
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: authStore.userData.your_id,
        action_time: new Date(),
        role_slug: `carrier`,
        action_comment: `changed_own_password`,
        role_id: authStore.userData?.role_id,
        action_type: [`update`],
      },
    });
    // else{
    //   toast({
    //     title: "Ошибка",
    //     description: "Не удалось обновить пользователя!",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
    // }
  };

  const formatPhoneNumber = (value) => {
    let input = value.replace(/\D/g, ""); // Faqat raqamlarni olish
    if (input.length > 3) input = input.slice(0, 3) + " " + input.slice(3);
    if (input.length > 6) input = input.slice(0, 6) + " " + input.slice(6, 8);
    if (input.length > 9) input = input.slice(0, 9); // Qo'shimcha raqamlarni olib tashlash
    return input;
  };

  return {
    rules,
    full_name,
    login,
    email,
    photo,
    isLoading,
    handleImageUpload,
    isOpen,
    onClose,
    onOpen,
    isPasswordVisible,
    setPasswordVisible,
    isPasswordVisible2,
    setPasswordVisible2,
    changePass,
    formatPhoneNumber,
  };
};
