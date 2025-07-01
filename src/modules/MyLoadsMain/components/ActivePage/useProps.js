import {
  useCreateActionHistoriesMutation,
  useDeleteCargo,
  useGetUserCargo,
  useGetUserCargoAll,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { Box, Flex, Tooltip, useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

import cls from "./style.module.scss";
import { statusText } from "../../data";
import SelectStatus from "@/components/SelectStatus/SelectStatus";
import { LoadOulineIcon, StoneIcon } from "@/assets/icons/icons";
import { useRouter } from "next/navigation";

const useProps = (orderStatus, t, search, address, locale) => {
  const toast = useToast();
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(0);
 const router = useRouter();
  const [data, setData] = useState([]);

  const getAllUserCargo = useGetUserCargoAll({
    data: {
      data: {
        row_view_id: "5e8b88e5-5621-4761-8816-904e92ef1ec0",
        offset: limit,
        order: {},
        view_fields: [
          "package_quantity",
          "number_of_cars",
          "number_of_order",
          "straps_number",
          "bid_amount",
          "conditions",
          "comment",
          "driver_comment",
          "short_name",
          "phone",
          "moderator_comment",
          "duration",
          "width",
          "template_name",
          "location_name",
          "accepted_offers",
          "address_name",
          "flag_ot",
          "flag_do",
          "country_code_from",
          "country_code_to",
          "from",
          "to",
          "car_type",
          "product_type",
          "payment_description",
          "payment_type",
          "country_from",
          "country_to",
        ],
        search: search?.length > 0 ? search : ``,
        limit: search?.length > 0 ? 1000 : 100,
        users_id: ["b1ce9e78-273d-4591-af58-1912c8cba680"],
        cargo_type: ["cargo"],
        order_status: [orderStatus],
      },
    },
    querySettings: {
      enabled: Boolean(orderStatus === `active` || address),
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        {
          const resData = res?.response || [];

          if (search.length > 0) {
            // Qidiruv bo'lsa, faqat yangi datani chiqaramiz
            setData(resData || []);
          } else if (!address) {
            // Pagination: Agar offset 0 bo‘lsa (birinchi sahifa), data tozalanadi
            setData((prevData) =>
              limit === 0 ? resData : [...prevData, ...resData]
            );
          } else {
            // Agar boshqa holatlar bo‘lsa, data almashtiriladi
            setData(resData || []);
          }
        }
      },
    },
  });

  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const addPage = () => {
    setLimit((prev) => prev + 100);
  };

  const deleteCargo = useDeleteCargo({
    onSuccess() {
      setData([]);
      getAllUserCargo.refetch();
      toast({
        position: "top-right",
        title: "Груз успешно удален",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError(res) {
      console.error(res);
    },
  });

  const handleDelete = (id) => {
    deleteCargo.mutate({ id: id?.guid });
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: id?.number_of_order,
        action_time: new Date(),
        role_slug: `customer`,
        action_comment: `delete_cargo`,
        role_id: authStore.userData?.role_id,
        action_type: [`update`],
      },
    });
  };

  const columns = [
    {
      title: t("Откуда забрать"),
      width: 250,
      render: (row, index) => (
        <Flex className={cls.address} gap={`14px`} alignItems={`center`}>
          <Box display={`flex`} flexDirection={`column`}>
            <Image
              className={cls.flag}
              width={30}
              height={30}
              src={
                row?.flag_ot ||
                `https://flagcdn.com/w320/${row?.country_code_from?.toLowerCase()}.png`
              }
              alt="wef"
            />
            <p className={cls.country_code}>{row?.country_code_from}</p>
          </Box>

          <Flex>
            <p className={cls.title}>
              {row?.from ? (
                row?.from?.length > 20 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${row?.from}`}
                  >
                    <span>{`${row?.from.slice(0, 20)}...`}</span>
                  </Tooltip>
                ) : (
                  row?.from
                )
              ) : (
                row?.city_id_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || row?.city_id_data?.name
              )}
              <br />
              <span className={cls.subTitle}>
                {row?.as_soon_as_a
                  ? t("Готов к загрузке")
                  : row?.load_time && format(row?.load_time, `dd.MM.yyyy`)}
              </span>
            </p>
            {/* <div
                onClick={(e) => {
                  e.stopPropagation();
                  // copyFn(row?.from);
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
      width: 250,
      render: (row, index) => (
        <Flex className={cls.address} gap={`14px`} alignItems={`center`}>
          <Box display={`flex`} flexDirection={`column`}>
            <Image
              className={cls.flag}
              width={30}
              height={30}
              src={
                row?.flag_do ||
                `https://flagcdn.com/w320/${row?.country_code_to?.toLowerCase()}.png`
              }
              alt={row?.flag_do}
            />
            <p className={cls.country_code}>{row?.country_code_to}</p>
          </Box>
          <Flex>
            <p className={cls.title}>
              {row?.to ? (
                row?.to.length > 20 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${row?.to}`}
                  >
                    <span>{`${row?.to.slice(0, 20)}...`}</span>
                  </Tooltip>
                ) : (
                  row?.to
                )
              ) : (
                row?.city_id_2_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || row?.city_id_2_data?.name
              )}{" "}
              <br />
              <span className={cls.subTitle}>
                {row?.as_soon_as_b
                  ? t("Как можно скорее")
                  : row?.date && format(row?.date, `dd.MM.yyyy`)}
              </span>
            </p>
            {/* <div
                onClick={(e) => {
                  e.stopPropagation();
                  // copyFn(row?.to);
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
      title: t("Груз"),
      width: 170,
      render: (row, index) => (
        <>
          <Flex gap={`11px`}>
            <Flex gap={1} alignItems={"center"}>
              <StoneIcon /> <p className={cls.title}> {row?.weight}т</p>
            </Flex>
            <Flex gap={1} alignItems={"center"}>
              <LoadOulineIcon />{" "}
              <p className={cls.title}> {row?.volume_m3}м³</p>
            </Flex>
          </Flex>
          <span className={cls.subTitle}>
            {row?.[`product_type_${locale}`]
              ? row?.[`product_type_${locale}`]
              : row?.product_type}
          </span>
        </>
      ),
    },
    {
      title: t("Транспорт"),
      width: 200,
      render: (row, index) => (
        <Box>
          <p className={cls.title}>{row?.car_type}</p>
          {/* <span className={cls.subTitle}>{t("Задняя")}</span> */}
        </Box>
      ),
    },
    {
      title: t("Стомость"),
      width: 170,
      render: (row, index) => (
        <Box>
          {row?.bid_cash ? (
            <>
              <p className={cls.title}>
                {row?.bid_cash} {row?.currency_id_data?.code}
                <span className={cls.subTitle1}>
                  {row?.[`payment_type_${locale}`] || row?.payment_type
                    ? ` ${t(
                        row?.[`payment_type_${locale}`]
                          ? row?.[`payment_type_${locale}`]
                          : row?.payment_type
                      )}`
                    : t(" Безнал")}
                </span>
              </p>
              <span className={cls.subTitle}>
                {t("Аванс")}{" "}
                {row?.prepayment_percentage > 0
                  ? `${row?.prepayment_percentage} ${row?.currency_id_data?.code}`
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
      title: t("Статус груза"),
      width: 170,
      render: (row, index) => {
        return (
          <Box onClick={(e) => e.stopPropagation() }>
            {row?.order_status?.[0] === `active` ||
            row?.order_status?.[0] === `in_active` ? (
              <SelectStatus refetch={getAllUserCargo.refetch} row={row} t={t} />
            ) : (
              <p>{statusText[row?.order_status?.[0]]}</p>
            )}
          </Box>
        );
      },
    },
    {
      title: t("Обновлённое время"),
      width: 150,
      render: (row, index) =>
        row?.updated_time ? (
          <p className={cls.time}>
            {format(row?.updated_time, ` dd.MM.yyyy, HH:mm`)}
          </p>
        ) : (
          <p className={cls.time}>
            {format(row?.create_time, ` dd.MM.yyyy, HH:mm`)}
          </p>
        ),
    },

    {
      title: t("Номер груза"),
      width: 120,
      render: (row, index) => (
        <p className={cls.number_of_orders}>{row?.number_of_order}</p>
      ),
    },
  ];

  const onRow = (item) => {
    if (
      item?.order_status?.[0] === `active` ||
      item?.order_status?.[0] === `in_active`
    ) {
      router.push(`/${locale}/my-loads/${orderStatus}/${item?.guid}`);
    } else {
      return
    }
  };

  return {
    cargoData: data,
    isLoading: getAllUserCargo?.isLoading,
    isFetching: getAllUserCargo?.isFetching,
    addPage,
    handleDelete,
    columns,
    onRow,
  };
};

export default useProps;
