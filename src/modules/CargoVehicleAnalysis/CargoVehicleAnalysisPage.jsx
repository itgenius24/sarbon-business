"use client";

import { Container } from "@/components/Container";
import {
  Box,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useMediaQuery,
} from "@chakra-ui/react";
import { useCargoVehicleAnalysisProps } from "./useCargoVehicleAnalysisProps";
import { CargoToVehicleView } from "./CargoToVehicleView";
import { VehicleToCargoView } from "./VehicleToCargoView";
import { DistanceSelector } from "./components/DistanceSelector";
import cls from "./style.module.scss";

export const CargoVehicleAnalysisPage = () => {
  const {
    t,
    distance,
    setDistance,
    activeTab,
    setActiveTab,
    cargoToVehicleData,
    vehicleToCargoData,
    isLoading,
  } = useCargoVehicleAnalysisProps();

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return (
    <Container my="40px">
      <Flex width="100%" justifyContent="space-between" mb="24px">
        <Heading
          size={isLargerThan845 ? "md" : "sm"}
          color="var(--primary-text)"
        >
          {t("Анализ грузов и транспорта")}
        </Heading>
        <DistanceSelector distance={distance} setDistance={setDistance} />
      </Flex>

      <Tabs
        index={activeTab}
        onChange={setActiveTab}
        variant="enclosed"
        colorScheme="blue"
      >
        <TabList>
          <Tab>{t("Грузы → Транспорт")}</Tab>
          <Tab>{t("Транспорт → Грузы")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0} pt="20px">
            <CargoToVehicleView
              data={cargoToVehicleData}
              isLoading={isLoading}
              distance={distance}
            />
          </TabPanel>
          <TabPanel p={0} pt="20px">
            <VehicleToCargoView
              data={vehicleToCargoData}
              isLoading={isLoading}
              distance={distance}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
