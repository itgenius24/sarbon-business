import { Box, Button } from "@chakra-ui/react";

import cls from "./style.module.scss";
import { Performed } from "../Performed";
import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import useProps from "./useProps";
import { LoadsCard } from "../LoadsCard";

export const InModerationPage = ({ orderStatus, t }) => {
  const { cargoData, isLoading, addPage,isFetching,handleDelete } = useProps(orderStatus, t);



  return (
    <>
      <Box>
        {cargoData?.length > 0 && (
          cargoData?.map((item, index) => (
            <LoadsCard orderStatus={orderStatus} key={index} cargo={item}  handleDelete={handleDelete} />
          ))
        )}
      </Box>
      { cargoData?.length === 0 && isFetching && <LoadingSpinner />}
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
