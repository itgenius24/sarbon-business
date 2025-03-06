import { Box, Button } from "@chakra-ui/react";

import cls from "./style.module.scss";
import { Performed } from "../Performed";

import { Empty } from "../Empty";
import usePerfomedPageProps from "./usePerfomedPageProps";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const PerfomedPage = ({ orderStatus, t }) => {
  const { cargoData,isLoading,addPage,isFetching, } = usePerfomedPageProps(orderStatus, t);



  if(isLoading && cargoData?.length < 0)  {
    return <LoadingSpinner />
  }
  
  return (
    <>
      <Box>
        {cargoData?.length > 0 ? (
          cargoData?.map((item, index) => (
            <Performed orderStatus={orderStatus} key={index} cargo={item} />
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
};
