import Image from "next/image";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { CarTitle } from "../CarTitle";
import { CarInfo } from "../CarInfo";
import Link from "next/link";
import { formatSum } from "@/utils/formatSum";

export const CarItem = ({ data, path }) => {
  return (
    <Link href={path}>
      <Flex
        gap="10px"
        p="16px"
        rounded="12px"
        border="1px solid"
        borderColor="brand.200"
        cursor="pointer"
      >
        <Box width={137} overflow="hidden" rounded="4px">
          <Image
            priority={false}
            style={{
              aspectRatio: "137 / 87",
              objectFit: "cover",
              width: "137px",
              height: "87px",
            }}
            width={132}
            height={87}
            src={data?.photo}
            alt="car"
          />
        </Box>
        <Stack gap="4px">
          <CarTitle title={data.name} />
          <Text fontWeight={600} color="primary" fontSize="14px" lineHeight="14px">
            {formatSum(data?.currency_id_data?.code || "RUB", data?.price)}
          </Text>
          <CarInfo prop="Тип машины:" val={data?.vehicle_type_id_data?.name} />
          <CarInfo prop="Город:" val={data?.address_id_data?.name} />
        </Stack>
      </Flex>
    </Link>
  );
};
