"use client";
import cls from "./styles.module.scss";
import { useTranslation } from "@/app/i18n/client";
import { DataList } from "@/components/DataList";
import { Rating } from "@/components/Rating";
import { useGetLang } from "@/hooks/useGetLang";
import {
  useGetDriverLocation,
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
  LoadIconXM,
  LocationActiveIcon,
  LocationMobileIcon,
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

export const TopContentPerfomet = ({ getMaps }) => {
  // const { watch, handleUploadDocument, getEmptyFileName, getValues } =
  //   useAddCargoContext();

  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState([]);
  const searchParams = useSearchParams();
  const firm_id = authStore.userData.firm_id;
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const getDriverLocation = useGetDriverLocation(
    { data: JSON.stringify({ users_id: userId }) },
    { enabled: !!(status === "performed" && userId) }
  );

  // const getGPSHistory = useGetGPSHistory(
  //   { data: JSON.stringify({ user_id: userId2 }) },
  //   { enabled: !!(status === "performed" && userId2) }
  // );
  const [gpsHistory, setGpsHistory] = useState();
  const [page, setPage] = useState(0);

  const [breakRequest, setBreakRequest] = useState(false);

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

  const driverPosition = useMemo(() => {
    return [
      getDriverLocation?.data?.response?.[0]?.lat,
      getDriverLocation?.data?.response?.[0]?.long,
    ];
  }, [getDriverLocation?.data?.response?.[0]]);

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

  console.log(`userData`, userData);

  return (
    <Box>
      <>
        {isPending ? (
          <LoadingSpinner />
        ) : userData.length > 0 ? (
          <Accordion allowToggle>
            {userData?.map((user, index) => {
              return (
                <>
                  <AccordionItem key={index} className={cls.accordionItem}>
                    <AccordionButton
                      onClick={() => {
                        setUserId(user?.users_gps?.[0]?.users_id);
                        setGpsHistory([]);
                      }}
                      className={cls.accordionButton}
                    >
                      <div className={cls.userDataWarp}>
                        <div className={cls.userWrap}>
                          <Avatar
                            color={"white"}
                            name={
                              user?.users_gps?.[0]?.users_id_data?.full_name
                            }
                            src={user?.users_gps?.[0]?.users_id_data?.photo}
                          />
                          <div className={cls.user}>
                            <p className={cls.userName}>
                              {user?.users_gps?.[0]?.users_id_data?.full_name}
                            </p>
                            <p className={cls.userTel}>
                              {user?.users_gps?.[0]?.users_id_data?.phone}
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
                              <p className={cls.phoneItemTitle}>Геолокация</p>
                              <p className={cls.phoneItemName}>
                                {user.gps ? "Выкл " : "Откл "}
                                <span className={cls.phoneItemTitle}>
                                  {user?.users_gps?.[0]?.update_time &&
                                    format(
                                      user?.users_gps?.[0]?.update_time,
                                      "dd MMMM HH:HH "
                                    )}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className={cls.item}>
                            {user?.users_gps?.[0]?.os === "android" ? (
                              <AndroidIcon />
                            ) : (
                              <AppleIcon />
                            )}
                            <div className={cls.itemText}>
                              <p className={cls.phoneItemTitle}>Смартфон</p>
                              <p className={cls.phoneItemName}>
                                {user?.users_gps?.[0]?.os}{" "}
                              </p>
                            </div>
                          </div>
                          <div className={cls.item}>
                            <FurIcon />
                            <div className={cls.itemText}>
                              <p className={cls.phoneItemTitle}>Версия Furgo</p>
                              <p className={cls.phoneItemName}>
                                {user?.users_gps?.[0]?.version}{" "}
                              </p>
                            </div>
                          </div>

                          <div className={cls.item}>
                            {user?.users_gps?.[0]?.battery > 19 ? (
                              <BatareyFullIcon />
                            ) : (
                              <BatareyIcon />
                            )}
                            <div className={cls.itemText}>
                              <p className={cls.phoneItemTitle}>Батарея</p>
                              <p className={cls.phoneItemName}>
                                {user?.users_gps?.[0]?.battery}%{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel>
                      {getGPSHistory.isPending ? (
                        <Box height={"600px"}>
                          <LoadingSpinner />
                        </Box>
                      ) : (
                        <YMaps>
                          <AccordionMap
                            gpsHistory={gpsHistory}
                            driverPosition={[
                              user?.users_gps?.[0]?.lat,
                              user?.users_gps?.[0]?.long,
                            ]}
                            periods={user?.periods}
                          />
                        </YMaps>
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
                                Тентованный полуприцеп: 2/3
                              </p>
                              <p className={cls.subTitle}>Volvo, 01A123NN</p>
                            </Box>
                          </Flex>
                          <Flex gap={`8px`}>
                            <LoadIconXM />
                            <Box>
                              <p className={cls.title}>Пиломатериалы</p>
                              <p className={cls.subTitle}> 20т / 86 м3</p>
                            </Box>
                          </Flex>
                        </Flex>
                        <Flex gap={`39px`}  background={`rgba(237, 246, 255, 1)`} borderRadius={`10px`} p={`13px 18px`}>
                          <Box>
                            <p className={cls.subTitle}>Тип оплаты: </p>
                            <p className={cls.title}>
                            Перечисление
                            </p>
                          </Box>
                          <Box>
                            <p className={cls.subTitle}>Преоплата: </p>
                            <p className={cls.title}>
                            5 000 000 UZS
                            </p>
                          </Box>
                          <Box>
                            <p className={cls.subTitle}>Сумма:  </p>
                            <p className={cls.title} style={{color:`rgba(0, 122, 255, 1)`}}>
                            45 000 000 UZS
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
  );
};
