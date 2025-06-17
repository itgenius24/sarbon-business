import clsx from "clsx";
import cls from "./styles.module.scss";
import { ArrowNextIcon, DeleteIcon, MapIcon } from "@/assets/icons/icons";
import { Box, Button, Flex, Tooltip } from "@chakra-ui/react";

import { useLoadsCardProps } from "./useLoadsCardProps";

import { forwardRef } from "react";
import { Popup } from "@/components/Popup";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { statusColor, statusText } from "../../data";

export const LoadsCard = forwardRef(
  ({ cargo, orderStatus, handleDelete }, ref) => {
    const {
      router,
      status,
      t,
      locale,
      isDeletePopupOpen,
      onDeleteAccept,
      setIsDeletePopupOpen,
    } = useLoadsCardProps({
      order_status: cargo?.order_status,
      provisions: cargo?.provisions,
      response_status: cargo?.response_status,
      orderStatus: orderStatus,
      cargo_type_id_data: cargo?.cargo_type_id_data,
      load_around_the_clock: cargo?.load_around_the_clock,
      take_all_unloads: cargo?.take_all_unloads,
      date: cargo?.date,
      load_time: cargo?.load_time,
      indicate_status: cargo?.indicate_status,
      users_id_2: cargo?.users_id_2,
      users_id_2_data: cargo?.users_id_2_data,
      driver_cash: cargo?.driver_cash,
      short_name: cargo?.short_name,
      distance: cargo?.distance,
      currency_id_data: cargo?.currency_id_data,
      currency_id_2_data: cargo?.currency_id_2_data,
      handleDelete: handleDelete,
      cargo,
    });

    return (
      <>
        <div ref={ref} className={cls.status}>
          <div className={cls.statusCard}>
            <div
              style={{ background: statusColor[cargo?.order_status?.[0]] }}
              className={cls.statusXeader}
            >
              <div className={cls.leftContend}>
                <div className={cls.text}>
                  <h3>
                    {cargo?.from?.length > 30 ? (
                      <Tooltip
                        color={`black`}
                        boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                        background={`#fff`}
                        label={`${cargo?.from}`}
                      >
                        <span>{`${cargo?.from.slice(0, 30)}...`}</span>
                      </Tooltip>
                    ) : (
                      cargo?.from
                    )}
                  </h3>
                  <p>
                    {cargo?.address_id_data?.name}
                    <span>
                      {cargo?.as_soon_as_a
                        ? `${cargo?.country_code_from?.toUpperCase()} / ${t(`Готов к загрузке`)}`
                        : cargo?.load_time &&
                          format(
                            new Date(cargo?.load_time).setHours(
                              new Date(cargo?.load_time).getHours() - 5
                            ),
                            "dd-MMMM",
                            { locale: ru }
                          )}
                    </span>
                  </p>
                </div>
                <ArrowNextIcon />
                <div className={cls.text}>
                  <h3>
                    {cargo?.to?.length > 30 ? (
                      <Tooltip
                        color={`black`}
                        boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                        background={`#fff`}
                        label={`${cargo?.to}`}
                      >
                        <span>{`${cargo?.to.slice(0, 30)}...`}</span>
                      </Tooltip>
                    ) : (
                      cargo?.to
                    )}
                  </h3>
                  <p>
                    {cargo?.address_id_2_data?.name}

                    <span>
                      {cargo?.as_soon_as_b
                        ? `${cargo?.country_code_to?.toUpperCase()} / ${t(`Как можно скорее`)}`
                        : cargo?.date &&
                          format(
                            new Date(cargo?.date).setHours(
                              new Date(cargo?.date).getHours() - 5
                            ),
                            "dd-MMMM",
                            { locale: ru }
                          )}
                    </span>
                  </p>
                </div>
              </div>
              <div className={cls.rightContend}>
                <div className={cls.text}>
                  <p className={cls.rightTitle}>
                  {t(`Тип оплаты`)}: {cargo?.payment_type}
                  </p>
                  <p className={cls.rightTitle}>
                  {t(`Предоплата`)}:
                    {/* {cargo?.payment_type?.[0] === "prepayment" ? `Да` : `Нет`} */}
                    {cargo?.prepayment_percentage
                      ? ` ${cargo?.prepayment_percentage} ${cargo?.currency_id_data?.code}`
                      : `Нет`}
                  </p>
                </div>
                <div className={cls.text}>
                  <p className={cls.rightTitle}>{t(`Общая сумма`)}</p>
                  <p className={cls.totalSum}>
                    {cargo?.bid_cash
                      ? `${cargo?.bid_cash}  ${cargo?.currency_id_data?.code}`
                      : t(`По запросу`)}
                  </p>
                </div>
              </div>
            </div>
            <div className={cls.cardBody}>
              {orderStatus === `performed` && (
                <div className={cls.card}>
                  <div className={cls.cardItem}>
                    <span className={cls.cardBodyTitle}>{t(`Водитель`)}</span>
                    <p className={cls.cardName}>
                      {cargo?.users_id_data?.full_name}{" "}
                      {cargo?.users_id_data?.rating > 0
                        ? `+${cargo?.users_id_data?.rating}`
                        : ``}
                    </p>
                  </div>
                  <div className={cls.cardItem}>
                    <span className={cls.cardBodyTitle}>{t(`Телефон`)}</span>
                    <p className={cls.cardName}>
                      {cargo?.users_id_data?.phone}
                    </p>
                  </div>
                  <div className={cls.cardItem}>
                    <span className={cls.cardBodyTitle}>{t(`Статус`)}</span>
                    <p className={cls.cardName}>
                      {/* {
                  performedStatuses[
                    cargo?.indicate_status?.[0]
                      ? cargo?.indicate_status?.[0]
                      : `Не cтатус`
                  ]
                } */}
                      {/* <span className={cls.cardNameDate}> (Сегодня, 12:36)</span> */}
                    </p>
                  </div>
                </div>
              )}
              <div className={cls.card}>
                <Flex justifyContent={`space-between`} width={`100%`}>
                  <Flex gap={`70px`}>
                    <div className={cls.cardItem}>
                      <span className={cls.cardBodyTitle}>{t(`Товары`)}</span>
                      <p className={cls.cardName}>{ cargo?.[`product_type${locale}`] ? cargo?.[`product_type${locale}`] :cargo?.product_type}</p>
                    </div>
                    <div className={cls.cardItem}>
                      <span className={cls.cardBodyTitle}>{t(`Транспорт`)}</span>
                      <p className={cls.cardName}>{cargo?.[`car_type_${locale}`] ? cargo?.[`car_type_${locale}`] :cargo?.car_type}</p>
                    </div>
                    <div className={cls.cardItem}>
                      <span className={cls.cardBodyTitle}>{t(`Вес, объём`)}</span>
                      <p className={cls.cardName}>
                        {cargo?.weight}
                        {cargo?.measurement_id_data?.Symbol} /{" "}
                        {cargo?.volume_m3} m³
                      </p>
                    </div>
                  </Flex>
                  <div style={{ textAlign: `right` }} className={cls.cardItem}>
                    <span className={cls.cardBodyTitle}>{t(`Номер груза`)}</span>
                    <p className={cls.cardName}>{cargo?.number_of_order}</p>
                  </div>
                </Flex>
              </div>
              <div className={cls.card}>
                <Flex
                  width={`100%`}
                  className={cls.cardItem}
                  justifyContent={`space-between`}
                  alignItems={`center`}
                >
                  <Box>
                    <span className={cls.cardBodyTitle}>
                    {t(`Статус`)}:
                      {cargo?.updated_time &&
                        format(cargo?.updated_time, ` dd.MM.yyyy, HH:mm`)}
                    </span>
                    <Flex
                      style={{
                        color: statusColor[cargo?.order_status?.[0]],
                        fontWeight: 600,
                        fontSize: `18px`,
                        gap: `6px`,
                      }}
                    >
                      {statusText[cargo?.order_status?.[0]]}
                      <p
                        style={{
                          color: `rgba(33, 31, 38, 1)`,
                          fontWeight: 400,
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            cargo?.order_status?.[0] === `rejected`
                              ? cargo?.moderator_comment
                              : ``,
                        }}
                      ></p>
                    </Flex>
                  </Box>
                  <Box>
                    {status === `active` && (
                      <Button
                        onClick={() =>
                          router.push(
                            `/${locale}/my-loads/${status}/${cargo?.guid}`
                          )
                        }
                        className={cls.btnActive}
                      >
                        {t(`Изменить`)}
                      </Button>
                    )}
                    {(status === `in_moderation` || status === `rejected`) && (
                      <Flex gap={`11px`}>
                        <Button
                          onClick={() =>
                            router.push(
                              `/${locale}/my-loads/${status}/${cargo?.guid}`
                            )
                          }
                          className={cls.bntOutline}
                        >
                          {t(`Изменить`)}
                        </Button>
                        <Button
                          leftIcon={<DeleteIcon />}
                          onClick={(e) => {
                            e.stopPropagation();

                            console.log(`cargo`,cargo)
                            // setIsDeletePopupOpen(true);
                          }}
                          className={cls.bntOutline}
                        >
                          {t(`Удалить`)}
                        </Button>
                      </Flex>
                    )}
                  </Box>
                </Flex>
              </div>
              {orderStatus == "performed" && (
                <div className={cls.cardFooter}>
                  <div className={cls.cardFooterLeft}>
                    <div className={cls.cardItem}>
                      <span className={cls.cardBodyTitle}>{t(`Пройдено`)}</span>
                      <p className={cls.cardName}>
                        <span>1357 км </span> /{" "}
                        {cargo?.distance?.toFixed(1) || 0} км
                      </p>
                    </div>

                    <div
                      className={cls.btn}
                      onClick={() =>
                        router.push(
                          `/${locale}/my-loads/performed/${cargo?.guid}?isFirst=true&&car_id=${cargo?.cargo_id}`
                        )
                      }
                    >
                      <MapIcon /> {t(`Показать на карте`)}
                    </div>
                  </div>
                  <div className={cls.rightContend}></div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Popup
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          mainText={t("Вы уверены что хотите удалить груз ?", {
            name: cargo?.short_name,
          })}
          status="delete"
          btn2Callback={() => onDeleteAccept(cargo)}
        />
      </>
    );
  }
);
