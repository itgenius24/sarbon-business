import * as yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCargoMutation, useDeleteCargo, useGetCargoById, useGetLoadingMutation, useUpdateCargo } from "@/services/api";
import { yupResolver } from "@/utils/yupResolver";
import authStore from "@/store/auth.store";
import { useRouter } from "next/navigation";

export const useAddCargoProps = ({ id }) => {

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const router = useRouter();

  const schema = yup
    .object({
      contact: yup.string().required().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Некорректный номер телефона"),
      cargo_type: yup.object().required(),
      weight_measurement: yup.number().required(),
      weight_unit: yup.object().required(),
      volume_measurement: yup.number().required(),
      packaging: yup.object(),
      packaging_quantity: yup.number(),
      loadings: yup.array().of(yup.object().shape({ location: yup.object().required(), address: yup.string().required() })).required(),
      unloading: yup.array().of(yup.object().shape({ location: yup.object().required(), address: yup.string().required() })).required(),
      gps_monitoring: yup.string().required(),
      car_type: yup.object().required(),
      transport_count: yup.string().required(),
      is_ftl: yup.string().required(),
      is_ltl: yup.string().required(),
      capacity: yup.number(),
      price: yup.number().required(),
      price_prepayment: yup.number().required(),
      price_after_order: yup.string().required(),
      price_prepayment_unit: yup.object().required(),
      payment_deadline: yup.number().required(),
      payment_type: yup.object().required(),
    })
    .required();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      loadings: [
        {
          location: "",
          address: ""
        }
      ],
      unloading: [
        {
          location: {
            value: "",
            label: ""
          },
          address: ""
        }
      ]
    }
  });

  const deleteCargo = useDeleteCargo({
    onSuccess() {
      router.back();
    },
    onError(res) {
      console.error(res);
    }
  });

  const getLoadingMutation = useGetLoadingMutation({
    onSuccess(data) {
      setValue("unloading", [
        ...watch("unloading"),
        ...data.response.map(item => (
          {
            location: {
              value: item?.guid,
              label: item?.name
            },
            address: ""
          }
        )),
      ]);
    }
  });

  const createCargo = useCreateCargoMutation({
    onSuccess() {
      alert("Груз успешно создан");
    }
  });

  const updateCargo = useUpdateCargo({
    onSuccess() {
      alert("Груз успешно обновлен");
    }
  });

  const getCargo = useGetCargoById({
    data: JSON.stringify({
      guid: id,
      with_relations: true
    })
  }, { enabled: !!id });

  function handleDelete () {
    deleteCargo.mutate({ id });
  }

  const status = "active";

  function onSubmit(data) {

    const loadingIds = data.loadings.map(item => item.location.value);
    const unloadingIds = data.unloading.map(item => item.location.value);

    loadingIds.splice(0, 1);
    unloadingIds.splice(0, 1);

    const addressIds = [...loadingIds, ...unloadingIds];

    const requestData = {
      data:{
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
        map_id: data.payment_type.value,
        order_status: ["in_moderation"],
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

  useEffect(() => {
    if(getCargo.isSuccess) {

      const data = getCargo.data?.response?.[0];

      setStartDate(new Date(data.load_time));
      setEndDate(new Date(data.date));

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
        loadings: [
          {
            location: {
              value: data.address_id_data?.guid,
              label: data.address_id_data?.name,
            },
            address: "",
          }
        ],
        unloading: [
          {
            location: {
              value: data.address_id_2_data?.guid,
              label: data.address_id_2_data?.name,
            },
            address: "",
          }
        ],
        gps_monitoring: data.gps_monitoring,
        car_type: {
          value: data.vehicle_id_data?.guid,
          label: data.vehicle_id_data?.name,
        },
        transport_count: data.number_of_cars,
        is_ftl: data.take_all_unloads,
        is_ltl: data.load_around_the_clock,
        capacity: data.load_capacity,
        price: data.bid_cash,
        price_prepayment: data.prepayment_percentage,
        price_after_order: data.dim_length_special,
        price_prepayment_unit: {
          label: data.currency_id_data?.name,
          value: data.currency_id_data?.guid,
        },
        payment_deadline: data.payment_within_days,
        contact: data.phone,
        note: data.comment,
        image: data.photo,
        payment_type: {
          label: data?.map_id_data?.name,
          value: data?.map_id_data?.guid,
        },
      });
    }
  }, [getCargo.data]);

  useEffect(() => {
    if(id && getCargo.isSuccess) {
      getLoadingMutation.mutate({
        function_id: "1d8af62e-cb8d-4599-966a-4a614435bed8",
        object_ids: [
          id
        ]
      });
    }
  }, [id, getCargo.data]);

  const cargoData = getCargo.data?.response?.[0];

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
    address1: cargoData?.address_id_data?.name,
    address2: cargoData?.address_id_2_data?.name,
  };
};
