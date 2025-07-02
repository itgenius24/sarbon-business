import {
  useCreateActionHistoriesMutation,
  useGetNewPredData2,
  usePushNotificationMutation,
  useUpdateNoDriver,
  useUpdateNoteData,
  useUpdateResponse,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";
import cls from "./style.module.scss";
import { LoadOulineIcon, StoneIcon } from "@/assets/icons/icons";
import PopoverUserName from "@/components/PopoverUserName/PopoverUserName";

const useNewPageProps = ({
  orderStatus,
  t,
  refetchNewPred,
  refetchNoDisPred,
  refetchWaitingDriverCount,
  setNotificationId,
  notificationID,
  locale,
}) => {
  const router = useRouter();
  const role_id = authStore.userData.role_id;
  const dispatcher_type = authStore.userData.dispatcher_type?.[0];
  const toast = useToast();
  const params = useSearchParams();
  const guid = params.get(`guid`) || 0;
  const userId = authStore.userData.id;
  const [disabled, setDisabled] = useState(false);
  const [comments, setComments] = useState([]);
  const { watch, register } = useForm();
  const [dataPred, setDataPred] = useState(``);
  const [cancelData, setCancelData] = useState({});
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: canCelIsOpen,
    onClose: canCelOnClose,
    onOpen: canCelOnOpen,
  } = useDisclosure();

  const obj = {
    after_payment: t(`Оплата после завершения`),
    prepayment: t(`Предоплата`),
    bank: t(`Банковский перевод`),
    cash: t(`Наличные`),
  };

  const { mutate } = useUpdateNoteData({
    onSuccess: () => {
      setNotificationId(``);
    },
  });

  const comment = [
    {
      label: "Груз уже закрыт",
      key: "cargo_closed",
    },
    {
      label: "Предложенная цена нас не устраивает",
      key: "price_not_yet",
    },
    {
      label: "Погрузка аник эмас",
      key: "loading_unclear",
    },
    {
      label: "Ваша машина не подходит по габаритам груза",
      key: "truck_not_fit",
    },
    {
      label: "Свой вариант",
      key: "own_version",
    },
  ];

  const {
    data: newData,
    isFetching,
    refetch,
  } = useGetNewPredData2({
    data: {
      data: {
        object_data: {
          dispetchir_id: orderStatus === `new` ? (guid ? guid : userId) : ``,
          provisions:
            orderStatus === `new` ? ["new", "approve_by_customer"] : undefined,
        },
      },
    },
    querySettings: {
      select: (res) =>
        res?.response?.[0]?.order?.map((item) => ({
          ...item,
          users_id_data: item.users_id_data?.[0],
          users_id_2_data: item?.users_id_2_data?.[0],
        })),
      enabled: Boolean(
        orderStatus === `new` || orderStatus === `no_dispatcher`
      ),
      onSuccess: () => {
        if (notificationID) {
          mutate({
            data: {
              views: true,
              guid: notificationID,
            },
          });
        }
      },
    },
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   mutate({
  //     data: {
  //       views: true,
  //       guid: notificationID,
  //     },
  //   });
  // },[notificationID])

  const handleCheckboxChange = (key) => {
    setComments(
      (prev) =>
        prev.includes(key)
          ? prev.filter((item) => item !== key) // Agar tanlangan bo'lsa olib tashlash
          : [key] // Aks holda qo'shish
    );
  };

  const pushNotification = usePushNotificationMutation({
    onSuccess: () => {
      refetch();
      refetchNewPred();
      refetchNoDisPred();
      refetchWaitingDriverCount.refetch();
      onClose();
    },
  });
  const updateNoDriver = useUpdateNoDriver({
    onSuccess: () => {
      onClose();
    },
  });
  const updateResponseMutation = useUpdateResponse({
    onSuccess: () => {
      refetch();
      refetchNewPred();
      refetchNoDisPred();
      refetchWaitingDriverCount.refetch();
      onClose();
      canCelIsOpen();
    },
    onError(res) {
      console.error(res);
    },
  });

  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  function handleAccept(id, driverId) {
    pushNotification.mutate({
      data: {
        object_data: {
          guid: driverId,
          responses: id,
        },
      },
    });

    updateResponseMutation.mutate(
      {
        data: {
          guid: id,
          users_id_3: userId,
          approve_time_from_dispatcher: new Date().toISOString(),
          provisions: ["new", "approve_from_driver"],
          // response_status: ["approve_from_driver"],
        },
      },
      {
        onSuccess() {
          toast({
            position: "top-right",
            title: "Груз принят",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        },
      }
    );

    if (orderStatus === `new`) {
      if (authStore.userData.dispatcher_type?.[0] === `top_dispatcher`) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: dataPred?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `top_dispatcher`,
            action_comment: `accept_order`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      } else if (
        authStore.userData.dispatcher_type?.[0] === `first_dispatcher`
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: dataPred?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `first_dispatcher`,
            action_comment: `accept_order`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      }
    }

    if (orderStatus === `no_dispatcher`) {
      updateNoDriver.mutate({
        data: {
          users_id: dataPred?.users_id,
          users_id_2: authStore.userData.guid,
          firm_id: authStore.userData.firm_id || ``,
        },
      });
      if (authStore.userData.dispatcher_type?.[0] === `top_dispatcher`) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: dataPred?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `top_dispatcher`,
            action_comment: `accept_order_free_driver`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      } else if (
        authStore.userData.dispatcher_type?.[0] === `first_dispatcher`
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: dataPred?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `first_dispatcher`,
            action_comment: `accept_order_free_driver`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      }
    }
  }

  function handleCancel(cargo) {
    setCancelData(cargo);
    canCelOnOpen();
  }

  const handleCancelButton = () => {
    updateResponseMutation.mutate({
      data: {
        guid: cancelData?.guid,
        provisions: ["cancellation"],
        who_cancellation: ["customer"],
        cancel_time: new Date(),
        cancel_reason:
          comments?.[0] === `own_version` ? undefined : comments?.[0],
        reason: comments?.[0] === `own_version` ? watch(`comment`) : undefined,
      },
    });

    onClose();
    if (orderStatus === `new`) {
      if (authStore.userData.dispatcher_type?.[0] === `top_dispatcher`) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `top_dispatcher`,
            action_comment: `cancel_order`,
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      } else if (
        authStore.userData.dispatcher_type?.[0] === `first_dispatcher`
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `first_dispatcher`,
            action_comment: `cancel_order`,
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      } else if (
        authStore.userData?.role_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469"
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `ceo`,
            action_comment: `cancel_order`,
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
          },
        });
      }
    }
    if (orderStatus === `no_dispatcher`) {
      if (authStore.userData.dispatcher_type?.[0] === `top_dispatcher`) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `top_dispatcher`,
            action_comment: `cancel_order_free_driver`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
          },
        });
      } else if (
        authStore.userData.dispatcher_type?.[0] === `first_dispatcher`
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `first_dispatcher`,
            action_comment: `cancel_order_free_driver`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
          },
        });
      } else if (
        authStore.userData?.role_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469"
      ) {
        actionCreate({
          data: {
            user_name: authStore.userData.full_name,
            phone_number: authStore.userData?.phone,
            user_id: authStore.userData.guid,
            increment_id: cancelData?.cargo_id_data?.number_of_order,
            action_time: new Date(),
            role_slug: `ceo`,
            action_comment: `cancel_order_free_driver`,
            role_id: authStore.userData?.role_id,
            action_type: [`update`],
            cancel_reason:
              comments?.[0] === `own_version` ? undefined : comments?.[0],
            reason:
              comments?.[0] === `own_version` ? watch(`comment`) : undefined,
          },
        });
      }
    }
    toast({
      position: "top-right",
      title: "Груз отказан",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setComments([]);
    canCelOnClose();

    if (orderStatus === `no_dispatcher`) {
      updateNoDriver.mutate({
        data: {
          users_id: cancelData?.users_id,
          users_id_2: authStore.userData.guid,
          firm_id: authStore.userData.firm_id || ``,
        },
      });
    }
  };

  const columns = [
    {
      title: t("Откуда забрать"),
      width: 220,
      render: (row, index) => (
        <Flex className={cls.address} gap={`14px`} alignItems={`center`}>
          <Box display={`flex`} flexDirection={`column`}>
            <Image
              className={cls.flag}
              width={30}
              height={30}
              src={
                row?.cargo_id_data?.flag_ot ||
                `https://flagcdn.com/w320/${row?.cargo_id_data?.country_code_from?.toLowerCase()}.png`
              }
              alt="wef"
            />
            <p className={cls.country_code}>
              {row?.cargo_id_data?.country_code_from}
            </p>
          </Box>

          <Flex>
            <p className={cls.title}>
              {row?.cargo_id_data?.from ? (
                row?.cargo_id_data?.from?.length > 20 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${row?.cargo_id_data?.from}`}
                  >
                    <span>{`${row?.cargo_id_data?.from.slice(0, 20)}...`}</span>
                  </Tooltip>
                ) : (
                  row?.cargo_id_data?.from
                )
              ) : (
                row?.cargo_id_data?.city_id_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || row?.cargo_id_data?.city_id_data?.name
              )}
              <br />
              <span className={cls.subTitle}>
                {row?.cargo_id_data?.as_soon_as_a
                  ? t("Готов к загрузке")
                  : row?.cargo_id_data?.load_time &&
                    format(row?.cargo_id_data?.load_time, `dd.MM.yyyy`)}
              </span>
            </p>
            {/* <div
                    onClick={(e) => {
                      e.stopPropagation();
                      // copyFn(row?.cargo_id_data?.from);
                    }}
                    className={cls.copy}
                  >
                    <CopyIconAdress />
                  </div> */}
          </Flex>
        </Flex>
      ),
    },

    {
      title: t("Куда"),
      width: 220,
      render: (row, index) => (
        <Flex className={cls.address} gap={`14px`} alignItems={`center`}>
          <Box display={`flex`} flexDirection={`column`}>
            <Image
              className={cls.flag}
              width={30}
              height={30}
              src={
                row?.cargo_id_data?.flag_do ||
                `https://flagcdn.com/w320/${row?.cargo_id_data?.country_code_to?.toLowerCase()}.png`
              }
              alt={row?.cargo_id_data?.flag_do}
            />
            <p className={cls.country_code}>
              {row?.cargo_id_data?.country_code_to}
            </p>
          </Box>
          <Flex>
            <p className={cls.title}>
              {row?.cargo_id_data?.to ? (
                row?.cargo_id_data?.to.length > 20 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${row?.cargo_id_data?.to}`}
                  >
                    <span>{`${row?.cargo_id_data?.to.slice(0, 20)}...`}</span>
                  </Tooltip>
                ) : (
                  row?.cargo_id_data?.to
                )
              ) : (
                row?.cargo_id_data?.city_id_2_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || row?.cargo_id_data?.city_id_2_data?.name
              )}{" "}
              <br />
              <span className={cls.subTitle}>
                {row?.cargo_id_data?.as_soon_as_b
                  ? t("Как можно скорее")
                  : row?.cargo_id_data?.date &&
                    format(row?.cargo_id_data?.date, `dd.MM.yyyy`)}
              </span>
            </p>
          </Flex>
        </Flex>
      ),
    },

    {
      title: t("Водитель"),
      width: 130,
      render: (row, index) => (
        <Flex className={cls.cardItem} gap={`7px`} alignItems={`center`}>
          <Box>
            <PopoverUserName
              style={{
                fontSize: `13px`,
                padding: 0,
                color: `rgba(33, 31, 38, 1)`,
                lineHeight: `16px`,
                background: `red`,
              }}
              user_name={row?.users_id_data?.full_name}
              user_id={row?.users_id_data?.guid}
              locale={locale}
            />

            <a
              style={{
                borderBottom: `1px dashed black`,
              }}
              className={cls.subTitle}
              target="_blank"
              href={`https://t.me/${row?.users_id_data?.phone}`}
            >
              {row?.users_id_data?.phone}{" "}
            </a>
          </Box>
        </Flex>
      ),
    },

    {
      title: t("Груз"),
      width: 170,
      render: (row, index) => (
        <>
          <Flex gap={`11px`}>
            <Flex gap={1} alignItems={"center"}>
              <StoneIcon />{" "}
              <p className={cls.title}> {row?.cargo_id_data?.weight}т</p>
            </Flex>
            <Flex gap={1} alignItems={"center"}>
              <LoadOulineIcon />{" "}
              <p className={cls.title}> {row?.cargo_id_data?.volume_m3}м³</p>
            </Flex>
          </Flex>
          <span className={cls.subTitle}>
            {row?.cargo_id_data?.[`product_type_${locale}`]
              ? row?.cargo_id_data?.[`product_type_${locale}`]
              : row?.cargo_id_data?.product_type}
          </span>
        </>
      ),
    },
    {
      title: t("Транспорт"),
      width: 200,
      render: (row, index) => (
        <Box>
          {row?.vehicle_id_data?.car_number ? (
            <div>
              <p className={cls.title}>
                {row?.[`car_type_${locale}`] || row?.car_type}
              </p>
              <span className={cls.subTitle}>
                {row.vehicle_id_data?.car_number}
              </span>
            </div>
          ) : role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" ? (
            <p
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  `/${locale}/my-cars-dispatcher/add-car?driver_id=${
                    row?.users_id_data?.guid
                  }&guid=${row?.guid}&firm_id=${
                    row?.users_id_data?.firm_id
                      ? row?.users_id_data?.firm_id
                      : 0
                  }&full_name=${row?.users_id_data.full_name}&phone=${
                    row?.users_id_data.phone
                  }`
                );
              }}
              className={cls.addCar}
            >
              {t(`Добавить машину`)}
            </p>
          ) : (
            <p className={cls.cardName}>{t(`Еще не добавлен`)}</p>
          )}
        </Box>
      ),
    },
    {
      title: t("Стомость"),
      width: 140,
      render: (row, index) => (
        <Box width={`140px`}>
          {row?.cargo_id_data?.bid_cash ? (
            <>
              <p className={cls.title}>
                {row?.cargo_id_data?.bid_cash} {row?.currency_id_data?.code}
                <span className={cls.subTitle1}>
                  {row?.payment_type?.[0]
                    ? ` ${obj[row?.payment_type?.[0]]}`
                    : ` ${row?.cargo_id_data?.payment_type}`}
                </span>
              </p>
              <span className={cls.subTitle}>
                {t("Аванс")}{" "}
                {row?.cargo_id_data?.prepayment_percentage > 0
                  ? `${row?.cargo_id_data?.prepayment_percentage} ${
                      row?.currency_id_data?.code || ``
                    }`
                  : t("Нет")}
              </span>
            </>
          ) : (
            <>
              <p className={cls.title}>{t("По запросу")}</p>
              <span className={cls.subTitle}>
                {t("Аванс")} {t("По запросу")}
              </span>
            </>
          )}
        </Box>
      ),
    },
    {
      title: t("Номер груза"),
      width: 120,
      render: (row, index) => (
        <p className={cls.number_of_orders}>
          {row?.cargo_id_data?.number_of_order}
        </p>
      ),
    },

    {
      title:
        role_id !== "785678f2-fae7-4a00-8766-99ea67d3784f" &&
        role_id !== "527d2017-2dc2-4449-9eeb-08fc1aafa469"
          ? t("Диспетчер")
          : t("Заказчик"),
      width: 150,
      render: (row, index) =>
        role_id !== "785678f2-fae7-4a00-8766-99ea67d3784f" &&
        role_id !== "527d2017-2dc2-4449-9eeb-08fc1aafa469" ? (
          <Flex
            onClick={(e) => e.stopPropagation()}
            width={`fit-content`}
            className={cls.cardItem}
            gap={`7px`}
            alignItems={`center`}
          >
            <Avatar
              width={`40px`}
              height={`40px`}
              size={`md`}
              src={row?.users_id_3_data?.logo}
              name={row?.users_id_3_data?.full_name}
            />
            <Box>
              <p className={cls.title}>{row?.users_id_3_data?.full_name} </p>
              <a
                style={{
                  borderBottom: `1px dashed black`,
                }}
                className={cls.subTitle}
                target="_blank"
                href={`https://t.me/${row?.users_id_3_data?.phone}`}
              >
                {row?.users_id_3_data?.phone}{" "}
              </a>
            </Box>
          </Flex>
        ) : (
          <Flex className={cls.cardItem} gap={`7px`} alignItems={`center`}>
            <Avatar
              width={`40px`}
              height={`40px`}
              size={`md`}
              src={row?.users_id_2_data?.logo}
              name={row?.users_id_2_data?.full_name}
            />
            <Box>
              <p className={cls.title}>{row?.users_id_2_data?.full_name} </p>
              <a
                style={{
                  borderBottom: `1px dashed black`,
                }}
                className={cls.subTitle}
                target="_blank"
                href={`https://t.me/${row?.users_id_2_data?.phone}`}
              >
                {row?.users_id_2_data?.phone}{" "}
              </a>
            </Box>
          </Flex>
        ),
    },
    {
      title: t("Принять"),
      width: 130,
      render: (row, index) =>
        role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" &&
        dispatcher_type === `first_dispatcher` &&
        row?.cargo_id_data?.order_status?.[0] !== `in_active` && (
          <Button
            width={`130px`}
            height={`40px`}
            fontSize={`13px`}
            backgroundColor={`var(--primary)`}
            color={`white`}
            onClick={(e) => {
              setDataPred(row);
              onOpen();
            }}
          >
            {t(`Принять`)}
          </Button>
        ),
    },
  ];

  return {
    newData: newData || [],
    isLoading: isFetching,
    comments,
    setComments,
    setDataPred,
    handleAccept,
    handleCancel,
    handleCancelButton,
    dataPred,
    onClose,
    disabled,
    setDisabled,
    disabledBtn: updateResponseMutation.isLoading,
    obj,
    onOpen,
    isOpen,
    canCelIsOpen,
    canCelOnClose,
    canCelOnOpen,
    comment,
    handleCheckboxChange,
    watch,
    register,
    columns,
  };
};

export default useNewPageProps;
