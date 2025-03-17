import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const useProps = () => {
  const { control, errors, register, setError, setValue, watch } = useForm();
  const { t } = useTranslation();

  const columns = [
    {
      title: `Дата и время`,
      width: 250,
      render: (row, index) => `3e2`,
    },
    {
      title: `Пользователь`,
      width: 350,
      render: (row, index) => `32`,
    },
    {
      title: `Роль`,
      width: 250,
      render: (row, index) => `32`,
    },
    {
      title: `Действие`,
      width: 450,
      render: (row, index) => `32`,
    },
    {
      title: `Контакт`,
      width: 250,
      render: (row, index) => `32`,
    },
  ];

  return {
    control,
    errors,
    register,
    setError,
    setValue,
    watch,
    t,
    columns
  };
};
