import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateAddressMutation,
  useCreateCargoMutation,
  useDeleteCargo,
  useGetCargoById,
  useGetLoadingMutation,
  useGetMaps,
  useGetOfferById,
  useUpdateCargo,
  useUpdateResponse
} from "@/services/api";
import { yupResolver } from "@/utils/yupResolver";
import authStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

export const useAddCargoProps = ({ id, status }) => {

  const isCargo = status === "active" || status === "in_moderation";

  const userId = authStore.userData.id;

  const loadingsRef = useRef([]);
  const unloadingRef = useRef([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(!id);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const toast = useToast();

  function handleEditToggle() {
    setCanEdit(!canEdit);
  }

  function handleOpenDeletePopup() {
    setPopupOpen(true);
  }

  function handleCloseDeletePopup() {
    setPopupOpen(false);
  }

  const schema = yup
    .object({
      contact: yup.string().required().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Некорректный номер телефона"),
      cargo_type: yup.object().required("Обязательное поле"),
      weight_measurement: yup.string().required("Обязательное поле"),
      weight_unit: yup.object().required("Обязательное поле"),
      volume_measurement: yup.string().required("Обязательное поле"),
      packaging: yup.object(),
      packaging_quantity: yup.string(),
      loadings: yup.array().of(yup.object().shape({ location: yup.object({ value: yup.string().min(2, "Обязательное поле"), label: yup.string().min(2, "Обязательное поле") }).required("Обязательное поле"), address: yup.string().required("Обязательное поле") })).required("Обязательное поле"),
      unloading: yup.array().of(yup.object().shape({ location: yup.object({ value: yup.string().min(2, "Обязательное поле"), label: yup.string().min(2, "Обязательное поле") }).required("Обязательное поле"), address: yup.string().required("Обязательное поле") })).required("Обязательное поле"),
      gps_monitoring: yup.string().required("Обязательное поле"),
      car_type: yup.object().required("Обязательное поле"),
      transport_count: yup.string().required("Обязательное поле"),
      is_ftl: yup.boolean(),
      is_ltl: yup.boolean(),
      capacity: yup.string(),
      price: yup.string(),
      price_prepayment: yup.string(),
      price_after_order: yup.string(),
      price_prepayment_unit: yup.object().required("Обязательное поле"),
      payment_deadline: yup.string(),
      payment_type: yup.object(),
      prepayment_percent: yup.number().max(100, "Максимальное значение 100").min(0, "Минимальное значение 0").typeError("Должно быть числом"),
    });
    // .required("Обязательное поле");

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isDirty, }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      loadings: [
        {
          location: {
            value: "",
            label: ""
          },
          address: "",
          cor: "",
        }
      ],
      unloading: [
        {
          location: {
            value: "",
            label: ""
          },
          address: "",
          cor: "",
        }
      ]
    }
  });

  const deleteCargo = useDeleteCargo({
    onSuccess() {
      toast({
        position: "top-right",
        title: "Груз успешно удален",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      router.back();
    },
    onError(res) {
      console.error(res);
    }
  });

  const allCargoParams = { cargo_id: id };

  const allResponseParams = { response_id: id };

  const isAlCargo = status === "active" || status === "in_moderation";

  const getMaps = useGetMaps(
    { data: JSON.stringify(isAlCargo ? allCargoParams : allResponseParams) },
    { enabled: false }
  );

  const getLoadingMutation = useGetLoadingMutation({
    onSuccess(data) {
      unloadingRef.current = [
        ...unloadingRef.current,
        ...data.response.map(item => (
          {
            location: {
              value: item?.guid,
              label: item?.name
            },
            address: "",
            cor: []
          }
        ))
      ];

      getMaps.refetch();
    }
  });

  const createAddress = useCreateAddressMutation({
    onError(){
      setLoading(false);
    }
  });

  const createCargo = useCreateCargoMutation({
    onSuccess(data) {

      let loadingsData = [];
      let unloading = [];

      getValues("loadings").forEach(item => {
        if(item.address && item.cor) {
          loadingsData.push(item.address, ...item.cor.split(","));
        }
      });

      getValues("unloading").forEach(item => {
        if(item.address && item.cor) {
          unloading.push(item.address, ...item.cor.split(","));
        }
      });

      createAddress.mutate(
        {
          data:{
            object_data:{
              name: loadingsData.concat(unloading),
              cargo_id: data?.data?.guid
            }
          }
        },
        {
          onSuccess() {
            setLoading(false);
            toast({
              position: "top-right",
              title: "Груз успешно создан",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            router.back();
          }
        }
      );
    },
    onError() {
      setLoading(false);
    }
  });

  const updateCargo = useUpdateCargo({
    onSuccess(data) {
      let loadingsData = [];
      let unloading = [];


      getValues("loadings").forEach(item => {
        if(item.address && item.cor) {
          const cor = item.cor;
          if(Array.isArray(cor)) {
            loadingsData.push(item.address, cor[0]?.toString(), cor[1]?.toString());
          } else {
            loadingsData.push(item.address, ...item.cor.split(","));
          }
        }
      });

      getValues("unloading").forEach(item => {
        if(item.address && item.cor) {
          const cor = item.cor;
          if(Array.isArray(cor)) {
            unloading.push(item.address, cor[0]?.toString(), cor[1]?.toString());
          } else {
            unloading.push(item.address, ...item.cor.split(","));
          }
        }
      });

      createAddress.mutate(
        {
          data:{
            object_data:{
              name: loadingsData.concat(unloading),
              cargo_id: data?.data?.guid
            }
          }
        },
        {
          onSuccess() {
            setLoading(false);
            toast({
              position: "top-right",
              title: "Груз успешно обновлен",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            router.back();
          }
        }
      );
      setLoading(false);
    },
    onError() {
      setLoading(false);
    }

  });

  const getCargo = useGetCargoById({
    data: JSON.stringify({
      guid: id,
      with_relations: true
    })
  }, { enabled: !!(isCargo && id) });

  const getOfferCargoById = useGetOfferById(
    {
      data: JSON.stringify({
        guid: id,
        with_relations: true
      })
    },
    { enabled: !!(userId && !isCargo), }
  );

  const updateResponseMutation = useUpdateResponse({
    onSuccess() {
      toast({
        position: "top-right",
        title: "Груз успешно обновлена",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      router.back();
    },
    onError(res) {
      console.error(res);
    }
  });

  function handleDelete () {
    deleteCargo.mutate({ id });
  }

  function handleCancel() {
    updateResponseMutation.mutate({
      data:{
        guid: id,
        provisions:["cancellation"]
      }
    });
  }

  function handleAccept() {
    updateResponseMutation.mutate({
      data:{
        guid: id,
        response_status:["approve_from_driver"]
      }
    });
  }

  function onSubmit(data) {

    if(!authStore.isAuth) {
      toast({
        position: "top-right",
        title: "Авторизуйтесь",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      router.push("/auth");
      return;
    }

    setLoading(true);

    const loadingIds = data.loadings.map(item => item.location.value);
    const unloadingIds = data.unloading.map(item => item.location.value);

    loadingIds.splice(0, 1);
    unloadingIds.splice(0, 1);

    const addressIds = [...loadingIds, ...unloadingIds];

    const requestData = {
      data: {
        cargo_type_id: data.cargo_type.value,
        weight: +data.weight_measurement,
        measurement_id: data.weight_unit.value,
        volume_m3: +data.volume_measurement,
        packages_id: data.packaging?.value || "",
        package_quantity: +data.packaging_quantity || 0,
        load_time: startDate,
        date: endDate,
        address_id: data.loadings[0].location.value,
        address_ids: addressIds,
        address_id_2: data.unloading[0].location.value,
        gps_monitoring: data.gps_monitoring,
        vehicle_type_id: data.car_type.value,
        number_of_cars: data.transport_count,
        take_all_unloads: data.is_ftl,
        load_around_the_clock: data.is_ltl,
        load_capacity: +data.capacity,
        bid_cash: +data.price,
        prepayment_percentage: +data.price_prepayment,
        dim_length_special: data.price_after_order,
        currency_id: data.price_prepayment_unit.value,
        payment_within_days: +data.payment_deadline,
        users_id: authStore.userData.id,
        phone: data.contact,
        comment: data.note,
        photo: data.image,
        map_id: data?.payment_type?.value,
        order_status: ["in_moderation"],
        negotiable: data.bargain === "negotiable",
        no_haggling: data.bargain === "no_haggling",
        request: data.bargain === "request",
        tir: data.tir,
        t1: data.t1,
        cmr: data.cmr,
      }
    };

    if(id) {
      requestData.data.guid = id;
      requestData.data.order_status = getCargo.data?.response?.[0]?.order_status;
      updateCargo.mutate(requestData);
    } else {
      createCargo.mutate(requestData);
    }
  }

  function onCancelClick() {
    getOfferCargoById.refetch();
    handleEditToggle();
  }

  function getData() {
    switch(status) {
      case "new":
        return getOfferCargoById.data?.response[0];
      case "in_moderation":
        return getCargo.data?.response?.[0];
      case "active":
        return getCargo.data?.response?.[0];
      default:
        return getOfferCargoById.data?.response[0];
    }
  }

  function handleResetForm () {
    reset({});
    setStartDate("");
    setEndDate("");
  }

  useEffect(() => {
    if(getCargo.isSuccess || getOfferCargoById.isSuccess) {

      const data = getData();

      loadingsRef.current = [
        {
          location: {
            value: data?.address_id_data?.guid,
            label: data?.address_id_data?.name
          },
          address: "",
          cor: []
        }
      ];

      unloadingRef.current = [
        {
          location: {
            value: data?.address_id_2_data?.guid,
            label: data?.address_id_2_data?.name
          },
          address: "",
          cor: []
        }
      ];

      if(data && id) {
        setStartDate(new Date(data?.load_time || new Date()));
        setEndDate(new Date(data?.date || new Date()));
        reset({
          cargo_type: {
            value: data.cargo_type_id_data?.guid,
            label: data.cargo_type_id_data?.name,
          },
          // cargo_type_search: data.cargo_type_id_data?.name,
          weight_measurement: data.weight,
          weight_unit: {
            value: data.measurement_id_data?.guid,
            label: data.measurement_id_data?.base_unit,
          },
          volume_measurement: data.volume_m3,
          packaging: {
            value: data.packages_id_data?.guid,
            label: data.packages_id_data?.name,
          },
          packagingSearch: data.packages_id_data?.name,
          packaging_quantity: data.package_quantity,
          gps_monitoring: data.gps_monitoring,
          car_type: {
            value: data.vehicle_type_id_data?.guid,
            label: data.vehicle_type_id_data?.name,
          },
          transport_count: data.number_of_cars,
          is_ftl: data.take_all_unloads ?? false,
          is_ltl: data.load_around_the_clock ?? false,
          capacity: data.load_capacity ?? "",
          price: data.bid_cash,
          price_prepayment: data.prepayment_percentage,
          price_after_order: data?.cargo_id_data?.dim_length_special ?? 0,
          price_prepayment_unit: {
            label: status === "new" ? data.dim_height_special?.name : data.currency_id_data?.name,
            value: status === "new" ? data.dim_height_special?.guid : data.currency_id_data?.guid,
          },
          payment_deadline: data.payment_within_days ?? "",
          contact: data.phone,
          note: data.comment,
          image: data.photo,
          payment_type: {
            label: data?.map_id_data?.payment_type,
            value: data?.map_id_data?.guid,
          },
          bargain: data.request ? "request" : data.negotiable ? "negotiable" : "no_haggling",
        });
      }
    }
  }, [getCargo.data, getOfferCargoById.data]);

  useEffect(() => {
    if(id && (getCargo.isSuccess || getOfferCargoById.isSuccess)) {
      getLoadingMutation.mutate({
        function_id: "1d8af62e-cb8d-4599-966a-4a614435bed8",
        object_ids: [
          id
        ]
      });
    }
  }, [id, getCargo.data, getOfferCargoById.data]);

  useEffect(() => {

    if(getMaps.isSuccess) {
      const data = getMaps.data.response;
      const reversedData = data.reverse();

      const loadingData = reversedData.pop();

      loadingsRef.current[0].cor = [loadingData?.lat, loadingData?.long];
      loadingsRef.current[0].address = loadingData?.name;

      unloadingRef.current?.forEach((item, index) => {
        item.cor = [reversedData?.[index]?.lat, reversedData?.[index]?.long];
        item.address = reversedData?.[index]?.name;
      });

      setValue("loadings", loadingsRef.current);
      setValue("unloading", unloadingRef.current);
    }

  }, [getMaps.data]);

  const data = getData();

  return {
    register,
    control,
    setValue,
    handleSubmit,
    onSubmit,
    watch,
    errors,
    startDate,
    setStartDate,
    endDate,
    reset,
    setEndDate,
    status,
    handleDelete,
    handleCancel,
    handleAccept,
    address1: data?.address_id_data?.name,
    address2: data?.address_id_2_data?.name,
    userName: data?.users_id_2_data?.full_name,
    phoneNumber: data?.users_id_2_data?.phone,
    rating: data?.users_id_2_data?.rating,
    proposedAmount: data?.driver_cash,
    transportModel: data?.short_name,
    canEdit,
    handleEditToggle,
    isDirty,
    onCancelClick,
    handleOpenDeletePopup,
    handleCloseDeletePopup,
    isPopupOpen,
    loading,
    prepayment: data?.conditions,
    paymentAfterFinish: data?.bid_amount,
    driverComment: data?.cargo_id_data?.driver_comment,
    permission: data?.permissions?.[0],
    handleResetForm,
    currency: data?.currency_id_2_data?.code,
  };
};
