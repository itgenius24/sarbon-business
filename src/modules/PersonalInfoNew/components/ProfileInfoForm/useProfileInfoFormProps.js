import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";
import {
  useCreateActionHistoriesMutation,
  useGetFirmInfo,
  useGetUserInfo,
  useUpdateUserInfo,
} from "@/services/api";
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


  const id = authStore.userData.id;

  const { data: userData2 ,isLoading} = useGetUserInfo(id, {
    enabled: Boolean(id),
    select: (res) => {
      if (!res.response) return {};
      return res?.response || {};
    },
    onSuccess: (res) => {
      if (!authStore?.userData?.firm_id)
        reset({
          email: res?.email,
          passport_code: res?.passport_code,
          passport_scan: res?.passport_scan,
          pnfl: res?.pnfl,
          full_name: res?.full_name,
          phone_number: res?.phone,
        });
    },
  });

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
        email: userData2?.email,
        passport_code: userData2?.passport_code,
        passport_scan: userData2?.passport_scan,
        pnfl: userData2?.pnfl,
      });
    },
    enabled: Boolean(userData2?.full_name && authStore?.userData?.firm_id),
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
    full_name:userData2?.full_name,
    login:userData2?.login,
    email:userData2?.email,
    photo:userData2?.photo,
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
