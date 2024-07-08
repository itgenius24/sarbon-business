import cls from "./styles.module.scss";

export const DataList = ({ list }) => {
  return <dl className={cls.cardList}>
  
        <div className={cls.cardListItem}>
          <dt> Транспорт: {list.vehicle_type_id_data?.name}</dt>
          {/* <dd>{list.value}</dd> */}
        </div>
   
  </dl>;
};
