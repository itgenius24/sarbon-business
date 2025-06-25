import {
  useCreateActionHistoriesMutation,
  useGetOfferTab,
  useUpdateCargo,
  useUpdateResponse,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { LoadOulineIcon, StoneIcon } from "@/assets/icons/icons";

import {
  Avatar,
  Box,
  Flex,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";

import cls from "./style.module.scss";

const usePerfomedPageProps = (orderStatus, t, locale) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(0);
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [reason, setReason] = useState(``);
  const [dataPred, setDataPred] = useState({});
  const params = useSearchParams();
  const [error, setError] = useState(false);
  const router = useRouter();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const guid = params.get(`guid`) || 0;

  const getOfferCargo = useGetOfferTab(
    {
      limit: 40,
      offset: limit,
      data: JSON.stringify({
        users_id_2:
          role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" || guid
            ? undefined
            : guid
            ? guid
            : userId,
        users_id_3:
          role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" || guid
            ? guid
              ? guid
              : userId
            : undefined,
        with_relations: true,
        provisions: [orderStatus],
      }),
    },
    {
      enabled: Boolean(orderStatus === `performed`),
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const resData = res?.response || [];
        setData([...data, ...resData]);
      },
    }
  );

  const performedStatuses = {
    no_status: t("Hет статуса"),
    go_to_load: t("иду на загрузку"),
    wait_for_the_download: t("жду загрузку"),
    loading: t("загружаюсь"),
    go_to_unload: t("иду на разгрузку"),
    unloading: t("разгружаюсь"),
    unloaded: t("разгрузился"),
    complete_the_order: t("завершить заказ"),
    breaking: t("Поломка"),
    road_accident: t("ДТП"),
    in_active: t("неактивен"),
  };

   const obj = {
      after_payment: t(`Оплата после завершения`),
      prepayment: t(`Предоплата`),
      bank: t(`Банковский перевод`),
      cash: t(`Наличные`),
    };


  const addPage = () => {
    setLimit((prev) => prev + 40);
  };

  const updateResponseMutation = useUpdateResponse({
    onError(res) {
      console.error(res);
    },
  });
  const updateCargoData = useUpdateCargo({});

  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  function handleCancel() {
    onClose();
    if (reason.length > 0) {
      updateResponseMutation.mutate(
        {
          data: {
            guid: dataPred?.guid,
            provisions: ["cancellation"],
            who_cancellation: ["customer"],
            cancel_time: new Date(),
            reason: reason,
          },
        },
        {
          onSuccess() {
            setReason(``);
            setDisabled(false);
            if (role_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469") {
              actionCreate({
                data: {
                  user_name: authStore.userData.full_name,
                  phone_number: authStore.userData?.phone,
                  user_id: authStore.userData.guid,
                  increment_id: dataPred?.cargo_id_data?.number_of_order,
                  action_time: new Date(),
                  role_slug: `ceo`,
                  action_comment: `cancel_order`,
                  role_id: authStore.userData?.role_id,
                  reason: reason,
                  action_type: [`update`],
                },
              });
            } else if (role_id === "785678f2-fae7-4a00-8766-99ea67d3784f") {
              actionCreate({
                data: {
                  user_name: authStore.userData.full_name,
                  phone_number: authStore.userData?.phone,
                  user_id: authStore.userData.guid,
                  increment_id: dataPred?.cargo_id_data?.number_of_order,
                  action_time: new Date(),
                  role_slug: `first_dispatcher`,
                  action_comment: `cancel_order`,
                  role_id: authStore.userData?.role_id,
                  reason: reason,
                  action_type: [`update`],
                },
              });
            }

            toast({
              position: "top-right",
              title: "Груз отказан",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            setData([]);
            getOfferCargo?.refetch();
            setError(false);
          },
        }
      );
      updateCargoData.mutate({
        data: {
          order_status: ["active"],
          guid: dataPred?.cargo_id_data?.guid,
          accepted_offers: dataPred?.cargo_id_data?.accepted_offers + 1,
        },
      });
    } else {
      setError(true);
    }
  }

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
                    format(row?.cargo_id_data?.load_time, `yyyy-MM-dd`)}
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
                    format(row?.cargo_id_data?.date, `yyyy-MM-dd`)}
              </span>
            </p>
          </Flex>
        </Flex>
      ),
    },

    {
      title: t("Водитель"),
      width: 150,
      render: (row, index) => (
        <Flex className={cls.cardItem} gap={`7px`} alignItems={`center`}>
          <Box>
            <p style={{textAlign:`center`}} className={cls.title}>{row?.users_id_data?.full_name} </p>
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
                {row?.cargo_id_data?.bid_cash}{" "}
                {row?.cargo_id_data?.currency_id_data?.code}
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
      title: t("Статус"),
      width: 160,
      render: (row, index) => (
        <Box>
        
          {row?.performed_time && (
            <Box>
              <p  style={{textAlign:`center`}} className={cls.subTitle}>
                {format(row?.performed_time, ` dd.MM.yyyy HH:mm`)}
              </p>
            </Box>
          )}
            <p style={{textAlign:`center`}} className={cls.title}>
            {
              performedStatuses[
                row?.indicate_status?.[0]
                  ? row?.indicate_status?.[0]
                  : `Не cтатус`
              ]
            }
          </p>
        </Box>
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
  ];

  const onRow = (row) => {
    router.push(
      `/${locale}/my-loads/performed/${row.guid}?isFirst=true&&car_id=${row.cargo_id}&driver_id=${row.users_id_data?.guid}`
    );
  };

  return {
    cargoData: data,
    isLoading: getOfferCargo?.isLoading,
    isFetching: getOfferCargo?.isFetching,
    addPage,
    setDisabled,
    disabled,
    onClose,
    onOpen,
    isOpen,
    handleCancel,
    setReason,
    reason,
    setDataPred,
    error,
    columns,
    onRow,
  };
};

export default usePerfomedPageProps;
