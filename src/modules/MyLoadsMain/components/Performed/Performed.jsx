import { ArrowNextIcon, MapIcon } from "@/assets/icons/icons";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";

export const Performed = () => {
  const router  = useRouter();
  const locale = useGetLang();
  return(
    <div className={styles.performed}>
      <div className={styles.performedCard}>
        <div className={styles.performedXeader}>
          <div className={styles.leftContend}>
            <div className={styles.text}>
              <h3>
                         Екатеринбург
              </h3>
              <p>
                     RUS <span>/ 18 июля</span>
              </p>
            </div>
            <ArrowNextIcon />
            <div className={styles.text}>
              <h3>
                     Таш. область
              </h3>
              <p>
                     UZB <span>/ 29 июля (через 9 дней)</span>
              </p>
            </div>
          </div>
          <div className={styles.rightContend}>
            <div className={styles.text}>
              <p className={styles.rightTitle}>
                Тип оплаты: Перечисление
              </p>
              <p className={styles.rightTitle}>
                Предоплата: Нет
              </p>
            </div>
            <div className={styles.text}>
              <p className={styles.rightTitle}>
                Общая сумма
              </p>
              <p className={styles.totalSum}>
                3600 EUR
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.card}>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Водитель</span>
              <p className={styles.cardName}>
               Зафарбек Мухамадов +3
              </p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Телефон</span>
              <p className={styles.cardName}>
               +998 93 0776161
              </p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Статус</span>
              <p className={styles.cardName}>
                  Все идет по плану  <span className={styles.cardNameDate}> (Сегодня, 12:36)</span>
              </p>
            </div>

          </div>
          <div className={styles.card}>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Товары</span>
              <p className={styles.cardName}>
               Стройматериалы, Трубы
              </p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Транспорт</span>
              <p className={styles.cardName}>
               Тентованный
              </p>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.cardBodyTitle}>Вес, объём</span>
              <p className={styles.cardName}>
               22т / 56 m³
              </p>
            </div>

          </div>
          <div className={styles.cardFooter}>
            <div className={styles.cardFooterLeft}>
              <div className={styles.cardItem}>
                <span className={styles.cardBodyTitle}>Пройдено</span>
                <p className={styles.cardName}>
                  <span>1357 км </span> / 2380км
                </p>
              </div>
              <div className={styles.btn}  
               
               onClick={() => router.push(`/${locale}/my-loads/performed/4dcaab11-e749-48fd-8a0b-0821d0d3e5fb?isFirst=true`)}
              
              >
                <MapIcon />  Показать на карте
              </div>
            </div>
      <div className={styles.rightContend}>
      <span className={styles.cardBodyTitle}>Пройдено</span>
      <p className={styles.date}>23 июня, 12:36</p>
      </div>
          </div>
        </div>

      </div>
    </div>
  );
};
