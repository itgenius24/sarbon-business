import { StepDoneIcon } from "@/assets/icons/icons";
import { Box } from "@chakra-ui/react";

export const Done = ({ title, subtitle, className }) => <Box
  className={className}
  display="flex"
  columnGap="12px"
  alignItems="flex-start"
>
  <Box flexShrink={0}>
    <StepDoneIcon />
  </Box>
  <Box display="flex" flexDirection="column">
    <Box as="span" fontWeight="600" fontSize="14px" lineHeight="20px">{title}</Box>
    <Box as="span" fontWeight="400" fontSize="14px" lineHeight="20px">{subtitle}</Box>
  </Box>
</Box>;
