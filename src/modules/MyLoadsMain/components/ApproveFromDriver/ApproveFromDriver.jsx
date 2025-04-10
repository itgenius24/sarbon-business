import { Box } from "@chakra-ui/react";

import cls from "./style.module.scss";
import { Performed } from "../Performed";

import { Empty } from "../Empty";
import useFromDriverProps from "./useFromDriverProps";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const ApproveFromDriver = ({ orderStatus, t }) => {
  const { cargoData,isLoading,handleCancel,isLoadingCancel } = useFromDriverProps(orderStatus, t);



  if(isLoading)  {
    return <LoadingSpinner />
  }
  
  return (
    <>
      <Box>
        {cargoData?.length > 0 ? (
          cargoData?.map((item, index) => (
            <Performed orderStatus={orderStatus} key={index} cargo={item} handleCancel={handleCancel}             disabledCancelBtn={isLoadingCancel}
 />
          ))
        ) : (
          <Empty t={t} />
        )}
      </Box>
    </>
  );
};
