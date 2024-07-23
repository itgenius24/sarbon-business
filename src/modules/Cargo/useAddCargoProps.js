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
  useGetUserCargo,
  useLoadingTypes,
  useUpdateCargo,
  useUpdateResponse
} from "@/services/api";
import { yupResolver } from "@/utils/yupResolver";
import authStore from "@/store/auth.store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "@/app/i18n/client";
import { useGetDistance } from "@/hooks/useGetDistance";
import formStore from "@/store/form.store";
import { useGetLang } from "@/hooks/useGetLang";

export const useAddCargoProps = ({ id, status, locale }) => {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const isAuth = authStore.isAuth;

  const [isPackagingAndQuantity, setPackagingAndQuantity] = useState(formStore.isPackagingAndQuantity);
  const [isDimensionsAndDiameter, setDimensionsAndDiameter] = useState(formStore.isDimensionsAndDiameter);

  const [isCreated, setIsCreated] = useState(false);

  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const [isRequirementOpen, setRequirementOpen] = useState(formStore.isRequirementOpen);
  const [isAccessOpen, setAccessOpen] = useState(formStore.isAccessOpen);
  const [isBeltsOpen, setBeltsOpen] = useState(formStore.isBeltsOpen);
  const [isLiftingCapacityOpen, setLiftingCapacityOpen] = useState(formStore.isLiftingCapacityOpen);

  const [prepaymentFuelOpen, setPrepaymentFuelOpen] = useState(formStore.prepaymentFuelOpen);
  const [directContractOpen, setDirectContractOpen] = useState(formStore.directContractOpen);

  const isCargo = status === "active" || status === "in_moderation" || status === "in_active";

  const { t } = useTranslation(locale, "translations");

  const [isOpen, setIsOpen] = useState(false);

  const userId = authStore.userData.id;

  const loadingsRef = useRef([]);
  const unloadingRef = useRef([]);

  const [startDate, setStartDate] = useState(formStore.startDate ? new Date(formStore.startDate) : "");
  const [endDate, setEndDate] = useState(formStore.endDate ? new Date(formStore.endDate) : "");

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(!id);

  const [templateId, setTemplateId] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const toast = useToast();

  useEffect(() => {
    if(searchParams.get("isFirst") !== "true") {
      router.push(pathname + "?isFirst=true");
      router.refresh();
    }
  }, []);

  function handleEditToggle() {
    setCanEdit(!canEdit);
  }

  function handleOpenDeletePopup() {
    setPopupOpen(true);
  }

  function handleCloseDeletePopup() {
    setPopupOpen(false);
  }

  function handleOpenTemplateModal() {
    setIsTemplateModalOpen(true);
  }

  function handleCloseTemplateModal() {
    setIsTemplateModalOpen(false);
  }

  function handleOpenModal() {
    setIsOpen(true);
    if(isAuth) {
      getTempCargo.refetch();
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  const emptyCargoFields = {
    cargo_type: {
      value: "",
      label: "",
    },
    cargo_type_search: "",
    weight_measurement: "",
    weight_unit: {
      value: "",
      label: "",
    },
    loadings: [{
      location: {
        value: "",
        label: "",
      },
      address: "",
      cor: [],
    }],
    unloading: [
      {
        location: {
          value: "",
          label: "",
        },
        address: "",
        cor: [],
      }
    ],
    volume_measurement: "",
    packaging: {
      value: "",
      label: "",
    },
    packagingSearch: "",
    packaging_quantity: "",
    gps_monitoring: "",
    car_type: {
      value: "",
      label: "",
    },
    transport_count: "",
    is_ftl: false,
    is_ltl: false,
    capacity: "",
    price: "",
    price_prepayment: "",
    price_after_order: 0,
    price_prepayment_unit: {
      label: "",
      value: "",
    },
    payment_deadline: "",
    contact: "",
    note: "",
    image: "",
    payment_type: {
      label: "",
      value: "",
    },
    bargain: "",
    length: "",
    width: "",
    height: "",
    diameter: "",
    hitch: "",
    pneumatic: "",
    bunks: false,
    tir: false,
    t1: false,
    cmr: false,
    medic_certificate: false,
    permission: [],
    straps_number: "",
    load_type_id: {
      label: "",
      value: "",
    }
  };

  const schema = yup
    .object({
      contact: yup.string().required().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Некорректный номер телефона"),
      cargo_type: yup.object().required("Обязательное поле"),
      weight_measurement: yup.string().required("Обязательное поле"),
      weight_unit: yup.object().required("Обязательное поле"),
      volume_measurement: yup.string().required("Обязательное поле"),
      packaging: yup.object(),
      packaging_quantity: yup.string(),
      // loadings: yup.array().of(yup.object().shape({ location: yup.object({ value: yup.string().min(2, "Обязательное поле"), label: yup.string().min(2, "Обязательное поле") }).required("Обязательное поле"), address: yup.string().required("Обязательное поле") })).required("Обязательное поле"),
      // unloading: yup.array().of(yup.object().shape({ location: yup.object({ value: yup.string().min(2, "Обязательное поле"), label: yup.string().min(2, "Обязательное поле") }).required("Обязательное поле"), address: yup.string().required("Обязательное поле") })).required("Обязательное поле"),
      loadings: yup.array(),
      unloading: yup.array(),
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
    formState: { errors, isDirty }
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

  const getLoadings = (Array.isArray(watch("loadings")?.[0]?.cor) ? watch("loadings")?.map(item => item?.cor) : watch("loadings")?.map(item => item?.cor?.split(","))) || [];
  const getUnloading = (Array.isArray(watch("unloading")?.[0]?.cor) ? watch("unloading")?.map(item => item?.cor) : watch("unloading")?.map(item => item?.cor?.split(","))) || [];

  const distance = useGetDistance({ referencePoints: [...getLoadings, ...getUnloading] });

  const deleteCargo = useDeleteCargo({
    onSuccess() {
      toast({
        position: "top-right",
        title: "Груз успешно удален",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      router.push(`/${locale}/my-loads`);
    },
    onError(res) {
      console.error(res);
    }
  });

  const allCargoParams = { cargo_id: id };

  const allResponseParams = { response_id: id };

  const templateParams = { cargo_id: templateId };

  const isAllCargo = status === "active" || status === "in_moderation" || status === "in_active";

  const getMaps = useGetMaps(
    {
      data: JSON.stringify(
        id
          ? isAllCargo
            ? allCargoParams
            : allResponseParams
          : templateParams
      )
    },
    { enabled: !!templateId }
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
            search: item?.name,
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

  const getLoadingTypes = useLoadingTypes();

  const loadingOptions = getLoadingTypes.data?.response?.map(item => ({
    label: item?.name,
    value: item?.guid
  }));

  function onCreateCargoSuccess(data) {
    const isTemplate = data.cargo_type[0] === "template";

    let loadingsData = [];
    let unloading = [];

    getValues("loadings").forEach(item => {
      if(item.address && item.cor) {

        const cor = item.cor;
        const isCorArr = Array.isArray(cor);

        if(isCorArr) {
          loadingsData.push(item.address, ...item.cor);
        } else {
          loadingsData.push(item.address, ...item.cor.split(","));
        }
      }
    });

    const unloadingValues = getValues("unloading");

    unloadingValues.reverse().forEach(item => {
      if(item.address && item.cor) {

        const cor = item.cor;
        const isCorArr = Array.isArray(cor);

        if(isCorArr) {
          unloading.push(item.address, ...item.cor);
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
            cargo_id: data?.guid
          }
        }
      },
      {
        onSuccess() {
          setIsCreated(true);
          setLoading(false);
          toast({
            position: "top-right",
            title: isTemplate ? t("Шаблон успешно создан") : t("Груз успешно создан"),
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          if(!isTemplate) {
            router.push(`/${locale}/my-loads`);
          } else {
            handleResetForm();
          }
        }
      }
    );
  }

  const createCargo = useCreateCargoMutation({
    onSuccess:() =>{
      setIsClicked(false);
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
              cargo_id: data?.guid
            }
          }
        },
        {
          onSuccess() {
            setLoading(false);
            toast({
              position: "top-right",
              title: t("Груз успешно обновлен"),
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            router.push(`/${locale}/my-loads`);
          }
        }
      );
      formStore.clearFormData();
      setLoading(false);
    },
    onError() {
      setLoading(false);
    }

  });

  const deleteTemplate = useDeleteCargo({
    onSuccess() {
      toast({
        title: t("Шаблон успешно удален"),
        status: "success"
      });
      handleCloseModal();

      if(isAuth) getTempCargo.refetch();
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

  const getTempCargo = useGetUserCargo(
    {
      data: JSON.stringify(
        {
          users_id: userId,
          cargo_type:["template"],
          with_relations: true
        }
      )
    },
    { enabled: !!userId && !id }
  );

  const updateResponseMutation = useUpdateResponse({
    onSuccess() {
      toast({
        position: "top-right",
        title: t("Груз успешно обновлен"),
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      if(status !== "performed") router.push(`/${locale}/my-loads`);
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

  function handleUploadDocument(link, fileKey) {
    if(fileKey) {
      setValue(fileKey, link);
      updateResponseMutation.mutateAsync({
        data:{
          guid: id,
          [fileKey]: link
        }
      }).then(() => window.location.reload());
    }
  }

  function handleDeleteDocument(fileKey) {
    handleUploadDocument("", fileKey);
  }

  function getEmptyFileName() {
    if(!data) return;
    let key;
    if(!data["file_5"]) key = "file_5";
    else if(!data["file_4"]) key = "file_4";
    else if(!data["file_3"]) key = "file_3";
    else if(!data["file_2"]) key = "file_2";
    else if(!data["file_1"]) key = "file_1";
    return key;
  }

  function onSubmit(data) {
  
    setIsClicked(true);
    console.log("data",data);
    if(!authStore.isAuth) {
      toast({
        position: "top-right",
        title: t("Авторизуйтесь"),
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      router.push(`/${locale}/auth`);
      return;
    }

    setLoading(true);

    // const loadingIds = data.loadings.map(item => item.location.value);
    // const unloadingIds = data.unloading.map(item => item.location.value);

    // loadingIds.splice(0, 1);
    // unloadingIds.splice(0, 1);

    // const addressIds = [...loadingIds, ...unloadingIds];

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
        address_ids: [],
        address_id_2: data.unloading[0].location.value,
        city_id: data.loadings[0].location.guid,
        city_id_2: data.unloading[0].location.guid,
        location_name:data.receipts[0].cor,
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
        photo: data.image?.includes("http") ? data.image : process.env.NEXT_PUBLIC_MEDIA_URL + data.image,
        map_id: data?.payment_type?.value,
        order_status: ["in_moderation"],
        negotiable: data.bargain === "negotiable",
        no_haggling: data.bargain === "no_haggling",
        request: data.bargain === "request",
        tir: data.tir,
        t1: data.t1,
        cmr: data.cmr,
        med: data?.medic_certificate,
        cargo_type: ["cargo"],
        permission: data?.permission?.map(item => item.value),
        distance: Math.floor(distance.distance || 0),
        duration: distance.duration,
        straps_number: data.straps_number,
        hitch: data.hitch,
        pneumatic: data.pneumatic || false,
        bunks: data.bunks || false,
        width: data.width,
        height: data.height,
        length: data.length,
        diameter: data.diameter,
        prepayment_of_fuel: data.prepayment_of_fuel,
        prepayment_interest: data?.prepayment_interest,
        payment_upon_unloading: data?.payment_upon_unloading,
        company_contract: data?.company_contract,
        load_type_id: data?.load_type_id?.value,
        template_name: data?.template_name,
      }
    };

    if(id) {
      requestData.data.guid = id;
      requestData.data.order_status = getCargo.data?.response?.[0]?.order_status;

      updateCargo.mutate(requestData);

    } else {
      if(data.isTemp) {
        requestData.data.cargo_type = ["template"];
      }
      requestData.data.firm_id = authStore.userData.firm_id;
      createCargo.mutate(requestData, {
        onSuccess(data) {
          if(data.isTemp) {
            getTempCargo.refetch();
          }
          handleCloseTemplateModal();
          onCreateCargoSuccess(data);
        }
      });
    }
  }

  function onCancelClick() {
    getOfferCargoById.refetch();
    handleEditToggle();
  }

  function handleSelectTemplate(item) {

    resetForm(item, item.guid);

    if(
      item?.tir ||
      item?.cmr ||
      item?.t1 ||
      item?.medic_certificate
    ) {
      setAccessOpen(true);
    }

    if(
      item?.hitch ||
      item?.pneumatic ||
      item?.bunks
    ) {
      setRequirementOpen(true);
    }

    if(item?.straps_number) {
      setLiftingCapacityOpen(true);
    }

    if(item?.width || item?.height || item?.length || item?.diameter) {
      setBeltsOpen(true);
    }

    if(item?.packages_id_data?.guid || item?.packaging_quantity) {
      setPackagingAndQuantity(true);
    }

    if(item?.width || item?.height || item?.length || item?.diameter) {
      setDimensionsAndDiameter(true);
    }

    if(item?.prepayment_interest || item?.prepayment_of_fuel || item?.payment_upon_unloading) {
      setPrepaymentFuelOpen(true);
    }

    if(item?.company_contract) {
      setDirectContractOpen(true);
    }

    // if(item?.address_ids.length) {
    //   getLoadingMutation.mutate({
    //     data: {
    //       object_ids: [
    //         item?.address_ids
    //       ]
    //     }
    //   });
    // }
    setTemplateId(item?.guid);
    // getMaps.refetch();
    handleCloseModal();
  }

  function handleDeleteTemplate(item) {
    deleteTemplate.mutate({ id: item.guid });
  }

  function getData() {
    switch(status) {
      case "new":
        return getOfferCargoById.data?.response[0];
      case "in_moderation":
        return getCargo.data?.response?.[0];
      case "in_active":
        return getCargo.data?.response?.[0];
      case "active":
        return getCargo.data?.response?.[0];
      default:
        return getOfferCargoById.data?.response[0];
    }
  }

  function handleResetForm () {
    formStore.clearFormData();
    reset(emptyCargoFields);
    setStartDate("");
    setEndDate("");
    setPackagingAndQuantity(false);
    setDimensionsAndDiameter(false);
    setRequirementOpen(false);
    setAccessOpen(false);
    setBeltsOpen(false);
    setLiftingCapacityOpen(false);
    setPrepaymentFuelOpen(false);
    setDirectContractOpen(false);
  }

  function resetForm(data, id) {
    loadingsRef.current = [
      {
        location: {
          value: data?.address_id_data?.guid,
          label: data?.city_id_data?.name + " " + data?.address_id_data?.name,
          guid: data?.city_id_data?.guid,
        },
        search: data?.city_id_data?.name ?? "" + " " + data?.address_id_data?.name,
        address: "",
        cor: []
      }
    ];

    unloadingRef.current = [
      {
        location: {
          value: data?.address_id_2_data?.guid,
          label: data?.city_id_2_data?.name + " " + data?.address_id_2_data?.name,
          guid: data?.city_id_2_data?.guid,
        },
        search: data?.city_id_2_data?.name ?? "" + " " + data?.address_id_2_data?.name,
        address: "",
        cor: []
      }
    ];

    if(data && id) {
      setStartDate(new Date(data?.load_time || new Date()));
      setEndDate(new Date(data?.date || new Date()));
      reset({
        file_1: data.file_1,
        file_2: data.file_2,
        file_3: data.file_3,
        file_4: data.file_4,
        file_5: data.file_5,
        cargo_type: {
          value: data.cargo_type_id_data?.guid,
          label: data.cargo_type_id_data?.name,
        },
        cargo_type_search: data.cargo_type_id_data?.name,
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
        price_after_order: isCargo ? data?.dim_length_special : data?.payment_unloading ?? 0,
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
        permission: Array.isArray(data?.permission) ? data?.permission?.map(item => ({ label: item, value: item })) : [],
        medic_certificate: data?.med,
        tir: data?.tir,
        t1: data?.t1,
        cmr: data?.cmr,
        straps_number: data?.straps_number,
        length: data?.length,
        width: data?.width,
        height: data?.height,
        weight: data?.weight,
        diameter: data?.diameter,
        hitch: data?.hitch,
        pneumatic: data?.pneumatic,
        bunks: data?.bunks || false,
        prepayment_of_fuel: data.prepayment_of_fuel,
        prepayment_interest: data?.prepayment_interest,
        payment_upon_unloading: data?.payment_upon_unloading,
        company_contract: data?.company_contract,
        load_type_id: {
          value: data?.load_type_id_data?.guid,
          label: data?.load_type_id_data?.name,
        }
      });
    }
  }

  useEffect(() => {
    if(getCargo.isSuccess || getOfferCargoById.isSuccess) {

      const data = getData();

      resetForm(data, id);

    }
  }, [getCargo.data, getOfferCargoById.data]);

  useEffect(() => {
    if(id && (getCargo.isSuccess || getOfferCargoById.isSuccess)) {

      // let object_ids = [];

      // if(isCargo) {
      //   object_ids = getCargo.data?.response[0]?.address_ids;
      // } else {
      //   object_ids = getOfferCargoById.data?.response[0]?.address_ids;
      // }

      // if(object_ids.length) {
      //   getLoadingMutation.mutate({ data: { object_ids } });
      // } else {
      // }
      getMaps.refetch();

    }
  }, [id, getCargo.data, getOfferCargoById.data]);

  useEffect(() => {

    if(getMaps.isSuccess) {
      const data = getMaps.data.response;
      const reversedData = data;

      const loadingData = reversedData.pop();

      setTemplateId("");

      loadingsRef.current[0].cor = [loadingData?.lat, loadingData?.long];
      loadingsRef.current[0].address = loadingData?.name;

      reversedData?.forEach((item, index) => {
        if(index === 0) {
          unloadingRef.current[0].cor = [item?.lat, item?.long];
          unloadingRef.current[0].address = item?.name;
          return;
        }
        unloadingRef.current.push({
          cor: [item?.lat, item?.long],
          address: item?.name
        });
      });

      // unloadingRef.current?.forEach((item, index) => {
      //   item.cor = [reversedData?.[index]?.lat, reversedData?.[index]?.long];
      //   item.address = reversedData?.[index]?.name;
      // });

      // unloadingRef.current.push(unloadingRef.current.shift());

      setValue("loadings", loadingsRef.current);
      setValue("unloading", unloadingRef.current);
    }

  }, [getMaps.data]);


  const isFirstRender = useRef(true);

  useEffect(() => {
    if(!isFirstRender.current && (!status || status === "in_moderation") && !isCreated) {
      formStore.setFormData(getValues());
    } else {
      isFirstRender.current = false;
    }

    return () => {
      if(isCreated) {
        formStore.clearFormData();
      }
    };

  }, [getValues(), isCreated]);

  useEffect(() => {
    if(formStore.isNotEmpty) {
      setValue("loadings", formStore.formData.loadings);
      setValue("unloading", formStore.formData.unloading);
      setValue("receipts", formStore.formData.receipts);
    }
  }, []);

  useEffect(() => {
    if(!isFirstRender.current && (!status || status === "in_moderation")) {
      formStore.isPackagingAndQuantity = isPackagingAndQuantity;
      formStore.isDimensionsAndDiameter = isDimensionsAndDiameter;
      formStore.isRequirementOpen = isRequirementOpen;
      formStore.isAccessOpen = isAccessOpen;
      formStore.isBeltsOpen = isBeltsOpen;
      formStore.isLiftingCapacityOpen = isLiftingCapacityOpen;
      formStore.prepaymentFuelOpen = prepaymentFuelOpen;
      formStore.directContractOpen = directContractOpen;
    }
  }, [
    isPackagingAndQuantity,
    isDimensionsAndDiameter,
    isRequirementOpen,
    isAccessOpen,
    isBeltsOpen,
    isLiftingCapacityOpen,
    prepaymentFuelOpen,
    directContractOpen,
    status,
  ]);

  useEffect(() => {
    if(formStore.isNotEmpty && (!status || status === "in_moderation")) {
      reset(formStore.formData);
    }

    if(status && status !== "in_moderation") {
      formStore.clearFormData();
    }

    if(status) {
      return () => {
        formStore.clearFormData();
      };
    }
  }, [formStore.isNotEmpty]);

  useEffect(() => {

    if(!isFirstRender.current && (!status || status === "in_moderation")) {
      formStore.startDate = startDate;
      formStore.endDate = endDate;
    }

  }, [startDate, endDate]);

  const data = getData();

  return {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    onSubmit,
    isClicked,
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
    address1: data?.address_id_data?.["name_" + (locale === "uz" ? "en" : locale)],
    address2: data?.address_id_2_data?.["name_" + (locale === "uz" ? "en" : locale)],
    city1: data?.city_id_data?.["name_" + (locale === "uz" ? "en" : locale)],
    city2: data?.city_id_2_data?.["name_" + (locale === "uz" ? "en" : locale)],
    userName: data?.users_id_2_data?.full_name,
    phoneNumber: data?.users_id_2_data?.phone,
    rating: data?.users_id_2_data?.rating,
    proposedAmount: data?.driver_cash,
    transportModel: data?.short_name,
    canEdit,
    handleEditToggle,
    isDirty: isDirty || isPhotoChanged,
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
    handleOpenModal,
    handleCloseModal,
    handleSelectTemplate,
    isOpen,
    templates: getTempCargo.data?.response ?? [],
    handleDeleteTemplate,
    distance: data?.distance,
    isRequirementOpen,
    setRequirementOpen,
    isAccessOpen,
    setAccessOpen,
    isBeltsOpen,
    setBeltsOpen,
    isLiftingCapacityOpen,
    setLiftingCapacityOpen,
    isPackagingAndQuantity,
    setPackagingAndQuantity,
    isDimensionsAndDiameter,
    setDimensionsAndDiameter,
    prepaymentFuelOpen,
    setPrepaymentFuelOpen,
    directContractOpen,
    setDirectContractOpen,
    userId2: data?.users_id_2,
    setIsPhotoChanged,
    isAcceptRejectLoading: updateResponseMutation.isPending,
    loadingOptions,
    handleOpenTemplateModal,
    handleCloseTemplateModal,
    isTemplateModalOpen,
    handleUploadDocument,
    handleDeleteDocument,
    getEmptyFileName,
  };
};
