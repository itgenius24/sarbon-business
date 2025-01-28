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
} from "@/assets/icons/icons";
import { useGetOffer } from "@/services/api";
import authStore from "@/store/auth.store";
import { Avatar, Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";

const DriverCheck = ({
  cls,
  contendSingle,
  setModalType,
  setCenterModalType,
  setIconStatus,
}) => {
  const { t } = useTranslation();
  
  const getOfferCount = useGetOffer(
    {
      data: JSON.stringify({
        users_id_2: contendSingle?.user?.guid,
        with_relations: true,
      }),
    },
    { enabled: Boolean(contendSingle?.user?.guid) }
  );

  const dispatcher = authStore.userData;


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
                <p className={cls.userName}>{contendSingle?.user?.full_name}</p>
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
                setModalType("filter");
                setIconStatus("");
              }}
            />
          </Flex>
          {statuses[contendSingle?.orders?.[0]?.indicate_status?.[0]] && (
            <Box
              mt={`17px`}
              rightIcon={<NextBtnIcon />}
              size={`lg`}
              className={cls.chatCard}
            >
              <p>
                {statuses[contendSingle?.orders?.[0]?.indicate_status?.[0]] ||
                  "Нет статуса"}
              </p>
            </Box>
          )}

          <Box className={cls.cardWrapOutline}>
            <Flex alignItems={"center"} gap={2}>
              <LocationActiveIcon />
              <Box>
                <p className={cls.smallText}>
                  Вкл:{" "}
                  {format(
                    new Date(
                      contendSingle?.users_gps?.[0]?.update_time
                    ).setHours(
                      new Date(
                        contendSingle?.users_gps?.[0]?.update_time
                      ).getHours() - 5
                    ),
                    "yyyy-MM-dd, HH:mm"
                  )}{" "}
                </p>
                <p className={cls.bigTitle}>
                  {contendSingle?.users_gps?.[0]?.location_name || "Нет адреса"}
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
                {contendSingle?.users_gps?.[0]?.battery > 20 ? (
                  <BatareyFullIcon />
                ) : (
                  <BatareyIcon />
                )}
                <Box>
                  <p className={cls.smallText}>{t(`Батарея`)} </p>
                  <p className={cls.bigTitle}>
                    {contendSingle?.users_gps?.[0]?.battery}%
                  </p>
                </Box>
              </Flex>
            </Flex>
            <Flex mt={3} alignItems={"center"} justifyContent={"space-between"}>
              <Flex alignItems={"center"} gap={2}>
                {contendSingle?.users_gps?.[0]?.os === "android" ? (
                  <AndroidIcon />
                ) : (
                  <AppleIcon />
                )}
                <Box>
                  <p className={cls.smallText}>{t(`Смартфон`)} </p>
                  <p className={cls.bigTitle}>
                    {contendSingle?.users_gps?.[0]?.os}
                  </p>
                </Box>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                <FurIcon />
                <Box>
                  <p className={cls.smallText}>{t(`Версия`)} </p>
                  <p className={cls.bigTitle}>
                    {contendSingle?.users_gps?.[0]?.version}
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
                  {contendSingle?.orders?.[0]?.cargo_id_data?.from}
                </p>
                <p className={cls.cardStartSubTitle}>
                  {
                    contendSingle?.orders?.[0]?.cargo_id_data?.city_id_data
                      ?.address_id_data?.name
                  }{" "}
                  /
                  <span>
                    {format(
                      contendSingle?.orders?.[0]?.cargo_id_data?.load_time
                        ? contendSingle?.orders?.[0]?.cargo_id_data?.load_time
                        : new Date(),
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
                  {contendSingle?.orders?.[0]?.cargo_id_data?.to}
                </p>
                <p className={cls.cardStartSubTitle}>
                  {
                    contendSingle?.orders?.[0]?.cargo_id_data?.city_id_2_data
                      ?.address_id_data?.name
                  }
                  /
                  <span>
                    {format(
                      contendSingle?.orders?.[0]?.cargo_id_data?.date
                        ? contendSingle?.orders?.[0]?.cargo_id_data?.date
                        : new Date(),
                      "yyyy-MM-dd"
                    )}
                  </span>
                </p>
              </Box>
            </Flex>

            <Flex className={cls.gruz} mt={5} gap={2}>
              <GruzIcon />
              <Box>
                <p className={cls.cardStartTitle}>Оборудование и запчасти</p>
                <p className={cls.cardStartSubTitle}>
                  <Flex width={"100%"} justifyContent={"space-between"}>
                    <span>
                      {
                        contendSingle?.orders?.[0]?.cargo_id_data
                          ?.cargo_type_id_data?.name
                      }
                    </span>
                    <Flex ml={2} gap={3}>
                      <Flex gap={1} alignItems={"center"}>
                        <StoneIcon />{" "}
                        {contendSingle?.vehicles?.[0]?.capacity} т.
                      </Flex>
                      <Flex gap={1} alignItems={"center"}>
                        <LoadOulineIcon />{" "}
                        {contendSingle?.vehicles?.[0]?.height3 }{" "}
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
                {t(`Тип оплаты`)}: <span>Перечисление</span>
              </p>
            </Flex>
            <Flex mt={3} justifyContent={"space-between"} alignItems={"center"}>
              <p className={cls.sum}>
                {contendSingle?.orders?.[0]?.cargo_id_data?.bid_cash}{" "}
                {
                  contendSingle?.orders?.[0]?.cargo_id_data?.currency_id_data
                    ?.code
                }
              </p>
              <p className={cls.cardStartSubTitle}>
                Предоплата:
                <span>
                  {contendSingle?.orders?.[0]?.cargo_id_data
                    ?.prepayment_percentage > 0
                    ? "Дa"
                    : "Нет"}
                </span>
              </p>
            </Flex>
          </Box>
          <Button
            onClick={() => {
              setCenterModalType("changeIcon");
              setIconStatus(contendSingle?.user?.provisions?.[0]);
            }}
            leftIcon={<CheckBlueIcon />}
            rightIcon={<NextBtnIcon />}
            size={`lg`}
            className={cls.btnBlueOutline}
          >
          {t(`Занята нашим грузом`)}
          </Button>
          <Box className={cls.cardWrapOutline}>
            <Flex width={"100%"} alignItems={"center"} gap={3}>
              <Avatar name={dispatcher?.full_name} src={dispatcher?.photo} />
              <Box>
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: `14px`,
                    lineHeight: `18px`,
                    color: `rgba(126, 123, 134, 1)`,
                  }}
                >
                  Диспетчер:{" "}
                </p>
                <p className={cls.name2}>
                  {dispatcher?.full_name} <br />
                  {dispatcher?.your_id}
                </p>
                {contendSingle?.orders?.[0]?.approve_time_from_dispatcher && (
                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: `13px`,
                      lineHeight: `18px`,
                      color: `rgba(126, 123, 134, 1)`,
                    }}
                  >
                    {format(
                      new Date(
                        contendSingle?.orders?.[0]?.approve_time_from_dispatcher
                      ).setHours(
                        new Date(
                          contendSingle?.orders?.[0]?.approve_time_from_dispatcher
                        ).getHours() - 5
                      ),
                      "yyyy-MM-dd, HH:mm"
                    )}
                  </p>
                )}
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </div>
  );
};

export default DriverCheck;
