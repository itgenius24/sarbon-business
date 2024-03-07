import { Skeleton, Stack } from "@chakra-ui/react";

export const SkeletonComp = () => {
  return (
    <Stack gap="10px" my="20px">
      <Skeleton height="60px" startColor="brand.300" endColor="brand.400" />
      <Skeleton
        my="20px"
        height="60px"
        startColor="brand.300"
        endColor="brand.400"
      />
      <Skeleton height="100px" startColor="brand.300" endColor="brand.400" />
    </Stack>
  );
};
