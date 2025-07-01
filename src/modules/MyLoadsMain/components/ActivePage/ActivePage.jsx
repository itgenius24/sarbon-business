import { Box, Button } from "@chakra-ui/react";

import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";

import { LoadsCard } from "../LoadsCard";
import useProps from "./useProps";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import cls from "./style.module.scss";

export const ActivePage = ({ orderStatus, t, search, address, locale }) => {
  const {
    cargoData,
    isLoading,
    addPage,
    isFetching,
    handleDelete,
    columns,
    onRow,
  } = useProps(orderStatus, t, search, address, locale);

  const rowClassName = () => {
    return cls.cursor;
  };

  return (
    <>
      <Box>
        <SarbonTable
          width="100%"
          variant="card"
          columns={columns}
          data={cargoData}
          isSticky
          onRow={onRow}
          rowClassName={rowClassName}
        />
        {/* {cargoData?.length > 0 &&
          cargoData?.map((item, index) => (
            <LoadsCard
              handleDelete={handleDelete}
              orderStatus={orderStatus}
              key={index}
              cargo={item}
            />
          ))} */}
      </Box>

      {cargoData?.length === 0 && isLoading && <LoadingSpinner />}
      {cargoData?.length === 0 && !isLoading && <Empty t={t} />}

      {cargoData?.length >= 100 && (
        <Box mt={`15px`} width={`fit-content`}>
          <Button isLoading={isFetching} onClick={addPage}>
            Загрузить еще
          </Button>
        </Box>
      )}
    </>
  );
};
