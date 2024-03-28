import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";
import { TopFilter } from "@/components/TopFilter";
import { NoAdFound } from "../NoAdFound";
import Link from "next/link";
import CarCard from "../CarCard";
import { CarItem } from "../CarItem";

export const AdList = ({
  list,
  handleNoData = () => {},
  isLoading,
  changeTabState,
  onCardClick = () => {},
  tabState,
  locale
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
                <CarItem key={item?.name} data={item} path={`/${locale || "ru"}/profile/my-ad/detail/${item?.guid}`}/>
                // <Link href={`/profile/my-ad/detail/${item?.guid}`} key={item?.name}>
                //   <CarCard onClick={onCardClick} photoKey="photo" data={item}>
                //     <CarCard.Title value={item?.title} />
                //     <CarCard.Subtitle value={item?.price} />
                //     <CarCard.Info prop="Тип машины:" val={item?.type} />
                //     <CarCard.Info prop="Город:" val={item?.city} />
                //   </CarCard>
                // </Link>
              ))}
            </SimpleGrid>
          )}
          {
            !list?.length
              ? <NoAdFound handleNoData={handleNoData} />
              : tabState !== "archive"
                ? <Button onClick={handleNoData} type="button" maxW="320px" mt="24px">
                    Добавить публикацию
                </Button>
                : null
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

