import { useTranslation } from "@/app/i18n/client";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Imgprofile from "./conponents/Imgprofile";

export const useProps = () => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { t } = useTranslation();

  const column = [
    {
      title: `Перевозчик`,
      width: 450,
      render: (row, index) =>  <Imgprofile />,
    },
    {
      title: `Имя руководителя`,
      width: 250,
      render: (row, index) => ``,
    },
    {
      title: `Тип аккаунтая`,
      width: 180,
      render: (row, index) => ``,
    },
    {
      title: `ИНН / паспорт`,
      width: 180,
      render: (row, index) => ``,
    },
    {
      title: `Машины`,
      width: 180,
      render: (row, index) => ``,
    },
    {
      title: `Водители`,
      width: 180,
      render: (row, index) => ``,
    },
    {
      title: `Номер телефона`,
      width: 270,
      render: (row, index) => ``,
    },
    {
      title: `Регистрация`,
      width: 240,
      render: (row, index) => ``,
    },
  ];
  return {
    column,
    isLargerThan845,
    t,
  };
};
