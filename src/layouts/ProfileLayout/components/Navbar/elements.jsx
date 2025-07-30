import { Car, File, User } from "@/assets/icons/icons";

// Function to get navigation list based on profile variant
export const getNavList = (isAdvanced = false) => {
  const baseRoute = isAdvanced ? "/profile-new" : "/profile";

  const nestedList = [
    { id: 1, title: "Хочу купить", icon: <Car hidden />, path: `${baseRoute}/want-buy` },
    {
      id: 2,
      title: "Мои обьявления",
      icon: <Car hidden />,
      path: `${baseRoute}/my-ad`,
    },
  ];

  return [
    { id: 0, title: "Личные данные", icon: <User />, path: `${baseRoute}/personal-data` },
    // { id: 1, title: "Добавить карту", icon: <AddCard /> },
    // { id: 2, title: "Пополнить баланс", icon: <TopUpBalance /> },
    { title: "Продажа авто", icon: <Car />, children: nestedList },
    { id: 3, title: "Справочники", icon: <File />, path: `${baseRoute}/handbook` },
  ];
};

// Default export for backward compatibility
export const navList = getNavList(false);
