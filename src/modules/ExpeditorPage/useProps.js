import { useTranslation } from "@/app/i18n/client";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import Imgprofile from "./conponents/Imgprofile";
import { useGetCarData } from "@/services/api";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import authStore from "@/store/auth.store";
import cls from './style.module.scss';
import { useRouter } from "next/navigation";

export const useProps = () => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter()

  const { data: expeditorData, isFetching } = useGetCarData({
    data: {
      data: {
        object_data: {
          page: page,
          limit: 100,
          type: "carrier",
          first_dispatcher_id: authStore.userData.guid,
        },
      },
    },
    querySettings: {
      onSuccess: (res) => {
        const req = res?.response;
        setData([...data, ...req]);
      },
      refetchOnWindowFocus: false,
    },
  });

  const type = {
    ["legal_owner"]:`Юр. лицо`,
    [`physic_owner`]:`Физ. лицо`
  }

  const column = [
    {
      title: `Перевозчик`,
      width: 450,
      filter:true,
      filterType: (type) => console.log(`type`,type),
      render: (row, index) => (
        <Imgprofile
          company_name={row?.company_name}
          yu_id={row?.users_data?.[0]?.your_id}
          type={row?.tip_account?.[0]}
          img={row?.logo}
        />
      ),
    },
    {
      title: `Имя руководителя`,
      width: 250,
      render: (row, index) => <p className={cls.title}>{row?.full_name}</p>,
    },
    {
      title: `Тип аккаунтая`,
      width: 180,
      render: (row, index) => type[row?.tip_account?.[0]] ,
    },
    {
      title: `ИНН / паспорт`,
      width: 180,
      render: (row, index) => row?.tin,
    },
    {
      title: `Машины`,
      width: 180,
      render: (row, index) => row?.vehicles_data_size,
    },
    {
      title: `Водители`,
      width: 180,
      render: (row, index) => row?.users_data_size,
    },
    {
      title: `Номер телефона`,
      width: 270,
      render: (row, index) => <a className={cls.link} href={`https://t.me/${row?.phone_number}`} target="_blank">{row?.phone_number}</a>,
    },
    {
      title: `Регистрация`,
      width: 240,
      render: (row, index) => <p className={cls.date}>{format(row?.createdAt, `dd MMMM yyyy`, { locale: ru })}</p>,
    },
  ];

  const addPage = () => {
    setPage((prev) => prev + 1);
  };

  return {
    column,
    isLargerThan845,
    t,
    expeditorData: data,
    addPage,
    isFetching,
    router
  };
};
