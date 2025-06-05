import React from "react";
import cls from "./style.module.scss";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useDriversList } from "./useDriversList";

const DriverList = () => {
      const { t, data, handleDelete, isLoading } = useDriversList();
    
  return (
    <Box className={cls.box}>
      <Flex gap={`8px`} alignItems={`center`}>
        <Heading fontSize="20px">Водители перевозчика</Heading>
      </Flex>
    </Box>
  );
};

export default DriverList;
