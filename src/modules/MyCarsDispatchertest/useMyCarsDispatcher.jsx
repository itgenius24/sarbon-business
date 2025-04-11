"use client";

import {
  useCreateActionHistoriesMutation,
  useCreateAddressMutation,
  useCreateLogHistory,
  useDeletedeleteDispacersDriver,
  useDeleteDisAll,
  useGetCarData,
  useGetCreateAddress,
  useUpdateUserInfo,
} from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { useDebounce as useDebounce2 } from "use-debounce";
import {
  AddUserIcon,
  CencelMapIcon,
  GreenCarIcon,
  IocnFilter,
  IocnSortBack,
  IocnSortTop,
  LocationActiveIcon,
  LocationDisabledIcon,
  QuestionBlueIcon,
} from "@/assets/icons/icons";
import cls from "./style.module.scss";
import { Avatar, Box, Flex, Tooltip, useDisclosure } from "@chakra-ui/react";

import Image from "next/image";
import { flegCountry } from "@/utils/flegCountry";
import { format } from "date-fns";
import { Checkbox } from "@/components/Checkbox";
import { useSearchParams } from "next/navigation";

export const useMyCarsDispatcher = () => {
  const searchParams = useSearchParams();
  const disUrlId = searchParams.get(`id`);
  const { control, errors, register, setError, setValue, watch } = useForm();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const disId = authStore.userData?.id;
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [refe, setRefe] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(500);
  const [filterStatus, setFilterStatus] = useState(`all`);
  const [filterTime, setFilterTime] = useState(`default`);
  const [search, setSearch] = useState(``);
  const [count, setCount] = useState(0);
  const [debouncedValue] = useDebounce2(search, 500);
  const [searchDis, setSearchDIs] = useState(``);
  const [debouncedValueDIs] = useDebounce2(searchDis, 500);
  const [iconStatus, setIconStatus] = useState(``);
  const [open, setOpen] = useState(false);
  const [ids, setId] = useState([]);
  const [startSelectDate, setStartSelectDate] = useState(new Date());

  const [userdata, setUserData] = useState({});
  const [userDisRes, setUserDisRes] = useState({});
  const [userDisResOption, setUserDisResOption] = useState({});
  const [deleteId, setDeleteId] = useState(``);
  const [value, setValueR] = useState(`active`);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    return lastWeek;
  });

  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return today; // YYYY-MM-DD format
  });

  const dateValues = [
    { label: `Сегодня`, value: `Сегодня` },
    { label: `3 дня`, value: `3 дня` },
    { label: `Неделя`, value: `Неделя` },
    { label: `Месяц`, value: `Месяц` },
    { label: `3 месяца`, value: `3 месяца` },
  ];

  const [visibleData, setVisibleData] = useState(data.slice(0, 50));
  const [pageUi, setPageUi] = useState(1); // Hozirgi sahifa (50 tadan ko‘paytirib boramiz)
  const idsId = ids?.map((item) => item?.guid);

  const loadMore = () => {
    const nextPage = pageUi + 1;
    const nextData = data.slice(0, nextPage * 50); // Avvalgi + yangi 50 ta
    setVisibleData(nextData);
    setPageUi(nextPage);
  };

  const statusData = [
    {
      id: 1,
      type: "empty",
      icon: GreenCarIcon,
      title: "Свободная",
    },
    {
      id: 2,
      type: "someone_cargo",
      icon: QuestionBlueIcon,
      title: t("Занята чужим грузом"),
    },
    {
      id: 3,
      type: "broke_down",
      icon: CencelMapIcon,
      title: t("Неисправна"),
    },
  ];

  const { mutate: logHistory } = useCreateLogHistory({});

  useEffect(() => {
    logHistory({
      data: {
        users_id: authStore.userData.guid,
        last_move_time: new Date(),
        menu: `my_driver`,
      },
    });
  }, []);

  const formatDate = (date, hours, minutes, seconds) => {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, seconds, 0);
    return newDate;
  };

  const {
    data: getCarData,
    isLoading,
    isFetching,
    refetch,
  } = useGetCarData({
    data: {
      data: {
        object_data: {
          page: debouncedValue?.length > 0 ? 0 : page,
          search: debouncedValue,
          limit: debouncedValue?.length > 0 ? 4000 : limit,
          type: "dispatcher",
          dispatcher_id: disId,
          sort_time: filterTime,
          filter:
            watch(`driver`)?.label === `Без диспетчера` ? `is_empty` : value,
          first_dispatcher_id: watch(`driver`)?.value,
          start_date:
            watch(`driver`)?.label === `Без диспетчера` || search?.length > 0
              ? ``
              : startDate?.getDate() === endDate?.getDate()
              ? formatDate(startDate, 0, 0, 0)
              : new Date(startDate),
          end_date:
            watch(`driver`)?.label === `Без диспетчера` || search?.length > 0
              ? ``
              : startDate?.getDate() === endDate?.getDate()
              ? formatDate(endDate, 23, 59, 59)
              : new Date(endDate),
        },
      },
    },
    querySettings: {
      onSuccess: (res) => {
        if (res?.response?.length) {
          setRefe(false);
          setCount({
            count: res?.count?.total_count,
            free_count: res?.FreeCount?.free_count,
          });

          let data = res?.response;
          const uniqueData = data
            .filter(
              (item) =>
                !oldData.some(
                  (stateItem) => stateItem?.users_id === item?.users_id
                )
            )
            ?.map((item) => {
              if (item?.order_data || item?.provisions?.[0] === `our_cargo`) {
                return {
                  ...item,
                  status: `Занята`,
                };
              } else if (item?.provisions?.[0] === `someone_cargo`) {
                return {
                  ...item,
                  status: `Занята чужим грузом`,
                };
              } else if (item?.provisions?.[0] === `broke_down`) {
                return {
                  ...item,
                  status: `Неисправна`,
                };
              } else if (item?.provisions?.[0] === `empty`) {
                return {
                  ...item,
                  status: `Свободная`,
                };
              } else {
                return {
                  ...item,
                  status: `Нет Статус`,
                };
              }
            });
          setData((prev) => [...prev, ...uniqueData]);
          setOldData((prev) => [...prev, ...uniqueData]);
          setVisibleData(uniqueData?.slice(0, 50));
        }
      },
      refetchOnWindowFocus: false,
    },
  });

  const negotiableOption = [
    {
      value: `active`,
      label: t(`Всего`) + ` ${0}`,
    },
    {
      value: `in_active`,
      label: t(`Только свободные`) + ` ${0}`,
    },
  ];

  const nameFilter = (val) => {
    if (val !== `all`) {
      const sortedData = data?.sort((a, b) =>
        val === `top`
          ? a?.full_name.localeCompare(b?.full_name)
          : b?.full_name.localeCompare(a?.full_name)
      );
      const nextData = sortedData.slice(0, pageUi * 50);

      setVisibleData(nextData);
    } else {
      const nextData = oldData.slice(0, pageUi * 50);
      setVisibleData(nextData);
    }
  };

  const statusFIlter = () => {
    if (filterStatus === `all`) {
      setFilterStatus(`top`);
      const sortedData = data?.sort((a, b) =>
        a?.status.localeCompare(b?.status)
      );
      const nextData = sortedData.slice(0, pageUi * 50);

      setVisibleData(nextData);
    } else if (filterStatus === `top`) {
      setFilterStatus(`back`);
      const sortedData = data?.sort((a, b) =>
        b?.status.localeCompare(a?.status)
      );
      const nextData = sortedData.slice(0, pageUi * 50);
      setVisibleData(nextData);
    } else if (filterStatus === `back`) {
      setFilterStatus(`all`);
      const nextData = oldData.slice(0, pageUi * 50);
      setVisibleData(nextData);
    }
  };

  const timeFilter = () => {
    if (filterTime === `default`) {
      setFilterTime(`top`);
      setData([]);
      setOldData([]);
      setVisibleData([]);
    } else if (filterTime === `top`) {
      setFilterTime(`bottom`);
      setData([]);
      setOldData([]);
      setVisibleData([]);
    } else if (filterTime === `bottom`) {
      setFilterTime(`default`);
      setData([]);
      setOldData([]);
      setVisibleData([]);
    }
  };

  const handleCheckboxChange = (user) => {
    console.log(`salom`, user);
    if (ids?.map((item) => item?.guid).includes(user?.guid)) {
      setId((prevIds) => prevIds.filter((item) => item?.guid !== user?.guid));
    } else {
      setId((prevIds) => [...prevIds, user]);
    }
  };

  const columns = [
    {
      title: t(`Водитель`),
      filter: true,
      key: "driver_data",
      filterType: (val) => nameFilter(val),
      width: 200,
      render: (row, index) => (
        <Flex width={`fit-content`} alignItems={`center`} gap={`6px`}>
          <Avatar size="sm" src={row?.photo} name={row?.full_name} />
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
      width: 200,
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
            <span className={cls.subTitle}>{t(`Без перевозчика`)}</span>
          </p>
        );
      },
    },
    {
      title: t(`Машина`),
      width: 200,
      render: (row, index) =>
        row?.trailer_type_id_data ? (
          <>
            <p className={cls.carType}>
              {row?.trailer_type_id_data?.[`name_${locale}`]
                ? row?.trailer_type_id_data?.[`name_${locale}`]
                : row?.trailer_type_id_data?.name}
            </p>

            <Flex alignItems={`center`} mt={`3px`}>
              <p className={cls.number}>
                {row?.vehicle_data?.capacity}т / {row?.vehicle_data?.height}м3
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
                    width: `24px`,
                    height: `16px`,
                    marginRight: `9px`,
                  }}
                  width={100}
                  height={100}
                  src={flegCountry(row?.vehicle_data?.car_country || `uz`)}
                />
              </Tooltip>
              <p className={cls.number}>
                <span>{row?.vehicle_data?.car_number}</span>
              </p>
            </Flex>
          </>
        ) : (
          <p className={cls.title}>
            <span className={cls.subTitle}>{t(`Без машины`)}</span>
          </p>
        ),
    },
    {
      title: (
        <Flex width={`60%`} justifyContent={`space-between`}>
          <Flex
            onClick={statusFIlter}
            className={cls.filterWrap}
            gap={`5px`}
            alignItems={`center`}
            cursor={`pointer`}
            as={`button`}
          >
            <p className={cls.headerTh}> {t(`Статус`)}</p>
            {filterStatus === `top` ? (
              <IocnSortTop />
            ) : filterStatus === `back` ? (
              <IocnSortBack />
            ) : (
              <IocnFilter />
            )}
          </Flex>
          <Flex
            onClick={timeFilter}
            className={cls.filterWrap}
            gap={`5px`}
            alignItems={`center`}
            cursor={`pointer`}
            as={`button`}
          >
            <p className={cls.headerTh}> {t(`Время`)}</p>
            {filterTime === `top` ? (
              <IocnSortTop />
            ) : filterTime === `bottom` ? (
              <IocnSortBack />
            ) : (
              <IocnFilter />
            )}
          </Flex>
        </Flex>
      ),
      width: 250,
      render: (row, index) => {
        const order = row?.order_data || row?.provisions?.[0] === `our_cargo`;
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
              alignItems={`center`}
              background={
                order ? ` rgba(0, 122, 255, 0.08)` : `rgba(229, 243, 235, 1)`
              }
              className={cls.locationWrap}
            >
              {order ? (
                <Box>
                  <p className={cls.locationTitle}>{t(`Занята`)}: </p>
                  <p className={cls.subBlueTitle}>
                    {row?.order_data?.cargo_data?.number_of_order}
                  </p>
                </Box>
              ) : (
                <Box>
                  <p
                    onClick={() => setOpen(row)}
                    className={cls.locationTitle2}
                  >
                    {t(row?.status)}
                  </p>
                </Box>
              )}

              {row?.gps_data ? (
                <Flex>
                  <Flex ml={`10px`} alignItems={`center`} gap={2}>
                    <Flex gap={`3px`} alignItems={`center`}>
                      <LocationActiveIcon />
                      <Box>
                        <p className={cls.subTitle}>Геолокация</p>
                        <p className={cls.title2}>
                          {t(`Вкл`)}.{" "}
                          <span className={cls.subBlueTitle2}>
                            {row?.gps_data?.update_time &&
                              format(row?.gps_data?.update_time, `yyyy-MM-dd`)}
                          </span>{" "}
                        </p>
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              ) : (
                <Flex>
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
                </Flex>
              )}
            </Flex>
          </Flex>
        );
      },
    },
    {
      title: `Диспетчер`,
      width: 230,
      render: (row, index) => (
        <Flex
          width={`100%`}
          justifyContent={`space-between`}
          alignItems={`center`}
          onClick={(e) => e.stopPropagation()}
        >
          {row?.first_dispatcher_data ? (
            <Flex alignItems={`center`} gap={`9px`}>
              <Avatar
                size="sm"
                width={`40px`}
                height={`40px`}
                name={row?.first_dispatcher_data?.full_name}
                src={row?.first_dispatcher_data?.photo}
              />

              <Box>
                <p className={cls.disName}>
                  {row?.first_dispatcher_data?.full_name}
                </p>
                <p className={cls.disSubText}>
                  {" "}
                  {row?.first_dispatcher_data?.phone}
                </p>
              </Box>
            </Flex>
          ) : (
            <Flex alignItems={`center`} gap={`9px`}>
              <AddUserIcon />
              <Box>
                <p className={cls.disName}>Без диспетчера</p>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(row);
                    onOpen();
                  }}
                  className={cls.addDisText}
                >
                  Назначить диспетчера
                </p>
              </Box>
            </Flex>
          )}

          <Checkbox
            id={row?.guid}
            defaultChecked={idsId.includes(row?.guid)}
            checked={idsId.includes(row?.guid)}
            onClick={(e) => {
              e.stopPropagation();
              handleCheckboxChange(row);
            }}
          ></Checkbox>
        </Flex>
      ),
    },
  ];

  const rowClassName = (row) => {
    return idsId.includes(row?.guid) ? cls.border : cls.no_border;
  };

  const { mutate: deleteUser } = useDeletedeleteDispacersDriver({
    onSuccess: () => {
      setVisibleData((prevData) =>
        prevData.filter((item) => item.guid !== deleteId)
      );
      setDeleteId(``);
    },
  });

  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const { mutate: deleteData, isLoading: deleteLoding } = useDeleteDisAll({
    onSuccess: () => {
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: authStore.userData.your_id,
          action_time: new Date(),
          role_slug: `top_dispatcher`,
          action_comment: `unpin_driver`,
          role_id: authStore.userData?.role_id,
          action_type: [`delete`],
        },
      });
    },
  });

  const deleteFuntion = (id) => {
    setDeleteId(id);

    deleteData({
      ids: ids.map((item) => item.guid),
    });
  };

  const { mutate: userUpdate } = useUpdateUserInfo({
    onSuccess() {
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: open?.your_id,
          action_time: new Date(),
          role_slug: `top_dispatcher`,
          action_comment: `changed_driver_status`,
          role_id: authStore.userData?.role_id,
          action_type: [`update`],
        },
      });
      setOpen(false);
      setIconStatus(``);
      if (iconStatus === `our_cargo`) {
        return setVisibleData((prevData) =>
          prevData.map((item) =>
            item.guid === open.guid ? { ...item, status: `Занята` } : item
          )
        );
      } else if (iconStatus === `someone_cargo`) {
        return setVisibleData((prevData) =>
          prevData.map((item) =>
            item.guid === open.guid
              ? { ...item, status: `Занята чужим грузом` }
              : item
          )
        );
      } else if (iconStatus === `broke_down`) {
        return setVisibleData((prevData) =>
          prevData.map((item) =>
            item.guid === open.guid
              ? {
                  ...item,
                  status: `Неисправна`,
                }
              : item
          )
        );
      } else if (iconStatus === `empty`) {
        return setVisibleData((prevData) =>
          prevData.map((item) =>
            item.guid === open.guid
              ? {
                  ...item,
                  status: `Свободная`,
                }
              : item
          )
        );
      } else {
        return setVisibleData((prevData) =>
          prevData.map((item) =>
            item.guid === open.guid
              ? {
                  ...item,
                  status: `Нет Статус`,
                }
              : item
          )
        );
      }
    },
    onError() {},
  });

  const statusIconChange = () => {
    const body = {
      guid: open?.guid,
      provisions: [iconStatus],
    };
    userUpdate({ data: body });
  };

  const setSearchFn = (val) => {
    setSearch(val?.replace(/\+/g, ""));
    if (val?.replace(/\+/g, "")) {
      setData([]);
      setVisibleData([]);
      setOldData([]);
      setPage(0);
    }
  };

  const { data: dataDis } = useGetCreateAddress({
    data: {
      data: {
        object_data: {
          type: "top_dispatcher",
          search: debouncedValueDIs,
          filter: `active`,
          dispatcher_id: authStore.userData.guid,
        },
      },
    },
    querySettings: {
      onSuccess: (res) => {
        const targetId = disUrlId;
        const targetIndex = res?.response?.findIndex(
          (item) => item?.first_dispatcher_data?.guid === targetId
        );

        if (targetIndex > -1) {
          const [targetItem] = res.response.splice(targetIndex, 1);
          setUserData(targetItem);

          setUserDisRes({ ...res, response: [targetItem, ...res.response] });
        } else {
          setUserDisRes({ ...res, response: [...res.response] });
          setUserDisResOption({
            ...res,
            response: [
              {
                first_dispatcher_data: {
                  guid: ``,
                  full_name: `Без диспетчера`,
                },
              },
              ...res.response,
            ],
          });
        }
      },
    },
  });

  const { mutate: createUserAdress, isLoading: createDisLoading } =
    useCreateAddressMutation({
      onSuccess: () => {
        setVisibleData((prevData) =>
          prevData.map((item) => {
            const processedItem = ids.find((pItem) => pItem.guid === item.guid);
            const data = item;
            if (processedItem) {
              data.first_dispatcher_data = {
                full_name: userdata?.first_dispatcher_data?.full_name,
                photo: userdata?.first_dispatcher_data?.photo,
                phone: userdata?.first_dispatcher_data?.phone,
              };
              return data;
            }
            return item;
          })
        );
        onClose();
        setId([]);
        setUserData({});
      },
      onError: () => {
        setId([]);
        setData([]);
        setOldData([]);
        setPage(0);
        refetch();
      },
    });
  const { mutate: userAdressRemove, isLoading: removeDisLoading } =
    useCreateAddressMutation({
      onSuccess: () => {
        setVisibleData((prevData) =>
          prevData.map((item) => {
            const processedItem = ids.find(
              (pItem) => pItem?.guid === item?.guid
            );
            const data = item;
            if (processedItem) {
              data.first_dispatcher_data = undefined;
              return data;
            }
            return item;
          })
        );
        onClose();
        setId([]);
        setUserData({});
      },
      onError: () => {
        setId([]);
        setData([]);
        setOldData([]);
        setPage(0);
        refetch();
      },
    });

  const addSubDis = () => {
    const data = {
      data: {
        object_data: {
          type: "dispatcher",
          positive: true,
          name: ids?.map((item) => ({
            firm_id: item?.firm_id || ``,
            driver_id: item?.guid,
          })),
          first_dispatcher_id: userdata?.first_dispatcher_data?.guid,
          dispatcher_id: authStore.userData.guid,
        },
      },
    };

    createUserAdress(data);
  };

  const removeSubDis = () => {
    const removeData = ids?.filter((item) => item.first_dispatcher_data);
    const data = {
      data: {
        object_data: {
          type: "dispatcher",
          positive: false,
          ids: removeData?.map((item) => item?.guid),
        },
      },
    };

    userAdressRemove(data);
  };

  function handleSelect(e) {
    const selected = e.value;
    const today = new Date();
    let newStartDate = new Date();

    switch (selected) {
      case "Сегодня":
        newStartDate = today;
        break;
      case "3 дня":
        newStartDate.setDate(today.getDate() - 2);
        break;
      case "Неделя":
        newStartDate.setDate(today.getDate() - 6);
        break;
      case "Месяц":
        newStartDate.setMonth(today.getMonth() - 1);
        break;
      case "3 месяца":
        newStartDate.setMonth(today.getMonth() - 3);
        break;
      default:
        newStartDate = today;
    }

    setStartDate(newStartDate);
    setEndDate(today);
    setStartSelectDate(newStartDate);

    if (
      format(newStartDate, `dd.MM.yyyy`) === format(startDate, `dd.MM.yyyy`)
    ) {
      return;
    } else {
      clearFn();
    }
  }

  const onChange = (e) => {
    setValueR(e);
    setData([]);
    setOldData([]);
    setPage(0);
  };

  const clearFn = () => {
    setData([]);
    setOldData([]);
    setPage(0);
    setVisibleData([]);
  };

  return {
    data: visibleData,
    deleteFuntion,
    nameFilter,
    isLoading: isLoading || isFetching,
    t,
    register,
    setSearchFn,
    search,
    count,
    addPage: loadMore,
    statusData,
    iconStatus,
    setIconStatus,
    open,
    setOpen,
    statusIconChange,
    columns,
    rowClassName,
    ids,
    userdata,
    setUserData,
    dataDis: userDisRes?.response,
    addSubDis,
    onOpen,
    isOpen,
    onClose,
    createDisLoading,
    searchDis,
    setSearchDIs,
    removeSubDis,
    removeDisLoading,
    deleteLoding,
    negotiableOption,
    onChange,
    value,
    handleCheckboxChange,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    control,
    errors,
    setError,
    setValue,
    watch,
    clearFn,
    userDisResOption: userDisResOption?.response,
    dateValues,
    startSelectDate,
    handleSelect,
    setStartSelectDate,
  };
};
