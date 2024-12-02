import authStore from "@/store/auth.store";

const role_id = authStore.userData.role_id;

 
 const filterTabsDis = [
  {
    label: "Предложение",
    value: "new",
  },
  {
    label: "Ждём водителя",
    value: "approve_from_driver",
  },
  {
    label: "В исполнение",
    value: "performed",
  },
  {
    label: "Отменённые",
    value: "cancellation",
  },
  {
    label: "Завершение",
    value: "archive",
  },
  {
    label: "Архив",
    value: "in_active",
  },
];


 
// const filterTabsZak = [
//   {
//     label: "Все",
//     value: "",
//   },
//   {
//     label: "В модерации",
//     value: "in_moderation",
//   },

//   {
//     label: "В исполнение",
//     value: "performed",
//   },
//   {
//     label: "Завершение",
//     value: "archive",
//   },
//   {
    
//     label: "Архив",
//     value: "in_active",
//   },
// ];
export const filterTabsZ = [
  {
    label: "Все",
    value: "",
   
  },
  {
    label: "В модерации",
    value: "in_moderation",
  
  },
  {
    label: "Предложение",
    value: "new",

  },
  {
    label: "Ждём водителя",
    value: "approve_from_driver",
  },
  {
    label: "В исполнение",
    value: "performed",
  },
  {
    label: "Отменённые",
    value: "cancellation",
  },
  {
    label: "Завершение",
    value: "archive",
  },
  {
    label: "Архив",
    value: "in_active",
  },
];


export const filterTabs = role_id === `785678f2-fae7-4a00-8766-99ea67d3784f` ? filterTabsDis : filterTabsZ ;


export const statusColor = {
  in_moderation: `rgba(193, 187, 32, 1)`,
  new: `rgba(21, 186, 77, 1)`,
  in_active: `rgba(126, 123, 134, 1)`,
  active: `rgba(0, 122, 255, 1)`,
  cancellation: `rgba(182, 179, 189, 1)`,
  rejected: `rgba(255, 48, 48, 1)`,
};

export const statusText = {
  in_moderation: `В модерации:`,
  new: `Предложение`,
  in_active: `Неактивный`,
  active: `Активный`,
  // cancellation:``,
  rejected: `Причина отказа:`,
};
