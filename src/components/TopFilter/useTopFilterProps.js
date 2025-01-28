import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useTopFilterProps = ({ filterList=[] }) => {
  const params = useSearchParams()
  const value = params.get(`value`)
  const label = params.get(`label`)

  const [activeTab, setActiveTab] = useState(value ? {value:value,label:label} : filterList[0]);

  function handleTabClick({ label, value }) {
    setActiveTab({ label, value });
  }

  return {
    activeTab,
    handleTabClick,
  };
};
