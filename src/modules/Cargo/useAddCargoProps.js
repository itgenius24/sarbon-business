import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCargoMutation } from "@/services/api";
import { yupResolver } from "@/utils/yupResolver";
import authStore from "@/store/auth.store";

export const useAddCargoProps = () => {

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const createCargo = useCreateCargoMutation({
    onSuccess() {
      alert("Груз успешно создан");
    }
  });

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
          location: "",
          address: ""
        }
      ]
    }
  });

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
        address_id_1: data.unloading[0].location.value,
        gps_monitoring: data.gps_monitoring,
        vehicle_type: data.car_type.value,
        number_of_cars: data.transport_count,
        take_all_unloads: data.is_ftl,
        load_around_the_clock: data.is_ltl,
        load_capacity: +data.capacity,
        bid_cash: +data.price,
        prepayment_percentage: +data.price_prepayment,
        dim_length_special: data.price_after_order,
        currency_id: data.price_prepayment_unit.value,
        payment_within_days: +data.payment_deadline,
        users_id_2: authStore.userData.id,
        phone: data.contact,
        comment: `<p>${data.note}</p>`,
        photo: `${process.env.NEXT_PUBLIC_MEDIA_URL}${data.image}`,
        map_id: data.payment_type.value
      }
    };
    createCargo.mutate(requestData);
  }

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
    setEndDate
  };
};
