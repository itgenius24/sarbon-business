import { useTranslation } from "react-i18next";
import cls from "./styles.module.scss";

export const DataList = ({ list }) => {
  const {t} = useTranslation();
  return <dl className={cls.cardList}>
  
  
        <div className={cls.cardListItem}>
          <dt> {t("Транспорт")}:{list.vehicle_type_id_data?.name}</dt>
          {/* <dd>{list.value}</dd> */}
        </div>
   
  </dl>;
};
