"use client";

import { Heading, VStack } from "@chakra-ui/react";
import { SingleCar } from "../SingleCar/SingleCar";
import { useTranslation } from "react-i18next";

export const CarList = ({
  data = [],
  showDistance = false,
  oneDir,

  phoneBtn,
  dataAccordion,
  additionalData,
  carType,
  loadType,
  capacity,
  height,
}) => {
  if(!data?.length)return null;
   const {t} = useTranslation();
  return (
    <>
      <Heading size="md" mt="40px" mb="24px">
        {data?.length} {t("машин найдено")}
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
