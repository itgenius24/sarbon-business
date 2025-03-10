"use client";
import cls from "./styles.module.scss";
import { useTranslation } from "@/app/i18n/client";
import { DataList } from "@/components/DataList";
import { Rating } from "@/components/Rating";
import { useGetLang } from "@/hooks/useGetLang";
import {
  useGetCargoList,
  useGetDriverLocation,
  useGetDriverPosition,
  useGetMaps,
  useGetOffer,
  useGetSortedGPSHistory,
  useGetWithLocation,
} from "@/services/api";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAddCargoContext } from "../../providers";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Documents } from "../Documents/Documents";
import {
  AndroidIcon,
  AppleIcon,
  BatareyFullIcon,
  BatareyIcon,
  BluetoothIcon,
  CarIconXM,
  FurIcon,
  IocnPrev,
  LoadIconXM,
  LocationActiveIcon,
  LocationMobileIcon,
  ResToreIcon,
} from "@/assets/icons/icons";
import {
  Map,
  Placemark,
  Polyline,
  Routed,
  TypeSelector,
  YMaps,
} from "@pbe/react-yandex-maps";
import { AccordionMap } from "./AccordionMap";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { format } from "date-fns";
import authStore from "@/store/auth.store";
import { ru } from "date-fns/locale";
import { formatDateTime } from "@/utils/formatDateTime";
import { Container } from "@/components/Container";

export const ShareLocationModule = () => {
  const searchParams = useSearchParams();
  // const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState([]);

  const [offset, setOffset] = useState(0);
  const [allPositions, setAllPositions] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const carId = searchParams.get(`cargo_id`);
  const userId = searchParams.get(`user_id`);
  const orderId = searchParams.get(`order_id`);
  const [orderId2, setOrderId2] = useState(orderId);

  const firm_id = authStore.userData.firm_id;
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const [gpsHistory, setGpsHistory] = useState();
  const [page, setPage] = useState(0);

  const [breakRequest, setBreakRequest] = useState(false);

  const getDriverLocation = useGetDriverLocation(
    { data: JSON.stringify({ users_id: userId }) },
    { enabled: !!userId }
  );

  console.log(`getDriverLocation`, getDriverLocation?.data?.response?.[0]);

  const getMaps = useGetMaps(
    {
      data: JSON.stringify({ cargo_id: carId }),
    },
    { enabled: !!carId }
  );

  const getOfferCount = useGetOffer(
    {
      data: JSON.stringify({
        guid: orderId,
        with_relations: true,
      }),
    },
    { enabled: Boolean(orderId) }
  );

  // console.log(`getOfferCount`, getOfferCount?.data?.response);

  const getGPSHistory = useGetSortedGPSHistory({
    onSuccess(data) {
      if (data?.response?.length === 100) {
        setPage(page + 1);
      }
      if (data.response) {
        setGpsHistory((prev) => [
          ...prev,
          ...data.response.map((item) => [item?.lat, item?.long]),
        ]);
      }
      if (data.response === null && !breakRequest) {
        setBreakRequest(true);
        getGPSHistory.mutate({
          data: {
            object_data: {
              user_id: userId,
              page,
              limit: 100,
            },
          },
        });
      }
    },
  });

  const { data: getDriverPosition } = useGetDriverPosition({
    params: {
      offset: offset,
      limit: 7000,
      data: JSON.stringify({
        users_id: userId,
        order_id: orderId2,
      }),
    },
    querySettings: {
      enabled: Boolean(userId) && isLoadingMore,
      // enabled: Boolean(userId),
    },
  });

  const { mutate: dataLocation, isLoading } = useGetWithLocation({
    onSuccess: (res) => {
      setUserData(res?.response);
    },
  });

  useEffect(() => {
    dataLocation({ data: { object_data: { firm_id: firm_id, cargo_id: `` } } });
  }, []);

  useEffect(() => {
    if (userId) {
      getGPSHistory.mutate({
        data: {
          object_data: {
            user_id: userId,
            page,
            limit: 500,
          },
        },
      });
    }
  }, [userId, page]);

  useEffect(() => {
    if (getDriverPosition?.response) {
      if (
        getDriverPosition?.response.length === 0 &&
        orderId2 &&
        offset === 0
      ) {
        setOrderId2(undefined);
        setOffset(0);
      } else {
        setAllPositions((prev) => [...prev, ...getDriverPosition.response]);
        if (getDriverPosition?.response.length > 0) {
          setOffset(offset + 7000);
        }
      }
    }
  }, [getDriverPosition?.response]);

  const address1 = getOfferCount?.data?.response?.[0]?.cargo_id_data?.from;
  const address2 = getOfferCount?.data?.response?.[0]?.cargo_id_data?.to;

  console.log(`salom`, allPositions);
  return (
    <Container>
      <Box mt={20}>
        <Box p="14px" borderRadius="12px">
          <h2 className={cls.address}>
            <span className={cls.addressText}>
              <span className={cls.addressCountry}>
                <span className={cls.addressCity}>
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={address1}
                  >
                    <span>
                      {address1?.length >= 20
                        ? `${address1?.slice(0, 20)}...`
                        : address1}
                    </span>
                  </Tooltip>
                </span>

                {getOfferCount?.data?.response?.[0] &&
                  (getOfferCount?.data?.response?.[0]?.cargo_id_data
                    ?.as_soon_as_a ? (
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: `12px`,
                        color: `rgba(126, 123, 134, 1)`,
                      }}
                    >
                      {getOfferCount?.data?.response?.[0]?.cargo_id_data?.country_code_from?.toUpperCase()}{" "}
                      /{" "}
                      <span
                        style={{
                          fontSize: `12px`,
                          color: `rgba(126, 123, 134, 1)`,
                        }}
                      >
                      {t(`Готов к загрузке`)}
                      </span>
                    </p>
                  ) : (
                    getOfferCount?.data?.response?.[0]?.cargo_id_data
                      ?.load_time &&
                    format(
                      new Date(
                        getOfferCount?.data?.response?.[0]?.cargo_id_data?.load_time
                      ).setHours(
                        new Date(
                          getOfferCount?.data?.response?.[0]?.cargo_id_data?.load_time
                        ).getHours() - 5
                      ),
                      "dd-MMMM",
                      { locale: ru }
                    )
                  ))}
              </span>
              <span>-&gt;</span>
              <span className={cls.addressCountry}>
                <span className={cls.addressCity}>
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${address2}`}
                  >
                    <span>
                      {address2?.length >= 20
                        ? `${address2?.slice(0, 20)}...`
                        : address2}
                    </span>
                  </Tooltip>
                </span>

                {getOfferCount?.data?.response?.[0] &&
                getOfferCount?.data?.response?.[0]?.cargo_id_data
                  ?.as_soon_as_b ? (
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: `12px`,
                      color: `rgba(126, 123, 134, 1)`,
                    }}
                  >
                    {getOfferCount?.data?.response?.[0]?.cargo_id_data?.country_code_to?.toUpperCase()}{" "}
                    /{" "}
                    <span
                      style={{
                        fontSize: `12px`,
                        color: `rgba(126, 123, 134, 1)`,
                      }}
                    >
                     {t(`Как можно скорее`)}
                    </span>
                  </p>
                ) : (
                  getOfferCount?.data?.response?.[0]?.cargo_id_data?.date &&
                  format(
                    new Date(
                      getOfferCount?.data?.response?.[0]?.cargo_id_data?.date
                    ).setHours(
                      new Date(
                        getOfferCount?.data?.response?.[0]?.cargo_id_data?.date
                      ).getHours() - 5
                    ),
                    "dd-MMMM",
                    { locale: ru }
                  )
                )}
              </span>
            </span>
          </h2>
        </Box>
        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : getOfferCount?.data?.response?.length > 0 ? (
            <Accordion defaultIndex={[0]} allowToggle>
              {getOfferCount?.data?.response?.map((user, index) => {
                return (
                  <>
                    <AccordionItem key={index} className={cls.accordionItem}>
                      <AccordionButton
                        onClick={() => {
                          // setUserId(user?.users_gps?.users_id);
                          // setCarId(user?.cargo_id);
                          setGpsHistory([]);
                        }}
                        className={cls.accordionButton}
                      >
                        <div className={cls.userDataWarp}>
                          <div className={cls.userWrap}>
                            <Avatar
                              color={"white"}
                              name={`FN`}
                              src={user?.users_id_data?.photo}
                            />
                            <div className={cls.user}>
                              <p className={cls.userName}>
                                {/* {user?.users_id_data?.full_name.slice(0,1)} */}
                              </p>
                              <p className={cls.userTel}>
                                +998 XXX XX XX
                              </p>
                            </div>
                          </div>

                          <div className={cls.phoneDataWrap}>
                            <div className={cls.item}>
                              {getDriverLocation?.data?.response?.[0].gps ? (
                                <LocationActiveIcon />
                              ) : (
                                <LocationMobileIcon />
                              )}
                              <div className={cls.itemText}>
                                <p className={cls.phoneItemTitle}>
                                  {t(`Геолокация`)}
                                </p>
                                <Flex
                                  gap={`5px`}
                                  alignItems={`center`}
                                  className={cls.phoneItemName}
                                >
                                  <span
                                    style={{ fontWeight: 600 }}
                                    className={cls.phoneItemName}
                                  >
                                    {getDriverLocation?.data?.response?.[0].gps
                                      ? "Выкл "
                                      : "Откл "}
                                  </span>
                                  <ResToreIcon />
                                  <span className={cls.phoneItemTitle}>
                                    {getDriverLocation?.data?.response?.[0]
                                      .update_time &&
                                      formatDateTime(
                                        getDriverLocation?.data?.response?.[0]
                                          .update_time
                                      )}
                                  </span>
                                </Flex>
                              </div>
                            </div>
                            <div className={cls.item}>
                              {getDriverLocation?.data?.response?.[0].os ===
                              "android" ? (
                                <AndroidIcon />
                              ) : (
                                <AppleIcon />
                              )}
                              <div className={cls.itemText}>
                                <p className={cls.phoneItemTitle}>
                                  {t("Смартфон")}
                                </p>
                                <p className={cls.phoneItemName}>
                                  {getDriverLocation?.data?.response?.[0].os}{" "}
                                </p>
                              </div>
                            </div>
                            <div className={cls.item}>
                              <FurIcon />
                              <div className={cls.itemText}>
                                <p className={cls.phoneItemTitle}>
                                  {t("Версия Sarbon")}
                                </p>
                                <p className={cls.phoneItemName}>
                                  {
                                    getDriverLocation?.data?.response?.[0]
                                      .version
                                  }{" "}
                                </p>
                              </div>
                            </div>

                            <div className={cls.item}>
                              {getDriverLocation?.data?.response?.[0].battery >
                              19 ? (
                                <BatareyFullIcon />
                              ) : (
                                <BatareyIcon />
                              )}
                              <div className={cls.itemText}>
                                <p className={cls.phoneItemTitle}>
                                  {t("Батарея")}
                                </p>
                                <p className={cls.phoneItemName}>
                                  {
                                    getDriverLocation?.data?.response?.[0]
                                      .battery
                                  }
                                  %{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel position={`relative`}>
                        {getGPSHistory.isLoading ? (
                          <Box height={"600px"}>
                            <LoadingSpinner />
                          </Box>
                        ) : (
                          <>
                            <YMaps>
                              <AccordionMap
                                gpsHistory={gpsHistory}
                                getDriverPosition={allPositions?.map((item) => [
                                  item?.lat,
                                  item?.long,
                                ])}
                                driverPosition={[
                                  getDriverLocation?.data.response?.[0]?.lat,
                                  getDriverLocation?.data.response?.[0]?.long,
                                ]}
                                getMaps={getMaps}
                              />
                            </YMaps>
                            <Flex
                              justifyContent={`space-between`}
                              gap={`10px`}
                              alignItems={`center`}
                              className={cls.adressWrap}
                            >
                              <Box>
                                <p className={cls.adressTitle}>
                                  <Tooltip
                                    color={`black`}
                                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                                    background={`#fff`}
                                    label={`${user?.cargo_id_data?.from}`}
                                  >
                                    <span>{`${user?.cargo_id_data?.from.slice(
                                      0,
                                      10
                                    )}...`}</span>
                                  </Tooltip>
                                </p>
                                <p className={cls.adressDesk}>
                                  <span>
                                    {user?.cargo_id_data?.country_code_from}
                                  </span>
                                  /
                                  {user.cargo_id_data?.as_soon_as_a
                                    ? `Готов к загрузке`
                                    : format(
                                        new Date(
                                          user?.cargo_id_data?.load_time
                                        ).setHours(
                                          new Date(
                                            user?.cargo_id_data?.load_time
                                          ).getHours() - 5
                                        ),
                                        "dd-MMMM",
                                        { locale: ru }
                                      )}
                                </p>
                              </Box>
                              <IocnPrev />
                              <Box>
                                <p className={cls.adressTitle}>
                                  <Tooltip
                                    color={`black`}
                                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                                    background={`#fff`}
                                    label={`${user?.cargo_id_data?.to}`}
                                  >
                                    <span>{`${user?.cargo_id_data?.to.slice(
                                      0,
                                      10
                                    )}...`}</span>
                                  </Tooltip>
                                </p>
                                <p className={cls.adressDesk}>
                                  <span>
                                    {user?.cargo_id_data?.country_code_to}
                                  </span>
                                  /
                                  { user.cargo_id_data?.as_soon_as_b ? `Как можно скорее` : format(
                                    new Date(
                                      user?.cargo_id_data?.date
                                    ).setHours(
                                      new Date(
                                        user?.cargo_id_data?.date
                                      ).getHours() - 5
                                    ),
                                    "dd-MMMM",
                                    { locale: ru }
                                  )}
                                </p>
                              </Box>
                            </Flex>
                          </>
                        )}

                        <Flex
                          justifyContent={`space-between`}
                          alignItems={`center`}
                          mt={10}
                        >
                          <Flex gap={`40px`} alignItems={`center`}>
                            <Flex gap={`8px`}>
                              <CarIconXM />
                              <Box>
                                <p className={cls.title}>
                                  {user?.cargo_id_data?.car_type}:
                                  {userData?.length} /{" "}
                                  {user?.cargo_id_data?.number_of_cars}
                                </p>
                                <p className={cls.subTitle}>
                                  {" "}
                                  {user?.vehicle_id_data?.car_number}
                                </p>
                              </Box>
                            </Flex>
                            <Flex gap={`8px`}>
                              <LoadIconXM />
                              <Box>
                                <p className={cls.title}>
                                  {user?.cargo_id_data?.product_type}
                                </p>
                                <p className={cls.subTitle}>
                                  {" "}
                                  {user?.cargo_id_data?.weight}
                                  {t("т")} / {user?.cargo_id_data?.volume_m3}{" "}
                                  {t("м³")}
                                </p>
                              </Box>
                            </Flex>
                          </Flex>
                          {/* <Flex
                            gap={`39px`}
                            background={`rgba(237, 246, 255, 1)`}
                            borderRadius={`10px`}
                            p={`13px 18px`}
                          >
                            <Box>
                              <p className={cls.subTitle}>{t("Тип оплаты")}:</p>
                              <p className={cls.title}>
                                {t(
                                  user?.cargo_id_data?.map_id_data?.payment_type
                                )}
                              </p>
                            </Box>
                            <Box>
                              <p className={cls.subTitle}>{t("Предоплата")}:</p>
                              <p className={cls.title}>
                                {user?.cargo_id_data?.prepayment_percentage}{" "}
                                {user?.cargo_id_data?.currency_id_data?.code}
                              </p>
                            </Box>
                            <Box>
                              <p className={cls.subTitle}>{t("Сумма")}: </p>
                              <p
                                className={cls.title}
                                style={{ color: `rgba(0, 122, 255, 1)` }}
                              >
                                {user?.cargo_id_data?.bid_cash}{" "}
                                {user?.cargo_id_data?.currency_id_data?.code}
                              </p>
                            </Box>
                          </Flex> */}
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  </>
                );
              })}
            </Accordion>
          ) : (
            <Flex
              className={cls.noData}
              width={`100%`}
              height={`170px`}
              alignItems={`center`}
              justifyContent={`center`}
            >
              No data
            </Flex>
          )}
        </>
      </Box>
    </Container>
  );
};
