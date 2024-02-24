import { StepProcessIcon } from "@/assets/icons/icons";
import { Box } from "@chakra-ui/react";

export const Disabled = ({ title, subtitle }) => <Box display="flex" columnGap="12px" alignItems="flex-start" >
  <StepProcessIcon color="#D0D5DD" />
  <Box display="flex" flexDirection="column">
    <Box as="span" fontWeight="600" fontSize="14px" lineHeight="20px">{title}</Box>
    <Box as="span" fontWeight="400" fontSize="14px" lineHeight="20px">{subtitle}</Box>
  </Box>
</Box>;
