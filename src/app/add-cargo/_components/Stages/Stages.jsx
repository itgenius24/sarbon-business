import { StepDoneIcon, StepProcessIcon } from "@/assets/icons/icons";
import { Box, Heading, ListItem, OrderedList, Text } from "@chakra-ui/react";

export const Stages = () => {

  const processProps = {
    color: "#026FE7",
    borderRadius:"50%",
    // boxShadow:"0px 0px 0px 4px #007AFF0D"
  };

  return <Box as="article" p="16px" bgColor="baseWhite" borderRadius="12px" width="284px" position="sticky">
    <Box pb="20px" borderBottom="1px solid" borderColor="brand.200">
      <Heading size="sm">Этапы добавление груза</Heading>
      <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">Вы можете следить за своими действия в этом поле</Text>
    </Box>
    <OrderedList listStyleType="none" m="0" p="0" mt="24px" display="flex" flexDirection="column" rowGap="24px">
      <ListItem>
        <Box display="flex" columnGap="12px" alignItems="flex-start">
          <StepDoneIcon />
          <Box display="flex" flexDirection="column">
            <Box as="span" fontWeight="600" fontSize="14px" lineHeight="20px">Груз</Box>
            <Box as="span" fontWeight="400" fontSize="14px" lineHeight="20px">не заполнено</Box>
          </Box>
        </Box>
      </ListItem>
      <ListItem>
        <Box display="flex" columnGap="12px" alignItems="flex-start" {...processProps}>
          <StepProcessIcon />
          <Box display="flex" flexDirection="column">
            <Box as="span" fontWeight="600" fontSize="14px" lineHeight="20px">Когда</Box>
            <Box as="span" fontWeight="400" fontSize="14px" lineHeight="20px">по раб. дням</Box>
          </Box>
        </Box>
      </ListItem>
      <ListItem>
        <Box display="flex" columnGap="12px" alignItems="flex-start" {...processProps}>
          <StepProcessIcon />
          <Box display="flex" flexDirection="column">
            <Box as="span" fontWeight="600" fontSize="14px" lineHeight="20px">Маршрут</Box>
            <Box as="span" fontWeight="400" fontSize="14px" lineHeight="20px">Ташкент -&gt; Бухара, 1200 км</Box>
          </Box>
        </Box>
      </ListItem>
    </OrderedList>
  </Box>;
};
