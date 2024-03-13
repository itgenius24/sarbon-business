import { useState } from "react";

export const useTopFilterProps = ({ filterList=[] }) => {
  const [activeTab, setActiveTab] = useState(filterList[0]);

  function handleTabClick({ label, value }) {
    setActiveTab({ label, value });
  }

  return {
    activeTab,
    handleTabClick,
  };
};
