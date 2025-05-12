import { Dropdown } from "@/components/Dropdown";
import { Box, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";
import { CarItem } from "../CarItem";
import { useGetLang } from "@/hooks/useGetLang";

export const SearchList = ({
  dropDownProps = () => {},
  carsList = [],
  isLoading,
}) => {

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const locale = useGetLang();

  return (
    <Box minH="250px">
      <Dropdown
        {...dropDownProps()}
        options={undefined}
        required
        searchable
        name="cars"
        disabled={false}
        searchName="searchVal"
      />
      {isLoading ? (
        <SkeletonComp />
      ) : (
        <SimpleGrid columns={isLargerThan845 ? 2 : 1} spacing={4} mt="16px">
          {carsList?.map((item, idx) => (
            <CarItem
              key={item?.guid || idx} data={item}
              path={`/${locale}/profile/want-buy?guid=${item?.guid}`}
              isLargerThan845={isLargerThan845}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
