import { Car, CrownNavIcon, DriverNavIcon, File, FuraNavIcon, NoteNAvIcon, NotificationProfileIcon, User, User2 } from "@/assets/icons/icons";

const nestedList = [
  { id: 1, title: "Хочу купить", icon: <Car hidden />, path: "/profile/want-buy" },
  {
    id: 2,
    title: "Мои обьявления",
    icon: <Car hidden />,
    path: "/profile/my-ad",
  },
];

export const navList = [
  { id: 0, title: "Личные данные", icon: <User2 />, path: "/profile-new", disabled:false },
  { id: 1, title: "Уведомления", icon: <NotificationProfileIcon />, path: "/", disabled:true },
  { id: 2, title: "Покупка / продажа техники", icon: <FuraNavIcon />, path: "/", disabled:true },
  { id: 3, title: "Поиск водителей", icon: <DriverNavIcon />, path: "/", disabled:true },
  { id: 4, title: "Справочник", icon: <NoteNAvIcon />, path: "/", disabled:false },
  { id: 5, title: "Планы и подписки", icon: <CrownNavIcon />, path: "/", disabled:true },
];
