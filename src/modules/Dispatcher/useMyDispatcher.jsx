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

  return {
    t,
    option,
    valueR,
    setValueR,
    onChange,
    search,
    setSearchFn,
    deleteFuntion,
    addPage
  };
};
