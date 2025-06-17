import { Box, Button } from "@chakra-ui/react";

import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";

import { LoadsCard } from "../LoadsCard";
import useProps from "./useProps";

export const AllPage = ({ orderStatus, t, search = ``, address = `` }) => {
  const { cargoData, isLoading, addPage, isFetching, handleDelete } = useProps(
    orderStatus,
    t,
    search,
    address
  );


  return (
    <>
      <Box>
        {cargoData?.length > 0 &&
          cargoData?.map((item, index) => (
            <LoadsCard
              handleDelete={handleDelete}
              orderStatus={orderStatus}
              key={index}
              cargo={item}
            />
          ))}
      </Box>

      {cargoData?.length === 0 && isFetching && <LoadingSpinner />}
      {cargoData?.length === 0 && !isFetching && <Empty t={t} />}

      {cargoData?.length >= 100 && (
        <Box mt={`15px`} width={`fit-content`}>
          <Button isLoading={isFetching} onClick={addPage}>
            Загрузить еще
          </Button>
        </Box>
      )}
    </>
  );
};
