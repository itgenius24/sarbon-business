"use client";

import cls from "./style.module.scss";
import Table from "rc-table";
import "rc-pagination/assets/index.css";
import CPagination from "../Pagination";
import { Box, Icon, Stack, Text } from "@chakra-ui/react";
// import { HiOutlineInbox } from "react-icons/hi2";
import { useMemo, useState } from "react";
import SimpleLoader from "../Loaders/SimpleLoader";

const CTable = ({
  pageSize = 10,
  setPageSize,
  // currentPage = 1,
  // setCurrentPage = () => {},
  onRowClick = () => {},
  isLoading = false,
  columns = [],
  data = [],
  total = data?.length,
}) => {
  const filterRowIsVisible = useMemo(() => {
    return columns.some((column) => column.filterType);
  }, [columns]);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Box
      className={cls.table}
      position="relative"
      borderRight="1px solid"
      borderColor="border"
    >
      {isLoading && (
        <SimpleLoader
          position="absolute"
          top={"1px"}
          left={"1px"}
          h="calc(100% - 2px)"
          w="calc(100% - 2px)"
          zIndex={100}
          bg={`white`}
          className={"spinner"}
        />
      )}
      <Table
        columns={columns}
        
        data={paginatedData}

        onRow={(row) => ({
          onClick: () => onRowClick(row),
        })}
        emptyText={
          <Stack alignItems="center" p={10} spacing={1}>
            <Text fontSize="md" color="silver" fontWeight={600}>
              Empty
            </Text>
          </Stack>
        }
      />
      <CPagination
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        total={total}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default CTable;
