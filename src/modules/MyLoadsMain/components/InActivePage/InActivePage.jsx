import { Box } from "@chakra-ui/react";

import cls from "./style.module.scss";
import { Performed } from "../Performed";

import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import useProps from "./useProps";
import { LoadsCard } from "../LoadsCard";

export const InActivePage = ({ orderStatus, t }) => {
  const { cargoData,isLoading } = useProps(orderStatus, t);

  if(isLoading)  {
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
    </>
  );
};
