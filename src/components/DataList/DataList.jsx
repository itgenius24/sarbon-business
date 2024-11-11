import { useTranslation } from "react-i18next";
import cls from "./styles.module.scss";

export const DataList = ({ list = [], status }) => {
  const { t } = useTranslation();

  return (
    <dl className={cls.cardList}>
      {status === `new` ||
      status === `in_moderator` ||
      status === `in_active` ? (
        list.map((item, index) => (
          <div key={index} className={cls.cardListItem}>
            <dt>
              {item.title} {item.value}
            </dt>
          </div>
        ))
      ) : (
        <div className={cls.cardListItem}>
          <dt>
            {t("Транспорт")}:{list.vehicle_type_id_data?.name}
          </dt>
        </div>
      )}

      {/* 
    {
        list?.map((item, index) => (
          <div  key={index} className={cls.cardListItem}>
          <dt>
            {item?.title} {item?.value}
          </dt>
          </div>
        ))
    } */}
    </dl>
  );
};
