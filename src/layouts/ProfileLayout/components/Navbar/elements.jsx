import { Car, File, User } from "@/assets/icons/icons";
import localeStore from "@/store/locale.store";

const nestedList = [
  { id: 1, title: "Хочу купить", icon: <Car hidden />, path: `/${localeStore.locale}/profile/want-buy` },
  {
    id: 2,
    title: "Мои обьявления",
    icon: <Car hidden />,
    path: `/${localeStore.locale}/profile/my-ad`,
  },
];

export const navList = [
  { id: 0, title: "Личные данные", icon: <User />, path: `/${localeStore.locale}/profile` },
  // { id: 1, title: "Добавить карту", icon: <AddCard /> },
  // { id: 2, title: "Пополнить баланс", icon: <TopUpBalance /> },
  { title: "Продажа авто", icon: <Car />, children: nestedList },
  { id: 3, title: "Справочники", icon: <File />, path: `/${localeStore.locale}/profile/handbook` },
];
