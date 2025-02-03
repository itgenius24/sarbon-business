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
import { YMaps } from "@pbe/react-yandex-maps";
import { AccordionMap } from "./AccordionMap";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { format } from "date-fns";
import authStore from "@/store/auth.store";
import { ru } from "date-fns/locale";
import { formatDateTime } from "@/utils/formatDateTime";
import Image from "next/image";

export const TopContentPerfomet = () => {
  const [userId, setUserId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userData, setUserData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [allPositions, setAllPositions] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const [carId, setCarId] = useState("");

  const firm_id = authStore.userData.firm_id;
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  // const getDriverLocation = useGetDriverLocation(
  //   { data: JSON.stringify({ users_id: userId }) },
  //   { enabled: !!(status === "performed" && userId) }
  // );

  const [gpsHistory, setGpsHistory] = useState();
  const [page, setPage] = useState(0);

  const [breakRequest, setBreakRequest] = useState(false);

  const getMaps = useGetMaps(
    {
      data: JSON.stringify({ cargo_id: carId }),
    },
    { enabled: !!carId }
  );

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
        order_id: orderId,
      }),
    },
    querySettings: {
      enabled: Boolean(userId) && isLoadingMore,
      // enabled: Boolean(userId),
    },
  });

  // const driverPosition = useMemo(() => {
  //   return [
  //     getDriverLocation?.data?.response?.[0]?.lat,
  //     getDriverLocation?.data?.response?.[0]?.long,
  //   ];
  // }, [getDriverLocation?.data?.response?.[0]]);

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const { mutate: dataLocation, isPending } = useGetWithLocation({
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

  console.log(`userData`, userData?.[0]?.order.length > 0 )

  return (
    <Box>
      <>
        {isPending ? (
          <LoadingSpinner />
        ) : 
        
        userData?.[0]?.order.length > 0 ? (
          <Accordion allowToggle>
            {userData?.[0]?.order?.map((user, index) => {
              return (
                <>
                  <AccordionItem key={index} className={cls.accordionItem}>
                    <AccordionButton
                      onClick={() => {
                        setUserId(user?.users_gps?.users_id);
                        setCarId(user?.cargo_id);
                        setOrderId(user?.guid);
                        setGpsHistory([]);
                      }}
                      className={cls.accordionButton}
                    >
                      <div className={cls.userDataWarp}>
                        <div className={cls.userWrap}>
                          <Avatar
                            color={"white"}
                            name={user?.users_id_data?.full_name}
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
                            {user?.users_gps?.gps ? (
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
                                  {user?.users_gps?.gps ? "Выкл " : "Откл "}
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
                          <div className={cls.item}>
                            {user?.users_gps?.os === "android" ? (
                              <AndroidIcon />
                            ) : (
                              <AppleIcon />
                            )}
                            <div className={cls.itemText}>
                              <p className={cls.phoneItemTitle}>
                                {t("Смартфон")}
                              </p>
                              <p className={cls.phoneItemName}>
                                {user?.users_gps?.os}{" "}
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
                                {user?.users_gps?.version}{" "}
                              </p>
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
                                {t("Батарея")}
                              </p>
                              <p className={cls.phoneItemName}>
                                {user?.users_gps?.battery}%{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel
                      className={cls.accordionPanel}
                      position={`relative`}
                    >
                      {getGPSHistory.isPending ? (
                        <Box height={"600px"}>
                          <LoadingSpinner />
                        </Box>
                      ) : (
                        <>
                          <Box
                            display={isLargerThan845 ? `none` : `block`}
                            padding={`0 20px 30px 20px`}
                          >
                            <Flex gap={`12px`}>
                              <div className={cls.startAIconWrapGreen}>
                                <div className={cls.startAGreenIcon}>
                                  <Image
                                    className={cls.flag}
                                    width={150}
                                    height={150}
                                    src={user?.cargo_id_data?.flag_ot}
                                    alt={t("Флаг")}
                                  />
                                </div>
                                <div className={cls.line}></div>
                              </div>
                              <Box>
                                <p className={cls.cardStartTitle}>
                                  {user?.cargo_id_data?.from}{" "}
                                </p>
                                <p className={cls.cardStartSubTitle}>
                                  {user?.cargo_id_data?.country_code_from?.toUpperCase()}{" "}
                                  /{" "}
                                  <span>
                                    {user?.cargo_id_data?.as_soon_as_a
                                      ? t(`Готов к загрузке`)
                                      : format(
                                          user?.cargo_id_data?.load_time,
                                          "yyyy-MM-dd"
                                        )}
                                  </span>
                                </p>
                              </Box>
                            </Flex>
                            <Flex
                              // alignItems={`center`}
                              mt={`22px`}
                              gap={`12px`}
                            >
                              <div className={cls.startAIconWrapGreen}>
                                <div className={cls.startBGreenIcon}>
                                  <Image
                                    className={cls.flag}
                                    width={150}
                                    height={150}
                                    src={user?.cargo_id_data?.flag_do}
                                    alt={t("Флаг")}
                                  />
                                </div>
                              </div>
                              <Box>
                                <p className={cls.cardStartTitle}>
                                  {user?.cargo_id_data?.to}
                                </p>
                                <p className={cls.cardStartSubTitle}>
                                  {user?.cargo_id_data?.country_code_to?.toUpperCase()}{" "}
                                  /{" "}
                                  <span>
                                    {user?.cargo_id_data?.as_soon_as_b
                                      ? t(`Как можно скорее`)
                                      : format(
                                          user?.cargo_id_data?.date ||
                                            new Date(),
                                          "yyyy-MM-dd"
                                        )}
                                  </span>
                                </p>
                              </Box>
                            </Flex>
                          </Box>
                          <YMaps>
                            <AccordionMap
                              driver={user?.users_gps}
                              gpsHistory={gpsHistory}
                              getDriverPosition={allPositions?.map((item) => [
                                item?.lat,
                                item?.long,
                              ])}
                              driverPosition={[
                                user?.users_gps?.lat,
                                user?.users_gps?.long,
                              ]}
                              periods={userData?.periods}
                              getMaps={getMaps}
                            />
                          </YMaps>
                          <Flex
                            display={isLargerThan845 ? `flex` : `none`}
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
                                  ? t(`Готов к загрузке`)
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
                                {user.cargo_id_data?.as_soon_as_a
                                  ? t(`Как можно скорее`)
                                  : format(
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
                        flexDirection={isLargerThan845 ? `row` : `column`}
                        alignItems={`center`}
                        mt={10}
                        padding={isLargerThan845 ? `0` : `0 20px`}
                      >
                        <Flex
                          width={`100%`}
                          flexDirection={isLargerThan845 ? `row` : `column`}
                          gap={isLargerThan845 ? `40px` : `0`}
                          alignItems={isLargerThan845 ? `center` : `flex-start`}
                          rowGap={isLargerThan845 ? `0px` : `20px`}
                        >
                          <Flex gap={`8px`}>
                            <CarIconXM />
                            <Box>
                              <p className={cls.title}>
                                {user?.cargo_id_data?.car_type}:
                                {userData?.length} /{" "}
                                {user?.cargo_id_data?.number_of_cars}
                              </p>
                              <p className={cls.subTitle}>
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
                        <Flex
                          gap={isLargerThan845 ? `39px` : `0`}
                          rowGap={isLargerThan845 ? `0px` : `20px`}
                          m={isLargerThan845 ? `0px` : `20px 0px`}
                          background={`rgba(237, 246, 255, 1)`}
                          borderRadius={`10px`}
                          flexDirection={isLargerThan845 ? `row` : `column`}
                          width={`100%`}
                          p={`13px 18px`}
                          // justifyContent={`space-between`}
                        >
                          <Box>
                            <p className={cls.subTitle}>{t("Тип оплаты")}: </p>
                            <p className={cls.title}>
                              {t(
                                user?.payment_type ? user?.payment_type :   user?.cargo_id_data?.map_id_data?.payment_type  ? user?.cargo_id_data?.map_id_data?.payment_type : t("По запросу")
                              )}
                            </p>
                          </Box>
                          <Box>
                            <p className={cls.subTitle}>{t("Предоплата")}: </p>
                            <p className={cls.title}>
                              {user?.prepayment_percentage  ? user?.prepayment_percentage : user?.cargo_id_data?.prepayment_percentage ? user?.cargo_id_data?.prepayment_percentage : t("По запросу")}
                              {user?.currency_id_data?.code ? user?.currency_id_data?.code : user?.cargo_id_data?.currency_id_data?.code}
                            </p>
                          </Box>
                          <Box>
                            <p className={cls.subTitle}>{t("Сумма")}: </p>
                            <p
                              className={cls.title}
                              style={{ color: `rgba(0, 122, 255, 1)` }}
                            >

                              {user?.cargo_id_data?.bid_cash ? user?.cargo_id_data?.bid_cash : t("По запросу")}
                              {user?.cargo_id_data?.currency_id_data?.code}
                            </p>
                          </Box>
                        </Flex>
                        <Flex
                          display={isLargerThan845 ? `none` : `flex`}
                          alignItems={`center`}
                          justifyContent={`space-between`}
                          width={`100%`}
                          background={`rgba(237, 246, 255, 1)`}
                          borderRadius={`10px`}
                          p={`13px 18px`}
                          m={isLargerThan845 ? `0px` : `0 0 20px 0px`}
                        >
                          <Flex alignItems={`center`} gap={`7px`}>
                            {user?.users_gps?.gps ? (
                              <LocationActiveIcon />
                            ) : (
                              <LocationMobileIcon />
                            )}
                            <div className={cls.itemText}>
                              <p className={cls.subTitle}>{t(`Геолокация`)}</p>
                              <Flex
                                gap={`5px`}
                                alignItems={`center`}
                                className={cls.subTitle}
                              >
                                <ResToreIcon />
                                <span
                                  style={{ color: `rgba(0, 122, 255, 1)` }}
                                  className={cls.subTitle}
                                >
                                  {user?.users_gps?.update_time &&
                                    formatDateTime(
                                      user?.users_gps?.update_time
                                    )}
                                </span>
                              </Flex>
                            </div>
                          </Flex>

                       

                          <Flex gap={`7px`}>
                            {user?.users_gps?.battery > 19 ? (
                              <BatareyFullIcon />
                            ) : (
                              <BatareyIcon />
                            )}
                            <div className={cls.itemText}>
                              <p className={cls.phoneItemName}>
                                {user?.users_gps?.battery}%{" "}
                              </p>
                            </div>
                          </Flex>
                          {/* <Flex alignItems={"center"} gap={2}>
                            <BluetoothIcon />
                            <Box>
                              <p className={cls.title}>Вкл</p>
                            </Box>
                          </Flex> */}
                        </Flex>
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
            {t(`У вас еще нет добавленных заказы`)}
          </Flex>
        )}
      </>
    </Box>
  );
};
