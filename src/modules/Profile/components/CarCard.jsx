import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { Children } from "react";

const CarCard = ({ data, onClick, photoKey ,children }) => {
  const handleClick = () => {
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
        <CarImage
          width={137}
          height={87}
          photo={data?.[photoKey]}
          alt={"car"}
        />
      </Box>
      <Stack gap="4px">
        {children}
      </Stack>
    </Flex>
  );
};


export const CarTitle = ({ value }) => {
  return (
    <Heading fontSize="16px" lineHeight="19px">
      {value}
    </Heading>
  );
};

export const CarInfo = ({ prop, val, color = "brand.800" }) => {
  return (
    <Text
      display="flex"
      gap="8px"
      fontSize="14px"
      fontWeight={400}
      lineHeight="18px"
      color="brand.500"
    >
      {prop}
      <Text as="span" fontWeight={500} color={color}>
        {val}
      </Text>
    </Text>
  );
};

export const Subtitle = ({ value }) => {
  return (
    <Text fontWeight={600} color="primary" fontSize="14px" lineHeight="14px">
      {value}
    </Text>
  );
};

CarCard.Title = CarTitle;
CarCard.Subtitle = Subtitle;
CarCard.Info = CarInfo;

export default CarCard;




export const CarImage = ({ photo, alt = "image", width = 132, height = 87 }) => {
  return (
    <Box width={137} overflow="hidden" rounded="4px">
      <Image
        priority={false}
        style={{
          aspectRatio: `${width} / ${height}`,
          objectFit: "cover",
          width: `${width}px`,
          height: `${height}px`,
        }}
        width={width}
        height={height}
        src={
          photo
          // `${process.env.NEXT_PUBLIC_MEDIA_URL}${photo}`
          // "https://media.newyorker.com/photos/61a5800b07516aaf7967f1ee/master/pass/Monroe-OldTrucksNewMoney.jpg"
        }
        alt={alt}
      />
    </Box>
  );
};
