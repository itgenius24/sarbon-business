import { useGetActionUser, useGetRole, useGetUserPost } from "@/services/api";
import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import cls from "./style.module.scss";
import { Flex } from "@chakra-ui/react";
import { TelegramIcon } from "@/assets/icons/icons";
import { useDebounce as useDebounce2 } from "use-debounce";
import { commentObj, roleObj } from "@/utils/actionComment";

export const useProps = () => {
  const { control, errors, register, setError, setValue, watch } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { t } = useTranslation();

  const [debouncedValue] = useDebounce2(watch(`search`), 500);
  const formatDate = (date, hours, minutes, seconds) => {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, seconds, 0);
    return newDate;
  };

  const { data: actionData } = useGetActionUser({
    params: {
      data: JSON.stringify({
        role_id: watch(`role`)?.value,
        users_id: watch(`user`)?.value,
        action_time: {
          $gte:  formatDate(startDate, 0, 0, 0) ,
          $lt:  formatDate(endDate, 23, 59, 59) ,
        },
      }),
    },
   
  });

  const { data: roleData } = useGetRole({
    querySettings: {
      select: (res) =>
        res?.response
          ?.filter(
            (item) =>
              item?.name?.trim() === `Диспетчер` ||
              item?.name === `Заказчик` ||
              item?.name === `Экспедитор`
          )
          ?.map((item) => ({ label: item.name, value: item.guid })),
    },
  });

  const { data: useList } = useGetUserPost({
    data: {
      data: {
        offset: 0,
        order: {},
        search: debouncedValue || ``,
        limit: 1000,
        view_fields: [
          "full_name",
          "email",
          "phone",
          "passport_issued_by",
          "passport_code",
          "residence_registration",
          "driver_license",
          "login",
          "index",
          "punkt",
          "road",
          "house",
          "daily_contact_number_view",
          "fcm_token",
          "register_id",
          "login_id",
          "your_id",
          "last_location",
          "address_name",
          "busy",
          "unique_id",
          "drivers_license_number",
        ],
      },
    },
    querySettings: {
      select: (res) =>
        res?.response?.map((item) => ({
          label: item.full_name,
          value: item.guid,
        })),
    },
  });

  const columns = [
    {
      title: `Дата и время`,
      width: 250,
      render: (row, index) =>
        row?.action_time && (
          <p className={cls.actionTime}>
            {format(
              new Date(row?.action_time).setHours(
                new Date(row?.action_time).getHours() - 5
              ),
              `dd.MM.yyyy`
            )}
            {` `}
            <span>
              {format(
                new Date(row?.action_time).setHours(
                  new Date(row?.action_time).getHours() - 5
                ),
                `hh:mm`
              )}
            </span>
          </p>
        ),
    },
    {
      title: `Пользователь`,
      width: 250,
      render: (row, index) => row?.user_name,
    },
    {
      title: `Роль`,
      width: 250,
      render: (row, index) => roleObj[row?.role_slug],
    },
    {
      title: `Действие`,
      width: 500,
      render: (row, index) => (
        <p className={cls.actionName}>
          { commentObj[row?.action_comment]}: {` `} <span>{row?.increment_id}</span>
        </p>
      ),
    },
    {
      title: `Контакт`,
      width: 250,
      render: (row, index) => (
        <Flex gap={`5px`} alignItems={`center`}>
          <a
            className={cls.phone_number}
            target="_blank"
            href={`https://t.me/${row?.phone_number}`}
          >
            {row?.phone_number}
          </a>{" "}
          <TelegramIcon />
        </Flex>
      ),
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
    columns,
    data: actionData?.response,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    roleData,
    useList,
  };
};
