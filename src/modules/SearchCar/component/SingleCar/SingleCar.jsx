import { Box } from "@chakra-ui/react";
import cls from "./styles.module.scss";
import { DataList } from "@/components/DataList";

export const SingleCar = () => {
  return (
    <div className={cls.loadsCard}>
      <div className={cls.cardTop}>
        <div className={cls.cardTopContent}>
          <h2 className={cls.address}>
            <span className={cls.addressText}>Ташкент Бухара</span>
          </h2>
          {/* <span className={cls.distance}>724 км</span> */}
        </div>
      </div>
      <Box borderBottom="1px solid" borderColor="brand.200">
        <DataList list={list} />
      </Box>
      <div className={cls.cardBottom}></div>
    </div>
  );
};


const list = [
  {
    title: "Расстояние: ",
    value: "570 км",
  },
  {
    title: "Товар: ",
    value: "Полиэтилен F-0120 Шуртан ГХК",
  },
  {
    title: "Вид: ",
    value: "Зерно и семена (насыпью),пищевые добавки",
  },
  {
    title: "Время: ",
    value: "18 январь 22:00 ч",
  },
];
