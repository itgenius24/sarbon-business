"use client";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useState } from "react";

import { useForm } from "react-hook-form";

export const useAllCargoDispatcher = () => {
  const { register, watch } = useForm();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const [search, setSearch] = useState(``);
  const [valueR, setValueR] = useState(`val1`);

  const negotiableOption = [
    {
      value: `val1`,
      label: t(`Активные заказы`) + ` (22)`,
    },
    {
      value: `val2`,
      label: t(`Завершенные грузы`) + `(1)`,
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

  const columns = [
    {
      title: t(`Откуда`),
      width: 350,
      // filter: true,
      // key: `from`,
      // filterType: (type) => handleSorFrom(type),
      render: (row, index) => `12ki3e3k`,
    
    },
    {
      title: t(`Куда`),
      width: 350,
      render: (row, index) => `223e23e`,
    
    },
    {
      title: t(`Когда забрать`),
      width: 250,
      filter: true,
      key: `time`,
      filterType: (type) => console.log(type),
      render: (row, index) => `3wedwedwe`,
    },
    {
      title: t(`Когда доставить`),
      width: 250,
      render: (row, index) => `4dwedwed`,
    
    },
    {
      title: t(`Общая Стомость`),
      width: 250,
      render: (row, index) => `5fefwef`,
    
    },
    {
      title: t(`предоплатА`),
      width: 250,
      render: (row, index) => `6sefwsefwe`,
    
    },
    {
      title: t(`Диспетчер`),
      width: 270,
      render: (row, index) => `7dfsrdferr`,
    },
  ]

  return {
    t,
    register,
    search,
    setSearchFn,
    deleteFuntion,
    negotiableOption,
    valueR,
    setValueR,
    onChange,
    columns,
  };
};
