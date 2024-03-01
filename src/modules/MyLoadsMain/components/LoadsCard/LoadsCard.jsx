import clsx from "clsx";
import cls from "./styles.module.scss";
import { DeleteIcon, TruckIcon } from "@/assets/icons/icons";
import { LoadBtn } from "@/components/LoadBtn";
import { useRouter } from "next/navigation";
import { DataList } from "@/components/DataList";
import { Box } from "@chakra-ui/react";
import { formatDate } from "@/utils/isValidDate";
import { statuses } from "@/utils/constants";

export const LoadsCard = ({
  guid,
  address_id_data,
  address_id_2_data,
  bid_cash,
  cargo_type_id_data,
  load_time,
  load_around_the_clock,
  take_all_unloads,
  order_status,
  date,
  provisions,
  handleDelete,
}) => {

  const status = order_status?.[0] || provisions?.[0];

  const router = useRouter();

  const list = [
    {
      title: "Расстояние: ",
      value: "570 км",
    },
    {
      title: "Товар: ",
      value: cargo_type_id_data?.name,
    },
    {
      title: "Вид: ",
      value: load_around_the_clock
        ? "отдельной машиной или догрузом (FTL или LTL)"
        : take_all_unloads
          ? "отдельной машиной (FTL)"
          : "",
    },
    {
      title: "Время: ",
      value: formatDate(status === "new" ? date : load_time),
    },
  ];

  return <div className={cls.loadsCard} onClick={() => router.push(`/my-loads/${status}/${guid}`)}>
    <div className={cls.cardTop}>
      <div className={cls.cardTopContent}>
        <h2 className={cls.address}>
          <span className={cls.addressText}>{address_id_data?.name} -&gt; {address_id_2_data?.name}</span>
          <span className={clsx(cls.addressStatus, cls[status])}>{statuses[status]}</span>
        </h2>
        <span className={cls.distance}>724 км</span>
      </div>
      <div className={cls.paymentInfo}>
        <div className={cls.paymentInfoContent}>
          <span className={cls.paymentInfoText}>
            {bid_cash} UZS
          </span>
          <span className={cls.paymentInfoSubText}>(до 30 тыс. UZS/км)</span>
        </div>
        <span className={cls.paymentInfoComment}>Возможен торг</span>
      </div>
    </div>
    <Box borderBottom="1px solid" borderColor="brand.200">
      <DataList list={list} />
    </Box>
    {
      status === "performed" && <LoadBtn icon={<DeleteIcon color="#F04438" />} type="delete" onClick={() => handleDelete(guid)}>
        Удалить
      </LoadBtn>
    }
    {
      status === "in_moderation" && <div className={cls.cardBottom}>
        <LoadBtn icon={<DeleteIcon color="#F04438" />} type="delete" onClick={() => handleDelete(guid)}>
          Удалить
        </LoadBtn>
        <LoadBtn onClick={() => {}} icon={<TruckIcon />}>
          Поиск машин
        </LoadBtn>
      </div>
    }
  </div>;
};
