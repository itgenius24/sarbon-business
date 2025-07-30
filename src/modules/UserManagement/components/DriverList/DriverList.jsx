import React from "react";
import cls from "./style.module.scss";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useDriversList } from "./useDriversList";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const DriverList = () => {
  const { t, data, handleDelete, columns, isLoading } = useDriversList();
  return (
    <Box className={cls.box}>
      <Flex gap={`8px`} alignItems={`center`}>
        <Heading fontSize="20px">Водители перевозчика</Heading>

      </Flex>

      <Box mt={`25px`}>

        {isLoading ? (
            <LoadingSpinner />
          ) : data?.length > 0 ? (
           <SarbonTable
             isSticky
             variant="card"
             columns={columns}
             data={data}
             width="100%"
             headerBackgroundColo={`rgb(255, 255, 255)`}
           />
          ) : (
            <Box className={cls.noData}>Пока нет Водители </Box>
          )}
      </Box>
    </Box>
  );
};

export default DriverList;
