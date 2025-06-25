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
  isSticky = false,
  onRow = () => {},
  headerBackgroundColo = `rgba(237, 239, 245, 1)`
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
    <Box
      height={`100%`}
      {...props}
      width={width}
      maxWidth={`1920px`}
      pb={`10px`}
      overflowX={isSticky ? `none` : `auto`}
    >
      <Box
        position={isSticky ? `sticky` : `relative`}
        zIndex={`1`}
        top={0}
        width={`100%`}
      >
        <Flex justifyContent={`space-between`} padding={`10px 24px`}  backgroundColor={headerBackgroundColo}>
          {columns.map((item, index) => (
            <Flex
              className={cls.headerThWrap}
              
              width={`${item.width}%`}
              key={index}
            >
              {item?.filter ? (
                <Flex
                  as={`button`}
                  alignItems={`center`}
                  width={`100%`}
                  className={cls.filterWrap}
                  gap={`5px`}
                  cursor={`pointer`}
                  justifyContent={item?.align ? item?.align : `start`}
                  // justifyContent={`center`}
                  marginLeft={item?.align ? `15px` : 0}
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
                <Box
                  textAlign={item?.align ? item?.align : `left`}
                  width={`100%`}
                  className={cls.headerTh}
                >
                  {item.title}
                </Box>
              )}
            </Flex>
          ))}
        </Flex>
      </Box>
      { data.length > 0 ?  variant === `table` ? (
        <Box className={cls.tableWrap}>
          {data?.map((item, index) => (
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
                <Box
                  textAlign={column?.align ? column?.align : `left`}
                  key={column.title}
                  width={`${column.width}%`}
                >
                  {column?.render(item, index)}
                </Box>
              ))}
            </Flex>
          ))}
        </Box>
      ) : (
        data?.map((item, index) => (
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
              <Box
                textAlign={column?.align ? column?.align : `left`}
                key={column.title}
                width={`${column.width}%`}
              >
                {column?.render(item, index)}
              </Box>
            ))}
          </Flex>
        ))
      ):
      <>
      {/* <Box display={`flex`} alignItems={`center`} justifyContent={`center`} background={`white`} height={`100px`} borderRadius={`10px`} color={`rgba(33, 31, 38, 1)`}>
          Нет данных
       </Box> */}
      </>
      }
    </Box>
  );
};

export default SarbonTable;
