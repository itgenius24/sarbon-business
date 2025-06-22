import { Box } from "@chakra-ui/react";
import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import useProps from "./useProps";
import { LoadsCard } from "../LoadsCard";

export const InActivePage = ({ orderStatus, t }) => {
  const { cargoData, isLoading, isFetching } = useProps(orderStatus, t);


  return (
    <>
      {cargoData?.length === 0 && isFetching && <LoadingSpinner />}

      <Box>
        {cargoData?.length > 0 &&
          cargoData?.map((item, index) => (
            <LoadsCard orderStatus={orderStatus} key={index} cargo={item} />
          ))}
      </Box>
      {cargoData?.length === 0 && !isFetching && <Empty t={t} />}
    </>
  );
};
