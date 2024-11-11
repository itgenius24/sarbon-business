import { ArrowNextIcon, MapIcon } from "@/assets/icons/icons";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ru } from 'date-fns/locale';

import { Box, Button, Tooltip } from "@chakra-ui/react";

export const Performed = ({
  cargo,
  orderStatus,
  handleAccept,
  handleCancel,
}) => {
  const { t } = useTranslation();

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

  console.log(`perfomen`, cargo);
  return (
    <div className={styles.performed}>
      <div className={styles.performedCard}>
        <div className={styles.performedXeader}>
          <div className={styles.leftContend}>
            <div className={styles.text}>
              <h3>
                {
                  cargo?.cargo_id_data?.from?.length > 10 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${cargo?.cargo_id_data?.from}`}
                  >
                    <span>{`${cargo?.cargo_id_data?.from.slice(
                      0,
                      10
                    )}...`}</span>
                  </Tooltip>
                ) : (
                  cargo?.cargo_id_data?.from
                )
                }
              </h3>
              <p>
                {cargo?.cargo_id_data?.address_id_data?.name}
                <span>
                  {cargo?.cargo_id_data?.load_time &&
                    format(
                      new Date(cargo?.cargo_id_data?.load_time).setHours(new Date(cargo?.cargo_id_data?.load_time).getHours() -5),
                      "dd-MMMM",{ locale: ru }
                    )}
                </span>
              </p>
            </div>
            <ArrowNextIcon />
            <div className={styles.text}>
              <h3>{   cargo?.cargo_id_data?.to?.length > 10 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${cargo?.cargo_id_data?.to}`}
                  >
                    <span>{`${cargo?.cargo_id_data?.to.slice(
                      0,
                      10
                    )}...`}</span>
                  </Tooltip>
                ) : (
                  cargo?.cargo_id_data?.to
                )}</h3>
              <p>
                {cargo?.cargo_id_data?.address_id_2_data?.name}

                <span>
                  {cargo?.cargo_id_data?.date &&
                    format(new Date(cargo?.cargo_id_data?.date).setHours(new Date(cargo?.cargo_id_data?.date).getHours() -5), "dd-MMMM",{ locale: ru })}
                </span>
              </p>
            </div>
          </div>
          <div className={styles.rightContend}>
            <div className={styles.text}>
              <p className={styles.rightTitle}>
                {/* Тип оплаты: Перечисление */}
              </p>
              <p className={styles.rightTitle}>
                Предоплата:
                {cargo?.payment_type[0] === "prepayment" ? `Да` : `Нет`}
              </p>
            </div>
            <div className={styles.text}>
              <p className={styles.rightTitle}>Общая сумма</p>
              <p className={styles.totalSum}>
                {cargo?.offers || 0} {cargo?.currency_id_data?.code}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.card}>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Водитель</span>
              <p className={styles.cardName}>
                {cargo?.users_id_data?.full_name}{" "}
                {cargo?.users_id_data?.rating > 0
                  ? `+${cargo?.users_id_data?.rating}`
                  : ``}
              </p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Телефон</span>
              <p className={styles.cardName}>{cargo?.users_id_data?.phone}</p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Статус</span>
              <p className={styles.cardName}>
                {
                  performedStatuses[
                    cargo?.indicate_status[0]
                      ? cargo?.indicate_status[0]
                      : `Не cтатус`
                  ]
                }
                {/* <span className={styles.cardNameDate}> (Сегодня, 12:36)</span> */}
              </p>
            </div>
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
          {orderStatus == "performed" && (
            <div className={styles.cardFooter}>
              <div className={styles.cardFooterLeft}>
                <div className={styles.cardItem}>
                  <span className={styles.cardBodyTitle}>Пройдено</span>
                  <p className={styles.cardName}>
                    <span>1357 км </span> / {cargo?.cargo_id_data?.distance} км
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
          )}

          {orderStatus === `new` && (
            <Box
              width={`30%`}
              display="flex"
              // width={isLargerThan768 ? "570px" : "100%"}
              columnGap="12px"
              mt="32px"
            >
              <Button
                // fontSize={isLargerThan768 ? "16px" : "12px"}
                // fontWeight={isLargerThan768 ? 600 : 500}
                variant="outlineError"
                bgColor="rgba(254, 228, 226, 1)"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel(cargo.guid);
                }}
              >
                {t("Отказать")}
              </Button>
              <Button
                // fontSize={isLargerThan768 ? "16px" : "12px"}
                // fontWeight={isLargerThan768 ? 600 : 500}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAccept(cargo.guid, cargo.users_id_2);
                }}
              >
                {t("Принять")}
              </Button>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};
