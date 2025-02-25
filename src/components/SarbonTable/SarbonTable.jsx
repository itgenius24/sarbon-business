import { Box, Flex, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import cls from "./style.module.scss";
import { IocnFilter, IocnSortBack, IocnSortTop } from "@/assets/icons/icons";
const FILTER_TYPES = ["all", "top", "back"];
const SarbonTable = ({
  columns,
  data,
  rowClassName = () => {},
  statusTooltip = () => {},
  isTooltip,
  cardProps,
  props,
  variant = `table`,
  width = `1407px`,
  onRow = () => {},
}) => {
  const [filters, setFilters] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: "all" }), {})
  );

  const handleFilterChange = (item) => {
    setFilters((prev) => {
      const currentIndex = FILTER_TYPES.indexOf(prev[item.key]);
      const nextIndex = (currentIndex + 1) % FILTER_TYPES.length;
      item.filterType(FILTER_TYPES[nextIndex]);
      return { ...prev, [item.key]: FILTER_TYPES[nextIndex] };
    });
  };

  return (
    <Box {...props} width={width} overflowX={`auto`}>
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
                onClick={() => {
                  handleFilterChange(item);
                }}
              >
                <Box className={cls.headerTh}>{item.title}</Box>
                {filters[item.key] === `top` ? (
                  <IocnSortTop />
                ) : filters[item.key] === `back` ? (
                  <IocnSortBack />
                ) : (
                  <IocnFilter />
                )}
              </Flex>
            ) : (
              <Box className={cls.headerTh}>{item.title}</Box>
            )}
          </Flex>
        ))}
      </Flex>
      {data.map((item, index) => (
        <Flex
          onClick={() => onRow(item)}
          position={`relative`}
          alignItems={`center`}
          width={`100%`}
          justifyContent={`space-between`}
          className={`${cls[variant]} ${
            rowClassName(item) ? rowClassName(item) : ``
          }`}
          key={index}
        >
          {isTooltip && statusTooltip(item)}
          {columns.map((column) => (
            <Box  key={column.title} width={`${column.width}%`}>
              {column?.render(item, index)}
            </Box>
          ))}
        </Flex>
      ))}
    </Box>
  );
};

export default SarbonTable;
