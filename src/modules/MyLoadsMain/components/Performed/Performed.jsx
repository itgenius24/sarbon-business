import { ArrowNextIcon, MapIcon } from "@/assets/icons/icons";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

export const Performed = ({ cargo }) => {
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
  return (
    <div className={styles.performed}>
      <div className={styles.performedCard}>
        <div className={styles.performedXeader}>
          <div className={styles.leftContend}>
            <div className={styles.text}>
              <h3>{cargo?.city_id_data?.name}</h3>
              <p>
                {cargo?.address_id_data?.name}
                <span> { format(cargo?.load_time,"MMMM dd") }</span>
              </p>
            </div>
            <ArrowNextIcon />
            <div className={styles.text}>
              <h3>{cargo?.city_id_2_data?.name}</h3>
              <p>
                {cargo?.address_id_2_data?.name}

                <span> {format(cargo?.date,"MMMM dd")}</span>
              </p>
            </div>
          </div>
          <div className={styles.rightContend}>
            <div className={styles.text}>
              <p className={styles.rightTitle}>
                {/* Тип оплаты: Перечисление */}
              </p>
              <p className={styles.rightTitle}>
                Предоплата:{" "}
                {cargo?.requirements[0] === "no_prepayment" ? `Нет` : `Да`}
              </p>
            </div>
            <div className={styles.text}>
              <p className={styles.rightTitle}>Общая сумма</p>
              <p className={styles.totalSum}>
                {cargo?.bid_amount || 0} {cargo?.currency_id_data?.code}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.card}>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Водитель</span>
              <p className={styles.cardName}>
                {cargo?.users_id_2_data?.full_name} +{cargo?.users_id_2_data?.rating || 0}
              </p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Телефон</span>
              <p className={styles.cardName}>{cargo?.users_id_2_data?.phone}</p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Статус</span>
              <p className={styles.cardName}>
                {performedStatuses[cargo?.indicate_status[0]]}
                {/* <span className={styles.cardNameDate}> (Сегодня, 12:36)</span> */}
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Товары</span>
              <p className={styles.cardName}>
                {cargo?.cargo_type_id_data?.name}
              </p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Транспорт</span>
              <p className={styles.cardName}>
                {cargo?.vehicle_type_id_data?.name}
              </p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Вес, объём</span>
              <p className={styles.cardName}>
                {cargo?.weight}
                {cargo?.measurement_id_data?.Symbol} / {cargo?.volume_m3} m³
              </p>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.cardFooterLeft}>
              <div className={styles.cardItem}>
                <span className={styles.cardBodyTitle}>Пройдено</span>
                <p className={styles.cardName}>
                  <span>1357 км </span> / {cargo?.distance} км
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
            <div className={styles.rightContend}>
              {/* <span className={styles.cardBodyTitle}>Пройдено</span> */}
              {/* <p className={styles.date}>23 июня, 12:36</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
