import { Box } from "@chakra-ui/react";
import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import useProps from "./useProps";
import { LoadsCard } from "../LoadsCard";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

export const InActivePage = ({ orderStatus, t,locale }) => {
  const { cargoData, isLoading, isFetching,columns,onRow } = useProps(orderStatus, t,locale);


  return (
    <>
      {cargoData?.length === 0 && isFetching && <LoadingSpinner />}

      <Box>
       <SarbonTable
          width="100%"
          variant="card"
          columns={columns}
          data={cargoData}
          onRow={onRow}
        />
        
        {/* {cargoData?.length > 0 &&
          cargoData?.map((item, index) => (
            <LoadsCard orderStatus={orderStatus} key={index} cargo={item} />
          ))} */}
      </Box>
      {cargoData?.length === 0 && !isFetching && <Empty t={t} />}
    </>
  );
};
