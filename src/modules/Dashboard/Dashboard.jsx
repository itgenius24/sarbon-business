import { Container } from "@/components/Container";
import { Box, Flex, Heading } from "@chakra-ui/react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { topStatis, chartData, options } = useDashboard();
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
        <Flex justifyContent={`center`} width={`100%`} background={`white`}>
          <Box width={`80%`}>
            <Bar
              options={options}
              data={chartData}
              style={{ background: "white", width: `100%` }}
            />
          </Box>
        </Flex>
        <Flex>
            
        </Flex>
      </Flex>
    </Container>
  );
};

export default Dashboard;
