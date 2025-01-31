import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import cls from "./style.module.scss";
import { IocnFilter, IocnSortBack, IocnSortTop } from "@/assets/icons/icons";
const FILTER_TYPES = ["all", "top", "back"];
const SarbonTable = ({ columns, data }) => {
  const [filters, setFilters] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: "all" }), {})
  );

  const handleFilterChange = (key) => {
    setFilters((prev) => {
      const currentIndex = FILTER_TYPES.indexOf(prev[key]);
      const nextIndex = (currentIndex + 1) % FILTER_TYPES.length;
      return { ...prev, [key]: FILTER_TYPES[nextIndex] };
    });
  };
  return (
    <Box width={`100%`}>
      <Flex
        justifyContent={`space-between`}
        width={`100%`}
        className={cls.headerWrap}
      >
        {columns.map((item, index) => (
          <Flex
            className={cls.headerThWrap}
            width={`${item.width}%`}
            key={index}
            
          >
            {item?.filter ? (
              <Flex
                alignItems={`center`}
                className={cls.filterWrap}
                gap={`5px`}
                cursor={`pointer`}
                onClick={() => {handleFilterChange(item.key)
                  item.filterType(filters[item.key])
                }}
              >
                <Box className={cls.headerTh}>{item.title}</Box>
                {filters[item.key]  === `top` ? (
                  <IocnSortTop />
                ) : filters[item.key]  === `back` ? (
                  <IocnSortBack />
                ) : (
                  <IocnFilter />
                )}{" "}
              </Flex>
            ) : (
              <Box className={cls.headerTh}>{item.title}</Box>
            )}
          </Flex>
        ))}
      </Flex>
      {data.map((item, index) => (
        <Flex
          alignItems={`center`}
          width={`100%`}
          justifyContent={`space-between`}
          className={cls.tableTr}
          key={index}
         
        >
          {columns.map((column) => (
            <Box key={column.title} width={`${column.width}%`}>
              {column.render(item, index)}
            </Box>
          ))}
        </Flex>
      ))}
    </Box>
  );
};

export default SarbonTable;
