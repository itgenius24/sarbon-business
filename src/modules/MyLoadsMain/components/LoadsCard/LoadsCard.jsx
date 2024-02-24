import clsx from "clsx";
import cls from "./styles.module.scss";
import { DeleteIcon, PencilIcon, TruckIcon } from "@/assets/icons/icons";

export const LoadsCard = () => {

  return <div className={cls.loadsCard}>
    <div className={cls.cardTop}>
      <div className={cls.cardTopContent}>
        <h2 className={cls.address}>
          <span className={cls.addressText}>Ташкент Бухара</span>
          <span className={clsx(cls.addressStatus, { [cls.modernize]: true })}>status</span>
        </h2>
        <span className={cls.distance}>724 км</span>
      </div>
      <div className={cls.paymentInfo}>
        <div className={cls.paymentInfoContent}>
          <span className={cls.paymentInfoText}>
            350 тыс. UZS
          </span>
          <span className={cls.paymentInfoSubText}>(до 30 тыс. UZS/км)</span>
        </div>
        <span className={cls.paymentInfoComment}>Возможен торг</span>
      </div>
    </div>
    <dl className={cls.cardList}>
      <div className={cls.cardListItem}>
        <dt>Расстояние:</dt>
        <dd>570 км</dd>
      </div>
      <div className={cls.cardListItem}>
        <dt>Товар:</dt>
        <dd>Полиэтилен F-0120 Шуртан ГХК</dd>
      </div>
      <div className={cls.cardListItem}>
        <dt>Вид:</dt>
        <dd>Зерно и семена (насыпью),пищевые добавки</dd>
      </div>
      <div className={cls.cardListItem}>
        <dt>Время:</dt>
        <dd>18 январь 22:00 ч</dd>
      </div>
    </dl>
    <div className={cls.cardBottom}>
      <button className={clsx(cls.cardBtn, cls.delete)}>
        <span className={cls.cardBtnInner}>
          <DeleteIcon color="#F04438" />
          <span>Удалить</span>
        </span>
      </button>
      <button className={cls.cardBtn}>
        <span className={cls.cardBtnInner}>
          <PencilIcon />
          <span>Изменить</span>
        </span>
      </button>
      <button className={cls.cardBtn}>
        <span className={cls.cardBtnInner}>
          <TruckIcon />
          <span>Поиск машин</span>
        </span>
      </button>
    </div>
  </div>;
};
