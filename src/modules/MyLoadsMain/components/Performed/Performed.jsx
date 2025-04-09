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

import { Avatar, Box, Button, Flex, Tooltip } from "@chakra-ui/react";
import { statusColor } from "../../data";
import authStore from "@/store/auth.store";
import { forwardRef } from "react";

export const Performed = forwardRef(
  ({ cargo, orderStatus, handleCancel, setDataPred,onOpen, setOpen,disabledCancelBtn }, ref) => {
    {
      cargo?.offer_time
        ? format(cargo?.offer_time, ` dd.MM.yyyy, HH:mm`)
        : cargo?.finished_time
        ? format(cargo?.finished_time, ` dd.MM.yyyy, HH:mm`)
        : ``;
    }
    const { t } = useTranslation();
    const role_id = authStore.userData.role_id;

    const router = useRouter();
    const locale = useGetLang();

    const performedStatuses = {
      no_status: t("Hет статуса"),
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
      after_payment: t(`Оплата после завершения`),
      prepayment: t(`Предоплата`),
      bank:t(`Банковский перевод`)
    };

    return (
      <div ref={ref} className={styles.performed}>
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
                    {cargo?.cargo_id_data?.as_soon_as_a
                      ? `${cargo?.cargo_id_data?.country_code_from?.toUpperCase()} / ${t(
                          `Готов к загрузке`
                        )}`
                      : cargo?.cargo_id_data?.load_time &&
                        format(
                          new Date(cargo?.cargo_id_data?.load_time).setHours(
                            new Date(
                              cargo?.cargo_id_data?.load_time
                            ).getHours() - 5
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
                      <span>{`${cargo?.cargo_id_data?.to.slice(
                        0,
                        20
                      )}...`}</span>
                    </Tooltip>
                  ) : (
                    cargo?.cargo_id_data?.to
                  )}
                </h3>
                <p>
                  {cargo?.cargo_id_data?.address_id_2_data?.name}

                  <span>
                    {cargo?.cargo_id_data?.as_soon_as_b
                      ? `${cargo?.cargo_id_data?.country_code_to?.toUpperCase()} / ${t(
                          `Как можно скорее`
                        )}`
                      : cargo?.cargo_id_data?.date &&
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
                  {t(`Тип оплаты`)}:
                  {cargo?.payment_type?.[0]
                    ? ` ${obj[cargo?.payment_type?.[0]]}`
                    : ` ${cargo?.cargo_id_data?.payment_type}`}
                </p>
                <p className={styles.rightTitle}>
                  {t(`Предоплата`)}:
                  {cargo?.prepayment !== 0
                    ? ` ${cargo?.prepayment} ${
                        cargo?.currency_id_data?.code || ``
                      }`
                    : ` Нет`}
                </p>
              </div>
              <div className={styles.text}>
                <p className={styles.rightTitle}>{t(`Общая сумма`)}</p>
                <p className={styles.totalSum}>
                  {cargo?.offers || cargo?.cargo_id_data?.bid_cash
                    ? `${cargo?.offers || cargo?.cargo_id_data?.bid_cash}  ${
                        cargo?.currency_id_data?.code || ``
                      }`
                    : t(`По запросу`)}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.card}>
              <div className={styles.cardItem}>
                <span className={styles.cardBodyTitle}>{t(`Водитель`)}</span>
                <p className={styles.cardName}>
                  {cargo?.users_id_data?.full_name}
                  {cargo?.users_id_data?.rating > 0
                    ? `+${cargo?.users_id_data?.rating}`
                    : ``}
                </p>
              </div>
              <div className={styles.cardItem}>
                <span className={styles.cardBodyTitle}>{t(`Телефон`)}</span>
                <p className={styles.cardName}>{cargo?.users_id_data?.phone}</p>
              </div>
              {(orderStatus === `new` ||
                orderStatus === `cancellation` ||
                orderStatus === `no_dispatcher`) && (
                <div className={styles.cardItem}>
                  <span className={styles.cardBodyTitle}>
                    {t(`Сообщение`)}{" "}
                  </span>
                  <p
                    className={styles.cardName}
                    dangerouslySetInnerHTML={{
                      __html: cargo?.comment ? cargo?.comment : `Hет Сообщение` ,
                    }}
                  >
             
                   
                  </p>
                </div>
              )}
              {(orderStatus !== `new` &&
                orderStatus !== `cancellation`) &&
                orderStatus === `archive` ? (
                  <div className={styles.cardItem}>
                  <span className={styles.cardBodyTitle}>
                    {t(`Сообщение`)}      {orderStatus === `archive`
                        ? cargo?.archive_time &&
                          format(cargo?.archive_time, ` dd.MM.yyyy, HH:mm`)
                        : cargo?.performed_time &&
                          format(cargo?.performed_time, ` dd.MM.yyyy, HH:mm`)}
                  </span>
                  <p
                    className={styles.cardName}
                    dangerouslySetInnerHTML={{
                      __html: cargo?.comment ? cargo?.comment : `Hет Сообщение` ,
                    }}
                  >
                    {/* {cargo?.comment} */}
                  </p>
                </div>
                ):  (
                  <div className={styles.cardItem}>
                    <span className={styles.cardBodyTitle}>
                      {t(`Статус`)}:
                      {orderStatus === `archive`
                        ? cargo?.archive_time &&
                          format(cargo?.archive_time, ` dd.MM.yyyy, HH:mm`)
                        : cargo?.performed_time &&
                          format(cargo?.performed_time, ` dd.MM.yyyy, HH:mm`)}
                    </span>
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
                )
                }
            </div>
            <div className={styles.card}>
              <Flex width={`100%`} justifyContent={`space-between`}>
                <Flex gap={`70px`}>
                  <div className={styles.cardItem}>
                    <span className={styles.cardBodyTitle}>{t(`Товары`)}</span>
                    <p className={styles.cardName}>
                      {cargo?.cargo_id_data?.[`product_type_${locale}`]
                        ? cargo?.cargo_id_data?.[`product_type_${locale}`]
                        : cargo?.cargo_id_data?.product_type}
                    </p>
                  </div>
                  <div className={styles.cardItem}>
                    <span className={styles.cardBodyTitle}>
                      {t(`Вес, объём`)}
                    </span>
                    <p className={styles.cardName}>
                      {cargo?.cargo_id_data?.weight}
                      {cargo?.cargo_id_data?.measurement_id_data?.Symbol} /{" "}
                      {cargo?.cargo_id_data?.volume_m3} m³
                    </p>
                  </div>
                  <div className={styles.cardItem}>
                    <span className={styles.cardBodyTitle}>
                      {t(`Транспорт`)}
                    </span>
                    <p className={styles.cardName}>
                      {cargo?.[`car_type_${locale}`]
                        ? cargo?.[`car_type_${locale}`]
                        : cargo?.car_type}  {cargo?.vehicle_id_data?.car_number && ` / ${cargo?.vehicle_id_data?.car_number}`}
                    </p>
                  </div>
                
                </Flex>
                <div style={{ textAlign: `right` }} className={styles.cardItem}>
                  <span className={styles.cardBodyTitle}>
                    {t(`Номер груза`)}
                  </span>
                  <p className={styles.cardName}>
                    {cargo?.cargo_id_data?.number_of_order}
                  </p>
                </div>
              </Flex>
            </div>
            <div style={{justifyContent: orderStatus ===  "performed" || orderStatus === `cancellation` ? `space-between`:`flex-start`}}  className={styles.card}>
              {role_id === "785678f2-fae7-4a00-8766-99ea67d3784f" &&
                (orderStatus === `archive` ||
                  orderStatus === `approve_from_driver`) && (
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
                      <p className={styles.cardBodyTitle}> {t(`Заказчик`)}</p>

                      <p
                        style={{ lineHeight: `28px` }}
                        className={styles.cardName}
                      >
                        {" "}
                        {cargo?.users_id_2_data?.full_name}{" "}
                        <a
                          style={{
                            marginLeft: `5px`,
                            borderBottom: `1px dashed black`,
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

              {role_id === "48871d27-7361-4f69-8fe4-b54daf270739" &&
                orderStatus === `archive` &&
                !cargo?.review && (
                  <Flex
                    className={styles.cardItem}
                    width={`100%`}
                    gap={`7px`}
                    alignItems={`center`}
                  >
                    <Button onClick={() => setOpen(cargo)}>
                      Оставить отзыв
                    </Button>
                  </Flex>
                )}
              {role_id !== "785678f2-fae7-4a00-8766-99ea67d3784f" &&
                orderStatus === `archive` && (
                  <Flex
                    className={styles.cardItem}
                    width={`100%`}
                    gap={`7px`}
                    alignItems={`center`}
                  >
                    <Avatar
                      src={cargo?.users_id_3_data?.logo}
                      name={cargo?.users_id_3_data?.full_name}
                    />
                    <Box>
                      <p className={styles.cardBodyTitle}>{t(`Диспетчер`)}</p>

                      <p
                        style={{ lineHeight: `28px` }}
                        className={styles.cardName}
                      >
                        {cargo?.users_id_3_data?.full_name}{" "}
                        <a
                          style={{
                            marginLeft: `5px`,
                            borderBottom: `1px dashed black`,
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
                      <span className={styles.cardBodyTitle}>
                        {t(`Пройдено`)}
                      </span>
                      <p className={styles.cardName}>
                        <span style={{ color: `rgba(0, 122, 255, 1)` }}>
                          1357 км{" "}
                        </span>{" "}
                        / {cargo?.cargo_id_data?.distance?.toFixed(1) || 0} км
                      </p>
                    </>
                  )}
                  {(orderStatus === `new` ||
                    orderStatus === `no_dispatcher`) && (
                    <>
                      <span className={styles.cardBodyTitle}>
                        {t(`Статус`)}:
                        {cargo?.offer_time &&
                          format(cargo?.offer_time, ` dd.MM.yyyy, HH:mm`)}
                      </span>
                      <p
                        style={{
                          fontWeight: 400,
                          fontSize: `18px`,
                          gap: `6px`,
                        }}
                      >
                        {t(`Предложение`)}:
                      </p>
                    </>
                  )}

                  {orderStatus === `cancellation` && (
                    <>
                      <span className={styles.cardBodyTitle}>
                        {t(`Статус`)}
                        {cargo?.cancel_time &&
                          format(cargo?.cancel_time, ` dd.MM.yyyy, HH:mm`)}
                      </span>
                      <p
                        style={{
                          fontWeight: 400,
                          fontSize: `18px`,
                          gap: `6px`,
                        }}
                      >
                        {cargo?.who_cancellation?.includes(`customer`)
                          ? `${t(`Был отменен вами`)}: `
                          : t(`Отменённые`)}
                      </p>
                    </>
                  )}
                </Box>
              </Flex>

              {(role_id === "785678f2-fae7-4a00-8766-99ea67d3784f"  ||  role_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469")  &&
                (orderStatus === `new` || orderStatus === `performed`) && (
                  <Flex
                   
                    className={styles.cardItem}
                    gap={`7px`}
                    alignItems={`center`}
                  >
                    <Avatar
                      src={cargo?.users_id_2_data?.logo}
                      name={cargo?.users_id_2_data?.full_name}
                    />
                    <Box>
                      <p className={styles.cardBodyTitle}> {t(`Заказчик`)}</p>

                      <p
                        style={{ lineHeight: `28px` }}
                        className={styles.cardName}
                      >
                        {" "}
                        {cargo?.users_id_2_data?.full_name}{" "}
                        <a
                          style={{
                            marginLeft: `5px`,
                            borderBottom: `1px dashed black`,
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

              {role_id !== "785678f2-fae7-4a00-8766-99ea67d3784f" &&   role_id !== "527d2017-2dc2-4449-9eeb-08fc1aafa469"  &&
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
                      <p className={styles.cardBodyTitle}>{t(`Диспетчер`)}</p>

                      <p
                        style={{ lineHeight: `28px` }}
                        className={styles.cardName}
                      >
                        {" "}
                        {cargo?.users_id_3_data?.full_name}{" "}
                        <a
                          style={{
                            marginLeft: `5px`,
                            borderBottom: `1px dashed black`,
                          }}
                          target="_blank"
                          href={`https://t.me/${cargo?.users_id_3_data?.phone}`}
                        >
                          {cargo?.users_id_3_data?.phone}{" "}
                        </a>
                      </p>
                    </Box>
                  </Flex>
                )}
              <Box  className={styles.cardItem}>
                {orderStatus == "performed" && (
                  <Button
                   width={`fit-content`}
                    leftIcon={<MapIcon />}
                    boxSizing={`border-box`}
                    onClick={() =>
                      router.push(
                        `/${locale}/my-loads/performed/${cargo?.guid}?isFirst=true&&car_id=${cargo?.cargo_id}&driver_id=${cargo?.users_id_data?.guid}`
                      )
                    }
                    className={styles.bntMap}
                  >
                    {t(`Показать на карте`)}
                  </Button>
                )}
                {(orderStatus === `new` || orderStatus === `no_dispatcher`) && (
                  <Flex gap={`11px`}>
                    <Button
                    isLoading={disabledCancelBtn}
                      onClick={(e) => {
                        // e.stopPropagation();
                        handleCancel(cargo);
                      }}
                      className={styles.bntOutline}
                    >
                      {t(`Отказать`)}
                    </Button>
                    <Button
                      leftIcon={<IconCeckNewStatusIcon />}
                      onClick={(e) => {
                        // e.stopPropagation();
                        setDataPred(cargo);
                        onOpen()
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
      </div>
    );
  }
);
