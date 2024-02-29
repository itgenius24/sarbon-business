import { useState } from "react";

export const useTopFilterProps = () => {

  const [activeTab, setActiveTab] = useState({
    label: "Все",
    value: ""
  });

  const filterTabs = [
    {
      label: "Все",
      value: ""
    },
    {
      label: "В модерации",
      value: "in_moderation"
    },
    {
      label: "Предложение",
      value: "new"
    },
    {
      label: "Ждём водителя",
      value: "approve_from_driver"
    },
    {
      label: "В исполнение",
      value: "performed"
    },
    {
      label: "Отменённые",
      value: "cancellation"
    },
    {
      label: "Архив",
      value: "archive"
    },
  ];

  function handleTabClick ({ label, value }) {
    setActiveTab({ label, value });
  }

  return {
    activeTab,
    filterTabs,
    handleTabClick
  };
};
