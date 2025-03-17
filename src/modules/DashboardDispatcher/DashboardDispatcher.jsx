import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import { useDashboardDispatcher } from "./useDashboardDispatcher";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import SlotCounter from "react-slot-counter";
import { DatePicker } from "@/components/DatePicker";
import cls from "./style.module.scss";
import { ContainerAnalitik } from "@/components/ContainerAnalitik/Container";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardDispatcher = ({ locale }) => {
  const {
    topStatis,
    topStatis2,
    chartData,
    options,
    setStartDate,
    startDate,
    endDate,
    setEndDate,

    isLoading,

    date,
    setDate,
    setDate2,
  } = useDashboardDispatcher(locale);

  return (
    <>
      <ContainerAnalitik my={`40px`}>
        <Flex flexDirection={`column`} rowGap={`30px`}>
          <Flex gap={`20px`}>
            <Flex
              flexWrap={`wrap`}
              width={`35%`}
              gap={`20px`}
              justifyContent={`space-between`}
            >
              {topStatis2.map((item) => (
                <Box
                  width={`100%`}
                  borderRadius={`12px`}
                  backgroundColor={item.color}
                  key={item.id}
                  border={`1px solid ${item.bg}`}
                  p={`20px 16px`}
                  className={cls.card}
                >
                  {isLoading ? (
                    <Spinner color="brand.500" size="md" />
                  ) : (
                    <Heading
                      color={`black`}
                      fontSize={`30px`}
                      lineHeight={`30px`}
                      fontWeight={`600`}
                    >
                      <SlotCounter value={item.total} />
                    </Heading>
                  )}

                  <Heading
                    mt={`12px`}
                    color={`black`}
                    fontSize={`18px`}
                    lineHeight={`30px`}
                    fontWeight={`400`}
                  >
                    {item.deck}
                  </Heading>
                </Box>
              ))}
            </Flex>
            <Flex
              borderRadius={`12px`}
              justifyContent={`center`}
              width={`100%`}
              background={`white`}
              padding={`16px 20px`}
            >
              <Box width={`100%`}>
                <Flex
                  gap={`20px`}
                  alignItems={`center`}
                  mb={`24px`}
                  width={`100%`}
                >
                  <Box className="dateWrap" width={`45%`}>
                    <DatePicker
                      onChange={() => {
                        setDate(``), setDate2([]);
                      }}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      range
                      startDate={startDate}
                      setStartDate={setStartDate}
                    />
                  </Box>
                  <Flex
                    gap={`16px`}
                    alignItems={`center]`}
                    justifyContent={`flex-end`}
                  >
                    <p
                      className={
                        date === `weekly` ? cls.activeMonth : cls.month
                      }
                      onClick={() => setDate(`weekly`)}
                    >
                      Неделя
                    </p>
                    <p
                      className={
                        date === `monthly` ? cls.activeMonth : cls.month
                      }
                      onClick={() => setDate(`monthly`)}
                    >
                      Месяц
                    </p>
                    <p className={cls.clear} onClick={() => setDate(`clear`)}>
                      Очистить фильтр
                    </p>
                  </Flex>
                </Flex>
                <Flex justifyContent={`center`}>
                  <Box width={`100%`} h={`100%`}>
                    <Bar
                      minBarLength={`4000px`}
                      options={options}
                      data={chartData}
                      style={{
                        background: "white",
                        width: `100%`,
                        height: `500px`,
                      }}
                    />
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Flex
              flexWrap={`wrap`}
              width={`35%`}
              gap={`20px`}
              justifyContent={`space-between`}
            >
              {topStatis.map((item) => (
                <Box
                  width={`100%`}
                  borderRadius={`12px`}
                  backgroundColor={item.color}
                  key={item.id}
                  border={`1px solid ${item.bg}`}
                  p={`20px 16px`}
                  className={cls.card}
                >
                  {isLoading ? (
                    <Spinner color="brand.500" size="md" />
                  ) : (
                    <Heading
                      color={`black`}
                      fontSize={`30px`}
                      lineHeight={`30px`}
                      fontWeight={`600`}
                    >
                      <SlotCounter value={item.total} />
                    </Heading>
                  )}

                  <Heading
                    mt={`12px`}
                    color={`black`}
                    fontSize={`18px`}
                    lineHeight={`30px`}
                    fontWeight={`400`}
                  >
                    {item.deck}
                  </Heading>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </ContainerAnalitik>
    </>
  );
};

export default DashboardDispatcher;
