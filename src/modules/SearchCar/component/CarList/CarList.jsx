"use client";

import { Heading, VStack } from "@chakra-ui/react";
import { useSearchCar } from "../../useSearchCar";
import { SingleCar } from "../SingleCar/SingleCar";

export const CarList = ({data = []}) => {

  console.log("RENDERING data ", data);

  const arr = [];
  return (
    <>
      <Heading size="md" mt="40px" mb="24px">
        3 машин найдено
      </Heading>
      <VStack align="stretch" spacing="24px">
        {arr.map((item) => {
          return <SingleCar key={item} />;
        })}
      </VStack>
    </>
  );
};
