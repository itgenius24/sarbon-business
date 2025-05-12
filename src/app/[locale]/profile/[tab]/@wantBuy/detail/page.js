"use client";

import { Box, Divider, Flex, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { Gallery } from "@/app/[locale]/profile/(components)/Gallery";
import { CarInfo } from "@/app/[locale]/profile/(components)/CarInfo";
import { CarTitle } from "@/app/[locale]/profile/(components)/CarTitle";
import { useGetCarById } from "@/services/api";
import { SkeletonComp } from "@/components/Skeleton";
import { formatSum } from "@/utils/formatSum";
import { BackArrow } from "@/assets/icons/icons";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page () {

  const router = useRouter();
    const searchParams = useSearchParams();
      const guid = searchParams.get(`guid`);

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const param = { guid: guid, with_relations: true };

  const { data, isLoading }= useGetCarById({ data: JSON.stringify(param) },{ select: res=> res?.response?.[0] });


  if (isLoading) return <SkeletonComp/>;

  return (
    <Box>
      <Flex onClick={router.back} as="button" alignItems="center" mb="10px">
        <BackArrow />
        <span>Назад</span>
      </Flex>
      <Flex gap="10px" flexDirection={isLargerThan845 ? "row" : "column"}>
        <Gallery data={data} isLargerThan845={isLargerThan845} />
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
    </Box>
  );
}
