import { Car, File, User } from "@/assets/icons/icons";

const nestedList = [
  { id: 1, title: "Хочу купить", icon: <Car hidden />, path: (lang) => `/${lang}/profile/want-buy` },
  {
    id: 2,
    title: "Мои обьявления",
    icon: <Car hidden />,
    path: (lang) => `/${lang}/profile/my-ad`,
  },
];

export const navList = [
  { id: 0, title: "Личные данные", icon: <User />, path: (lang) => `/${lang}/profile` },
  // { id: 1, title: "Добавить карту", icon: <AddCard /> },
  // { id: 2, title: "Пополнить баланс", icon: <TopUpBalance /> },
  { title: "Продажа авто", icon: <Car />, children: nestedList },
  { id: 3, title: "Справочники", icon: <File />, path: (lang) => `/${lang}/profile/handbook` },
];
