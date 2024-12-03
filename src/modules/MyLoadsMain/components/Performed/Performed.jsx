import {
  ArrowNextIcon,
  DeleteIcon,
  IconCeckNewStatusIcon,
  MapIcon,
} from "@/assets/icons/icons";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { statusColor } from "../../data";
import { Popup } from "@/components/Popup";
import { useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import { CheckboxModalPred } from "@/components/CheckboxModalPred/CheckboxModalPred";
import authStore from "@/store/auth.store";

export const Performed = ({
  cargo,
  orderStatus,
  handleAccept,
  setDisabled,
  disabled,
  handleCancel,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState(false);
  const role_id = authStore.userData.role_id;

  const router = useRouter();
  const locale = useGetLang();
  const performedStatuses = {
    no_status: t("нет статуса"),
    go_to_load: t("иду на загрузку"),
    wait_for_the_download: t("жду загрузку"),
    loading: t("загружаюсь"),
    go_to_unload: t("иду на разгрузку"),
    unloading: t("разгружаюсь"),
    unloaded: t("разгрузился"),
    complete_the_order: t("завершить заказ"),
    breaking: t("Поломка"),
    road_accident: t("ДТП"),
    in_active: t("неактивен"),
  };

  const obj = {
    after_payment: `Оплата после завершения`,
    prepayment: `Предоплата`,
  };

  const onClose = () => {
    setData(false);
  };

  console.log(`order`, orderStatus);
  return (
    <div className={styles.performed}>
      <div className={styles.performedCard}>
        <div
          style={{ background: statusColor[orderStatus] }}
          className={styles.performedXeader}
        >
          <div className={styles.leftContend}>
            <div className={styles.text}>
              <h3>
                {cargo?.cargo_id_data?.from?.length > 20 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${cargo?.cargo_id_data?.from}`}
                  >
                    <span>{`${cargo?.cargo_id_data?.from.slice(
                      0,
                      20
                    )}...`}</span>
                  </Tooltip>
                ) : (
                  cargo?.cargo_id_data?.from
                )}
              </h3>
              <p>
                {cargo?.cargo_id_data?.address_id_data?.name}
                <span>
                  {cargo?.cargo_id_data?.load_time &&
                    format(
                      new Date(cargo?.cargo_id_data?.load_time).setHours(
                        new Date(cargo?.cargo_id_data?.load_time).getHours() - 5
                      ),
                      "dd-MMMM",
                      { locale: ru }
                    )}
                </span>
              </p>
            </div>
            <ArrowNextIcon />
            <div className={styles.text}>
              <h3>
                {cargo?.cargo_id_data?.to?.length > 20 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${cargo?.cargo_id_data?.to}`}
                  >
                    <span>{`${cargo?.cargo_id_data?.to.slice(0, 20)}...`}</span>
                  </Tooltip>
                ) : (
                  cargo?.cargo_id_data?.to
                )}
              </h3>
              <p>
                {cargo?.cargo_id_data?.address_id_2_data?.name}

                <span>
                  {cargo?.cargo_id_data?.date &&
                    format(
                      new Date(cargo?.cargo_id_data?.date).setHours(
                        new Date(cargo?.cargo_id_data?.date).getHours() - 5
                      ),
                      "dd-MMMM",
                      { locale: ru }
                    )}
                </span>
              </p>
            </div>
          </div>
          <div className={styles.rightContend}>
            <div className={styles.text}>
              <p className={styles.rightTitle}>
                Тип оплаты:
                {cargo?.payment_type
                  ? obj[cargo?.payment_type?.[0]]
                  : cargo?.cargo_id_data?.payment_type}
              </p>
              <p className={styles.rightTitle}>
                Предоплата:
                {cargo?.payment_type?.[0] === "prepayment" ? `Да` : `Нет`}
              </p>
            </div>
            <div className={styles.text}>
              <p className={styles.rightTitle}>Общая сумма</p>
              <p className={styles.totalSum}>
                {cargo?.offers || cargo?.cargo_id_data?.bid_cash
                  ? `${cargo?.offers || cargo?.cargo_id_data?.bid_cash}  ${
                      cargo?.currency_id_data?.code || ``
                    }`
                  : `По запросу`}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.card}>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Водитель</span>
              <p className={styles.cardName}>
                {cargo?.users_id_data?.full_name}
                {cargo?.users_id_data?.rating > 0
                  ? `+${cargo?.users_id_data?.rating}`
                  : ``}
              </p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Телефон</span>
              <p className={styles.cardName}>{cargo?.users_id_data?.phone}</p>
            </div>
            {(orderStatus === `new` || orderStatus === `cancellation`) && (
              <div className={styles.cardItem}>
                <span className={styles.cardBodyTitle}>Сообщение</span>
                <p
                  className={styles.cardName}
                  dangerouslySetInnerHTML={{
                    __html: cargo?.comment,
                  }}
                >
                  {/* {cargo?.comment} */}
                </p>
              </div>
            )}
            {orderStatus !== `new` && orderStatus !== `cancellation` && (
              <div className={styles.cardItem}>
                <span className={styles.cardBodyTitle}>Статус</span>
                <p className={styles.cardName}>
                  {
                    performedStatuses[
                      cargo?.indicate_status?.[0]
                        ? cargo?.indicate_status?.[0]
                        : `Не cтатус`
                    ]
                  }
                  {/* <span className={styles.cardNameDate}> (Сегодня, 12:36)</span> */}
                </p>
              </div>
            )}
          </div>
          <div className={styles.card}>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Товары</span>
              <p className={styles.cardName}>
                {cargo?.cargo_id_data?.product_type}
              </p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Транспорт</span>
              <p className={styles.cardName}>{cargo?.car_type}</p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Вес, объём</span>
              <p className={styles.cardName}>
                {cargo?.cargo_id_data?.weight}
                {cargo?.cargo_id_data?.measurement_id_data?.Symbol} /{" "}
                {cargo?.cargo_id_data?.volume_m3} m³
              </p>
            </div>
          </div>
          <div className={styles.card}>
            {role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" &&
              orderStatus === `archive` && (
                <Flex
                  width={`100%`}
                  className={styles.cardItem}
                  gap={`7px`}
                  alignItems={`center`}
                >
                  <Avatar
                    src={cargo?.users_id_2_data?.logo}
                    name={cargo?.users_id_2_data?.full_name}
                  />
                  <Box>
                    <p className={styles.cardBodyTitle}> Заказчик</p>

                    <p
                      style={{ lineHeight: `28px` }}
                      className={styles.cardName}
                    >
                      {" "}
                      {cargo?.users_id_2_data?.full_name}{" "}
                      <a
                        style={{
                          marginLeft: `5px`,
                          textDecoration: `underline dotted`,
                        }}
                        target="_blank"
                        href={`https://t.me/${cargo?.users_id_2_data?.phone}`}
                      >
                        {cargo?.users_id_2_data?.phone}{" "}
                      </a>{" "}
                    </p>
                  </Box>
                </Flex>
              )}
            {role_id !== "785678f2-fae7-4a00-8766-99ea67d3784f" &&
              orderStatus === `archive` && (
                <Flex width={`100%`} gap={`7px`} alignItems={`center`}>
                  <Avatar
                    src={cargo?.users_id_3_data?.logo}
                    name={cargo?.users_id_3_data?.full_name}
                  />
                  <Box>
                    <p className={styles.cardBodyTitle}>Диспетчер</p>

                    <p
                      style={{ lineHeight: `28px` }}
                      className={styles.cardName}
                    >
                      {" "}
                      {cargo?.users_id_3_data?.full_name}{" "}
                      <a
                        style={{
                          marginLeft: `5px`,
                          textDecoration: `underline dotted`,
                        }}
                        target="_blank"
                        href={`https://t.me/${cargo?.users_id_3_data?.phone}`}
                      >
                        {cargo?.users_id_3_data?.phone}{" "}
                      </a>{" "}
                    </p>
                  </Box>
                </Flex>
              )}
            <Flex
              className={styles.cardItem}
              justifyContent={`space-between`}
              alignItems={`center`}
            >
              <Box>
                {orderStatus == "performed" && (
                  <>
                    <span className={styles.cardBodyTitle}>Пройдено</span>
                    <p className={styles.cardName}>
                      <span style={{ color: `rgba(0, 122, 255, 1)` }}>
                        1357 км{" "}
                      </span>{" "}
                      / {cargo?.cargo_id_data?.distance?.toFixed(1) || 0} км
                    </p>
                  </>
                )}
                {orderStatus === `new` && (
                  <>
                    <span className={styles.cardBodyTitle}>Статус</span>
                    <p
                      style={{ fontWeight: 400, fontSize: `18px`, gap: `6px` }}
                    >
                      Предложение:
                    </p>
                  </>
                )}

                {orderStatus === `cancellation` && (
                  <>
                    <span className={styles.cardBodyTitle}>Статус</span>
                    <p
                      style={{ fontWeight: 400, fontSize: `18px`, gap: `6px` }}
                    >
                      {cargo?.who_cancellation?.includes(`customer`)
                        ? `Был отменен вами: `
                        : ``}
                    </p>
                  </>
                )}
              </Box>
            </Flex>

            { role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" && ((orderStatus === `new`) || orderStatus === `performed`) && (
              <Flex
                width={`100%`}
                className={styles.cardItem}
                gap={`7px`}
                alignItems={`center`}
              >
                <Avatar
                  src={cargo?.users_id_2_data?.logo}
                  name={cargo?.users_id_2_data?.full_name}
                />
                <Box>
                  <p className={styles.cardBodyTitle}> Заказчик</p>

                  <p style={{ lineHeight: `28px` }} className={styles.cardName}>
                    {" "}
                    {cargo?.users_id_2_data?.full_name}{" "}
                    <a
                      style={{
                        marginLeft: `5px`,
                        textDecoration: `underline dotted`,
                      }}
                      target="_blank"
                      href={`https://t.me/${cargo?.users_id_2_data?.phone}`}
                    >
                      {cargo?.users_id_2_data?.phone}{" "}
                    </a>{" "}
                  </p>
                </Box>
              </Flex>
            )}

            {role_id !== "785678f2-fae7-4a00-8766-99ea67d3784f" &&
              orderStatus === `performed` && (
                <Flex
                  width={`100%`}
                  className={styles.cardItem}
                  gap={`7px`}
                  alignItems={`center`}
                >
                  <Avatar
                    src={cargo?.users_id_3_data?.logo}
                    name={cargo?.users_id_3_data?.full_name}
                  />
                  <Box>
                    <p className={styles.cardBodyTitle}>Диспетчер</p>

                    <p
                      style={{ lineHeight: `28px` }}
                      className={styles.cardName}
                    >
                      {" "}
                      {cargo?.users_id_3_data?.full_name}{" "}
                      <a
                        style={{
                          marginLeft: `5px`,
                          textDecoration: `underline dotted`,
                        }}
                        target="_blank"
                        href={`https://t.me/${cargo?.users_id_3_data?.phone}`}
                      >
                        {cargo?.users_id_3_data?.phone}{" "}
                      </a>{" "}
                    </p>
                  </Box>
                </Flex>
              )}
            <Box className={styles.cardItem}>
              {orderStatus == "performed" && (
                <Button
                  leftIcon={<MapIcon />}
                  onClick={() =>
                    router.push(
                      `/${locale}/my-loads/performed/${cargo?.guid}?isFirst=true&&car_id=${cargo?.cargo_id}`
                    )
                  }
                  className={styles.bntMap}
                >
                  {t(`Показать на карте`)}
                </Button>
              )}
              {orderStatus === `new` && (
                <Flex gap={`11px`}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancel(cargo.guid);
                    }}
                    className={styles.bntOutline}
                  >
                    {t(`Отказать`)}
                  </Button>
                  <Button
                    leftIcon={<IconCeckNewStatusIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setData(cargo);
                    }}
                    className={styles.bntNew}
                  >
                    {t(`Принять`)}
                  </Button>
                </Flex>
              )}
              {orderStatus == "cancellation" && (
                <Button
                  leftIcon={<DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    // setIsDeletePopupOpen(true);
                  }}
                  className={styles.bntOutline}
                >
                  {t(`Удалить`)}
                </Button>
              )}
            </Box>
          </div>
          {/* {orderStatus == "performed" && (
            <div className={styles.cardFooter}>
              <div className={styles.cardFooterLeft}>
                <div className={styles.cardItem}>
                  <span className={styles.cardBodyTitle}>Пройдено</span>
                  <p className={styles.cardName}>
                    <span>1357 км </span> /{" "}
                    {cargo?.cargo_id_data?.distance?.toFixed(1) || 0} км
                  </p>
                </div>

                <div
                  className={styles.btn}
                  onClick={() =>
                    router.push(
                      `/${locale}/my-loads/performed/${cargo?.guid}?isFirst=true&&car_id=${cargo?.cargo_id}`
                    )
                  }
                >
                  <MapIcon /> Показать на карте
                </div>
              </div>
              <div className={styles.rightContend}></div>
            </div>
          )} */}
        </div>
      </div>
      <Modal isOpen={data} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Text fontSize={`18px`}>
              Принять предложение от {data?.users_id_data?.full_name}?
            </Text>

            <Flex
              mt={`25px`}
              justifyContent={`space-between`}
              alignItems={`center`}
            >
              <Box>
                <p style={{ fontWeight: 400 }} className={styles.subTitle}>
                  Тип оплаты
                </p>
                <p style={{ fontWeight: 600 }} className={styles.title}>
                  {data?.payment_type
                    ? obj[data?.payment_type?.[0]]
                    : data?.cargo_id_data?.payment_type}
                </p>
              </Box>
              <Box>
                <p style={{ fontWeight: 400 }} className={styles.subTitle}>
                  Предоплата
                </p>
                <p style={{ fontWeight: 600 }} className={styles.title}>
                  {data?.payment_type?.[0] === "prepayment"
                    ? `${data?.prepayment} ${data?.currency_id_data?.code}`
                    : 0}
                </p>
              </Box>
              <Box>
                <p style={{ fontWeight: 400 }} className={styles.subTitle}>
                  Общая сумма
                </p>
                <p style={{ fontWeight: 600 }} className={styles.title}>
                  {data?.offers} {data?.currency_id_data?.code}
                </p>
              </Box>
            </Flex>
            <Flex
              alignItems={`center`}
              background={`rgba(237, 239, 245, 1)`}
              padding={`7.5px`}
              borderRadius={`4px`}
              mt={`15px`}
            >
              <CheckboxModalPred
                defaultChecked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              >
                Я согласовал это предложение с заказчиком*
              </CheckboxModalPred>
            </Flex>
          </ModalBody>
          <ModalFooter gap={`10px`} className={styles.modalFooter} mt="0px">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
                // handleCancel(cargo.guid);
              }}
              className={styles.bntOutline}
              style={{
                background: `#fff`,
                border: `1px solid rgba(208, 213, 221, 1)`,
                color: `black`,
              }}
            >
              {t(`Отказать`)}
            </Button>
            <Button
              isDisabled={!disabled}
              style={{ background: `rgba(21, 186, 77, 1)` }}
              leftIcon={<IconCeckNewStatusIcon />}
              onClick={(e) => {
                e.stopPropagation();
                handleAccept(data.guid, data.users_id_2);
              }}
              className={styles.bntNew}
            >
              {t(`Да, принять`)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
