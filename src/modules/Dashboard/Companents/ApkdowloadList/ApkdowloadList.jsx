import CTable from "@/components/CTable";
import { useGetCountApk } from "@/services/api";
import { Box } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useState } from "react";

const ApkdowloadList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetCountApk({
    params: {
      data: JSON.stringify({}),
    },
  });

  console.log(`data`, data);

  const columns = [
    {
      title: `Устройство`,
      dataIndex: "app_name",
      width: 350,
    },
    {
      title: `Дата созд.`,
      dataIndex: "create_time",
      render: (_, row) => (
        <p style={{ whiteSpace: `nowrap` }}>
          {/* {row?.create_time && format(new Date(row?.create_time), `yyyy-MM-dd`)} */}
        </p>
      ),
      width: 350,
    },
  ];

  return (
    <Box>
      <CTable
        columns={columns}
        data={data?.response?.map((item, index) => ({
          ...item,
          number: index + 1,
        }))}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Box>
  );
};

export default ApkdowloadList;
