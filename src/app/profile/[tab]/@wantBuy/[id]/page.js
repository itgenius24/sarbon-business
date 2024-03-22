"use client";

import { Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { Gallery } from "@/app/profile/(components)/Gallery";
import { CarInfo } from "@/app/profile/(components)/CarInfo";
import { CarTitle } from "@/app/profile/(components)/CarTitle";
import { useGetCarById } from "@/services/api";
import { SkeletonComp } from "@/components/Skeleton";

export default function Page ({ params }) {

  const param = { guid: params.id };

  const { data, isLoading }= useGetCarById({ data: JSON.stringify(param) },{ select: res=> res?.response?.[0] });


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
        <Text fontWeight={400} fontSize="14px" >
          {data.description}
        </Text>
      </Stack>
    </Flex>
  );
}
