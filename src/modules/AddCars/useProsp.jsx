import { useGetLang } from "@/hooks/useGetLang";
import {
  useCreateUser,
  useCreateVehicle,
  useDeleteVehicle,
  useGetCarNumber,
  useGetFuelInfo,
  useGetPhone,
  useGetTrailerType,
  useGetUserGpsByIDData,
  useGetVehicleSingle,
  useOfferFromCustomerMutation,
  useUpdateUser,
  useUpdateVehicle,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { countries } from "@/utils/country";
import { normalizeName } from "@/utils/normalizeName";
import { useMediaQuery } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useClipboard from "react-use-clipboard";

const useProsp = () => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const locale = useGetLang();
  const searchParams = useSearchParams();
  const [inputValue, setinputValue] = useState(``);
  const id = searchParams.get(`id`);
  const user_id = searchParams.get(`user_id`);
  const [load, setLoad] = useState({});
  const router = useRouter();
  const { t } = useTranslation(locale, "translations");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    reset,
    setValue,
    setError,
    getValues,
  } = useForm({});
  const [isCopied, setCopied] = useClipboard(
    JSON.stringify(
      `Его логин: ${watch(`phone`)};  Его пароль: ${watch(`password`)}`
    )
  );

  useEffect(() => {
    setLoad({
      top: watch(`top`),
      side: watch(`side`),
      back: watch(`back`),
      with_removal: watch(`with_removal`),
    });
  }, [watch(`top`), watch(`side`), watch(`back`), watch(`with_removal`)]);

  const getTrueKeys = (obj) => {
    return Object.keys(obj).filter((key) => obj[key] === true);
  };

  const data = {
    data: {
      trailer_type_id: watch(`trailer_type_id`)?.value,
      capacity: +watch(`capacity`) || 0,
      height: +watch(`height`) || 0,
      car_number: watch(`car_number`),
      marka: watch(`marka`),
      cemt: watch(`cemt`), //or false
      tir: watch(`tir`), // or true
      pneumatic: watch(`pneumatic`), //or false
      coupling: watch(`coupling`), // or true
      konika: watch(`konika`), // or false
      adr: watch(`adr`)?.value || ``,
      back_side_trailer: watch(`back_side_trailer`), //url cdn
      front_side_trailer: watch(`front_side_trailer`), //url cdn
      car_photo: watch(`car_photo`), //url cdn
      download_type: getTrueKeys(load),
      car_position: ["moderation"],
      status: [`active`],
      users_id_3: authStore.userData.guid,
      car_country: watch(`car_country`)?.value,
      fuel_id: watch(`fuel_id`)?.value
        ? watch(`fuel_id`).fuel_id?.value
        : watch(`fuel_id`),
      eco_standart: watch(`eco_standart`)?.value,
      guid: id ? id : undefined,
      create_time: id ? undefined : new Date(),
    },
  };

  const { mutate: phoneGet } = useGetPhone({
    onSuccess: (res) => {
      if (!id) {
        vehicleData({
          data: { users_id: res?.response?.[0]?.guid, ...data.data },
        });
      } else {
        updateW({ data: { users_id: res?.response?.[0]?.guid, ...data.data } });
      }
    },
  });

  const { mutate } = useCreateUser({
    onSuccess: (res) => {
      phoneGet({
        data: JSON.stringify({
          phone: watch(`phone`)?.replace("+", ""),
        }),
      });
    },
  });

  const euroTypeOptions = [
    { label: `${t(`Евро`)}-1`, value: `Евро-1` },
    { label: `${t(`Евро`)}-2`, value: `Евро-2` },
    { label: `${t(`Евро`)}-3`, value: `Евро-3` },
    { label: `${t(`Евро`)}-4`, value: `Евро-4` },
    { label: `${t(`Евро`)}-5`, value: `Евро-5` },
    { label: `${t(`Евро`)}-6`, value: `Евро-6` },
  ];

  const getCarType = useGetTrailerType();
  const carTypeOptions = getCarType.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));

  const { mutate: updateDsate, isLoading } = useUpdateUser({
    onSuccess: (res) => {
      phoneGet({
        data: JSON.stringify({
          phone: watch(`phone`)?.replace("+", ""),
        }),
      });
      // router.push(`/${locale}/drivers`);
    },
  });

  const { data: getCarNumnber } = useGetCarNumber({
    params: {
      data: JSON.stringify({
        offset: 0,
        order: {},
        search: inputValue,
        limit: 1000,
        view_fields: ["car_number"],
      }),
    },
    querySettings: {
      enabled: Boolean(inputValue),
    },
  });

  const getUserGps = useGetUserGpsByIDData({
    params: {
      data: JSON.stringify({
        guid: user_id,
        with_relations: true,
      }),
    },
    querySettings: {
      enabled: Boolean(user_id),
      onSuccess: (res) => {
        reset({
          ...res?.response[0],
          password: "",
        });
      },
    },
  });

  const { mutate: vehicleData, isLoading: lodingVehicle } = useCreateVehicle({
    onSuccess: (res) => {
      setIsPopupOpen(true);
    },
  });

  const { mutate: updateW, isLoading: upisLoading } = useUpdateVehicle({
    onSuccess: () => {
      router.push(`/${locale}/my-cars-dillers`);    },
  });

  const { data: useList } = useGetVehicleSingle({
    params: {
      id,
    },
    querySettings: {
      enabled: Boolean(id),
      onSuccess: (res) => {
        console.log(`res`, res);
        const trilerVal = carTypeOptions?.filter(
          (item) => item?.value === res?.response?.trailer_type_id
        );

        res?.response?.download_type.forEach((name) => {
          setValue(name, true); // Mark the checkbox with the matching name as true
        });

        setValue(`trailer_type_id`, trilerVal?.[0]);
        setValue(
          `fuel_id`,
          fuel &&
            fuel?.response
              ?.filter((item) => item?.guid === res?.response?.fuel_id)
              ?.map((item) => ({ label: item?.name, value: item?.guid }))?.[0]
        );
        setValue(
          `car_country`,
          countries
            ?.filter((item) => item?.code === res?.response?.car_country)
            ?.map((item) => ({
              label: item[`name_${locale}`],
              value: item?.code,
            }))?.[0]
        );
        setValue(
          `eco_standart`,
          euroTypeOptions
            ?.filter((item) => item?.value === res?.response?.eco_standart)
            ?.map((item) => ({ label: item?.value, value: item?.value }))?.[0]
        );
        setValue(`capacity`, res?.response?.capacity);
        setValue(`height`, res?.response?.height);
        setValue(`marka`, res?.response?.marka);
        setValue(`cemt`, res?.response?.cemt);
        setValue(`tir`, res?.response?.tir);
        setValue(`pneumatic`, res?.response?.pneumatic);
        setValue(`coupling`, res?.response?.coupling);
        setValue(`konika`, res?.response?.konika);
        setValue(`adr`, res?.response?.adr);
        setValue(`back_side_trailer`, res?.response?.back_side_trailer);
        setValue(`front_side_trailer`, res?.response?.front_side_trailer);
        setValue(`car_photo`, res?.response?.car_photo);
        setValue(`car_number`, res?.response?.car_number);
        

        setinputValue(res?.response?.car_number);
      },
    },
  });

  const { data: fuel } = useGetFuelInfo();

  useEffect(() => {
    if (getCarNumnber?.count === 1) {
      if (useList?.response && useList?.response?.car_number === inputValue) {
        setValue(`car_number`, inputValue, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        setError(`car_number`, {
          message: `Этот номер автомобиля был зарегистрирован ранее!`,
        });
      }
    } else if (
      (getCarNumnber?.count > 1 ||
        getCarNumnber?.count === 0 ||
        !getCarNumnber ||
        id) &&
      inputValue?.length > 0
    ) {
      setValue(`car_number`, inputValue, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [getCarNumnber?.count > 0, inputValue?.length]);

  const { mutate: checkUserData, isLoading: isLoadingCrate } =
    useOfferFromCustomerMutation({
      onSuccess: (res) => {
        if (res?.response?.length === 0) {
          mutate({
            data: {
              create_time: new Date(),
              login: getValues().phone,
              photo: getValues().photo,
              phone: getValues().phone,
              drivers_license: getValues().drivers_license,
              passport_code: getValues().passport_code,
              passport_scan: getValues().passport_scan,
              password: getValues().password,
              full_name: getValues().full_name,
              role_id: "921464fa-8308-46b7-9b66-363acf654e40",
              client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
            },
          });
        } else {
          // setOpen(true);
        }
      },
    });

 
  const onSubmit = (val) => {
    if (id) {
      updateDsate({
        data: {
          full_name: normalizeName(val?.full_name),
          phone: val?.phone,
          // firm_id,
          // password:val?.password,
          passport_scan: val?.passport_scan,
          passport_code: val?.passport_code,
          drivers_license: val?.drivers_license,
          photo: val?.photo,
          login: val?.phone,
          guid: getUserGps?.data?.response[0]?.guid,
          role_id: "921464fa-8308-46b7-9b66-363acf654e40",
          client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
        },
      });
    } else {
      checkUserData({
        data: {
          object_data: {
            phone: val?.phone?.startsWith("+")
              ? val?.phone?.slice(1)
              : val?.phone,
            type: `register`,
            register_type: "phone",
            email: ``,
          },
        },
      });
    }
  };

  const copyFunction = () => {
    setCopied();
    setIsPopupOpen(false);
    router.push(`/${locale}/my-cars-dillers`);
  };

  return {
    isLargerThan845,
    register,
    errors,
    t,
    control,
    watch,
    setValue,
    locale,
    handleSubmit,
    onSubmit,
    isLoading: isLoadingCrate,
    euroTypeOptions,
    setinputValue,
    isBtn: Object.values(errors)?.length > 0,
    isPopupOpen,
    setIsPopupOpen,
    copyFunction,
    router,
    id,
    carTypeOptions
  };
};

export default useProsp;
