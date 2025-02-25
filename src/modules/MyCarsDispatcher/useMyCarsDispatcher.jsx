"use client";

import {
  useCreateLogHistory,
  useDeletedeleteDispacersDriver,
  useGetCar,
  useUpdateUserInfo,
} from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { useDebounce as useDebounce2 } from "use-debounce";
import useDebounce from "@/hooks/useDebounce";
import { isVisibleInViewport } from "@/utils/isVisibleInViewport";
import {
  BatareyFullIcon,
  BatareyIcon,
  BluetoothIcon2,
  CencelMapIcon,
  CheckBlueIcon,
  CricleArrovIcon,
  GreenCarIcon,
  LocationActiveIcon,
  PopupIcon,
  QuestionBlueIcon,
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

export const useMyCarsDispatcher = () => {
  const { register, watch } = useForm();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const disId = authStore.userData?.id;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [refe, setRefe] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [filter1, setFilter1] = useState(false);
  const [isAscending, setIsAscending] = useState(true); // Saralash tartibini saqlash uchun holat
  const [search, setSearch] = useState(``);
  const [count, setCount] = useState(0);
  const [debouncedValue] = useDebounce2(search, 500);
  const containerRef = useRef(null);
  const [iconStatus, setIconStatus] = useState(``);
  const [open, setOpen] = useState(false);

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

  const columns = [
    {
      title: t(`Водитель`),
      width: 200,
      render: (row, index) => (
        <Flex alignItems={`center`} gap={`6px`}>
          <Avatar
            size="sm"
            src={row?.driver_data?.photo}
            name={row?.driver_data?.full_name}
          />
          <Box>
            <p className={cls.title}>{row?.driver_data?.full_name}</p>
            <a
              target="_blank"
              href={`https://t.me/${row?.driver_data?.phone}`}
              className={cls.tel}
            >
              {row?.driver_data?.phone}{" "}
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
            <span className={cls.subTitle}>{t(`Владелец водитель`)}</span>
          </p>
        );
      },
    },
    {
      title: t(`Машина`),
      width: 200,
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
      title: t(`Статус`),
      width: 400,
      render: (row, index) => (
        <Flex>
          <Flex
            alignItems={`center`}
            background={
              row?.order_data
                ? ` rgba(0, 122, 255, 0.08)`
                : `rgba(229, 243, 235, 1)`
            }
            className={cls.locationWrap}
          >
            {row?.order_data ? (
              <Box>
                <p className={cls.locationTitle}>{t(`Занята`)}: </p>
                <p className={cls.subBlueTitle}>
                  {row?.order_data?.cargo_data?.[0]?.number_of_order}
                </p>
              </Box>
            ) : (
              <Box>
                <p className={cls.locationTitle2}>{t(`Свободна`)} </p>
              </Box>
            )}

            {row?.gps_data && (
              <>
                <Flex alignItems={`center`} gap={2}>
                  <LocationActiveIcon /> <CricleArrovIcon />
                  <p className={cls.title}>{t(`Вкл`)}. </p>
                  <p className={cls.subBlueTitle}>
                    {row?.gps_data[0]?.update_time &&
                      format(row?.gps_data[0]?.update_time, `yyyy-MM-dd`)}
                  </p>
                </Flex>
                <Flex alignItems={"center"} gap={2}>
                  <BluetoothIcon2 />
                  <p className={cls.subTitle}>
                    <span className={cls.title}>{t(`Вкл`)}. </span>
                  </p>
                </Flex>
                <Flex alignItems={"center"} gap={2}>
                  {row?.gps_data[0]?.battery > 20 ? (
                    <BatareyFullIcon />
                  ) : (
                    <BatareyIcon />
                  )}
                  <p className={cls.subTitle}>
                    <span className={cls.title}>
                      {row?.gps_data[0]?.battery}%{" "}
                    </span>
                  </p>
                </Flex>
              </>
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
                            deleteFuntion(row?.guid);
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
      ),
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

  const { mutate, isLoading } = useGetCar({
    onSuccess: (res) => {
      if (res?.response?.length) {
        setRefe(false);
        setCount({
          count: res?.count?.total_count,
          free_count: res?.FreeCount?.free_count,
        });

        let data = res?.response;
        const uniqueData = data.filter(
          (item) =>
            !oldData.some((stateItem) => stateItem?.users_id === item?.users_id)
        );
        //  if(page > 1){
        const uniqueData2 = data.filter((item) =>
          oldData.some((stateItem) => stateItem?.users_id === item?.users_id)
        );
        setData2((prev) => [...prev, ...uniqueData2]);

        //  }
        setData((prev) => [...prev, ...uniqueData]); // Yangi ma'lumotlarni data ga qo'shish
        setOldData((prev) => [...prev, ...uniqueData]); // Yangi ma'lumotlarni oldData ga qo'shish
      }
    },
  });

  useEffect(() => {
    const dataReq = {
      data: {
        object_data: {
          page: debouncedValue?.length > 0 ? 0 : page,
          search: debouncedValue,
          limit: debouncedValue?.length > 0 ? 1000 : limit,
          type: "dispatcher",
          dispatcher_id: disId,
        },
      },
    };

    mutate(dataReq);
  }, [page, limit, debouncedValue?.length, refe]);

  const addPage = () => {
    setPage((pa) => pa + 1);
  };

  const nameFilter = () => {
    setFilter1(!filter1);
    const sortedData = data?.sort(
      (a, b) =>
        isAscending
          ? a?.driver_data?.[0]?.full_name.localeCompare(
              b?.driver_data?.[0]?.full_name
            ) // Alfavit bo'yicha
          : b?.driver_data?.[0]?.full_name.localeCompare(
              a?.driver_data?.[0]?.full_name
            ) // Teskari alfavit bo'yicha
    );

    setData(() => [...sortedData]);
    setIsAscending(!isAscending); // Tartibni almashtirish
  };

  const { mutate: deleteUser } = useDeletedeleteDispacersDriver({
    onSuccess: () => {
      setRefe(true);
      setData([]);
      setOldData([]);
    },
  });

  const deleteFuntion = (id) => {
    console.log(`deleteFuntion`, id);
    deleteUser({
      id,
    });
  };

  const { mutate: userUpdate } = useUpdateUserInfo({
    onSuccess() {
      setRefe(true);
      setData([]);
      setOldData([]);
      setOpen(false);
    },
    onError() {},
  });

  console.log(open);
  const statusIconChange = () => {
    const body = {
      guid: open.driver_data?.guid,
      provisions: [iconStatus],
    };
    userUpdate({ data: body });
  };

  const setSearchFn = (val) => {
    setSearch(val?.replace(/\+/g, ""));
    if (val?.replace(/\+/g, "")) {
      setData([]);
      setOldData([]);
      setPage(0);
    }
  };
  const setDebouncedLimit = useDebounce(setPage, 250);

  const handleScroll = () => {
    if (!isLoading) {
      if (containerRef.current) {
        const isVisible = isVisibleInViewport(containerRef.current);

        if (isVisible) {
          setDebouncedLimit((res) => res + 1);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { capture: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    data,
    deleteFuntion,
    nameFilter,
    filter1,
    isLoading,
    t,
    register,
    setSearchFn,
    search,
    count,
    addPage,
    statusData,
    iconStatus,
    setIconStatus,
    open,
    setOpen,
    statusIconChange,
    columns,
  };
};
