"use client";

import { Box, useColorModeValue } from "@chakra-ui/react";

import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import cls from "./style.module.scss";

const PAGE_SIZE_OPTIONS = ["10", "20", "50", "100"];

const CPagination = ({
  currentPage = 1,
  total = 0,
  pageSize = 10,
  setPageSize = () => {},
  setCurrentPage = () => {},
}) => {
  const primaryColor = useColorModeValue("blue.500", "blue.300");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };




  return (
    <Box className={cls.pagination}>
      <Pagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
        showSizeChanger
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        className={cls.paginationControl}

        style={{
          "--primary-color": `var(--chakra-colors-${primaryColor
            .replace(".", "-")
            .toLowerCase()})`,
        }}
      />
    </Box>
  );
};

export default CPagination;
