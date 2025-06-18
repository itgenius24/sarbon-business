"use client";
import cls from "./styles.module.scss";
import { useTranslation } from "@/app/i18n/client";
import { DataList } from "@/components/DataList";
import { Rating } from "@/components/Rating";
import { useGetLang } from "@/hooks/useGetLang";
import {
  useGetDriverLocation,
  useGetDriverPosition,
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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import Script from "next/script";
import { use, useEffect, useMemo, useRef, useState } from "react";
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
  CopyIcon,
  FurIcon,
  IocnPrev,
  LoadIconXM,
  LocationActiveIcon,
  LocationMobileIcon,
  ResToreIcon,
} from "@/assets/icons/icons";
import {
  YMaps,
} from "@pbe/react-yandex-maps";
import { AccordionMap } from "./AccordionMap";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { format } from "date-fns";
import authStore from "@/store/auth.store";
import { ro, ru } from "date-fns/locale";
import { formatDateTime } from "@/utils/formatDateTime";
import copy from "copy-to-clipboard";

export const TopContent = ({
  address1 = "",
  address2 = "",
  proposedAmount,
  userName,
  rating,
  transportModel,
  prepayment,
  paymentAfterFinish,
  driverComment,
  status,
  permission,
  currency,
  getMaps,
  id,
  cargoData,
}) => {
  const { watch, handleUploadDocument, getEmptyFileName, getValues } =
    useAddCargoContext();

  const [userId, setUserId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userData, setUserData] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const firm_id = authStore.userData.firm_id;
  const paramsId = searchParams.get("car_id");
  const driver_id = searchParams.get("driver_id"); 
  const params = useParams()
  const locale = useGetLang();
  const role_id = authStore.userData.role_id;
  const [offset, setOffset] = useState(0);
  const [allPositions, setAllPositions] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const { t } = useTranslation(locale, "translations");

  const list = [
    {
      title: t("Водитель: "),
      value: userName || "",
    },
    {
      title: t("Модель транспорта: "),
      value: transportModel || "",
    },
    {
      title: t("Предлагаемая сумма: "),
      value: proposedAmount
        ? proposedAmount + " " + (currency ? currency : "")
        : "",
    },
    {
      title: t("Рейтинг водителя: "),
      value: <Rating value={Math.round(rating)} />,
    },
    {
      title: t("Предоплата: "),
      value: `${prepayment ? prepayment : ""} ${
        permission === "in_percentages" ? "%" : currency ? currency : ""
      }`,
    },
    {
      title: t("Оплата после завершения: "),
      value: `${paymentAfterFinish ? paymentAfterFinish : ""} ${
        permission === "in_percentages" ? "%" : currency || ""
      }`,
    },
    {
      title: t("Комментария водителя: "),
      value: driverComment || "",
      grow: true,
    },
  ];

  const getDriverLocation = useGetDriverLocation(
    { data: JSON.stringify({ users_id: userId }) },
    { enabled: !!(status === "performed" && userId) }
  );

  // const getGPSHistory = useGetGPSHistory(
  //   { data: JSON.stringify({ user_id: userId2 }) },
  //   { enabled: !!(status === "performed" && userId2) }
  // );
  const [gpsHistory, setGpsHistory] = useState([]);
  const [page, setPage] = useState(0);

  const [breakRequest, setBreakRequest] = useState(false);

  const getGPSHistory = useGetSortedGPSHistory({
    onSuccess(data) {
      if (data?.response?.length === 100) {
        setPage(page + 1);
      }
      if (data.response) {
        const data2 = data?.response?.map((item) => [item?.lat, item?.long]);
        setGpsHistory((prev) => [...prev, ...data2]);
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

  const driverPosition = useMemo(() => {
    return [
      getDriverLocation?.data?.response?.[0]?.lat,
      getDriverLocation?.data?.response?.[0]?.long,
    ];
  }, [getDriverLocation?.data?.response?.[0]]);

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const { mutate: dataLocation, isLoading } = useGetWithLocation({
    onSuccess: (res) => {
      setUserData(res?.response);
      setUserId(res?.response?.[0]?.order?.[0]?.users_gps?.users_id);
      setOrderId(res?.response?.[0]?.order?.[0]?.guid);
    },
  });

  useEffect(() => {
    if (paramsId || id === `performed`) {
      dataLocation({
        data: {
          object_data: { cargo_id: paramsId ? paramsId : ``, firm_id: ``,driver_id:driver_id},
        },
      });
    }
  }, [paramsId, id === `performed`]);

  var myMap = useRef(null);
  var multiRoute = useRef(null);
  var myPolyline = useRef(null);
  var myPlaceMark = useRef(null);

  useEffect(() => {
    if (status === "performed" && userId) {
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
  }, [status, userId, page]);

  useEffect(() => {
    if (myPolyline.current) {
      myPolyline.current.geometry.setCoordinates(gpsHistory ? gpsHistory : []);
    }
    if (multiRoute.current) {
      if (watch("loadings")?.[0]?.cor && watch("unloading")?.[0]?.cor) {
        multiRoute.current.model.setReferencePoints([
          watch("loadings")?.[0]?.cor,
          watch("unloading")?.[0]?.cor,
        ]);
      }
    }
  }, [watch("loadings"), watch("unloading"), gpsHistory]);

  useEffect(() => {
    if (myMap.current) {
      if (driverPosition.some((item) => item)) {
        myMap.current.setCenter(driverPosition, 15);
      }
    }

    if (driverPosition.some((item) => item) && myPlaceMark.current) {
      myPlaceMark.current.geometry.setCoordinates(driverPosition);
    }
  }, [driverPosition]);

  useEffect(() => {
    const timer = setInterval(() => {
      getDriverLocation.refetch();
    }, 50000);

    const historyTimer = setInterval(() => {
      getDriverLocation.refetch();
    }, 50000);

    return () => {
      clearInterval(timer);
      clearInterval(historyTimer);
    };
  }, []);

  const { data: getDriverPosition } = useGetDriverPosition({
    params: {
      offset: offset,
      limit: 7000,
      data: JSON.stringify({
        users_id: userId,
        order_id: orderId,
      }),
    },
    querySettings: {
      enabled: Boolean(userId) && isLoadingMore,
      // enabled: Boolean(userId),
    },
  });

  useEffect(() => {
    if (getDriverPosition?.response) {
      if (getDriverPosition?.response.length === 0 && orderId && offset === 0) {
        setOrderId(undefined);
        setOffset(0);
      } else {
        setAllPositions((prev) => [...prev, ...getDriverPosition.response]);
        if (getDriverPosition?.response.length > 0) {
          setOffset(offset + 7000);
        }
      }
    }
  }, [getDriverPosition?.response]);

  const handleShare = (user, cargoData) => {
    copy(
      `https://sarbon.me/${locale}/share-location?user_id=${user?.users_gps?.users_id}&cargo_id=${cargoData?.cargo_id_data?.guid}&order_id=${user?.guid}`
    );
  };


  return (
    <Box>
      {status === "performed" && (
        <>
          <Flex alignItems={`center`} justifyContent={`space-between`}>
            <Box p="14px" borderRadius="12px">
              <h2 className={cls.address}>
                <span className={cls.addressText}>
                  <span className={cls.addressCountry}>
                    <span className={cls.addressCity}>
                      <Tooltip
                        color={`black`}
                        boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                        background={`#fff`}
                        label={`${address1}`}
                      >
                        <span>
                          {address1?.length >= 20
                            ? `${address1?.slice(0, 20)}...`
                            : address1}
                        </span>
                      </Tooltip>
                    </span>

                    {cargoData &&
                      (cargoData?.cargo_id_data?.as_soon_as_a ? (
                        <p
                          style={{
                            fontWeight: 500,
                            fontSize: `12px`,
                            color: `rgba(126, 123, 134, 1)`,
                          }}
                        >
                          {cargoData?.cargo_id_data?.country_code_from?.toUpperCase()}{" "}
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
                        cargoData?.cargo_id_data?.load_time && format(
                          new Date(
                            cargoData?.cargo_id_data?.load_time
                          ).setHours(
                            new Date(
                              cargoData?.cargo_id_data?.load_time
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

                    {cargoData && cargoData?.cargo_id_data?.as_soon_as_b ? (
                      <p
                        style={{
                          fontWeight: 500,
                          fontSize: `12px`,
                          color: `rgba(126, 123, 134, 1)`,
                        }}
                      >
                        {cargoData?.cargo_id_data?.country_code_to?.toUpperCase()}{" "}
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
                      cargoData?.cargo_id_data?.date &&
                      format(
                        new Date(cargoData?.cargo_id_data?.date).setHours(
                          new Date(cargoData?.cargo_id_data?.date).getHours() -
                            5
                        ),
                        "dd-MMMM",
                        { locale: ru }
                      )
                    )}
                  </span>
                </span>
              </h2>
            </Box>
            {role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" && (
              <Box mr={`10px`} mb={`20px`}>
                <p className={cls.statusTitle}>{t(`Заказчик`)}</p>
                <Flex gap={`5px`}>
                  <Avatar
                    width={`45px`}
                    height={`45px`}
                    src={cargoData?.users_id_2_data?.photo}
                    name={cargoData?.users_id_2_data?.full_name}
                  />
                  <Box>
                    <p style={{ fontSize: `18px` }}>
                      {cargoData?.users_id_2_data?.full_name}
                    </p>
                    <span
                      style={{
                        cursor: `pointer`,
                        fontWeight: 400,
                        fontSize: `18px`,
                        borderBottom: `1px dashed black`,
                      }}
                    >
                      {cargoData?.users_id_2_data?.phone}
                    </span>
                  </Box>
                </Flex>
              </Box>
            )}
          </Flex>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Accordion defaultIndex={[0]} allowToggle>
              {userData?.[0]?.order?.map((user, index) => {
                return (
                  <>
                    <AccordionItem key={index} className={cls.accordionItem}>
                      <AccordionButton
                        onClick={() => {
                          setUserId(user?.users_gps?.users_id);
                          setOrderId(user?.guid);
                          setGpsHistory([]);
                        }}
                        className={cls.accordionButton}
                      >
                        <div className={cls.userDataWarp}>
                          <div className={cls.userWrap}>
                            <Avatar
                              // color={"white"}
                              background={`rgba(224, 224, 224, 1)`}
                              name={user?.users_id_data?.full_name || ``}
                              src={user?.users_id_data?.photo}
                            />
                            <div className={cls.user}>
                              <p className={cls.userName}>
                                {user?.users_id_data?.full_name}
                              </p>
                              <p className={cls.userTel}>
                                {user?.users_id_data?.phone}
                              </p>
                            </div>
                          </div>

                          <div className={cls.phoneDataWrap}>
                            <div className={cls.item}>
                              {user.gps ? (
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
                                    {user.gps ? t("Выкл") : t("Откл")}
                                  </span>
                                  <ResToreIcon />
                                  <span className={cls.phoneItemTitle}>
                                    {user?.users_gps?.update_time &&
                                      formatDateTime(
                                        user?.users_gps?.update_time
                                      )}
                                  </span>
                                </Flex>
                              </div>
                            </div>

                            {role_id !==
                              "48871d27-7361-4f69-8fe4-b54daf270739" && (
                              <div className={cls.item}>
                                {user?.users_gps?.os === "android" ? (
                                  <AndroidIcon />
                                ) : (
                                  <AppleIcon />
                                )}
                                <div className={cls.itemText}>
                                  <p className={cls.phoneItemTitle}>
                                    {t(`Смартфон`)}
                                  </p>
                                  <p className={cls.phoneItemName}>
                                    {user?.users_gps?.os}{" "}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* <div className={cls.item}>
                              <FurIcon />
                              <div className={cls.itemText}>
                                <p className={cls.phoneItemTitle}>
                                  {t(`Версия Sarbon`)}
                                </p>
                                <p className={cls.phoneItemName}>
                                  {user?.users_gps?.version}{" "}
                                </p>
                              </div>
                            </div> */}
                            <div className={cls.item}>
                            <BluetoothIcon />
                            <div className={cls.itemText}>
                              <p className={cls.phoneItemTitle}>Bluetooth</p>
                              <p className={cls.phoneItemName}>Выкл </p>
                            </div>
                          </div>
                            <div className={cls.item}>
                              {user?.users_gps?.battery > 19 ? (
                                <BatareyFullIcon />
                              ) : (
                                <BatareyIcon />
                              )}
                              <div className={cls.itemText}>
                                <p className={cls.phoneItemTitle}>
                                  {t(`Батарея`)}
                                </p>
                                <p className={cls.phoneItemName}>
                                  {user?.users_gps?.battery}%
                                </p>
                              </div>
                            </div>

                            <Popover placement="top-start">
                              <PopoverTrigger>
                                <Flex
                                  gap={`6px`}
                                  alignItems={`center`}
                                  width={`180px`}
                                  padding={`8px 10px`}
                                  background={`rgba(237, 239, 245, 1)`}
                                  borderRadius={`4px`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShare(user, cargoData);
                                  }}
                                >
                                  <CopyIcon />
                                  <p
                                    style={{
                                      color: `rgba(0, 122, 255, 1)`,
                                      fontSize: `12px`,
                                      fontWeight: 400,
                                      lineHeight: `15px`,
                                      textAlign:`left`
                                      // borderBottom: `1px dashed var(--primary)`,
                                    }}
                                  >
                                    {t(`Скопировать ссылку на треккинг`)}
                                  </p>
                                </Flex>
                              </PopoverTrigger>
                              <Portal>
                                <PopoverContent
                                  borderRadius={`4px`}
                                  border={`none`}
                                  bg={`rgba(0, 122, 255, 1)`}
                                  width={`fit-content`}
                                >
                                  <PopoverArrow
                                    className={cls.popoverArrow}
                                    size={`lg`}
                                    bg={`rgba(0, 122, 255, 1)`}
                                  />
                                  <PopoverBody
                                    color={`white`}
                                    borderRadius={`4px`}
                                    border={`none`}
                                    width={`fit-content`}
                                  >
                                    <p>Локациия скопирована</p>
                                  </PopoverBody>
                                </PopoverContent>
                              </Portal>
                            </Popover>
                            {role_id ===
                              "48871d27-7361-4f69-8fe4-b54daf270739" && (
                              <Flex className={cls.item}>
                                <Box textAlign={`right`}>
                                  <p
                                    style={{
                                      color: `rgba(126, 123, 134, 1)`,
                                      fontSize: `14px`,
                                      fontWeight: 400,
                                    }}
                                  >
                                    {t(`Диспетчер`)}:
                                  </p>
                                  <p
                                    style={{
                                      fontSize: `14px`,
                                      fontWeight: 600,
                                      lineHeight: `20px`,
                                    }}
                                  >
                                    {user?.users_id_3_data?.full_name}
                                  </p>
                                  <a
                                    style={{
                                      fontWeight: 400,
                                      fontSize: `14px`,
                                      lineHeight: `20px`,
                                      borderBottom: `1px dashed rgba(0, 122, 255, 1)`,
                                      color: `rgba(0, 122, 255, 1)`,
                                    }}
                                    target="_blank"
                                    href={`https://t.me/${user?.users_id_3_data?.phone}`}
                                  >
                                    {user?.users_id_3_data?.phone}
                                  </a>
                                </Box>
                                <Avatar
                                  src={user?.users_id_3_data?.photo}
                                  name={user?.users_id_3_data?.full_name}
                                />
                              </Flex>
                            )}
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
                                startPoint={user.startPoint}
                                endPoint={user.endPoint}
                                gpsHistory={gpsHistory}
                                getDriverPosition={allPositions?.map((item) => [
                                  item?.lat,
                                  item?.long,
                                ])}
                                driverPosition={[
                                  getDriverLocation?.data?.response?.[0]?.lat,
                                  getDriverLocation?.data?.response?.[0]?.long,
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
                                    {user?.cargo_id_data?.country_code_from?.toUpperCase()}
                                  </span>{" "}
                                  /{" "}
                                  {user?.cargo_id_data?.as_soon_as_a
                                    ? t(`Готов к загрузке`)
                                    : user?.cargo_id_data?.load_time &&
                                      format(
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
                                    {user?.cargo_id_data?.country_code_to?.toUpperCase()}
                                  </span>{" "}
                                  /
                                  {user?.cargo_id_data?.as_soon_as_b
                                    ? t(`Как можно скорее`)
                                    : user?.cargo_id_data?.date &&
                                      format(
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
                                  {user?.cargo_id_data?.car_type}:{" "}
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
                                  {user?.cargo_id_data?.weight}т /{" "}
                                  {user?.cargo_id_data?.volume_m3} м3
                                </p>
                              </Box>
                            </Flex>
                          </Flex>
                          <Flex
                            gap={`39px`}
                            background={`rgba(237, 246, 255, 1)`}
                            borderRadius={`10px`}
                            p={`13px 18px`}
                          >
                            <Box>
                              <p className={cls.subTitle}>
                                {t(`Тип оплаты`)}:{" "}
                              </p>
                              <p className={cls.title}>
                                {user?.cargo_id_data?.map_id_data?.payment_type}
                              </p>
                            </Box>
                            <Box>
                              <p className={cls.subTitle}>
                                {t(`Предоплата`)}:{" "}
                              </p>
                              <p className={cls.title}>
                                {user?.cargo_id_data?.prepayment_percentage}{" "}
                                {user?.cargo_id_data?.currency_id_data?.code}
                              </p>
                            </Box>
                            <Box>
                              <p className={cls.subTitle}>{t(`Сумма`)}: </p>
                              <p
                                className={cls.title}
                                style={{ color: `rgba(0, 122, 255, 1)` }}
                              >
                                {user?.cargo_id_data?.bid_cash}{" "}
                                {user?.cargo_id_data?.currency_id_data?.code}
                              </p>
                            </Box>
                          </Flex>
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  </>
                );
              })}
            </Accordion>
          )}
        </>
      )}

      {status === "performed" && (
        <Accordion mt={4} allowToggle>
          <AccordionItem className={cls.accordionItem}>
            <AccordionButton className={cls.accordionButton}>
              <Heading fontSize="24px" mb="10px">
                {t("Документация")}
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Documents
                handleUploadDocument={handleUploadDocument}
                getEmptyFileName={getEmptyFileName}
                getValues={getValues}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  );
};
