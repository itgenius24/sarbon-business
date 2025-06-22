import { UseIcon, UseIconRed } from "@/assets/icons/icons";
import { useGetVehicle } from "@/services/api";
import { Placemark } from "@pbe/react-yandex-maps";
import React from "react";

const PlacemarkItem = ({ carType, loadType, capacity, height, carInfo }) => {
  const requestBody = {};

  if (carType) {
    requestBody.trailer_type_id = carType;
  }

  if (loadType) {
    requestBody.load_type_id_3 = loadType;
  }

  if (height) {
    requestBody.height = height;
  }

  if (capacity) {
    requestBody.capacity = Number(capacity);
  }

  const getVehicle = useGetVehicle(
    {
      data: JSON.stringify({
        users_id: carInfo.users_id,
        with_relations: true,
        ...requestBody,
      }),
    },
    { enabled: true }
  );

  const newListDraggable = () => {
    const data = getVehicle.data?.response;

    return (
      data?.map?.((item) => {
        return [
          {
            title: "Транспорт:",
            value: item?.trailer_type_id_data?.name || "Нет данных",
          },
          {
            title: "Разрешение:",
            value: address[item?.users_id_data?.adr] || "Нет данных",
          },
          {
            title: "Детали:",
            value: `${item?.capacity || 0}т, ${item?.height || 0} м3`,
          },
          {
            title: "Тип загрузки:",
            value: item?.load_type_id_3_data?.name || "Нет данных",
          },
          {
            title: "Номер транспорта:",
            value: item?.car_number || "Нет данных",
          },
        ];
      }) || []
    );
  };


  return (
    <>
      {newListDraggable()?.length ? (
        <Placemark
          key={carInfo?.id}
          geometry={[carInfo?.lat, carInfo?.long]}
          properties={{
            balloonContent:
              carInfo?.users_id_data?.full_name +
              " " +
              carInfo?.users_id_data?.phone,
          }}
          options={{
            iconLayout: "default#image",
            iconImageHref:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(UseIconRed),
            iconImageSize: [50, 62],
            iconImageOffset: [-15, -42],
          }}
        />
      ) : (
        <Placemark
          key={carInfo?.id}
          geometry={[carInfo?.lat, carInfo?.long]}
          properties={{
            balloonContent:
              carInfo?.users_id_data?.full_name +
              " " +
              carInfo?.users_id_data?.phone,
          }}
          options={{
            iconLayout: "default#image",
            iconImageHref:
              "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(UseIcon),
            iconImageSize: [50, 62],
            iconImageOffset: [-15, -42],
          }}
        />
      )}
    </>
  );
};

export default PlacemarkItem;

const address = {
  adr_1: "adr-1",
  adr_2: "adr-2",
  adr_3: "adr-3",
  adr_4: "adr-4",
  adr_5: "adr-5",
  adr_6: "adr-6",
};
