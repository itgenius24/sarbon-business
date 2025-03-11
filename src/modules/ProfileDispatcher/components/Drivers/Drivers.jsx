import SarbonTable from "@/components/SarbonTable/SarbonTable";
import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useDriverProps } from "./useDriverProps";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import cls from "./style.module.scss";

const DriversDispachers = () => {
  const {
    t,
    data,
    isLoading,

    count,
    addPage,

    columns,
    rowClassName,
  } = useDriverProps();
  return (
    <>
      <Box>
        <SarbonTable
          rowClassName={rowClassName}
          variant="card"
          columns={columns}
          data={data}
          width={`100%`}
        />
      </Box>

      <div>
        {isLoading && data?.length <= 50 && (
          <Box pt={`20px`}>
            <LoadingSpinner />
          </Box>
        )}
        {data?.length >= 50 && count?.count > data?.length && (
          <Box mt={6} width={`fit-contend`}>
            <Button
              width={`fit-contend`}
              isLoading={isLoading}
              onClick={addPage}
              className={cls.btnLoad}
            >
              Загрузить еще 50
            </Button>
          </Box>
        )}
      </div>
    </>
  );
};

export default DriversDispachers;
