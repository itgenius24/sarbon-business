
import { useCreateAdMutation, useGetAddress, useGetCarType, useGetCarsOnSale, useGetCurrency } from "@/services/api";
import { fileUpload } from "@/services/fileUpload";
import { useToast } from "@chakra-ui/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const carParam = {
  publish: {
    status: ["active"],
    with_relations: true,
  },
  archive: { status: ["in_active"], },
};
export const useMyAd = () => {
  const toast = useToast();
  const { id } = useParams();
  const { push, back } = useRouter();
  const { get } = useSearchParams();
  const create = get("create");

  const openCreatAdCard = () => {
    push(`${location.pathname}?create=true`);
  };

  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // photo:
      // "3bf18b7b-4c9f-4166-b20f-cbb430ea03bc/media/bbfa4468-847b-4c31-885a-959acacda110_Снимокэкрана(82).png",
    },
  });

  const [tabState, setTabState] = useState("publish");
  // console.log("watch() ", watch());
  // console.log("tabState ", tabState);
  // console.log("errors ", errors);

  const changeTabState=({ value }) => {
    if(value) {
      setTabState(value);
    }
  };

  const { data: TCOptions = [] } = useGetCarType(undefined, {
    select: (res) =>
      res?.response?.map((el) => ({ label: el?.name, value: el?.guid })),
  });

  const { data: currencyOptions, isSuccess } = useGetCurrency(undefined, {
    select: (res) =>
      res?.response?.map((el) => ({ label: el?.name, value: el?.guid })),
  });

  const {
    data: carsList = [],
    isLoading,
  } = useGetCarsOnSale(
    {
      data: JSON.stringify({
        ...carParam[tabState],
        users_id: id,
      }),
    },
    {
      select: (res) => {
        return res?.response;
      },
    }
  );

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
      title: "Успешно создано!",
      description: `Объявление ${name} успешно создано`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const getAddress = useGetAddress();

  const createAd = useCreateAdMutation({
    onSuccess(data) {
      displayFormSuccessInfo(data?.data?.name);
      back();
      // Объявление;
    },
    onError() {},
  });

  const submitForm = (data) => {
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
        currency_id: currency_id.value,
        photo: photo ? process.env.NEXT_PUBLIC_MEDIA_URL + photo : "",
        status: ["active"],
        users_id: id,
        made_date: new Date(),
        address_id: data.address.value,
      },
    };

    createAd.mutate(body);
  };

  const rules = { required: { value: true, message: "Это поле обязательно для заполнения" }, };

  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    setValue("photo", result?.link);
  };
  const getCreateAdProps = () => {
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
      addressOptions: getAddress.data?.response?.map((el) => ({ label: el?.name, value: el?.guid })),
    };
  };

  const getAdListProps=()=> {
    return {
      changeTabState,
      list: carsList,
    };
  };

  const onsubmit = () => handleSubmit(submitForm);

  useEffect(() => {
    if (isSuccess) {
      setValue("currency_id", currencyOptions[0]);
    }
  }, [isSuccess]);

  useEffect(() => {
    setTabState("publish");
  }, [create]);

  return {
    onsubmit,
    getCreateAdProps,
    getAdListProps,
    isLoading,
    create,
    back,
    openCreatAdCard,
  };
};
