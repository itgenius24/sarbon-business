"use client";

import { Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { Gallery } from "@/app/profile/(components)/Gallery";
import { CarInfo } from "@/app/profile/(components)/CarInfo";
import { CarTitle } from "@/app/profile/(components)/CarTitle";
import { useGetCarById } from "@/services/api";
import { SkeletonComp } from "@/components/Skeleton";
import { formatSum } from "@/utils/formatSum";

export default function Page ({ params }) {

  const param = { guid: params.id, with_relations: true };

  const { data, isLoading }= useGetCarById({ data: JSON.stringify(param) },{ select: res=> res?.response?.[0] });


  if (isLoading) return <SkeletonComp/>;

  return (
    <Flex gap="10px">
      <Gallery data={data} />
      <Stack gap="16px" flexGrow={1}>
        <CarTitle title="О машине" price={formatSum(data?.currency_id_data?.code || "RUB", data?.price)} />
        <CarInfo prop="Тип машины:" val={data.vehicle_type_id_data?.name} />
        <CarInfo prop="Хозяйн:" val={data?.users_id_data?.full_name} />
        <CarInfo prop="Номер::" val={data.contact} color="primary" />
        <Divider color="brand.300" />
        <CarTitle title="Описание:" />
        <Text fontWeight={400} fontSize="14px" >
          {data.description}
        </Text>
      </Stack>
    </Flex>
  );
}
