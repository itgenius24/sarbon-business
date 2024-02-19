import { Box, Heading, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { Disabled, Done, Process } from "../StageStatuses";

export const Stages = () => {

  const statuses = {
    process: Process,
    disabled: Disabled,
    done: Done
  };

  return <Box as="article" p="16px" bgColor="baseWhite" borderRadius="12px" width="284px" position="sticky" top="48px">
    <Box pb="20px" borderBottom="1px solid" borderColor="brand.200">
      <Heading size="sm">Этапы добавление груза</Heading>
      <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">Вы можете следить за своими действия в этом поле</Text>
    </Box>
    <OrderedList listStyleType="none" m="0" p="0" mt="24px" display="flex" flexDirection="column" rowGap="24px">
      <ListItem>
        <statuses.process title="Груз" subtitle="не заполнено" />
      </ListItem>
      <ListItem>
        <statuses.done title="Груз" subtitle="не заполнено" />
      </ListItem>
      <ListItem>
        <statuses.disabled title="Когда" subtitle="по раб. дням" />
      </ListItem>
      <ListItem>
        <statuses.disabled title="Маршрут" subtitle="Ташкент -&gt; Бухара, 1200 км" />
      </ListItem>
      <ListItem>
        <statuses.disabled title="Транспорт" subtitle="не заполнено" />
      </ListItem>
      <ListItem>
        <statuses.disabled title="Оплата" subtitle="не заполнено" />
      </ListItem>
      <ListItem>
        <statuses.disabled title="Дополнительно" subtitle="ром, +998 (99) 999-99-99" />
      </ListItem>
    </OrderedList>
  </Box>;
};
