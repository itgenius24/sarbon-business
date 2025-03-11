"use client";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetUserData } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


export const useMyDispatcher = () => {
  const router = useRouter()
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const [search, setSearch] = useState(``);
  const [valueR, setValueR] = useState(`val1`);

  const option = [
    {
      value: `val1`,
      label: t(`Активные`) + ` (22)`,
    },
    {
      value: `val2`,
      label: t(`Неактивные`) + `(1)`,
    },
  ];

  const setSearchFn = () => {
    return null;
  };
  const deleteFuntion = () => {
    return null;
  };

  const onChange = (e) => {
    setValueR(e);
  };

  const addPage = () => {

  }

  const columns = [
    {
      title: t(`имя Диспетчера`),
      width: 350,
      render: (row, index) => row?.full_name,
    
    },
    {
      title: t(`Номер телефона`),
      width: 350,
      render: (row, index) => row?.phone,
    
    },
    {
      title: t(`Машины`),
      width: 250,
      filter: true,
      key: `time`,
      filterType: (type) => console.log(type),
      render: (row, index) => ``,
    },
    {
      title: t(`Предложения`),
      width: 250,
      render: (row, index) => ``,
    
    },
    {
      title: t(`в исполнении`),
      width: 250,
      render: (row, index) => ``,
    
    },
    {
      title: t(`Статус аккаунта`),
      width: 250,
      render: (row, index) => ``,
    
    },
  ]

  const {data:dataDis} = useGetUserData({
    params:{
      data: JSON.stringify({
        client_type_id:`2ae57983-f68f-487a-b76c-c7166c35dbba`
      }),
    }
  })


  return {
    t,
    data:dataDis?.response,
    option,
    valueR,
    setValueR,
    onChange,
    search,
    setSearchFn,
    deleteFuntion,
    addPage,
    columns,
    router
  };
};
