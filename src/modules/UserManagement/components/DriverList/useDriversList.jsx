"use client";

import { useGetLang } from "@/hooks/useGetLang";
import cls from './style.module.scss';
import {
  useCreateActionHistoriesMutation,
  useDeleteUsers,
  useGetCar,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { Avatar, Box, Flex, IconButton, Image, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal, Tooltip } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { flegCountry } from "@/utils/flegCountry";
import { BatareyDisabledIcon, BatareyFullIcon, BatareyIcon, FurDisabledIcon, FurIcon, IocnFilter, IocnSortBack, IocnSortTop, LocationActiveIcon, LocationDisabledIcon, PopupIcon } from "@/assets/icons/icons";
import { format } from "date-fns";


export const useDriversList = () => {
  const locale = useGetLang();
  const [data, setData] = useState();
  const [status, setStatus] = useState(false);
  const params = useSearchParams();
  const guid = params.get(`guid`);
  const { t } = useTranslation(locale, "translations");

  const firm_id = authStore.userData.firm_id;
  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const { mutate, isLoading } = useGetCar({
    onSuccess: (res) => {
      const response = res?.response;

      if (!Array.isArray(response)) return;
      const grouped = {};

      response.forEach((item) => {
        const guid = item?.guid;

        if (!guid) return;

        if (!grouped[guid]) {
          grouped[guid] = {
            ...item,
            orders: item?.order_data ? [item.order_data] : undefined,
          };
          delete grouped[guid].order_data;
        } else {
          grouped[guid].orders.push(item.order_data);
        }
      });

      const finalResult = Object.values(grouped);
      setData(finalResult);

      setStatus(false);
    },
  });


  useEffect(() => {
    const data = { data: { object_data: { firm_id:guid, }, }, };
    mutate(data);
  }, [status]);

  const { mutate: dalete } = useDeleteUsers({
    onSuccess: () => {
      setStatus(true);
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: authStore.userData.your_id,
          action_time: new Date(),
          role_slug: `carrier`,
          action_comment: `deleted_driver`,
          role_id: authStore.userData?.role_id,
          action_type: [`delete`],
        },
      });
    },
  });

  const handleDelete = (id) => {
    const data = { id: id, };
    dalete(data);
  };

  const columns = [
    {
      title: t(`Водитель`),
      filter: true,
      key: "driver_data",
      filterType: (val) => {},
      width: 250,
      render: (row, index) => (
        <Flex width={`fit-content`} alignItems={`center`} gap={`6px`}>
          <Avatar
            size="sm"
            src={row?.photo}
            name={row?.full_name}
          />
          <Box>
            <p className={cls.title}>{row?.full_name}</p>
            <a
              target="_blank"
              href={`https://t.me/${row?.phone}`}
              className={cls.tel}
            >
              {row?.phone}{" "}
            </a>
          </Box>
        </Flex>
      ),
    },
    {
      title: t(`Владелец машины`),
      width: 250,
      render: (row, index) => {
        return row?.firm_data ? (
          <Flex alignItems={`center`} gap={`6px`}>
            <Avatar
              size="sm"
              src={row?.firm_data?.logo}
              name={row?.firm_data?.full_name}
            />
            <Box>
              <p className={cls.title}>{row?.firm_data?.full_name}</p>
              <a
                target="_blank"
                href={`https://t.me/${row?.firm_data?.phone_number}`}
                className={cls.tel}
              >
                {row?.firm_data?.phone_number}
              </a>
            </Box>
          </Flex>
        ) : (
          <p className={cls.title}>
            <span className={cls.subTitle}>{t(`Владелец водитель`)}</span>
          </p>
        );
      },
    },
    {
      title: t(`Машина`),
      width: 250,
      render: (row, index) => (
        <>
          <p className={cls.title}>
            {row?.trailer_type_id_data?.[`name_${locale}`]
              ? row?.trailer_type_id_data?.[`name_${locale}`]
              : row?.trailer_type_id_data?.name}
          </p>

          <Flex>
            <p className={cls.subTitle1}>
              <span style={{ marginRight: `9px` }} className={cls.subTitle}>
                {row?.vehicle_data?.capacity}т / {row?.vehicle_data?.height}м3
              </span>
            </p>

            <Tooltip
              border={`1px solid rgba(219, 216, 227, 1)`}
              background={`white`}
              color={`black`}
              placement="top-end"
              label={row?.vehicle_data?.car_country || `uz`}
            >
              <Image
                alt="w"
                style={{
                  width: `30px`,
                  height: `20px`,
                  marginRight: `9px`,
                }}
                width={100}
                height={100}
                src={flegCountry(row?.vehicle_data?.car_country || `uz`)}
              />
            </Tooltip>
            <p className={cls.subTitle1}>{row?.vehicle_data?.car_number}</p>
          </Flex>
        </>
      ),
    },
    {
      title: (
        <Flex width={`50%`} justifyContent={`space-between`}>
          <Flex
            // onClick={statusFIlter}
            className={cls.filterWrap}
            gap={`5px`}
            alignItems={`center`}
            cursor={`pointer`}
            as={`button`}
          >
            <p className={cls.headerTh}> {t(`Статус`)}</p>
            {/* {filterStatus === `top` ? (
              <IocnSortTop />
            ) : filterStatus === `back` ? (
              <IocnSortBack />
            ) : (
              <IocnFilter />
            )} */}
          </Flex>
        </Flex>
      ),
      width: 300,
      render: (row, index) => {
        const order =
          row?.order_data || row?.provisions?.[0] === `our_cargo`;
        const status = row?.provisions?.[0];
        const statusName =
          status === `someone_cargo`
            ? `Занята чужим грузом`
            : status === `broke_down`
            ? `Неисправна`
            : `Свободная`;
        return (
          <Flex>
            <Flex
              width={`100%`}
              alignItems={`center`}
              justifyContent={`space-between`}
              background={
                order ? ` rgba(0, 122, 255, 0.08)` : `rgba(229, 243, 235, 1)`
              }
              className={cls.locationWrap}
            >
              {order ? (
                <Box>
                  <p className={cls.locationTitle}>{t(`Занята`)}: </p>
                  <p className={cls.subBlueTitle}>
                    {row?.your_id}
                  </p>
                </Box>
              ) : (
                <Box>
                  <p
                    // onClick={() => setOpen(row)}
                    className={cls.locationTitle2}
                  >
                    {t(row?.status)}
                  </p>
                </Box>
              )}

              {row?.gps_data ? (
                <Flex justifyContent={`space-between`}>
                  <Flex ml={`10px`} alignItems={`center`} gap={2}>
                    <Flex gap={`3px`} alignItems={`center`}>
                      <LocationActiveIcon />
                      <Box>
                        <p className={cls.subTitle}>Геолокация</p>
                        <p className={cls.title2}>
                          {t(`Вкл`)}.{" "}
                          <span className={cls.subBlueTitle2}>
                            {row?.gps_data?.update_time &&
                              format(
                                row?.gps_data?.update_time,
                                `yyyy-MM-dd`
                              )}
                          </span>{" "}
                        </p>
                      </Box>
                    </Flex>
                  </Flex>
                  {/* <Flex alignItems={`center`} gap={2}>
                    <Flex gap={`3px`} alignItems={`center`}>
                      <FurIcon />
                      <Box>
                        <p className={cls.subTitle}>Версия Sarbon</p>
                        <p className={cls.title2}>
                          {row?.gps_data?.version}
                        </p>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    {row?.gps_data?.battery > 20 ? (
                      <BatareyFullIcon />
                    ) : (
                      <BatareyIcon />
                    )}
                    <p className={cls.subTitle}>
                      <span className={cls.title}>
                        {row?.gps_data?.battery || 0}%
                      </span>
                    </p>
                  </Flex> */}
                </Flex>
              ) : (
                <Flex justifyContent={`space-between`}>
                  <Flex ml={`10px`} alignItems={`center`} gap={2}>
                    <Flex gap={`3px`} alignItems={`center`}>
                      <LocationDisabledIcon />
                      <Box>
                        <p className={cls.subTitle}>Геолокация</p>
                        <p className={cls.title2}>
                          {t(`Выкл`)}.{" "}
                          <span className={cls.spanDisabled}>Нет данных</span>
                        </p>
                      </Box>
                    </Flex>
                  </Flex>
                  {/* <Flex alignItems={`center`} gap={2}>
                    <Flex gap={`4px`} alignItems={`center`}>
                      <FurDisabledIcon />
                      <Box>
                        <p className={cls.subTitle}>Версия Sarbon</p>
                        <p className={cls.title2}>---</p>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex alignItems={`center`} gap={2}>
                    <Flex gap={`4px`} alignItems={`center`}>
                      <BatareyDisabledIcon />
                      <Box>
                        <p className={cls.subTitle}>Батарея</p>
                        <p className={cls.title2}>---</p>
                      </Box>
                    </Flex>
                  </Flex> */}
                </Flex>
              )}
            </Flex>
          </Flex>
        );
      },
    },
  ];



  return {
    data: data,
    isLoading,
    t,
    handleDelete,
    columns:columns
  };
};
