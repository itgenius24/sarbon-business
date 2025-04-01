import { Avatar, Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useProps = () => {

  const [tab, setTabs] = useState(`new`);
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { t } = useTranslation();

   const  filterTabs = [
    {value:`0`,label:`Данные перевозчика`},
    {value:`1`,label:`Примечания`}
   ]

  return {
    t,
    tab,
    setTabs,
    filterTabs
  };
};
