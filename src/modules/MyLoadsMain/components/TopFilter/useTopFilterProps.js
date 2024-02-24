import { useState } from "react";

export const useTopFilterProps = () => {

  const [activeTab, setActiveTab] = useState({
    label: "Все",
    value: "all"
  });

  const filterTabs = [
    {
      label: "Все",
      value: "all"
    },
    {
      label: "В модерации",
      value: "in_moderation"
    },
    {
      label: "Предложение",
      value: "offer"
    },
    {
      label: "Ждём водителя",
      value: "waiting"
    },
    {
      label: "В исполнение",
      value: "execution"
    },
    {
      label: "Отменённые",
      value: "cancel"
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
