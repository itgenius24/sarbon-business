import { useGetFirmInfo, useRegisterFirEditmMutation } from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const useTinCreate = () => {
  const { setValue, control, watch, register, errors, handleSubmit, reset } =
    useForm();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const guid = searchParams.get(`guid`);
  const your_id = searchParams.get(`id`);
  const router = useRouter();
  
  const { mutate } = useRegisterFirEditmMutation({
    onSuccess: () => {
      router.back();
    },
  });

  const { data } = useGetFirmInfo(guid);

  useEffect(() => {
    reset({
      ...data?.response,
    });
  }, [data]);

  const onSubmit = (data) => {
    mutate({
      data: {
        ...data,
        currency:data?.currency?.value ? data?.currency?.value : `Sum` ,
        capital:+data?.capital,
        guid: guid,
      },
    });
  };

  return {
    setValue,
    control,
    watch,
    register,
    errors,
    t,
    handleSubmit,
    onSubmit,
    your_id,
    router,
  };
};
