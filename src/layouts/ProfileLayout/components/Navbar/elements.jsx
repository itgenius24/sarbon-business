import { Car, File, User } from "@/assets/icons/icons";

const nestedList = [
  { id: 1, title: "Хочу купить", icon: <Car hidden />, path: "/profile1/want-buy" },
  {
    id: 2,
    title: "Мои обьявления",
    icon: <Car hidden />,
    path: "/profile1/my-ad",
  },
];

export const navList = [
  { id: 0, title: "Личные данные", icon: <User />, path: "/profile1" },
  // { id: 1, title: "Добавить карту", icon: <AddCard /> },
  // { id: 2, title: "Пополнить баланс", icon: <TopUpBalance /> },
  { title: "Продажа авто", icon: <Car />, children: nestedList },
  { id: 3, title: "Справочники", icon: <File />, path: "/profile1/handbook" },
];
