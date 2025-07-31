import { Box, Button, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";
import { TopFilter } from "@/components/TopFilter";
import { NoAdFound } from "../NoAdFound";
import { CarItem } from "../CarItem";
import { useTranslation } from "react-i18next";

export const AdList = ({
  list,
  handleNoData = () => {},
  isLoading,
  changeTabState,
  onCardClick = () => {},
  tabState,
  locale
}) => {

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { t } = useTranslation();
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
            <SimpleGrid columns={isLargerThan845 ? 2 : 1} spacing={isLargerThan845 ? 4 : 2} mt="16px">
              {list?.map((item) => (
                <CarItem key={item?.name} data={item} path={`/${locale || "ru"}/profile/my-ad/detail/${item?.guid}`}/>
              ))}
            </SimpleGrid>
          )}
          {
            !list?.length
              ? <NoAdFound handleNoData={handleNoData} status={tabState} />
              : tabState !== "archive"
                ? <Button onClick={handleNoData} type="button" maxW="320px" mt="24px">
                  {t(`Добавить публикацию`)}
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

