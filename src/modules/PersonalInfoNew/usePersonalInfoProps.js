import {
  useCreateActionHistoriesMutation,
  useRegisterFirEditmMutation,
  useUpdateUserInfo,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { normalizeName } from "@/utils/normalizeName";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
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
    reset,
    formState: { errors },
  } = useForm({});

  const toast = useToast();

  const query = useQueryClient();
  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const { mutate: userData, isLoading } = useUpdateUserInfo({
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

  const { mutate } = useRegisterFirEditmMutation({
    onSuccess: (data) => {
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: authStore.userData.your_id,
          action_time: new Date(),
          role_slug: `carrier`,
          action_comment: `changed_own_info`,
          role_id: authStore.userData?.role_id,
          action_type: [`update`],
        },
      });
      userData({
        data: {
          guid: authStore.userData.guid,
          firm_id: data?.guid,
          email: watch(`email`),
          user_status: ["rejected"],
          phone: watch(`phone_number`),
          passport_code: watch(`passport_code`)
            ? watch(`passport_code`)
            : undefined,
          passport_scan: watch(`passport_scan`)
            ? watch(`passport_scan`)
            : undefined,
          pnfl: watch(`pnfl`),
          full_name: normalizeName(watch(`full_name`)),
        },
      });
    },
  });

  const submitForm = (data) => {
    if (authStore?.userData?.firm_id) {
      const body = {
        guid: data.guid,
        company_name:
          data?.tip_account?.[0] === `legal_owner`
            ? `${
                watch(`company_type`)?.value
                  ? watch(`company_type`)?.value
                  : `OOO`
              } ${data?.company_name}`
            : undefined,
        tin: data?.tin,
        phone_number: data?.phone_number,
        full_name: data?.full_name,
        email: data?.email,
        building_address: data?.building_address,
        company_type: ""
      };

      mutate({ data: body });
    } else {
      userData({
        data: {
          guid: authStore.userData.guid,
          email: watch(`email`),
          user_status: ["rejected"],
          phone: watch(`phone_number`),
          passport_code: watch(`passport_code`)
            ? watch(`passport_code`)
            : undefined,
          passport_scan: watch(`passport_scan`)
            ? watch(`passport_scan`)
            : undefined,
          pnfl: watch(`pnfl`),
          full_name: normalizeName(watch(`full_name`)),
        },
      });
    }
  };

  const getProfileFormProps = (otherProps) => {
    return {
      watch,
      errors,
      control,
      register,
      setValue,
      reset,
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
