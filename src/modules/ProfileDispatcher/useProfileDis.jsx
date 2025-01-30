import { useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useProfileDis = () => {
  const [status, setStatus] = useState(false);
  const [tab,setTabs] = useState(`new`)
    const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
    const { t } = useTranslation();
    
  return {
    status,
    t,
    tab,
    setTabs
  };
};
