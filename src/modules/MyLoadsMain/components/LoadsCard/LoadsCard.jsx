import clsx from "clsx";
import cls from "./styles.module.scss";
import { DeleteIcon, PencilIcon, TruckIcon } from "@/assets/icons/icons";
import { LoadBtn } from "@/components/LoadBtn";
import { useRouter } from "next/navigation";
import { DataList } from "@/components/DataList";
import { Box } from "@chakra-ui/react";

export const LoadsCard = ({ guid }) => {

  const router = useRouter();

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
    <Box borderBottom="1px solid" borderColor="brand.200">
      <DataList list={list} />
    </Box>
    <div className={cls.cardBottom}>
      <LoadBtn icon={<DeleteIcon color="#F04438" />} type="delete" onClick={() => {}}>
        Удалить
      </LoadBtn>
      <LoadBtn icon={<PencilIcon />} onClick={() => router.push(`/my-loads/${guid}`)}>
        Изменить
      </LoadBtn>
      <LoadBtn onClick={() => {}} icon={<TruckIcon />}>
        Поиск машин
      </LoadBtn>
    </div>
  </div>;
};
