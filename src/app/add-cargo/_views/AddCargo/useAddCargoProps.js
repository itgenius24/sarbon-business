import { useCreateCargoMutation } from "@/services/api";
import authStore from "@/store/auth.store";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useAddCargoProps = () => {

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const createCargo = useCreateCargoMutation();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
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
        cargo_type_id: data.cargo_type.value,//"tanlangan cargo taypeni guid si" tip gruza
        weight: +data.weight_measurement, //float ves
        measurement_id: data.weight_unit.value, //tanlangan izmereniyani guid si
        volume_m3: +data.volume_measurement, //float obyom
        packages_id: data.packaging?.value || "", //"tanlangan packagesni guid si" --> upakovka
        package_quantity: +data.packaging_quantity || 0, //kolechistva upakovka number
        load_time: startDate, // birinchi tanlagan date
        date: endDate,// ikkinchi tanlagan date
        address_id: data.loadings[0].location.value,//tanlangan addressni guid si" --> naselyonniy punkt zagruzka
        address_ids: addressIds, //razgruzga, zagruzga addresla hammasi shu listga bervoriladi
        address_id_1: data.unloading[0].location.value, // tanlangan addresni guid si --> razgruzka
        gps_monitoring: data.gps_monitoring, //boolean true or false
        vehicle_type: data.car_type.value,//tanlangan mashinani guid si
        number_of_cars: data.transport_count, //kolechistva mashin number
        take_all_unloads: data.is_ftl, // boolean --> otdelniy mashinoy
        load_around_the_clock: data.is_ltl, // boolean --> dogruzam
        load_capacity: +data.capacity, //gruzapodyomnost --> float
        bid_cash: +data.price, //predlogaymaya summa float
        prepayment_percentage: +data.price_prepayment, //summa predoplata float
        dim_length_special: data.price_after_order, //summa posle zavershina float
        currency_id: data.price_prepayment_unit.value, // tanlangan typeni guid si --> uz, sum
        payment_within_days: 23, //oplata cherez number
        users_id_2: authStore.userData.id, //kim tuldiraykon bosa ushani guidsi
        phone: data.contact, //phone input
        comment: `<p>${data.note}</p>`, //kommentariya
        photo: `https://cdn.u-code.io/3bf18b7b-4c9f-4166-b20f-cbb430ea03bc/media/${data.image}`,
        map_id: "2c68731c-b552-4a19-aa5a-3440967c9633" // tanlagan tip oplatani guid si
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
