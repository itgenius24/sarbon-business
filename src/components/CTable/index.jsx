"use client";

import cls from "./style.module.scss";
import Table from "rc-table";
import "rc-pagination/assets/index.css";
import CPagination from "../Pagination";
import { Icon, Stack, Text } from "@chakra-ui/react";
// import { HiOutlineInbox } from "react-icons/hi2";
import { useMemo } from "react";

const CTable = ({
  pageSize = 10,
  setPageSize,
  currentPage = 1,
  setCurrentPage = () => {},
  onRowClick = () => {},
  columns = [],
  data = [],
  total = data?.length,
}) => {
  const filterRowIsVisible = useMemo(() => {
    return columns.some((column) => column.filterType);
  }, [columns]);

  return (
    <div className={cls.table}>
      <Table
        columns={columns}
        // scroll={{ y: "calc(100vh - 260px)" }}
        data={data}
        onRow={(row) => ({
          onClick: () => onRowClick(row),
        })}
        emptyText={
          <Stack alignItems="center" p={10} spacing={1}>
            {/* <Icon as={HiOutlineInbox} boxSize={20} color="silver" /> */}
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
    </div>
  );
};

export default CTable;
