import { Box } from "@chakra-ui/react";

import cls from "./style.module.scss";
import { Performed } from "../Performed";

import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import useProps from "./useProps";

export const ArchivePage = ({ orderStatus, t,setOpen }) => {
  const { cargoData,isLoading,isFetching } = useProps(orderStatus, t);

  if(isLoading && cargoData?.length < 0)  {
    return <LoadingSpinner />
  }
  
  return (
    <>
      <Box>
        {cargoData?.length > 0 ? (
          cargoData?.map((item, index) => (
            <Performed setOpen={setOpen} orderStatus={orderStatus} key={index} cargo={item} />
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
