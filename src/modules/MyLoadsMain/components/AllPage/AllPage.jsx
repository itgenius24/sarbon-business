import { Box, Button } from "@chakra-ui/react";

import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";

import { LoadsCard } from "../LoadsCard";
import useProps from "./useProps";

export const AllPage = ({orderStatus,t}) => {

    const { cargoData,isLoading,addPage,isFetching, } = useProps(orderStatus, t);


    if(isLoading && cargoData?.length < 0)  {
      return <LoadingSpinner />
    }
    
    return (
      <>
        <Box>
          {cargoData?.length > 0 ? (
            cargoData?.map((item, index) => (
              <LoadsCard orderStatus={orderStatus} key={index} cargo={item} />
            ))
          ) : (
            <Empty t={t} />
          )}
        </Box>

        {cargoData?.length >= 40 && (
            <Box mt={`15px`} width={`fit-content`}>
              <Button
                isLoading={isFetching}
                onClick={addPage}
              >
                Загрузить еще
              </Button>
            </Box>
          )}
      </>
    );
  
}
