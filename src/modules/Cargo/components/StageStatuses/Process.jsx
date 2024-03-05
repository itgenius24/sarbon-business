import { StepProcessIcon } from "@/assets/icons/icons";
import { Box } from "@chakra-ui/react";

export const Process = ({ title, subtitle }) => <Box display="flex" columnGap="12px" alignItems="flex-start">
  <Box width="24px" height="24px" color="#026FE7" borderRadius="50%" boxShadow="0px 0px 0px 4px #007AFF0D">
    <Box flexShrink={0}>
      <StepProcessIcon />
    </Box>
  </Box>
  <Box display="flex" flexDirection="column">
    <Box as="span" fontWeight="600" fontSize="14px" lineHeight="20px">{title}</Box>
    <Box as="span" fontWeight="400" fontSize="14px" lineHeight="20px">{subtitle}</Box>
  </Box>
</Box>;
