import { Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { CarTitle } from "./CarTitle";
import { CarInfo } from "./CarInfo";
import { Gallery } from "./Gallery";
import { useEffect } from "react";
import useMoreAboutCar from "../hooks/useMoreAboutCar";
import { useGetCarById } from "@/services/api";
import { SkeletonComp } from "@/components/Skeleton";

export const MoreAboutCar = ({ onCarClick, carID }) => {
  // useMoreAboutCar();
  const param = carID ? { guid: carID } : {};
  const { data, isLoading }= useGetCarById({ data: JSON.stringify(param) },{ select: res=> res?.response?.[0] });
  console.log(data);

  if (isLoading) return <SkeletonComp/>;

  return (
    <Flex gap="10px">
      <Gallery data={data} />
      <Stack gap="16px" flexGrow={1}>
        <CarTitle title="О машине" price={data.price} />
        <CarInfo prop="Тип машины:" val={data.type} />
        <CarInfo prop="Хозяйн:" val={data.owner} />
        <CarInfo prop="Номер::" val={data.contact} color="primary" />
        <Divider color="brand.300" />
        <CarTitle title="Описание:" />
        <Text fontWeight={400} fontSize="14px" onClick={onCarClick}>
          {data.description}
        </Text>
      </Stack>
    </Flex>
  );
};
