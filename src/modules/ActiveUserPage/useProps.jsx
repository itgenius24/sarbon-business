import { useGetActionUser, useGetRole, useGetUserPost } from "@/services/api";
import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import cls from "./style.module.scss";
import { Flex } from "@chakra-ui/react";
import { TelegramIcon } from "@/assets/icons/icons";
import { useDebounce as useDebounce2 } from "use-debounce";
import { commentObj, nameToRole, roleObj } from "@/utils/actionComment";
import copy from "copy-to-clipboard";

export const useProps = () => {
  const { control, errors, register, setError, setValue, watch } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roleData, setRoleData] = useState([]);
  const [offset,setOffset] = useState(0)
  const [data,setData] = useState([])
  const { t } = useTranslation();

  const [debouncedValue] = useDebounce2(watch(`search`), 500);
  const formatDate = (date, hours, minutes, seconds) => {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, seconds, 0);
    return newDate;
  };

  const copyFn = (text) => {
    copy(text);
  };

  const { data: actionData,isFetching } = useGetActionUser({
    params: {
      limit:100,
      offset:offset,
      data: JSON.stringify({
        role_id: watch(`role`)?.value,
        users_id: watch(`user`)?.value,
        role_slug: watch(`role`)?.role_slug,
   
        action_time: {
          $gte: formatDate(startDate, 0, 0, 0),
          $lt: formatDate(endDate, 23, 59, 59),
        },
      }),
    },
    querySettings: {
      select: (res) => {
        return res.response.filter(
          (item) =>
            !item?.user_name?.toLocaleLowerCase()?.includes(`test`) &&
            !item?.user_name?.includes(`CЕО`) 
            // &&
            // item?.user_name &&  item?.role_slug !== `voditel`
        );
      },
      onSuccess:(res) =>{
        const resData = res || []
        setData([...data,...resData])
      },
      refetchOnWindowFocus:false,
    },
  });

  const { data: roles } = useGetRole({
    querySettings: {
      onSuccess: (res) => {
        const data = res?.response?.filter(
          (item) =>
            item?.name?.trim() === `Диспетчер` ||
            item?.name === `Заказчик` ||
            item?.name === `Экспедитор` ||
            item.name === "Водитель"
        );
        const result = data?.map((item) => ({
          label: item?.name === `Экспедитор`  ? `Перевозчик`:  item.name,
          value: item.guid,
          role_slug: nameToRole[item.name?.trim()],
        }));

        setRoleData([
          ...result,
          {
            label: `Tоп Диспетчер`,
            value: `785678f2-fae7-4a00-8766-99ea67d3784f`,
            role_slug: `top_dispatcher`,
          },
        ]);
      },
    },
  });

 

  const { data: useList } = useGetUserPost({
    data: {
      data: {
        offset: 0,
        order: {},
        search: debouncedValue || ``,
        limit: 1000,
        role_id: watch(`role`)?.value,
        dispatcher_type:
          watch(`role`)?.role_slug === `top_dispatcher`
            ? `top_dispatcher`
            : watch(`role`)?.role_slug === `first_dispatcher`
            ? `first_dispatcher`
            : undefined,
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
        res?.response
          ?.filter(
            (item) =>
              item.role_id === "f81d3c3d-228d-479e-a2b1-9948c98640f2" ||
              item.role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" ||
              item.role_id === "48871d27-7361-4f69-8fe4-b54daf270739"
          )
          .map((item) => ({
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
                new Date(row?.action_time).getHours()
              ),
              `dd.MM.yyyy`
            )}
            {` `}
            <span>
              {format(
                new Date(row?.action_time).setHours(
                  new Date(row?.action_time).getHours()
                ),
                `HH:mm`
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
          {commentObj[row?.action_comment]}: {` `}{" "}
          <span onClick={() => copyFn(row?.increment_id)}>
            {row?.increment_id}
          </span>
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

  const addPage = () =>{
    setOffset(prev => prev + 100)
  }

  return {
    control,
    errors,
    register,
    setError,
    setValue,
    watch,
    t,
    columns,
    data: data,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    roleData,
    useList,
    addPage,
    isFetching,
    setData
  };
};
