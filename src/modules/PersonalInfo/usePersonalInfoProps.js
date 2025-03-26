import { useCreateActionHistoriesMutation, useUpdateUserInfo } from "@/services/api";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const usePersonalInfoProps = () => {

  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm({});

  const toast = useToast();

    const { mutate: actionCreate } = useCreateActionHistoriesMutation();
  

  const { mutate , isLoading } = useUpdateUserInfo({
    onSuccess() {
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: authStore.userData.your_id,
          action_time: new Date(),
          role_slug: `first_dispatcher`,
          action_comment: `changed_own_info`,
          role_id: authStore.userData?.role_id,
          action_type: [`update`],
        },
      });
      toast({
        title: "Успешно изменено!",
        description: "Вы успешно обновили этого пользователя",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
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
    }
  });

  const submitForm=(data)=> {
    const { photo, email,name="",fName="" } = data || {};
    const body = {
      guid: authStore.userData.id,
      photo: photo,
      email: email,
      full_name: `${name} ${fName}`,
    };
    mutate({ data: body });
  };

  const getProfileFormProps = (otherProps) => {
    return {
      watch,
      errors,
      control,
      register,
      setValue,
      ...otherProps,
    };
  };
  return {
    getProfileFormProps,
    handleSubmit,
    submitForm,
    isLoading,
    router,
  };
};
