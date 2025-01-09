import * as yup from "yup";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
  useSendNotification,
  useUpdateCargo,
  useUpdateResponse,
} from "@/services/api";
import { yupResolver } from "@/utils/yupResolver";
import authStore from "@/store/auth.store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "@/app/i18n/client";
import { useGetDistance } from "@/hooks/useGetDistance";
import formStore from "@/store/form.store";
import { useGetLang } from "@/hooks/useGetLang";
import { findChangedLogs } from "@/utils/findChangedLogs";

export const useAddCargoProps = ({ id, status, locale, setCargoIndex }) => {
  const searchParams = useSearchParams();

  console.log(`status`, status);

  const pathname = usePathname();

  const isAuth = authStore.isAuth;

  const [isPackagingAndQuantity, setPackagingAndQuantity] = useState(
    formStore.isPackagingAndQuantity
  );
  const [isDimensionsAndDiameter, setDimensionsAndDiameter] = useState(
    formStore.isDimensionsAndDiameter
  );

  const [isFileUploader, setIsFileUploader] = useState(
    formStore.isFileUploader
  );

  const [isCreated, setIsCreated] = useState(false);

  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const [isRequirementOpen, setRequirementOpen] = useState(
    formStore.isRequirementOpen
  );
  const [isAccessOpen, setAccessOpen] = useState(formStore.isAccessOpen);
  const [isBeltsOpen, setBeltsOpen] = useState(formStore.isBeltsOpen);
  const [isLiftingCapacityOpen, setLiftingCapacityOpen] = useState(
    formStore.isLiftingCapacityOpen
  );

  const [prepaymentFuelOpen, setPrepaymentFuelOpen] = useState(
    formStore.prepaymentFuelOpen
  );
  const [isFtlOpen, setIsFtlOpen] = useState(formStore.isFtlOpen);
  const [isReymenOpen, setIsReymenOpen] = useState(formStore.isReymenOpen);

  const [directContractOpen, setDirectContractOpen] = useState(
    formStore.directContractOpen
  );

  const isCargo =
    status === "active" || status === "in_moderation" || status === "in_active";

  const { t } = useTranslation(locale, "translations");

  const [isOpen, setIsOpen] = useState(false);

  const userId = authStore.userData.id;

  const loadingsRef = useRef([]);
  const unloadingRef = useRef([]);

  const [startDate, setStartDate] = useState(
    formStore.startDate ? new Date(formStore.startDate) : ""
  );
  const [endDate, setEndDate] = useState(
    formStore.endDate ? new Date(formStore.endDate) : ""
  );

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(!id);
  const [canEditActive, setCanEditActive] = useState(!id);
  const [temlateVal, setTemplateVal] = useState();
  const [templateId, setTemplateId] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState({});
  const [check, setCheck] = useState();
  const [mone, setMoney] = useState({});

  const router = useRouter();

  const toast = useToast();

  useEffect(() => {
    if (searchParams.get("isFirst") !== "true") {
      router.push(pathname + "?isFirst=true");
      router.refresh();
    }
  }, []);

  function handleEditToggle() {
    setCanEdit(!canEdit);
  }

  function handleEditActiveToggle() {
    setCanEditActive(true);
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
    if (isAuth) {
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
    loadings: [
      {
        location: {
          value: "",
          label: "",
        },
        address: "",
        cor: [],
      },
    ],
    unloading: [
      {
        location: {
          value: "",
          label: "",
        },
        address: "",
        cor: [],
      },
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
    },
  };

  const schema = yup.object({
    contact: yup
      .string()
      .required()
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Некорректный номер телефона"
      ),
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
    prepayment_percent: yup
      .number()
      .max(100, "Максимальное значение 100")
      .min(0, "Минимальное значение 0")
      .typeError("Должно быть числом"),
  });
  // .required("Обязательное поле");

  const {
    register,
    control,
    setError,
    setValue,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      loadings: [
        {
          location: {
            value: "",
            label: "",
          },
          address: "",
          cor: "",
        },
      ],
      unloading: [
        {
          location: {
            value: "",
            label: "",
          },
          address: "",
          cor: "",
        },
      ],
    },
  });

  // const {
  //   fields: loadings,
  //   append: appendLoading,
  //   remove: removeLoading,
  //   update: updateLoading,
  // } = useFieldArray({
  //   control,
  //   name: "loadings",
  //   // rules: { minLength: 1, }
  // });

  // const {
  //   fields: unloading,
  //   append: appendUnloading,
  //   remove: removeUnloading,
  //   update: updateUnloading,
  // } = useFieldArray({
  //   control,
  //   name: "unloading",
  // });

  const getLoadings =
    (Array.isArray(watch("loadings")?.[0]?.cor)
      ? watch("loadings")?.map((item) => item?.cor)
      : watch("loadings")?.map((item) => item?.cor?.split(","))) || [];
  const getUnloading =
    (Array.isArray(watch("unloading")?.[0]?.cor)
      ? watch("unloading")?.map((item) => item?.cor)
      : watch("unloading")?.map((item) => item?.cor?.split(","))) || [];

  const distance = useGetDistance({
    referencePoints: [...getLoadings, ...getUnloading],
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
      router.push(`/${locale}/my-loads`);
    },
    onError(res) {
      console.error(res);
    },
  });

  const getCargo = useGetCargoById(
    {
      data: JSON.stringify({
        guid: id,
        with_relations: true,
      }),
    },
    { enabled: !!(isCargo && id) }
  );

  const getOfferCargoById = useGetOfferById(
    {
      data: JSON.stringify({
        guid: id,
        with_relations: true,
      }),
    },
    { enabled: !!(userId && !isCargo) }
  );

  const getTempCargo = useGetUserCargo(
    {
      data: JSON.stringify({
        users_id: userId,
        cargo_type: ["template"],
        with_relations: true,
      }),
    },
    { enabled: !!userId && !id }
  );

  const allCargoParams = { cargo_id: id };

  const allResponseParams = {
    cargo_id: getOfferCargoById.data?.response[0]?.cargo_id,
  };

  const templateParams = { cargo_id: templateId };

  const isAllCargo =
    status === "active" || status === "in_moderation" || status === "in_active";

  const getMaps = useGetMaps(
    {
      data: JSON.stringify(
        id ? (isAllCargo ? allCargoParams : allResponseParams) : templateParams
      ),
    },
    { enabled: !!templateId }
  );

  // console.log("getMaps222", getMaps?.data);
  const getLoadingMutation = useGetLoadingMutation({
    onSuccess(data) {
      if (data.response?.length > 2) {
        unloadingRef.current = [
          ...unloadingRef.current,
          ...data.response.map((item) => ({
            location: {
              value: item?.guid,
              label: item?.name,
            },
            address: "",
            search: item?.name,
            cor: [],
          })),
        ];
      }

      getMaps.refetch();
    },
  });

  const createAddress = useCreateAddressMutation({
    onError() {
      setLoading(false);
    },
  });

  const getLoadingTypes = useLoadingTypes();

  const loadingOptions = getLoadingTypes.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));

  function onCreateCargoSuccess(data) {
    const isTemplate = data.cargo_type[0] === "template";

    let loadingsData = [];
    let unloading = [];

    getValues("loadings").forEach((item) => {
      if (item.address && item.cor) {
        const cor = item.cor;
        const isCorArr = Array.isArray(cor);

        if (isCorArr) {
          loadingsData.push(item.address, ...item.cor);
        } else {
          loadingsData.push(item.address, ...item.cor.split(","));
        }
      }
    });

    const unloadingValues = getValues("unloading");

    unloadingValues.reverse().forEach((item) => {
      if (item.address && item.cor) {
        const cor = item.cor;
        const isCorArr = Array.isArray(cor);

        if (isCorArr) {
          unloading.push(item.address, ...item.cor);
        } else {
          unloading.push(item.address, ...item.cor.split(","));
        }
      }
    });

    console.log(`!canEdit`, !canEdit);

    // if(canEdit){
    //   router.push(`/${locale}/my-loads`);
    // }else{
    createAddress.mutate(
      {
        data: {
          object_data: {
            name: loadingsData.concat(unloading),
            cargo_id: data?.guid,
          },
        },
      },
      {
        onSuccess() {
          setIsCreated(true);
          setLoading(false);
          toast({
            position: "top-right",
            title: isTemplate
              ? t("Шаблон успешно создан")
              : t("Груз успешно создан"),
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          if (!isTemplate) {
            router.push(`/${locale}/my-loads`);
          } else {
            handleResetForm();
          }
        },
      }
    );
    // }
  }

  const { mutate: sendNotification } = useSendNotification();

  const createCargo = useCreateCargoMutation({
    onSuccess: () => {
      setIsClicked(false);
    },
    onError() {
      setLoading(false);
    },
  });

  const updateCargo = useUpdateCargo({
    onSuccess(data) {
      let loadingsData = watch(`loadings`).map((item, index) => ({
        address: item?.address,
        date: new Date(item.from_date),
        lat: item?.cor.split(" ")[0],
        long: item?.cor.split(" ")[1],
        guid: item?.guid,
        step: index + 1,
        type: ["shipper"],
        expectations: +item.loading_num || 0,
      }));
      let unloadinData = watch(`unloading`).map((item, index) => ({
        address: item?.address,
        date: new Date(item.to_date),
        lat: item?.cor.split(" ")[0],
        long: item?.cor.split(" ")[1],
        step: index + 1,
        type: ["consignee"],
        guid: item?.guid,
      }));

      if (watch(`period_ids`)?.length > 0) {
        createAddress.mutate(
          {
            data: {
              object_data: {
                period_ids: watch(`period_ids`),
                name: loadingsData
                  .concat(unloadinData)
                  .filter((item) => watch(`period_ids`).includes(item.guid)),
                cargo_id: data?.guid,
              },
            },
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
            },
          }
        );
      } else {
        router.push(`/${locale}/my-loads`);
      }
      formStore.clearFormData();
      setLoading(false);
    },
    onError() {
      setLoading(false);
    },
  });

  const deleteTemplate = useDeleteCargo({
    onSuccess() {
      toast({
        title: t("Шаблон успешно удален"),
        status: "success",
      });
      handleCloseModal();

      if (isAuth) getTempCargo.refetch();
    },
  });

  const updateResponseMutation = useUpdateResponse({
    onSuccess() {
      toast({
        position: "top-right",
        title: t("Груз успешно обновлен"),
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      if (status !== "performed") router.push(`/${locale}/my-loads`);
    },
    onError(res) {
      console.error(res);
    },
  });

  function handleDelete() {
    deleteCargo.mutate({ id });
  }

  function handleCancel() {
    updateResponseMutation.mutate({
      data: {
        guid: id,
        provisions: ["cancellation"],
      },
    });
  }

  function handleAccept() {
    updateResponseMutation.mutate({
      data: {
        guid: id,
        response_status: ["approve_from_driver"],
      },
    });
  }

  function handleUploadDocument(link, fileKey) {
    if (fileKey) {
      setValue(fileKey, link);
      updateResponseMutation
        .mutateAsync({
          data: {
            guid: id,
            [fileKey]: link,
          },
        })
        .then(() => window.location.reload());
    }
  }

  function handleDeleteDocument(fileKey) {
    handleUploadDocument("", fileKey);
  }

  function getEmptyFileName() {
    if (!data) return;
    let key;
    if (!data["file_5"]) key = "file_5";
    else if (!data["file_4"]) key = "file_4";
    else if (!data["file_3"]) key = "file_3";
    else if (!data["file_2"]) key = "file_2";
    else if (!data["file_1"]) key = "file_1";
    return key;
  }

  const updateStatus = () => {
    const data = {
      order_status: watch(`order_status`)?.value
        ? [watch(`order_status`)?.value]
        : ["in_moderation"],
      guid: id,
      updated_time:new Date()
    };

    updateCargo.mutate({ data });
  };
  const getTrueKeys = (obj) => {
    return Object.keys(obj).filter((key) => obj[key] === true);
  };
  function onSubmit(datae) {
    setIsClicked(true);
    if (!authStore.isAuth) {
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

    const requestData = {
      data: {
        cargo_type_id: watch(`cargo_type`)?.value,
        weight: +watch(`weight_measurement`),
        measurement_id: watch(`weight_unit`)?.value,
        volume_m3: +watch(`volume_measurement`),
        packages_id: watch(`packaging`)?.value || "",
        package_quantity: +watch(`packaging_quantity`) || 0,
        length: +watch(`length`),
        width: watch(`width`),

        car_type: watch("car_type")?.label,
        product_type: watch(`cargo_type`)?.label,

        height: +watch(`height`),
        photo: watch(`image`),
        // guid: watch(`loadResId`) ? watch(`loadResId`) : undefined,
        order_status: watch(`order_status`)?.value
          ? [watch(`order_status`)?.value]
          : ["in_moderation"],
        // guid: watch(`loadResId`),
        vehicle_type_id: watch("car_type")?.value,
        number_of_cars: watch("transport_count"),
        accepted_offers: watch("transport_count"),
        tir: watch("tir"),
        t1: watch("t1"),
        cmr: watch("cmr"),
        med: watch(`medic_certificate`),
        straps_number: watch("straps_number"),
        hitch: watch("hitch") || false,
        pneumatic: watch("pneumatic") || false,
        bunks: watch("bunks") || false,
        // guid: watch(`loadResId`),
        money_code: check ? getTrueKeys(mone) : undefined,
        bid_cash: check ? undefined : +watch("price"),
        prepayment_percentage: check ? undefined : +watch(`price_prepayment`),
        dim_length_special: check ? undefined : watch("price_after_order"),
        payment_description: check ? undefined : watch("payment_description"),
        currency_id: check ? undefined : watch("price_prepayment_unit").value,
        map_id: check ? undefined : watch("payment_type")?.value,
        map_id_2: check ? undefined : watch("payment_type_1")?.value,
        map_id_3: check ? undefined : watch("payment_type_2")?.value,

        take_all_unloads: watch(`is_ftl`),
        load_around_the_clock: watch(`is_ltl`),
        payment_type: watch("payment_type")?.label,

        // guid: watch(`loadResId`),

        load_time: getValues("loadings")[0].from_date || new Date(),
        date:
          new Date(
            getValues("unloading")[getValues("unloading").length - 1].to_date
          ) || new Date(),
        phone: watch(`contact`),
        comment: watch(`note`),
        cargo_type: ["cargo"],

        template_name: watch(`template_name`),
        country_code_from: watch(`country_code_from`),
        country_code_to: watch(`country_code_to`),
        from: watch(`loadings`)?.[0].address,
        to: watch(`unloading`)[watch(`unloading`).length - 1].address,
      },
    };

    if (id) {
      requestData.data.guid = id;

      updateCargo.mutate(requestData);
    } else {
      if (data.isTemp) {
        requestData.data.cargo_type = ["template"];
      }
      requestData.data.firm_id = authStore.userData.firm_id;

      createCargo.mutate(requestData, {
        onSuccess(data) {
          if (data.isTemp) {
            getTempCargo.refetch();
          }
          handleCloseTemplateModal();
          onCreateCargoSuccess(data);
        },
      });
    }
  }

  function onCancelClick() {
    getOfferCargoById.refetch();
    handleEditToggle();
    handleEditActiveToggle();
  }

  function handleSelectTemplate(item) {
    setValue("loadResId", item.guid);
    console.log(`load`, item);

    resetForm(item, item.guid);
    setValue(`cargoIndex`, 1);
    setCargoIndex(5);

    if (item?.tir || item?.cmr || item?.t1 || item?.medic_certificate) {
      setAccessOpen(true);
    }

    if (item?.hitch || item?.pneumatic || item?.bunks) {
      setRequirementOpen(true);
    }

    if (item?.straps_number) {
      setLiftingCapacityOpen(true);
    }

    if (item?.width || item?.height || item?.length || item?.diameter) {
      setBeltsOpen(true);
    }

    if (item?.packages_id_data?.guid || item?.packaging_quantity) {
      setPackagingAndQuantity(true);
    }

    if (item?.width || item?.height || item?.length || item?.diameter) {
      setDimensionsAndDiameter(true);
    }

    if (
      item?.prepayment_interest ||
      item?.prepayment_of_fuel ||
      item?.payment_upon_unloading
    ) {
      setPrepaymentFuelOpen(true);
    }

    if (item?.company_contract) {
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
    switch (status) {
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

  function handleResetForm() {
    formStore.clearFormData();
    reset(emptyCargoFields);
    setStartDate("");
    setEndDate("");
    setPackagingAndQuantity(false);
    setDimensionsAndDiameter(false);
    setRequirementOpen(false);
    setAccessOpen(false);
    setIsFtlOpen(false);
    setIsReymenOpen(false);
    setBeltsOpen(false);
    setLiftingCapacityOpen(false);
    setPrepaymentFuelOpen(false);
    setDirectContractOpen(false);
    setValue(`cargoIndex`, 1);
    setValue(`money_code`, undefined);
    setCheck(false);
  }

  function resetForm(data, id) {
    loadingsRef.current = [
      {
        location: {
          value: data?.address_id_data?.guid,
          label: data?.city_id_data?.name + " " + data?.address_id_data?.name,
          guid: data?.city_id_data?.guid,
        },
        search:
          data?.city_id_data?.name ?? "" + " " + data?.address_id_data?.name,
        address: "",
        cor: [],
      },
    ];

    unloadingRef.current = [
      {
        location: {
          value: data?.address_id_2_data?.guid,
          label:
            data?.city_id_2_data?.name + " " + data?.address_id_2_data?.name,
          guid: data?.city_id_2_data?.guid,
        },
        search:
          data?.city_id_2_data?.name ??
          "" + " " + data?.address_id_2_data?.name,
        address: "",
        cor: [],
      },
    ];

    if (data && id) {
      setStartDate(new Date(data?.load_time || new Date()));
      setEndDate(new Date(data?.date || new Date()));
      if (data?.money_code) {
        setCheck(true);
      }
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
        order_status:
          data.order_status?.[0] === `in_active`
            ? { label: t(`Не активен`), value: `in_active` }
            : data.order_status?.[0] === `active`
            ? { label: t(`Активный`), value: `active` }
            : { label: t(`В модерации:`), value: `in_moderation` },
        transport_count: data.number_of_cars,
        is_ftl: data.take_all_unloads ?? false,
        is_ltl: data.load_around_the_clock ?? false,
        capacity: data.load_capacity ?? "",
        price: data.bid_cash,
        price_prepayment: data.prepayment_percentage,
        payment_description: data?.payment_description,
        prepayment: data.prepayment_percentage > 0 ? true : false,
        price_after_order: isCargo
          ? data?.dim_length_special
          : data?.payment_unloading ?? 0,
        price_prepayment_unit: {
          label:
            status === "new"
              ? data.dim_height_special?.name
              : data.currency_id_data?.name,
          value:
            status === "new"
              ? data.dim_height_special?.guid
              : data.currency_id_data?.guid,
        },
        payment_deadline: data.payment_within_days ?? "",
        contact: data.phone,
        note: data.comment,
        image: data.photo,
        payment_type: {
          label: data?.map_id_data?.payment_type,
          value: data?.map_id_data?.guid,
        },
        payment_type_1: {
          label: data?.map_id_2_data?.payment_type,
          value: data?.map_id_2_data?.guid,
        },
        payment_type_2: {
          label: data?.map_id_3_data?.payment_type,
          value: data?.map_id_3_data?.guid,
        },
        bargain: data.request
          ? "request"
          : data.negotiable
          ? "negotiable"
          : "no_haggling",
        permission: Array.isArray(data?.permission)
          ? data?.permission?.map((item) => ({ label: item, value: item }))
          : [],
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
        as_soon_as_a: data?.as_soon_as_a,
        as_soon_as_b: data?.as_soon_as_b,
        load_type_id: {
          value: data?.load_type_id_data?.guid,
          label: data?.load_type_id_data?.name,
        },
        money_code: data?.money_code,
      });
    }
  }


  useEffect(() => {
    if (getCargo.isSuccess || getOfferCargoById.isSuccess) {
      const data = getData()?.cargo_id_data
        ? getData()?.cargo_id_data
        : getData();
      console.log(`data2222`, data);
      resetForm(data, id);
    }
  }, [getCargo.data, getOfferCargoById.data]);

  useEffect(() => {
    if (id && (getCargo.isSuccess || getOfferCargoById.isSuccess)) {
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
    if (getMaps.isSuccess) {
      const data = getMaps.data.response;
      const reversedData = data;
      setTemplateId("");

      const shipper = reversedData.filter(
        (item) => item.type?.[0] === `shipper`
      );

      const consignee = reversedData.filter(
        (item) => item?.type?.[0] === `consignee`
      );
      setValue(`staticArrayAderss`, shipper.concat(consignee));
      shipper
        ?.sort((a, b) => a?.step - b?.step)
        ?.forEach((item, index) => {
          setValue(`loadings.${[index]}`, {
            cor: `${item.lat} ${item.long}`,
            address: item?.name,
            from_date: item?.date,
            guid: item.guid,
            loading_num: {
              value: item?.expectations,
              label: item?.expectations,
            },
          });
        });

      consignee
        .sort((a, b) => a?.step - b?.step)
        ?.forEach((item, index) => {
          setValue(`unloading.${[index]}`, {
            cor: `${item.lat} ${item.long}`,
            address: item?.name,
            to_date: item?.date,
            guid: item.guid,
          });
        });
    }
  }, [getMaps.isSuccess]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (
      !isFirstRender.current &&
      (!status || status === "in_moderation") &&
      !isCreated
    ) {
      formStore.setFormData(getValues());
    } else {
      isFirstRender.current = false;
    }

    return () => {
      if (isCreated) {
        formStore.clearFormData();
      }
    };
  }, [getValues(), isCreated]);

  useEffect(() => {
    if (formStore.isNotEmpty) {
      setValue("loadings", formStore.formData.loadings);
      setValue("unloading", formStore.formData.unloading);
      setValue("receipts", formStore.formData.receipts);
    }
  }, []);

  useEffect(() => {
    if (!isFirstRender.current && (!status || status === "in_moderation")) {
      formStore.isPackagingAndQuantity = isPackagingAndQuantity;
      formStore.isDimensionsAndDiameter = isDimensionsAndDiameter;
      formStore.isFileUploader = isFileUploader;
      formStore.isRequirementOpen = isRequirementOpen;
      formStore.isAccessOpen = isAccessOpen;
      formStore.isBeltsOpen = isBeltsOpen;
      formStore.isFtlOpen = isFtlOpen;
      formStore.isReymenOpen = isReymenOpen;
      formStore.isLiftingCapacityOpen = isLiftingCapacityOpen;
      formStore.prepaymentFuelOpen = prepaymentFuelOpen;
      formStore.directContractOpen = directContractOpen;
    }
  }, [
    isPackagingAndQuantity,
    isDimensionsAndDiameter,
    isFileUploader,
    isRequirementOpen,
    isAccessOpen,
    isBeltsOpen,
    isFtlOpen,
    isReymenOpen,
    isLiftingCapacityOpen,
    prepaymentFuelOpen,
    directContractOpen,
    status,
  ]);

  useEffect(() => {
    if (formStore.isNotEmpty && (!status || status === "in_moderation")) {
      reset(formStore.formData);
    }

    if (status && status !== "in_moderation") {
      formStore.clearFormData();
    }

    if (status) {
      return () => {
        formStore.clearFormData();
      };
    }
  }, [formStore.isNotEmpty]);

  useEffect(() => {
    if (!isFirstRender.current && (!status || status === "in_moderation")) {
      formStore.startDate = startDate;
      formStore.endDate = endDate;
    }
  }, [startDate, endDate]);

  const data = getData()?.cargo_id_data ? getData()?.cargo_id_data : getData();
  const tempalteData = useMemo(() => {
    if (temlateVal) {
      return getTempCargo?.data?.response?.filter((item) =>
        item?.template_name?.includes(temlateVal)
      );
    } else {
      return getTempCargo.data?.response;
    }
  }, [temlateVal, getTempCargo.data?.response]);


  return {
    register,
    control,
    setError,
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
    cargoData: getData(),
    order_status: status === `active` ? data?.order_status : ``,
    address1: data?.from
      ? data?.from
      : data?.address_id_data?.["name_" + (locale === "uz" ? "en" : locale)],

    address2: data?.to
      ? data?.to
      : data?.address_id_2_data?.["name_" + (locale === "uz" ? "en" : locale)],
    city1: data?.city_id_data?.["name_" + (locale === "uz" ? "en" : locale)],
    city2: data?.city_id_2_data?.["name_" + (locale === "uz" ? "en" : locale)],
    userName: data?.users_id_2_data?.full_name,
    phoneNumber: data?.users_id_2_data?.phone,
    rating: data?.users_id_2_data?.rating,
    proposedAmount: data?.driver_cash,
    transportModel: data?.short_name,
    canEdit,
    getMaps,
    canEditActive,
    handleEditToggle,
    handleEditActiveToggle,
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
    templates: tempalteData,
    handleDeleteTemplate,
    distance: data?.distance,
    isRequirementOpen,
    setRequirementOpen,
    isAccessOpen,

    setAccessOpen,
    isFtlOpen,
    isReymenOpen,
    setIsFtlOpen,
    setIsReymenOpen,
    isBeltsOpen,
    setBeltsOpen,
    isLiftingCapacityOpen,
    setLiftingCapacityOpen,
    isPackagingAndQuantity,
    setPackagingAndQuantity,
    isDimensionsAndDiameter,
    isFileUploader,
    setIsFileUploader,
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
    setTemplateVal,
    setLoad,
    load,
    mone,
    setMoney,
    check,
    getTrueKeys,
    setCheck,
    loadings: watch(`loadings`),
    updateStatus,
    // appendLoading,
    // removeLoading,
    // updateLoading,
    unloading: watch(`unloading`),
    // appendUnloading,
    // removeUnloading,
    // updateUnloading,
  };
};
