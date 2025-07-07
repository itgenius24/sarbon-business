"use client";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetCreateAddress } from "@/services/api";
import authStore from "@/store/auth.store";
import { Avatar, Box, Flex, Tooltip } from "@chakra-ui/react";
import { useDebounce as useDebounce2 } from "use-debounce";
import { useState } from "react";
import cls from "./style.module.scss";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { format } from "date-fns";
import { BankIcon, FreeMoneIcon } from "@/assets/icons/icons";
import { ru } from "date-fns/locale";

export const useAllCargoDispatcher = () => {
  const { register, watch } = useForm();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const [search, setSearch] = useState(``);
  const [debouncedValue] = useDebounce2(search, 500);
  const [valueR, setValueR] = useState(`active`);
  const [data, setData] = useState([]);
  const [count,setCount] = useState([])


  const { data: dataRes, refetch } = useGetCreateAddress({
    data: {
      data: {
        object_data: {
          type: "all_cargo",
          cargo_status:valueR,
          search: debouncedValue,
          dispatcher_id: authStore.userData.guid,
        },
      },
    },
    querySettings: {
      select: (res) => {
        return {...res,response:res?.response?.flatMap(element => element.orders || [])};
      },
      onSuccess: (res) => {
        setCount(res?.active_count)
        setData(res?.response)
      },
      refetchOnWindowFocus: false,
    },
  });



  const negotiableOption = [
    {
      value: `active`,
      label: t(`Активные заказы`) + ` (${count?.filter(item => item?.status?.[0] === "performed")?.[0]?.count || 0})`,
    },
    {
      value: `in_active`,
      label: t(`Завершенные грузы`) + `(${count?.filter(item => item?.status?.[0] === "archive")?.[0]?.count|| 0})`,
    },
  ];

  const setSearchFn = (e) => {
    setData([]);
    setSearch(e);
  };
  const deleteFuntion = () => {
    return null;
  };

  const onChange = (e) => {
    setValueR(e);
    setData([]);
  };

  const fromSort = (val) => {
    if (val !== `all`) {
      const sortedData = data?.sort((a, b) =>
        val === `top`
          ? a?.cargo?.from.localeCompare(b?.cargo?.from)
          : b?.cargo?.from.localeCompare(a?.cargo?.from)
      );

      setData(sortedData);
    } else {
      setData(dataRes?.response);
    }
  };


  const toSort = (val) => {
    if (val !== `all`) {
      const sortedData = data?.sort((a, b) =>
        val === `top`
          ? a?.cargo?.to.localeCompare(b?.cargo?.to)
          : b?.cargo?.to.localeCompare(a?.cargo?.to)
      );

      setData(sortedData);
    } else {
      setData(dataRes?.response);
    }
  };

  const timeSort = (val) => {
    if (val !== "all") {
      const sortedData = [...data]?.sort((a, b) => {
        const timeA = new Date(a?.cargo?.load_time).getTime();
        const timeB = new Date(b?.cargo?.load_time).getTime();
  
        return val === "top" ? timeA - timeB : timeB - timeA;
      });
  
      setData(sortedData);
    } else {
      setData(dataRes?.response);
    }
  };
  

  const timeSortDate = (val) => {
    if (val !== "all") {
      const sortedData = [...data]?.sort((a, b) => {
        const timeA = new Date(a?.cargo?.date).getTime();
        const timeB = new Date(b?.cargo?.date).getTime();
  
        return val === "top" ? timeA - timeB : timeB - timeA;
      });
  
      setData(sortedData);
    } else {
      setData(dataRes?.response);
    }
  };



  const columns = [
    {
      title: t(`Откуда`),
      width: 350,
      filter:true,
      filterType:(type) => fromSort(type) ,
      render: (row, index) => (
        <Flex alignItems={`center`} gap={`7px`}>
       
          <Image
            className={cls.flag}
            width={30}
            height={30}
            src={row?.cargo?.flag_ot || `https://flagcdn.com/w320/${row?.cargo?.country_code_from?.toLowerCase()}.png`}
            alt="wef"
          />
          {row?.cargo?.from ? (
            row?.cargo?.from?.length > 20 ? (
              <Tooltip
                color={`black`}
                boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                background={`#fff`}
                label={`${row?.cargo?.from}`}
              >
                <span className={cls.countryName}>{`${row?.cargo?.from?.slice(
                  0,
                  20
                )}...`}</span>
              </Tooltip>
            ) : (
              <span className={cls.countryName}> {row?.cargo?.from}</span>
            )
          ) : (
            ``
          )}
        </Flex>
      ),
    },
    {
      title: t(`Куда`),
      width: 350,
      filter:true,
      filterType:(type) => toSort(type) ,
      render: (row, index) => (
        <Flex alignItems={`center`} gap={`7px`}>
          <Image
            className={cls.flag}
            width={30}
            height={30}
            src={row?.cargo?.flag_do ||  `https://flagcdn.com/w320/${row?.cargo?.country_code_to?.toLowerCase()}.png`}
            alt="wef"
          />
          {row?.cargo?.to ? (
            row?.cargo?.to?.length > 20 ? (
              <Tooltip
                color={`black`}
                boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                background={`#fff`}
                label={`${row?.cargo?.to}`}
              >
                <span className={cls.countryName}>{`${row?.cargo?.to?.slice(
                  0,
                  20
                )}...`}</span>
              </Tooltip>
            ) : (
              <span className={cls.countryName}> {row?.cargo?.to}</span>
            )
          ) : (
            ``
          )}
        </Flex>
      ),
    },
    {
      title: t(`Когда забрать`),
      width: 250,
      filter: true,
      key: `time`,
      filterType: (type) => timeSort(type),
      render: (row, index) =>
        !row?.cargo?.as_soon_as_a ? (
          <p className={cls.countryName}>
            {format(row?.cargo?.load_time, "d MMMM yyyy", { locale: ru })}
          </p>
        ) : (
          <p className={cls.countryName}>Готов к загрузке</p>
        ),
    },
    {
      title: t(`Когда доставить`),
      width: 250,
      filter: true,
      key: `time`,
      filterType: (type) => timeSortDate(type),
      render: (row, index) =>
        !row?.cargo?.as_soon_as_b ? (
          <p className={cls.countryName}>
            {format(row?.cargo?.date, "d MMMM yyyy", { locale: ru })}
          </p>
        ) : (
          <p className={cls.countryName}>Как можно скорее</p>
        ),
    },
    {
      title: t(`Общая стоимость`),
      width: 250,
      render: (row, index) => (
        <Box>

          {(row?.cargo?.bid_cash || row?.offers) ? (
            <Flex gap={`5px`} alignItems={`center`}>
              <Tooltip
                hasArrow
                fontWeight={400}
                fontSize={`13px`}
                placement="top"
                color={`black`}
                boxShadow={`none`}
                padding={`7px`}
                borderRadius={`4px`}
                background={`rgba(219, 216, 227, 1)`}
                label={
                  (row?.cargo?.payment_type === `payment_type`) === `Наличные`
                    ? `Наличные`
                    : `Банковский перевод`
                }
              >
                <span>
                  {(row?.cargo?.payment_type === `payment_type`) ===
                  `Наличные` ? (
                    <FreeMoneIcon />
                  ) : (
                    <BankIcon />
                  )}
                </span>
              </Tooltip>
              <p className={cls.countryName}>
                {row?.cargo?.bid_cash || row?.offers} {` `}
                {row?.currency_data[0]?.code || `USD`}
              </p>
            </Flex>
          ) : (
            <>
              <p className={cls.countryName}>{t("По запросу")}</p>
            </>
          )}
        </Box>
      ),
    },
    {
      title: t(`предоплатА`),
      width: 250,
      render: (row, index) => (
        <Box>
          {row?.cargo?.bid_cash || row?.offers ? (
            <>
              <span className={cls.countryName}>
                {(row?.cargo?.prepayment_percentage > 0 || row?.prepayment > 0)
                  ? `${row?.cargo?.prepayment_percentage || row?.prepayment} ${
                      row?.currency_data[0]?.code || `USD`
                    }`
                  : t("Без предоплаты")}
              </span>
            </>
          ) : (
            <>
              <p className={cls.countryName}>{t("По запросу")}</p>
            </>
          )}
        </Box>
      ),
    },
    {
      title: t(`Диспетчер`),
      width: 270,
      render: (row, index) => (
        <Flex width={`100%`} alignItems={`center`} gap={`10px`}>
          <Avatar
            size={`sm`}
            width={`35px`}
            height={`35px`}
            src={row?.first_dispatcher_data?.[0]?.photo}
            name={row?.first_dispatcher_data?.[0]?.full_name}
          />
          <p className={cls.disName}>
            {row?.first_dispatcher_data?.[0]?.full_name}
          </p>
        </Flex>
      ),
    },
  ];

  return {
    t,
    register,
    search,
    setSearchFn,
    deleteFuntion,
    negotiableOption,
    valueR,
    setValueR,
    onChange,
    columns,
    data: data,
    setSearch,
  };
};
