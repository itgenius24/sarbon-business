import { Box } from "@chakra-ui/react";
import cls from "./styles.module.scss";
import { DataList } from "@/components/DataList";
import { DriverReviewStar } from "@/assets/icons/icons";

export const SingleCar = ({ carInfo }) => {
  const newList = [
    {
      title: "Транспорт",
      value: "",
    },
    {
      title: "Разрешение:",
      value: address[carInfo?.users_id_data?.adr],
    },
    {
      title: "Детали:",
      value: `${carInfo?.capacity}т, ${carInfo?.volume} м3`,
    },
    {
      title: "Рейтинг водителя:",
      value: carInfo?.users_id_data?.rating,
    },
  ];

  return (
    <div className={cls.loadsCard}>
      <div className={cls.cardTop}>
        <div className={cls.cardTopContent}>
          <h2 className={cls.address}>
            <span className={cls.addressText}>
              {carInfo?.address_id_data?.name} {carInfo?.address_id_2_data?.name}
            </span>
          </h2>
          {/* <span className={cls.distance}>724 км</span> */}
        </div>
      </div>
      <Box borderBottom="1px solid" borderColor="brand.200">
        <DataList list={newList} />
      </Box>
      <div className={cls.cardBottom}></div>
    </div>
  );
};

const address = {
  adr_1: "adr-1",
  adr_2: "adr-2",
  adr_3: "adr-3",
  adr_4: "adr-4",
  adr_5: "adr-5",
  adr_6: "adr-6",
};

