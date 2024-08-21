import { useTranslation } from "react-i18next";
import cls from "./styles.module.scss";

export const DataList = ({ list = [],status }) => {
  const { t } = useTranslation();

  return (
    <dl className={cls.cardList}>

    {
    
     
        list?.map((item, index) => (
          <div  key={index} className={cls.cardListItem}>
          <dt>
            {item?.title} {item?.value}
          </dt>
          </div>
        ))
    
    }
    
    </dl>
  );
};
