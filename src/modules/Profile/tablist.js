import { AddCard, Car, File, TopUpBalance, User } from "@/assets/icons/icons";
import { PersonalInfo } from "./tabs/PersonalInfo";
import { WantBuy } from "./tabs/WantBuy/WantBuy";
import { Manual } from "./tabs/Manual/Manual";
import { MyAd } from "./tabs/MyAd/MyAd";

const nestedTabs = [
  { id: 3, title: "Хочу купить", icon: <Car hidden />, content: <WantBuy /> },
  {
    id: 4,
    title: "Мои обьявления",
    icon: <Car hidden />,
    content: <MyAd />,
  },
];

export const tabsList = [
  { id: 0, title: "Личные данные", icon: <User />, content: <PersonalInfo /> },
  // { id: 1, title: "Добавить карту", icon: <AddCard /> },
  // { id: 2, title: "Пополнить баланс", icon: <TopUpBalance /> },
  { title: "Продажа авто", icon: <Car />, children: nestedTabs },
  { id: 5, title: "Справочники", icon: <File />, content: <Manual /> },
];
