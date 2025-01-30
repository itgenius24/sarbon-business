import { Container } from "@/components/Container";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { useDashboard } from "./useDashboard";
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
import CTable from "@/components/CTable";
import SlotCounter from "react-slot-counter";
import { DatePicker } from "@/components/DatePicker";
import cls from "./style.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const {
    topStatis,
    chartData,
    options,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    columns1,
    columns2,
    columns3,
    columns4,
    data,
    isPending,
    setStatus,
    isLoading,
    date,
    setDate,
    setDate2,
    setCurrentPage,
    currentPage
  } = useDashboard();

  return (
    <Container my={`40px`}>
      <Flex flexDirection={`column`} rowGap={`30px`}>
        <Flex gap={`20px`}>
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
                <Box width={`30%`}>
                  <DatePicker
                    onChange={() => {setDate(``),setDate2([])}}
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
                    className={date === `weekly` ? cls.activeMonth : cls.month}
                    onClick={() => setDate(`weekly`)}
                  >
                    Неделя
                  </p>
                  <p
                    className={date === `monthly` ? cls.activeMonth : cls.month}
                    onClick={() => setDate(`monthly`)}
                  >
                    Месяц
                  </p>
                </Flex>
              </Flex>
              <Flex justifyContent={`center`}>
                <Box width={`90%`}>
                  <Bar
                    options={options}
                    data={chartData}
                    style={{ background: "white", width: `100%` }}
                  />
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Flex
            flexWrap={`wrap`}
            width={`50%`}
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

        <Box padding={`16px`} borderRadius={`12px`} backgroundColor={`white`}>
          <Tabs onChange={(el) => {setStatus(el),setCurrentPage(1)}} variant="unstyled">
            <TabList>
              <Tab value={`driver`}> Водитель</Tab>
              <Tab value={`ekspiditor`}> Перевозчик</Tab>
              <Tab value={`truck`}> Транспорт</Tab>
              <Tab value={`cargo`}> Груз</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="3px"
              bg="rgba(0, 51, 153, 1)"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <CTable
                  isLoading={isPending}
                  columns={columns2}
                  data={data.response}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </TabPanel>
              <TabPanel>
                <CTable
                  isLoading={isPending}
                  columns={columns1}
                  data={data.response}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </TabPanel>
              <TabPanel>
                <CTable
                  isLoading={isPending}
                  columns={columns3}
                  data={data.response}
                        setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </TabPanel>
              <TabPanel>
                <CTable
                  isLoading={isPending}
                  columns={columns4}
                  data={data.response}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
};

export default Dashboard;
