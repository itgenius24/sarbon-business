import React, { useEffect, useMemo, useState } from 'react'
import { useAddCargoContext } from '../../providers';
import { useGetCargoType, useGetMeasurement } from '@/services/api';
import { fileUpload } from '@/services/fileUpload';

const useStepOneProps = () => {
  const {
    control,
    errors,
    register,
    setValue,
    watch,
    canEdit,
    isEditing,
    isPackagingAndQuantity,
    setPackagingAndQuantity,
    isDimensionsAndDiameter,
    setDimensionsAndDiameter,
    isFileUploader,setIsFileUploader,
    loadingOptions,
  } = useAddCargoContext();
  const [searchCargo, setSearchCargo] = useState("");
  const [img,setImg] = useState("")
  const [offset, setOffset] = useState(0);
  const [refesh, setRefesh] = useState(0);
  const [getCargoData,setGetCargoData] = useState([]);

  const getCargoTypes = useGetCargoType({
    params: {
      offset: offset,
      limit: 40,
      data: JSON.stringify({}),
    },
    querySettings: {
      enabled: true,
    },
  });

  useEffect(() => {

    if (getCargoTypes?.data?.response?.length === 40) {
      setOffset(offset + 40);
      setRefesh(refesh + 1);
      const data = getCargoTypes?.data?.response?.map((item) => ({
        label: item?.name,
        value: item?.guid,
      }));
      setGetCargoData((res) => [
        ...res,
        ...data
      ]);
    } else {
      setRefesh(0);
      if(getCargoTypes?.data?.response){
        const data = getCargoTypes?.data?.response?.map((item) => ({
          label: item?.name,
          value: item?.guid,
        }));
        setGetCargoData((res) => [
          ...res,
          ...data
        ]);
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
    setPackagingAndQuantity(prevState => !prevState);
  };

  const handleDimensionsAndDiameter = () => {
    setDimensionsAndDiameter(prevState => !prevState);
  };

  const handleIsFileUploader = () => {
    setIsFileUploader(prevState => !prevState);
  };

  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    setImg(result?.link);
  };

  const getMeasurement = useGetMeasurement();
  const weightMeasurementOptions = getMeasurement.data?.response
    ?.filter((item) => !item?.base_unit.includes("meter"))
    ?.map((item) => ({ label: item.Symbol, value: item.guid }));


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
    setImg,img,
    optionCargoType,
    handleImageUpload
  }
}

export default useStepOneProps
