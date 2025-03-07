"use client";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useState } from "react";
import { useForm } from "react-hook-form";


export const useMyDispatcher = () => {
  const { register, watch } = useForm();
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
      render: (row, index) => `12ki3e3k`,
    
    },
    {
      title: t(`Номер телефона`),
      width: 350,
      render: (row, index) => `223e23e`,
    
    },
    {
      title: t(`Машины`),
      width: 250,
      filter: true,
      key: `time`,
      filterType: (type) => console.log(type),
      render: (row, index) => `3wedwedwe`,
    },
    {
      title: t(`Предложения`),
      width: 250,
      render: (row, index) => `4dwedwed`,
    
    },
    {
      title: t(`в исполнении`),
      width: 250,
      render: (row, index) => `5fefwef`,
    
    },
    {
      title: t(`Статус аккаунта`),
      width: 250,
      render: (row, index) => `6sefwsefwe`,
    
    },
  ]

  return {
    t,
    option,
    valueR,
    setValueR,
    onChange,
    search,
    setSearchFn,
    deleteFuntion,
    addPage,
    columns
  };
};
