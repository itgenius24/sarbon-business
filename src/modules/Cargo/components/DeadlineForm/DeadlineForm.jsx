import { DatePicker } from "@/components/DatePicker";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useAddCargoContext } from "../../providers";

export const DeadlineForm = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useAddCargoContext();
  console.log("DeadlineForm ", {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  });

  return <Box py="24px" borderBottom="1px solid" borderColor="brand.200">
    <Box display="flex" alignItems="center" justifyContent="space-between" columnGap="32px">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">Когда</Heading>
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">до {endDate ? `${endDate.getDate()} ${endDate.toLocaleString("ru-RU", { month: "short" })} затем переместится в архив` : ""}</Text>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <DatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          inputWidth="258px"
          range
        />
      </Box>
    </Box>
  </Box>;

};
