import { Box, Button } from "@chakra-ui/react";

import cls from "./style.module.scss";
import { Performed } from "../Performed";
import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import useProps from "./useProps";
import { LoadsCard } from "../LoadsCard";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

export const InModerationPage = ({ orderStatus, t, locale }) => {
  const {
    cargoData,
    isLoading,
    addPage,
    isFetching,
    handleDelete,
    columns,
    onRow,
  } = useProps(orderStatus, t, locale);

  return (
    <>
      <Box>
        {cargoData?.length > 0 && (
          <SarbonTable
            width="1544px"
            variant="card"
            columns={columns}
            data={cargoData}
            onRow={onRow}
          />
        )}

        {/* {cargoData?.length > 0 && (
          cargoData?.map((item, index) => (
            <LoadsCard orderStatus={orderStatus} key={index} cargo={item}  handleDelete={handleDelete} />
          ))
        )} */}
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
