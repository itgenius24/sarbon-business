import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";
import { TopFilter } from "@/components/TopFilter";
import CarCard from "@/modules/Profile/components/CarCard";
import { NoAdFound } from "../NoAdFound";
import Link from "next/link";

export const AdList = ({
  list,
  handleNoData = () => {},
  isLoading,
  changeTabState,
  onCardClick = () => {},
}) => {

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
                <Link href={`/profile1/my-ad/detail/${item?.guid}`} key={item?.name}>
                  <CarCard onClick={onCardClick} photoKey="photo" data={item}>
                    <CarCard.Title value={item?.title} />
                    <CarCard.Subtitle value={item?.price} />
                    <CarCard.Info prop="Тип машины:" val={item?.type} />
                    <CarCard.Info prop="Город:" val={item?.city} />
                  </CarCard>
                </Link>
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

const filterTabs = [
  {
    label: "Опубликованные",
    value: "publish",
  },
  {
    label: "Архив",
    value: "archive",
  },
];

