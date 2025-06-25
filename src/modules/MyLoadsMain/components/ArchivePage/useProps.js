import { useGetOffer } from "@/services/api";
import authStore from "@/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { LoadOulineIcon, StoneIcon } from "@/assets/icons/icons";

import { Avatar, Box, Button, Flex, Tooltip, useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";

import cls from "./style.module.scss";

const useProps = (orderStatus, t, locale, setOpen) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(0);
  const [data, setData] = useState([]);
  const router = useRouter();
  const params = useSearchParams();

  const guid = params.get(`guid`) || 0;

  const getOfferCargo = useGetOffer(
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
      enabled: Boolean(orderStatus === `archive`),
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const resData = res?.response || [];
        setData([...data, ...resData]);
      },
    }
  );

  const addPage = () => {
    setLimit((prev) => prev + 40);
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
      width: 250,
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
            {/* <div
                    onClick={(e) => {
                      e.stopPropagation();
                      // copyFn(row?.cargo_id_data?.to);
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
              onClick={() =>
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
                )
              }
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
      width: 130,
      render: (row, index) => (
        <Box>
          {row?.cargo_id_data?.bid_cash ? (
            <>
              <p className={cls.title}>
                {row?.cargo_id_data?.bid_cash}{" "}
                {row?.cargo_id_data?.currency_id_data?.code}
                <span className={cls.subTitle1}>
                  {row?.cargo_id_data?.[`payment_type_${locale}`] ||
                  row?.cargo_id_data?.payment_type
                    ? ` ${t(
                        row?.cargo_id_data?.[`payment_type_${locale}`]
                          ? row?.cargo_id_data?.[`payment_type_${locale}`]
                          : row?.cargo_id_data?.payment_type
                      )}`
                    : t(" Безнал")}
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
      title: t("Pасстояние"),
      width: 100,
      render: (row, index) => (
        <p className={cls.title}>
          {row?.cargo_id_data?.distance?.toFixed(1) || 0} км
        </p>
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
      width: 180,
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

  useEffect(() => {
    if (role_id === `785678f2-fae7-4a00-8766-99ea67d3784f`) {
      columns.push({
        title: t("Оставить"),
        width: 130,
        render: (row, index) => (
          <Flex
            className={cls.cardItem}
            width={`100%`}
            gap={`7px`}
            alignItems={`center`}
          >
            <Button
              width={`130px`}
              height={`40px`}
              fontSize={`14px`}
              onClick={() => setOpen(row)}
            >
              Оставить отзыв
            </Button>
          </Flex>
        ),
      });
    }
  }, []);

  return {
    cargoData: data,
    isLoading: getOfferCargo?.isLoading,
    isFetching: getOfferCargo?.isFetching,
    addPage,
    columns,
  };
};

export default useProps;
