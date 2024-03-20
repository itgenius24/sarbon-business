import { Box, Button, Flex, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";
import { TopFilter } from "@/components/TopFilter";
import CarCard from "@/modules/Profile/components/CarCard";
import { NoAdFound } from "./NoAdFound";

export const AdList = ({
  list,
  handleNoData = () => {},
  isLoading,
  changeTabState,
}) => {

  console.log(list);
  return (
    <Box minH="250px">
      <TopFilter
        filterList={filterTabs}
        onChange={changeTabState}
        disabled={isLoading}
      />

      {isLoading ? (
        <SkeletonComp />
      ) : (
        <>
          {!!list?.length && (
            <SimpleGrid columns={2} spacing={4} mt="16px">
              {list?.map((item) => (
                <CarCard key={item?.name} photoKey="photo" data={item}>
                  <CarCard.Title value={item?.title} />
                  <CarCard.Subtitle value={item?.price} />
                  <CarCard.Info prop="Тип машины:" val={item?.type} />
                  <CarCard.Info prop="Город:" val={item?.city} />
                </CarCard>
              ))}
            </SimpleGrid>
          )}

          {
            !list?.length
              ? <NoAdFound handleNoData={handleNoData} />
              : <Button onClick={handleNoData} type="button" maxW="320px" mt="24px">
                  Добавить публикацию
              </Button>
          }
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

