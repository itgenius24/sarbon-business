import {
  AndroidIcon,
  AppleIcon,
  BatareyFullIcon,
  BatareyIcon,
  BluetoothIcon,
  CheckBlueIcon,
  CloseIconM,
  FurIcon,
  GreenCheckIcon,
  GruzIcon,
  LoadgreenIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  NextBtnIcon,
  StarsIcon,
  StoneIcon,
  TelegramIcon,
} from "@/assets/icons/icons";
import { useGetOffer, useGetUserGpsByIDData } from "@/services/api";
import { Avatar, Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";

const DriverCheck = ({
  cls,
  currentUserLocationData,
  setModalType,
  setCenterModalType,
  setIconStatus,
}) => {
  const { t } = useTranslation();
  const getOfferCount = useGetOffer(
    {
      data: JSON.stringify({
        users_id_2: currentUserLocationData?.user?.guid,
        with_relations: true,
      }),
    },
    { enabled: Boolean(currentUserLocationData?.user?.guid) }
  );

  const getUserGps = useGetUserGpsByIDData({
    params: {
      data: JSON.stringify({
        guid: currentUserLocationData?.disp_data?.[0]?.users_id_2,
        with_relations: true,
      }),
    },
    querySettings: {
      enabled: Boolean(currentUserLocationData?.disp_data?.[0]?.users_id_2),
    },
  });

  const statuses = {
    no_status: "Нет статуса",
    go_to_load: "Иду на загрузку",
    wait_for_the_download: "Жду загрузку",
    loading: "Загружаюсь",
    go_to_unload: "Иду на разгрузку",
    unloading: "Разгружаюсь",
    unloaded: "Разгрузился",
    complete_the_order: "Завершить заказ",
    breaking: "Поломка",
    road_accident: "ДТП",
  };
  function formatVersion(version) {
    const parts = version.trim().split(/\s+/); // bo‘sh joylar orqali ajratadi
    if (parts.length === 2) {
      return `${parts[0]} (${parts[1]})`;
    }
    return version;
  }

  return (
    <div className={cls.filter}>
      {!getOfferCount.isLoading && (
        <Flex
          flexDirection={"column"}
          rowGap={`10px`}
          alignItems={"flex-start"}
        >
          <Flex
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex gap={3}>
              <Avatar name="Bobur Nimatllayey" src="#" />
              <Box>
                <p className={cls.userName}>
                  {currentUserLocationData?.user?.full_name}
                </p>
                <p className={cls.version}>
                  <StarsIcon /> 4.1<span>{" (16 отзывов)"}</span>
                </p>
              </Box>
            </Flex>
            <IconButton
              width={"fit-content"}
              style={{ background: "transparent" }}
              icon={<CloseIconM />}
              onClick={() => {
                setModalType("");
                setIconStatus("");
              }}
            />
          </Flex>
          {statuses[
            currentUserLocationData?.orders?.[0]?.indicate_status?.[0]
          ] && (
            <Box
              mt={`17px`}
              rightIcon={<NextBtnIcon />}
              size={`lg`}
              className={cls.chatCard}
            >
              <p>
                {statuses[
                  currentUserLocationData?.orders?.[0]?.indicate_status?.[0]
                ] || "Нет статуса"}
              </p>
            </Box>
          )}
          <Box className={cls.cardWrapOutline}>
            <Flex alignItems={"center"} gap={2}>
              <LocationActiveIcon />
              <Box>
                <p className={cls.smallText}>
                  Вкл:
                  {format(
                    new Date(
                      currentUserLocationData?.users_gps?.[0]?.update_time
                    ).setHours(
                      new Date(
                        currentUserLocationData?.users_gps?.[0]?.update_time
                      ).getHours() - 5
                    ),
                    "yyyy-MM-dd, HH:mm"
                  )}{" "}
                </p>
                <p className={cls.bigTitle}>
                  {currentUserLocationData?.users_gps?.[0]?.location_name ||
                    "Нет адреса"}
                </p>
              </Box>
            </Flex>
            <Flex mt={3} alignItems={"center"} justifyContent={"space-between"}>
              <Flex alignItems={"center"} gap={2}>
                <BluetoothIcon />
                <Box>
                  <p className={cls.smallText}>Bluetooth </p>
                  <p className={cls.bigTitle}>Вкл</p>
                </Box>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                {currentUserLocationData?.users_gps?.[0]?.battery > 20 ? (
                  <BatareyFullIcon />
                ) : (
                  <BatareyIcon />
                )}
                <Box>
                  <p className={cls.smallText}>{t(`Батарея`)} </p>
                  <p className={cls.bigTitle}>
                    {currentUserLocationData?.users_gps?.[0]?.battery}%
                  </p>
                </Box>
              </Flex>
            </Flex>
            <Flex mt={3} alignItems={"center"} justifyContent={"space-between"}>
              <Flex alignItems={"center"} gap={2}>
                {currentUserLocationData?.users_gps?.[0]?.os === "android" ? (
                  <AndroidIcon />
                ) : (
                  <AppleIcon />
                )}
                <Box>
                  <p className={cls.smallText}>{t(`Смартфон`)} </p>
                  <p className={cls.bigTitle}>
                    {currentUserLocationData?.users_gps?.[0]?.os}
                  </p>
                </Box>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                <FurIcon />
                <Box>
                  <p className={cls.smallText}>{t(`Версия`)} </p>
                  <p className={cls.bigTitle}>
                    {currentUserLocationData?.users_gps?.[0]?.version &&
                      formatVersion(
                        currentUserLocationData?.users_gps?.[0]?.version
                      )}
                  </p>
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box className={cls.cardWrapOutline}>
            <Flex gap={2}>
              <div className={cls.startAIconWrap}>
                <div className={cls.startAIcon}>A</div>
                <div className={cls.line}></div>
              </div>
              <Box>
                <p className={cls.cardStartTitle}>
                  {currentUserLocationData?.orders?.[0]?.cargo_id_data?.from}
                </p>
                <p className={cls.cardStartSubTitle}>
                  {
                    currentUserLocationData?.orders?.[0]?.cargo_id_data
                      ?.country_code_from
                  }
                  {` `} / {` `}
                  <span>
                    {currentUserLocationData?.orders?.[0]?.cargo_id_data
                      ?.as_soon_as_a
                      ? t(`Готов к загрузке`)
                      : format(
                          currentUserLocationData?.orders?.[0]?.cargo_id_data
                            ?.load_time,
                          "yyyy-MM-dd"
                        )}
                  </span>
                </p>
              </Box>
            </Flex>
            <Flex mt={5} gap={2}>
              <div className={cls.startAIconWrap}>
                <div className={cls.startBIcon}>B</div>
              </div>
              <Box>
                <p className={cls.cardStartTitle}>
                  {currentUserLocationData?.orders?.[0]?.cargo_id_data?.to}
                </p>
                <p className={cls.cardStartSubTitle}>
                  {
                    currentUserLocationData?.orders?.[0]?.cargo_id_data
                      ?.country_code_to
                  }
                  {` `} / {` `}
                  <span>
                    {currentUserLocationData?.orders?.[0]?.cargo_id_data
                      ?.as_soon_as_b
                      ? t(`Как можно скорее`)
                      : format(
                          currentUserLocationData?.orders?.[0]?.cargo_id_data
                            ?.date,
                          "yyyy-MM-dd"
                        )}
                  </span>
                </p>
              </Box>
            </Flex>

            <Flex className={cls.gruz} mt={5} gap={2}>
              <GruzIcon />
              <Box>
                <p className={cls.cardStartTitle}>
                  {
                    currentUserLocationData?.orders?.[0]?.cargo_id_data
                      ?.product_type
                  }
                </p>
                <p className={cls.cardStartSubTitle}>
                  <Flex width={"100%"} justifyContent={"space-between"}>
                    <span>
                      {
                        currentUserLocationData?.orders?.[0]?.cargo_id_data
                          ?.cargo_type_id_data?.name
                      }
                    </span>
                    <Flex ml={2} gap={3}>
                      <Flex gap={1} alignItems={"center"}>
                        <StoneIcon />{" "}
                        {
                          currentUserLocationData?.orders?.[0]?.cargo_id_data
                            ?.weight
                        }{" "}
                        т.
                      </Flex>
                      <Flex gap={1} alignItems={"center"}>
                        <LoadOulineIcon />{" "}
                        {
                          currentUserLocationData?.orders?.[0]?.cargo_id_data
                            ?.volume_m3
                        }{" "}
                        m3
                      </Flex>
                    </Flex>
                  </Flex>
                </p>
              </Box>
            </Flex>
            <Flex mt={3} justifyContent={"space-between"}>
              <p className={cls.cardStartSubTitle}>{t(`Cумма`)}</p>
              <p className={cls.cardStartSubTitle}>
                {t(`Тип оплаты`)}:{" "}
                <span>
                  {currentUserLocationData?.orders?.[0]?.cargo_id_data
                    ?.payment_type?.length > 15
                    ? `${currentUserLocationData?.orders?.[0]?.cargo_id_data?.payment_type?.slice(
                        0,
                        15
                      )}...`
                    : currentUserLocationData?.orders?.[0]?.cargo_id_data
                        ?.payment_type}
                </span>
              </p>
            </Flex>
            <Flex mt={3} justifyContent={"space-between"} alignItems={"center"}>
              <p className={cls.sum}>
                {currentUserLocationData?.orders?.[0]?.cargo_id_data?.bid_cash
                  ? `${currentUserLocationData?.orders?.[0]?.cargo_id_data?.bid_cash} ${currentUserLocationData?.orders?.[0]?.cargo_id_data?.currency_id_data?.code}`
                  : t(`По запросу`)}
               
              </p>
              <p className={cls.cardStartSubTitle}>
                {t(`Предоплата`)}:{" "}
                <span>
                  {currentUserLocationData?.orders?.[0]?.cargo_id_data
                    ?.prepayment_percentage > 0
                    ? "Дa"
                    : "Нет"}{" "}
                </span>
              </p>
            </Flex>
          </Box>
          <Button
            onClick={() => {
              setCenterModalType("changeIcon");
              setIconStatus(currentUserLocationData?.user?.provisions?.[0]);
            }}
            leftIcon={<CheckBlueIcon />}
            rightIcon={<NextBtnIcon />}
            size={`lg`}
            className={cls.btnBlueOutline}
          >
            {t(`Занята нашим грузом`)}
          </Button>
          {getUserGps?.data?.response &&
            currentUserLocationData?.disp_data?.[0]?.users_id_2 && (
              <Box
                style={{ background: `white` }}
                className={cls.cardWrapOutline}
              >
                <Flex width={"100%"} alignItems={"center"} gap={3}>
                  <Avatar
                    name={getUserGps?.data?.response?.[0]?.full_name}
                    src={getUserGps?.data?.response?.[0]?.full_name}
                  />
                  <Box>
                    <p className={cls.cardStartSubTitlez}>Диспетчер </p>
                    <p style={{ fontSize: `16px` }} className={cls.name}>
                      {getUserGps?.data?.response?.[0]?.full_name}
                    </p>
                    <Flex alignItems={"center"} gap={2}>
                      <a
                        href={`https://t.me/${getUserGps?.data?.response?.[0]?.phone}`}
                      >
                        <TelegramIcon />
                      </a>
                      <p className={cls.cardStartSubTitleZTel}>
                        {getUserGps?.data?.response?.[0]?.phone}
                      </p>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            )}
        </Flex>
      )}
    </div>
  );
};

export default DriverCheck;
