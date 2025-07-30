import { useGetFirmInfo, useRegisterFirEditmMutation } from "@/services/api";
import { useTinLookupMutation, mapTinDataToCompanyData } from "@/services/api/tin/tin.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";

export const useTinCreate = () => {
  const { setValue, control, watch, register, errors, handleSubmit, reset } =
    useForm();
  const { t } = useTranslation();
  const toast = useToast();
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

  const tinLookupMutation = useTinLookupMutation({
    onSuccess: (data) => {
      const mappedData = mapTinDataToCompanyData(data);
      if (mappedData) {
        Object.keys(mappedData).forEach(key => {
          if (mappedData[key]) {
            setValue(key, mappedData[key]);
          }
        });
        toast({
          title: t("Данные компании успешно загружены"),
          status: "success",
          position: "top right",
          duration: 3000,
        });
      }
    },
    onError: (error) => {
      toast({
        title: t("Не удалось найти данные по ИНН"),
        status: "error",
        position: "top right",
        duration: 3000,
      });
    }
  });

  const handleTinLookup = (tin) => {
    if (tin && tin.length >= 9) {
      tinLookupMutation.mutate(tin);
    }
  };

  useEffect(() => {
    reset({ ...data?.response, });
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
    handleTinLookup,
    tinLookupLoading: tinLookupMutation.isPending,
  };
};
