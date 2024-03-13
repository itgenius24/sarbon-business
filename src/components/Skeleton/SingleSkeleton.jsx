import { Skeleton } from "@chakra-ui/react";

export const SingleSkeleton = ({ children, height = "60px",isLoaded=true }) => {
  return (
    <Skeleton isLoaded={isLoaded} height={height} startColor="brand.300" endColor="brand.400">
      {children}
    </Skeleton>
  );
};
