"use client";

import { Heading, VStack } from "@chakra-ui/react";
import { useSearchCar } from "../../useSearchCar";
import { SingleCar } from "../SingleCar/SingleCar";

export const CarList = ({ data = [] }) => {
  if(!data?.length)return null;

  return (
    <>
      <Heading size="md" mt="40px" mb="24px">
        {data?.length} машин найдено
      </Heading>
      <VStack align="stretch" spacing="24px">
        {data.map((item) => {
          return <SingleCar key={item} carInfo={item} />;
        })}
      </VStack>
    </>
  );
};
