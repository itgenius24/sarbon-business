import { Container } from "@/components/Container";
import {
  Box,
  Flex,
  Heading,
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
import { DatePicker } from "@/components/DatePicker";

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
  } = useDashboard();
  return (
    <Container my={`40px`}>
      <Flex flexDirection={`column`} rowGap={`30px`}>
        <Flex width={`100%`} gap={`20px`} justifyContent={`space-between`}>
          {topStatis.map((item) => (
            <Box
              width={`100%`}
              borderRadius={`12px`}
              backgroundColor={item.color}
              key={item.id}
              p={`20px 16px`}
            >
              <Heading
                color={`white`}
                fontSize={`30px`}
                lineHeight={`30px`}
                fontWeight={`600`}
              >
                {item.total}
              </Heading>
              <Heading
                mt={`12px`}
                color={`white`}
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
            <Box mb={`24px`} width={`20%`}>
              <DatePicker
                endDate={endDate}
                setEndDate={setEndDate}
                range
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </Box>
            <Flex justifyContent={`center`}>
              <Box width={`80%`}>
                <Bar
                  options={options}
                  data={chartData}
                  style={{ background: "white", width: `100%` }}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Box padding={`16px`} borderRadius={`12px`} backgroundColor={`white`}>
          <Tabs variant="unstyled">
            <TabList>
              <Tab> Ekspeditor</Tab>
              <Tab> Voditel</Tab>
              <Tab> Transport</Tab>
              <Tab> gapruz</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="rgba(0, 51, 153, 1)"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <CTable columns={columns1} data={[]} />
              </TabPanel>
              <TabPanel>
                <CTable columns={columns2} data={[]} />
              </TabPanel>
              <TabPanel>
                <CTable columns={columns3} data={[]} />
              </TabPanel>
              <TabPanel>
                <CTable columns={columns4} data={[]} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
};

export default Dashboard;
