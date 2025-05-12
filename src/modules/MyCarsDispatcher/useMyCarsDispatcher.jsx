"use client";

import {
  useCreateActionHistoriesMutation,
  useCreateLogHistory,
  useDeletedeleteDispacersDriver,
  useGetCarData,
  useUpdateUserInfo,
} from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { useDebounce as useDebounce2 } from "use-debounce";
import {
  BadIcon,
  BatareyDisabledIcon,
  BatareyFullIcon,
  BatareyIcon,
  CencelMapIcon,
  FurDisabledIcon,
  FurIcon,
  GreenCarIcon,
  IocnFilter,
  IocnSortBack,
  IocnSortTop,
  LocationActiveIcon,
  LocationDisabledIcon,
  NotesIcon,
  PopupIcon,
  QuestionBlueIcon,
  SuccessMiniIcon,
} from "@/assets/icons/icons";
import cls from "./style.module.scss";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Tooltip,
} from "@chakra-ui/react";

import Image from "next/image";
import { flegCountry } from "@/utils/flegCountry";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export const useMyCarsDispatcher = () => {
  const { register, watch } = useForm();
  const locale = useGetLang();
  const router = useRouter();
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
  const [iconStatus, setIconStatus] = useState(``);
  const [open, setOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(``);

  const [visibleData, setVisibleData] = useState(data.slice(0, 50));
  const [pageUi, setPageUi] = useState(1); // Hozirgi sahifa (50 tadan ko‘paytirib boramiz)

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

  const { data: getCarData, isFetching } = useGetCarData({
    data: {
      data: {
        object_data: {
          page: debouncedValue?.length > 0 ? 0 : page,
          search: debouncedValue,
          limit: debouncedValue?.length > 0 ? 1000 : limit,
          type: "dispatcher",
          first_dispatcher_id: disId,
          sort_time: filterTime,
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

  console.log(`data`, data);

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
      const nextData = data.slice(0, pageUi * 50);
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

  const pushRouter = (row) => {
    router.push(
      `/${locale}/my-cars-dispatcher/profile-driver?user_id=${
        row.guid || ``
      }&type=driver`
    );
  };

  const navigateFn = (row) => {
   window.open(
      `/${locale}/gps-tracking-dispatcher?full_name=${row?.full_name}&battery=${row?.gps_data?.battery}&createdAt=${row?.gps_data?.update_time}&os=${row?.gps_data?.os}&lat=${row?.gps_data?.lat}&long=${row?.gps_data?.long}&version=${row?.gps_data?.version}&guid=${row?.guid}&provisions=${row?.provisions}&phone=${row?.phone}&car_number=${row?.vehicle_data?.car_number || ``}&car_country=${row?.vehicle_data?.car_country || ``}&car_type=${
        row?.vehicle_data?.car_type || ``}&car_capacity=${
        row?.vehicle_data?.capacity ||``
      }&car_height=${row?.vehicle_data?.height || ``}&car_type_name=${
        row?.trailer_type_id_data?.[`name_${locale}`]
          ? row?.trailer_type_id_data?.[`name_${locale}` || ``]
          : row?.trailer_type_id_data?.name || ``
      }&cargo_guid=${row?.order_data?.cargo_data?.guid || ``}&dispatcher_id=${row?.first_dispatcher_data?.guid || ``}`
    );
    // window.open(
    //   `/${locale}/gps-tracking-dispatcher?guid=${row?.guid}&provisions=${row?.provisions}`
    // );
  };

  const statusObjIcon = {
    bad: <BadIcon />,
    note: <NotesIcon />,
    great: <SuccessMiniIcon />,
  };

  const columns = [
    {
      title: t(`Водитель`),
      filter: true,
      key: "driver_data",
      filterType: (val) => nameFilter(val),
      width: 200,
      render: (row, index) => (
        <Flex
          onClick={() => pushRouter(row)}
          cursor={`pointer`}
          width={`fit-content`}
          alignItems={`center`}
          gap={`10px`}
        >
          <Box position={`relative`}>
            <Avatar
              opacity={0.6}
              width={`50px`}
              height={`50px`}
              size="sm"
              src={row?.photo}
              name={row?.full_name}
            />
            {row?.reliabilitiy?.status && (
              <Box className={cls.status}>
                {statusObjIcon[row?.reliabilitiy?.status?.[0]]}
              </Box>
            )}
          </Box>

          <Box>
            <p className={cls.title}>{row?.full_name}</p>
            <a
              onClick={(e) => e.stopPropagation()}
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
          <Flex alignItems={`center`} gap={`10px`}>
            <Avatar
              opacity={0.6}
              size="sm"
              src={row?.firm_data?.logo}
              name={row?.firm_data?.full_name}
              width={`50px`}
              height={`50px`}
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
            <p className={cls.title}>
              {row?.trailer_type_id_data?.[`name_${locale}`]
                ? row?.trailer_type_id_data?.[`name_${locale}`]
                : row?.trailer_type_id_data?.name}
            </p>

            <Flex mt={`3px`} alignItems={`center`}>
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
                    width: `24px`,
                    height: `16px`,
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
        ) : (
          <p className={cls.title}>
            <span className={cls.subTitle}>{t(`Без машины`)}</span>
          </p>
        ),
    },
    {
      title: (
        <Flex width={`50%`} justifyContent={`space-between`}>
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
      width: 400,
      render: (row, index) => {
        const order = row?.order_data || row?.provisions?.[0] === `our_cargo`;
        return (
          <Flex>
            <Flex
              alignItems={`center`}
              background={
                order || row?.status === `Занята чужим грузом`
                  ? ` rgba(0, 122, 255, 0.08)`
                  : `rgba(229, 243, 235, 1)`
              }
              className={cls.locationWrap}
            >
              {order ? (
                <Box width={`27%`}>
                  <p className={cls.locationTitle}>{t(`Занята`)}: </p>
                  <p className={cls.subBlueTitle}>
                    {row?.order_data?.cargo_data?.number_of_order}
                  </p>
                </Box>
              ) : (
                <Box lineHeight={`16px`} width={`27%`}>
                  <p
                    onClick={() => setOpen(row)}
                    className={cls.locationTitle2}
                  >
                    {t(row?.status)}
                  </p>
                </Box>
              )}

              {row?.gps_data ? (
                <Flex width={`100%`} justifyContent={`space-between`}>
                  <Flex ml={`10px`} alignItems={`center`} gap={2}>
                    <Flex
                    cursor={`pointer`}
                      onClick={() => navigateFn(row)}
                      gap={`3px`}
                      alignItems={`center`}
                    >
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
                  <Flex alignItems={`center`} gap={2}>
                    <Flex gap={`5px`} alignItems={`center`}>
                      <FurIcon />
                      <Box>
                        <p className={cls.subTitle}>Версия Sarbon</p>
                        <p className={cls.title2}>{row?.gps_data?.version}</p>
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
                  </Flex>
                </Flex>
              ) : (
                <Flex width={`100%`} justifyContent={`space-between`}>
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
                  <Flex alignItems={`center`} gap={2}>
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
                  </Flex>
                </Flex>
              )}
            </Flex>
            <Box className={cls.popup}>
              <Popover placement={"bottom-start"}>
                {({ isOpen, onClose }) => (
                  <>
                    <PopoverTrigger>
                      <IconButton
                        size={"sm"}
                        borderRadius={"50%"}
                        icon={<PopupIcon />}
                        width="40px"
                        _hover={{ backgroundColor: "rgba(226, 228, 234, 1)" }}
                        backgroundColor={"white"}
                      />
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent
                        boxShadow={" 0px 12px 16px 10px rgba(16, 24, 40, 0.1)"}
                        border={"1px solid rgba(234, 236, 240, 1"}
                        className={cls.popoverCon}
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          {!order && (
                            <Box
                              style={{ padding: `10px 8px` }}
                              _hover={{
                                backgroundColor: `rgb(247, 247, 247)`,
                                borderRadius: `6px`,
                                color: `rgba(33, 31, 38, 1)`,
                                cursor: `pointer`,
                              }}
                              className={cls.menuItem}
                              onClick={() => {
                                setOpen(row);
                                onClose();
                              }}
                            >
                              {t(`Изменить статус`)}
                            </Box>
                          )}
                          <Box
                            style={{ padding: `10px 8px`, color: `red` }}
                            _hover={{
                              backgroundColor: `rgb(247, 247, 247)`,
                              borderRadius: `6px`,
                              color: `rgba(255, 255, 255, 1)`,
                              cursor: `pointer`,
                            }}
                            className={cls.menuItem}
                            onClick={() => {
                              deleteFuntion(
                                row?.dis_dr_data?.guid,
                                row.your_id
                              );
                              onClose();
                            }}
                          >
                            {t(`Удалить водителя`)}
                          </Box>
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </>
                )}
              </Popover>
            </Box>
          </Flex>
        );
      },
    },
  ];

  const rowClassName = (row) => {
    return row?.order_data ||
      row?.provisions?.[0] === `our_cargo` ||
      row?.status === `Занята чужим грузом`
      ? cls.bussy
      : cls.free;
  };
  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const { mutate: deleteUser } = useDeletedeleteDispacersDriver({
    onSuccess: () => {
      setVisibleData((prevData) =>
        prevData.filter((item) => item.dis_dr_data?.guid !== deleteId)
      );
      setDeleteId(``);
    },
  });

  const deleteFuntion = (id, your_id) => {
    setDeleteId(id);
    deleteUser({
      id,
    });
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: your_id,
        action_time: new Date(),
        role_slug: `first_dispatcher`,
        action_comment: `unpin_driver`,
        role_id: authStore.userData?.role_id,
        action_type: [`delete`],
      },
    });
  };

  const { mutate: userUpdate } = useUpdateUserInfo({
    onSuccess() {
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

  console.log(`open`, open);

  const statusIconChange = () => {
    const body = {
      guid: open.guid,
      provisions: [iconStatus],
    };
    userUpdate({ data: body });
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: open?.your_id,
        action_time: new Date(),
        role_slug: `first_dispatcher`,
        action_comment: `changed_driver_status`,
        role_id: authStore.userData?.role_id,
        action_type: [`update`],
      },
    });
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

  return {
    data: visibleData,
    deleteFuntion,
    nameFilter,
    isLoading: isFetching,
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
  };
};
