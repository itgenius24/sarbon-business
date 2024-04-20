import authStore from "@/store/auth.store";
import { useCreateAdMutation, useGetAddress, useGetCarById, useGetCarType, useGetCurrency, useUpdateAdMutation } from "@/services/api";
import { fileUpload } from "@/services/fileUpload";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useAdDetailProps = ({ id }) => {

  const router = useRouter();
  const toast = useToast();

  const userId = authStore.userData.id;

  const statusOptions = [
    {
      label: "Активен",
      value: "active"
    },
    {
      label: "Aрхив",
      value: "in_active"
    }
  ];

  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const rules = { required: { value: true, message: "Это поле обязательно для заполнения" }, };

  const displayPhotoNotUploadedErr = () => {
    toast({
      title: "Фото не найдено",
      description: "Пожалуйста, загрузите фото",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const displayFormSuccessInfo = (name) => {
    toast({
      title: id ? "Успешно обновлено!" : "Успешно создано!",
      description: `Объявление ${name} успешно ${id ? "обновлено" : "создано"}`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const getCarById = useGetCarById(
    { data: JSON.stringify({ guid: id, with_relations: true }), },
    { enabled: !!id }
  );

  const createAd = useCreateAdMutation({
    onSuccess(data) {
      displayFormSuccessInfo(data?.data?.name);
      router.back();
    },
  });

  const updateAd = useUpdateAdMutation({
    onSuccess(data) {
      displayFormSuccessInfo(data?.data?.name);
      router.back();
    },
  });

  const onSubmit = (data) => {
    if (!data.photo) return displayPhotoNotUploadedErr();

    const { name, vehicle_type_id, price, desc, contact, currency_id, photo } =
      data || {};

    const body = {
      data: {
        name: name,
        vehicle_type_id: vehicle_type_id.value,
        price: +price,
        description: desc,
        contact: contact, // (97) 897-98-79
        currency_id: currency_id?.value || currencyOptions[0]?.value,
        photo: photo?.includes("http") ? photo : process.env.NEXT_PUBLIC_MEDIA_URL + photo,
        status: ["active"],
        users_id: userId,
        made_date: new Date(),
        address_id: data.address.value,
      },
    };

    if(id) {
      body.data.guid = id;
      body.data.status = [data.status?.value];
      updateAd.mutate(body);
    } else {
      createAd.mutate(body);
    }
  };


  const { data: TCOptions = [] } = useGetCarType(undefined, {
    select: (res) =>
      res?.response?.map((el) => ({ label: el?.name, value: el?.guid })),
  });

  const { data: currencyOptions } = useGetCurrency(undefined, {
    select: (res) =>
      res?.response?.map((el) => ({ label: el?.name, value: el?.guid })),
  });

  const getAddress = useGetAddress();

  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    setValue("photo", result?.link);
  };

  useEffect(() => {
    const data = getCarById.data?.response[0];
    if(getCarById.isSuccess) {
      reset({
        vehicle_type_id: {
          label: data?.vehicle_type_id_data?.name,
          value: data?.vehicle_type_id_data?.guid,
        },
        address: {
          label: data?.address_id_data?.name,
          value: data?.address_id_data?.guid,
        },
        currency_id: {
          label: data?.currency_id_data?.name,
          value: data?.currency_id_data?.guid,
        },
        status: statusOptions.find(item => item.value === data?.status[0]),
        name: data?.name,
        desc: data?.description,
        contact: data?.contact,
        photo: data?.photo,
        price: data?.price,
      });
    }
  }, [getCarById.data]);

  return {
    watch,
    errors,
    control,
    setValue,
    register,
    TCOptions,
    currencyOptions,
    handleImageUpload,
    rules,
    onSubmit,
    handleSubmit,
    addressOptions: getAddress.data?.response?.map((el) => ({ label: el?.name, value: el?.guid })),
    router,
    statusOptions,
  };
};
