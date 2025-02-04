import { Avatar, Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useProfileDis = () => {
  const [status, setStatus] = useState(false);
  const [tab, setTabs] = useState(`new`);
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { t } = useTranslation();
  const [filter, setFilter] = useState(1);

  const columns = [
    {
      title: `Водитель`,
      filter: filter,
      key: `driver`,
      filterType: (type) => console.log(`type`, type),
      width: 200,
      render: (row, index) => (
        <Flex gap={`10px`} alignItems={`center`}>
          <Avatar src="sa" name="bobur" />
          <Box>
            <p>Bobur</p>
            <p>+998979136919</p>
          </Box>
        </Flex>
      ),
    },
    {
      title: `Транпортная компания`,

      width: 200,
      render: (row, index) => `Транпортная компания`,
    },
    {
      title: `Машина`,
      width: 200,
      render: (row, index) => `Транпортная компания`,
    },
    {
      title: `Статус`,
      filter: filter,
      key: `status`,
      filterType: (type) => console.log(`type1`, type),
      width: 300,
      render: (row, index) => `Транпортная компания`,
    },
  ];

  return {
    status,
    t,
    tab,
    setTabs,
    columns,
  };
};
