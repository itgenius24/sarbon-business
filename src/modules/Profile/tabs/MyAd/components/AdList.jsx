import { Box, Button, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";
import { TopFilter } from "@/components/TopFilter";
import CarCard from "@/modules/Profile/components/CarCard";
import { NoAdFound } from "./NoAdFound";

export const AdList = ({ adList = fakeData, handleNoData = () => {}, isLoading }) => {
  return (
    <Box minH="250px">
      {isLoading ? (
        <SkeletonComp />
      ) : (
        <>
          <TopFilter filterList={filterTabs} />
          <NoAdFound handleNoData={handleNoData} />

          <SimpleGrid columns={2} spacing={4} mt="16px">
            {adList?.map((item) => (
              <CarCard key={item?.name} photoKey="photo" data={item}>
                <CarCard.Title value={item?.title} />
                <CarCard.Subtitle value={item?.price} />
                <CarCard.Info prop="Тип машины:" val={item?.type} />
                <CarCard.Info prop="Город:" val={item?.city} />
              </CarCard>
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export const filterTabs = [
  {
    label: "Опубликованные",
    value: "publish",
  },
  {
    label: "Архив",
    value: "archive",
  },
];

const fakeData = [
  {
    title: "Krone SD SX3258",
    price: "30 000 ТЫС.  $",
    type: "Самосвал",
    city: "Ташкент",
    photo:
      "https://media.newyorker.com/photos/61a5800b07516aaf7967f1ee/master/pass/Monroe-OldTrucksNewMoney.jpg",
  },
  {
    title: "DJR Kal0150",
    mileage: "1 200 км",
    type: "Самосвал",
    city: "Ташкент",
    photo:
      "https://media.newyorker.com/photos/61a5800b07516aaf7967f1ee/master/pass/Monroe-OldTrucksNewMoney.jpg",
  },
  {
    title: "DJR Kal0150 (2)",
    mileage: "1 200 км",
    type: "Самосвал",
    city: "Ташкент",
    photo:
      "https://media.newyorker.com/photos/61a5800b07516aaf7967f1ee/master/pass/Monroe-OldTrucksNewMoney.jpg",
  },
  {
    title: "Krone SD SX3258 (2)",
    price: "30 000 ТЫС.  $",
    type: "Самосвал",
    city: "Ташкент",
    photo:
      "https://media.newyorker.com/photos/61a5800b07516aaf7967f1ee/master/pass/Monroe-OldTrucksNewMoney.jpg",
  },
];
