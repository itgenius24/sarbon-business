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
  carType,
  loadType,
  capacity,
  height,
}) => {
  if(!data?.length)return null;
  console.log({ data });
  return (
    <>
      <Heading size="md" mt="40px" mb="24px">
        {data?.length} машин найдено
      </Heading>
      <VStack align="stretch" spacing="24px">
        {data.map((item) => {
          return <SingleCar
            withAddress={true}
            carType={carType}
            loadType={loadType}
            capacity={capacity}
            height={height}
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
