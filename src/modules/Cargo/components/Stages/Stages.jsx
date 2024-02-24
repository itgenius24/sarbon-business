import cls from "./styles.module.scss";
import { Box, Heading, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { useStagesProps } from "./useStagesProps";
import clsx from "clsx";

export const Stages = () => {

  const {
    stages,
    statuses
  } = useStagesProps();

  return <Box as="article" p="16px" bgColor="baseWhite" borderRadius="12px" width="284px" position="sticky" top="48px">
    <Box pb="20px" borderBottom="1px solid" borderColor="brand.200">
      <Heading size="sm">Этапы добавление груза</Heading>
      <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">Вы можете следить за своими действия в этом поле</Text>
    </Box>
    <OrderedList listStyleType="none" m="0" p="0" mt="24px" display="flex" flexDirection="column" rowGap="24px">
      {
        stages.map((item, index) => (
          <ListItem key={index} className={clsx(cls.stageItem, cls[item.status])}>
            {item.status === "done" && <statuses.done title={item.title} subtitle={item.subtitle} />}
            {item.status === "process" && <statuses.process title={item.title} subtitle={item.subtitle} />}
            {item.status === "disabled" && <statuses.disabled title={item.title} subtitle={item.subtitle} />}
          </ListItem>
        ))
      }
    </OrderedList>
  </Box>;
};
