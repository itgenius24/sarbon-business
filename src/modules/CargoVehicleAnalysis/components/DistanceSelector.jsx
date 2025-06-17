import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const DistanceSelector = ({ distance, setDistance }) => {
  const { t } = useTranslation();

  const distanceOptions = [
    { value: 100, label: "100 км" },
    { value: 200, label: "200 км" },
    { value: 300, label: "300 км" },
    { value: 500, label: "500 км" },
    { value: 1000, label: "1000 км" },
    { value: 2000, label: "2000 км" },
  ];

  return (
    <Flex alignItems="center" gap="12px">
      <Text fontSize="14px" color="gray.600">
        {t("Радиус поиска")}:
      </Text>
      <Select
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
        width="120px"
        size="sm"
      >
        {distanceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
