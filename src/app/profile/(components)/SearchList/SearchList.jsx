import { Dropdown } from "@/components/Dropdown";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";
import { CarItem } from "../CarItem";

export const SearchList = ({
  dropDownProps = () => {},
  carsList = [],
  isLoading,
}) => {

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
        <SimpleGrid columns={2} spacing={4} mt="16px">
          {carsList?.map((item, idx) => (
            <CarItem key={item?.guid || idx} data={item} path={`/profile/want-buy/${item?.guid}`} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
