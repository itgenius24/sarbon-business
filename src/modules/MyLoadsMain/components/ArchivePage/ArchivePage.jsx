import { Box, Button } from "@chakra-ui/react";
import { Performed } from "../Performed";

import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import useProps from "./useProps";

export const ArchivePage = ({ orderStatus, t, setOpen }) => {
  const { cargoData, isLoading, isFetching, addPage } = useProps(
    orderStatus,
    t
  );

  return (
    <>
      {cargoData?.length === 0 && isFetching && <LoadingSpinner />}

      <Box>
        {cargoData?.length > 0 &&
          cargoData?.map((item, index) => (
            <Performed
              setOpen={setOpen}
              orderStatus={orderStatus}
              key={index}
              cargo={item}
            />
          ))}
      </Box>
      {cargoData?.length === 0 && !isFetching && <Empty t={t} />}


      {cargoData?.length >= 40 && (
        <Box mt={`15px`} width={`fit-content`}>
          <Button isLoading={isFetching} onClick={addPage}>
            Загрузить еще
          </Button>
        </Box>
      )}
    </>
  );
};
