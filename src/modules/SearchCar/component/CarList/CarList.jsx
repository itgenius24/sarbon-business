"use client";

import { Heading, VStack } from "@chakra-ui/react";
import { SingleCar } from "../SingleCar/SingleCar";

export const CarList = ({
  data = [],
  showDistance = false,
  oneDir,
  infoList,
  phoneBtn,
  dataAccordion,
  additionalData,
}) => {
  if(!data?.length)return null;

  return (
    <>
      <Heading size="md" mt="40px" mb="24px">
        {data?.length} машин найдено
      </Heading>
      <VStack align="stretch" spacing="24px">
        {data.map((item) => {
          return <SingleCar
            withAddress={true}
            key={item}
            carInfo={item}
            // infoList={infoList}
            showDistance={showDistance}
            oneDir={oneDir}
            phoneBtn={phoneBtn}
            dataAccordion={dataAccordion}
            additionalData={additionalData}
          />;
        })}
      </VStack>
    </>
  );
};
