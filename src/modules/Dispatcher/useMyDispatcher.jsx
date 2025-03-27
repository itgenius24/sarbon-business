"use client";
import { useTranslation } from "@/app/i18n/client";
import { PopupIcon } from "@/assets/icons/icons";
import { useGetLang } from "@/hooks/useGetLang";
import {
  useCreateActionHistoriesMutation,
  useDeleteDisTop,
  useGetCreateAddress,
  useGetUserData,
  useUpdateUserInfo,
} from "@/services/api";
import {
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDebounce as useDebounce2 } from "use-debounce";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import cls from "./style.module.scss";
import authStore from "@/store/auth.store";
import { fi } from "date-fns/locale";

export const useMyDispatcher = () => {
  const router = useRouter();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const [search, setSearch] = useState(``);
  const [debouncedValue] = useDebounce2(search, 500);
  const [valueR, setValueR] = useState(`active`);
  const [countActive, setCountActive] = useState(0);
  const [countNeActive, setCountNeActive] = useState(0);
  const [dataDis, setDataDis] = useState([]);
  const [data, setData] = useState([]);

  const { data: dataRes, refetch } = useGetCreateAddress({
    data: {
      data: {
        object_data: {
          type: "top_dispatcher",
          search: debouncedValue,
          filter: valueR,
          dispatcher_id: authStore.userData.guid,
        },
      },
    },
    querySettings: {
      onSuccess: (res) => {
        if (!countActive) {
          setCountActive(
            res?.response?.filter(
              (item) => item?.user_status_counts?.[0]?._id === "approved"
            )?.length
          );
        }
        if (!countNeActive) {
          setCountNeActive(
            res?.response?.filter(
              (item) => item?.user_status_counts?.[0]?._id === "blocked"
            )?.length
          );
        }
        setData(res?.response);
      },
    },
  });

    const { mutate: actionCreate } = useCreateActionHistoriesMutation();
  

  useEffect(() => {
    if (valueR === `active`) {
      setDataDis(
        dataRes?.response?.filter(
          (item) => item?.user_status_counts?.[0]?._id === "approved"
        )
      );
    } else {
      setDataDis(
        dataRes?.response?.filter(
          (item) => item?.user_status_counts?.[0]?._id === "blocked"
        )
      );
    }
  }, [valueR, dataRes]);

  const option = [
    {
      value: `active`,
      label: t(`Активные`) + ` (${countActive})`,
    },
    {
      value: `blocked`,
      label: t(`Неактивные`) + `(${countNeActive})`,
    },
  ];

  const setSearchFn = (e) => {
    setSearch(e);
  };

  const { mutate: deleteData } = useDeleteDisTop({
    onSuccess: () => {
      refetch();
      setCountActive(0);
      setCountNeActive(0);
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: authStore.userData?.your_id,
          action_time: new Date(),
          role_slug: `top_dispatcher`,
          action_comment: `delete_first_dispatcher`,
          role_id: authStore.userData?.role_id,
          action_type: [`delete`],
        },
      });
    },
  });

  const deleteFuntion = (id) => {
    deleteData({
      id: id,
    });
  };

  

  const { mutate: userData, isLoading } = useUpdateUserInfo({
    onSuccess() {
      refetch();
      setCountActive(0);
      setCountNeActive(0);
    
    },
    onError(er) {
      console.log(er);
    },
  });

  const removeDisFn = (data) => {
    userData({
      data: {
        guid: data?.guid,
        user_status:
          data?.user_status?.[0] === `blocked` ? ["approved"] : ["blocked"],
      },
    });
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: data?.your_id,
        action_time: new Date(),
        role_slug: `top_dispatcher`,
        action_comment: `blocked_first_dispatcher`,
        role_id: authStore.userData?.role_id,
        action_type: [`update`],
      },
    });
  };

  const onChange = (e) => {
    setValueR(e);
  };

  const addPage = () => {};

  const driverSort = (status) => {
    if (status === `top`) {
      setData(data?.sort((a, b) => b?.driver_count - a?.driver_count));
    } else if (status === `back`) {
      setData(data?.sort((a, b) => a?.driver_count - b?.driver_count));
    } else {
      setData(dataDis);
    }
  };

  const carsSort = (status) => {
    if (status === `top`) {
      setData(data?.sort((a, b) => b?.vehicle_count - a?.vehicle_count));
    } else if (status === `back`) {
      setData(data?.sort((a, b) => a?.vehicle_count - b?.vehicle_count));
    } else {
      setData(dataDis);
    }
  };

  const newSort = (status) => {
    if (status === `top`) {
      setData(data?.sort((a, b) => b?.new_count - a?.new_count));
    } else if (status === `back`) {
      setData(data?.sort((a, b) => a?.new_count - b?.new_count));
    } else {
      setData(dataDis);
    }
  };

  const perfometSort = (status) => {
    if (status === `top`) {
      setData(data?.sort((a, b) => b?.performed_count - a?.performed_count));
    } else if (status === `back`) {
      setData(data?.sort((a, b) => a?.performed_count - b?.performed_count));
    } else {
      setData(dataDis);
    }
  };

  const nameSort = (status) => {
    if (status !== `all`) {
      setData(
        data?.sort((a, b) =>
          status === `top`
            ? a?.first_dispatcher_data?.full_name.localeCompare(
                b?.first_dispatcher_data?.full_name
              )
            : b?.first_dispatcher_data?.full_name.localeCompare(
                a?.first_dispatcher_data?.full_name
              )
        )
      );
    } else {
      setData(dataDis);
    }
  };

  const columns = [
    {
      title: t(`имя Диспетчера`),
      filter: true,
      key: `first_dispatcher_data.full_name`,
      filterType: (type) => nameSort(type),
      width: 350,
      render: (row, index) => row?.first_dispatcher_data?.full_name,
    },
    {
      title: t(`Номер телефона`),
      width: 350,
      render: (row, index) => row?.first_dispatcher_data?.phone,
    },
    {
      title: t(`Водители`),
      width: 250,
      filter: true,
      key: `driversCount`,
      filterType: (type) => driverSort(type),
      render: (row, index) => row?.driver_count,
      align:  `center`,
    },
    {
      title: t(`Машины`),
      width: 250,
      filter: true,
      key: `carsCount`,
      filterType: (type) => carsSort(type),
      render: (row, index) => row?.vehicle_count,
      align:  `center`,

    },
    {
      title: t(`Предложения`),
      width: 250,
      filter: true,
      key: `newCount`,
      filterType: (type) => newSort(type),
      render: (row, index) => row?.new_count,
      align:  `center`,

    },
    {
      title: t(`в исполнении`),
      width: 250,
      filter: true,
      key: `performedCount`,
      filterType: (type) => perfometSort(type),
      render: (row, index) => row?.performed_count,
      align:  `center`,

    },
    {
      title: t(`Статус аккаунта`),
      width: 250,
      render: (row, index) => (
        <Flex
          onClick={(e) => e.stopPropagation()}
          justifyContent={`space-between`}
          width={`100%`}
        >
          <p>
            {row?.first_dispatcher_data?.user_status?.[0] === `blocked`
              ? `Отключен`
              : `Активный`}
          </p>
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
                      onClick={(e) => e.stopPropagation()}
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
                            router.push(
                              `/${locale}/dispatcher/create?id=${row?.first_dispatcher_data?.guid}`
                            );
                          }}
                        >
                          {t(`Изменить личные данные`)}
                        </Box>
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
                            router.push(
                              `/${locale}/my-cars-dispatcher-top?id=${row?.first_dispatcher_data?.guid}`
                            );
                          }}
                        >
                          {t(`Доб./ удал. машины`)}
                        </Box>
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
                            removeDisFn(row?.first_dispatcher_data);
                            onClose();
                          }}
                        >
                          {row?.first_dispatcher_data?.user_status?.[0] ===
                          `blocked`
                            ? `Активировать диспетчера`
                            : t(`Отключить диспетчера`)}
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
                          {t(`Удалить диспетчера`)}
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

  return {
    t,
    data: data,
    option,
    valueR,
    setValueR,
    onChange,
    search,
    setSearchFn,
    deleteFuntion,
    addPage,
    columns,
    router,
  };
};
