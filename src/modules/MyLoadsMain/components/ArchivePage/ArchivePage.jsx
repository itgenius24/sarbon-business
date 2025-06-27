import { Box, Button } from "@chakra-ui/react";
import { Performed } from "../Performed";

import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import useProps from "./useProps";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
export const ArchivePage = ({ orderStatus, t, setOpen, locale, isProfile }) => {
  const { cargoData, isLoading, isFetching, addPage, columns } = useProps(
    orderStatus,
    t,
    locale,
    setOpen
  );


  return (
    <>
      <Box>
        {cargoData?.length > 0 && !isProfile && (
          <SarbonTable
            width="100%"
            variant="card"
            columns={columns}
            data={cargoData}
           
          />
        )}
        {cargoData?.length > 0 &&
          isProfile &&
          cargoData?.map((item, index) => (
            <Performed
              setOpen={setOpen}
              orderStatus={orderStatus}
              key={index}
              cargo={item}
            />
          ))}
      </Box>
      {cargoData?.length === 0 && isFetching && <LoadingSpinner />}

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
