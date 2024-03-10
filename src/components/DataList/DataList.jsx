import cls from "./styles.module.scss";

export const DataList = ({ list = [] }) => {
  return <dl className={cls.cardList}>
    {
      list.map((item, index) => (
        <div className={cls.cardListItem} style={item.grow ? { gridColumn: "1 / span 3" } : {}} key={index}>
          <dt>{item.title}</dt>
          <dd>{item.value}</dd>
        </div>
      ))
    }
  </dl>;
};
