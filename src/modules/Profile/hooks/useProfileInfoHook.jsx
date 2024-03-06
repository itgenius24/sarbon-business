import { useUpadteUserInfo } from "@/services/api";
import { useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

export const useProfileInfoHook = () => {
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm({});
  const { id } = useParams();
  const toast = useToast();

  const { mutate , isPending } = useUpadteUserInfo({
    onSuccess(data) {
      toast({
        title: "Успешно изменено!",
        description: "Вы успешно обновили этого пользователя",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError(data) {
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
      guid: id,
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
  return { getProfileFormProps, handleSubmit, submitForm, isPending };
};
