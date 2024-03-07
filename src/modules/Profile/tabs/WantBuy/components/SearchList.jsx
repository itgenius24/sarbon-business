import { Dropdown } from "@/components/Dropdown";
import { Box, Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { CarTitle } from "./CarTitle";
import { RangeInfo } from "./RangeInfo";
import { CarInfo } from "./CarInfo";
import { MainContentHeader } from "@/modules/Profile/components/MainContentHeader";
import { MainContentCard } from "@/modules/Profile/components/MainContentCard";
import { SkeletonComp } from "@/components/Skeleton";

export const SearchList = ({
  dropDownProps = () => {},
  carsList = [],
  onCarClick = () => {},
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
      {/* <TextField
        addonBefore={<Email />}
        register={register}
        errors={errors}
        type="email"
        name="email"
        label="Почта"
        rules={rules}
        defaultValue={email}
      /> */}
      {isLoading ? (
        <SkeletonComp />
      ) : (
        <SimpleGrid columns={2} spacing={4} mt="16px">
          {carsList?.map((item) => (
            <CarItem key={item?.name} data={item} onClick={onCarClick} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

const CarItem = ({ data, onClick }) => {
  const handleClick = () =>{
    onClick(data);
  };
  return (
    <Flex
      gap="10px"
      p="16px"
      rounded="12px"
      border="1px solid"
      borderColor="brand.200"
      onClick={handleClick}
      cursor="pointer"
    >
      <Box width={137} overflow="hidden" rounded="4px">
        <Image
          priority={false}
          style={{
            aspectRatio: "137 / 87",
            objectFit: "cover",
            width: "137px",
            height:"87px"
          }}
          width={132}
          height={87}
          src={
            data?.photo
            // "https://media.newyorker.com/photos/61a5800b07516aaf7967f1ee/master/pass/Monroe-OldTrucksNewMoney.jpg"
          }
          alt={"car"}
        />
      </Box>
      <Stack gap="4px">
        <CarTitle title={data.name} />
        <RangeInfo range={data.mileage} />
        <CarInfo prop="Тип машины:" val={data.type} />
        <CarInfo prop="Город:" val={data.city} />
      </Stack>
    </Flex>
  );
};
