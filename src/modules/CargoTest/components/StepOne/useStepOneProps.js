import React, { useEffect, useMemo, useState } from "react";
import { useAddCargoContext } from "../../providers";
import {
  useCreateCargoMutation,
  useGetCargoType,
  useGetMeasurement,
  useGetPackage,
  useUpdateCargo,
} from "@/services/api";
import { fileUpload } from "@/services/fileUpload";
import { useGetLang } from "@/hooks/useGetLang";

const useStepOneProps = () => {
  const {
    control,
    errors,
    register,
    setError,
    setValue,
    watch,
    canEdit,
    isEditing,
    status,
    isPackagingAndQuantity,
    setPackagingAndQuantity,
    isDimensionsAndDiameter,
    setDimensionsAndDiameter,
    isFileUploader,
    setIsFileUploader,
    handleResetForm,
  } = useAddCargoContext();
  const [searchCargo, setSearchCargo] = useState("");
  const [img, setImg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [offset, setOffset] = useState(0);
  const [refesh, setRefesh] = useState(0);
  const [getCargoData, setGetCargoData] = useState([]);
  const locale = useGetLang();

  useEffect(() => {
    if (
      watch("cargo_type")?.label &&
      watch("weight_measurement") &&
      watch("volume_measurement")
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    watch("cargo_type")?.label,
    watch("weight_measurement")?.length,
    watch("volume_measurement")?.length,
  ]);

  const getCargoTypes = useGetCargoType({
    params: {
      offset: offset,
      limit: 40,
      data: JSON.stringify({}),
    },
    querySettings: {
      enabled: true,
      select: (res) =>
        res?.response?.map((item) => ({
          ...item,
          name: item[`name_${locale}`] ? item[`name_${locale}`] : item?.name,
        })),
    },
  });

  console.log(`getCargoTypes`,getCargoTypes)

  useEffect(() => {
    if (getCargoTypes?.data?.length === 40) {
      setOffset(offset + 40);
      setRefesh(refesh + 1);
      const data = getCargoTypes?.data?.map((item) => ({
        label: item?.name,
        value: item?.guid,
      }));
      setGetCargoData((res) => [...res, ...data]);
    } else {
      setRefesh(0);
      if (getCargoTypes?.data) {
        const data = getCargoTypes?.data?.map((item) => ({
          label: item?.name,
          value: item?.guid,
        }));
        setGetCargoData((res) => [...res, ...data]);
      }
    }
  }, [!getCargoTypes.isSuccess, refesh]);

  const optionCargoType = useMemo(() => {
    if (searchCargo) {
      return getCargoData?.filter((item) =>
        item?.label?.toLowerCase()?.includes(searchCargo.toLowerCase())
      );
    } else {
      return getCargoData;
    }
  }, [searchCargo, getCargoData]);

  const handlePackagingAndQuantity = () => {
    setPackagingAndQuantity((prevState) => !prevState);
  };

  const handleDimensionsAndDiameter = () => {
    setDimensionsAndDiameter((prevState) => !prevState);
  };

  const handleIsFileUploader = () => {
    setIsFileUploader((prevState) => !prevState);
  };

  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    // setValue("image", result?.link);
    setValue("image", process.env.NEXT_PUBLIC_MEDIA_URL + result?.link);
  };
  function imageLoader() {
    return watch("image")?.includes("http")
      ? watch("image")
      : process.env.NEXT_PUBLIC_MEDIA_URL + watch("image");
  }

  const getMeasurement = useGetMeasurement();
  const getPackages = useGetPackage();
  const weightMeasurementOptions = getMeasurement.data?.response
    ?.filter((item) => !item?.base_unit.includes("meter"))
    ?.map((item) => ({ label: item.Symbol, value: item.guid }));

  const packageOptions = getPackages.data?.response?.map((item) => ({
    label: item?.name,
    value: item?.guid,
  }));
  const createCargo = useCreateCargoMutation({
    onSuccess: () => {
      // setIsClicked(false);
    },
    onError() {
      // setLoading(false);
    },
  });

  const updateCargo = useUpdateCargo({
    onSuccess: () => {
      setValue(`cargoIndex`, 2);
    },
  });

  const onSubmit = () => {
    console.log(!watch(`loadResId`));
    if (
      watch(`cargo_type`)?.value &&
      watch(`weight_measurement`) &&
      watch("volume_measurement")
    ) {
      setValue(`cargoIndex`, 2);

      // const requestData = {
      //   data: {
      //     cargo_type_id: watch(`cargo_type`)?.value,
      //     weight: +watch(`weight_measurement`),
      //     measurement_id: watch(`weight_unit`)?.value,
      //     volume_m3: +watch(`volume_measurement`),
      //     packages_id: watch(`packaging`)?.value || "",
      //     package_quantity: +watch(`packaging_quantity`) || 0,
      //     length: +watch(`length`),
      //     width: watch(`width`),
      //     height: +watch(`height`),
      //     photo: watch(`image`),
      //     guid: watch(`loadResId`) ? watch(`loadResId`) : undefined,
      //     order_status: watch(`loadResId`)
      //       ? [watch(`order_status`)?.value]
      //       : ["in_moderation"],
      //   },
      // };

      // if (!watch(`loadResId`)) {
      //   console.log(`(!watch(loadResId)`,watch(`loadResId`))
      //   createCargo.mutate(requestData, {
      //     onSuccess(requestData) {
      //       console.log(`(!watch(loadResId)`,requestData)
      //       // setValue("loadResId", requestData?.guid);
      //        setValue(`cargoIndex`,2)
      //       // if (data.isTemp) {
      //       // getTempCargo.refetch();
      //       // }
      //       // handleCloseTemplateModal();
      //       // onCreateCargoSuccess(data);
      //     },
      //   });
      // }

      // else {
      //   updateCargo.mutate(requestData,{
      //     onSuccess(requestData) {
      //     //  setValue(`cargoIndex`,2)

      //       console.log(`requestData`,requestData)

      //     },
      //   });
      // }
    } else {
      if (watch(`cargo_type`)?.value) {
        setError(`cargo_type`);
      }
      if (watch(`weight_measurement`)) {
        setError(`weight_measurement`);
      }
      if (watch(`volume_measurement`)) {
        setError(`volume_measurement`);
      }
    }
  };

  return {
    control,
    errors,
    register,
    setValue,
    watch,
    setSearchCargo,
    weightMeasurementOptions,
    isPackagingAndQuantity,
    isDimensionsAndDiameter,
    isFileUploader,
    handleIsFileUploader,
    handleDimensionsAndDiameter,
    handlePackagingAndQuantity,
    setImg,
    img,
    imageLoader,
    optionCargoType,
    handleImageUpload,
    packageOptions,
    onSubmit,
    disabledBtn: disabled,
    canEdit,
    handleResetForm,
  };
};

export default useStepOneProps;
