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

  return {
    t,
    register,
    search,
    setSearchFn,
    deleteFuntion,
    negotiableOption,
    valueR,
    setValueR,
    onChange
  };
};
