import { useGetUserCargo } from "@/services/api";
import authStore from "@/store/auth.store";
import { keepPreviousData, } from "@tanstack/react-query";
import { useState } from "react";

import {
  LoadOulineIcon,
  StoneIcon,
} from "@/assets/icons/icons";

import { Box, Flex, Tooltip, useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";

import cls from "./style.module.scss";
import { statusText } from "../../data";
import SelectStatus from "@/components/SelectStatus/SelectStatus";
import { useRouter } from "next/navigation";


const useProps = (orderStatus, t,locale) => {
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(40);
  const router = useRouter()
  const getAllUserCargo = useGetUserCargo(
    {
      limit,
      offset: 0,
      data: JSON.stringify({
        users_id: userId,
        with_relations: true,
        cargo_type: ["cargo"],
        order_status: [orderStatus],
      }),
    },
    {
      placeholderData: keepPreviousData,
      enabled: Boolean(orderStatus === `in_active`),
    }
  );



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
        title: t("Стоимость"),
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
            <Box  onClick={(e) => e.stopPropagation()}>
              {row?.order_status?.[0] === `active` ||
              row?.order_status?.[0] === `in_active` ? (
                <SelectStatus  refetch={getAllUserCargo.refetch} row={row} t={t} />
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
              { format(row?.create_time, ` dd.MM.yyyy, HH:mm`)}
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

  return {
    cargoData: getAllUserCargo.data?.response || [],
    isLoading: getAllUserCargo?.isLoading,
    isFetching: getAllUserCargo?.isFetching,
    columns,onRow
    
  };
};

export default useProps;
