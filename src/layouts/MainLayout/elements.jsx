import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";

export const useElements = () => {

  const lang = useGetLang();
  const isAuth = authStore.getIsAuth;

  return [
    {
      path: `/${lang || "ru"}/`,
      label: "Главный",
    },
    {
      path: isAuth ? `/${lang || "ru"}/add-cargo` : `/${lang || "ru"}/auth`,
      label: "Добавить груз",
    },
    {
      path: isAuth ? `/${lang || "ru"}/my-loads` : `/${lang || "ru"}/auth`,
      label: "Мои грузы",
    },
    {
      path: `/${lang || "ru"}/distance-calculation`,
      label: "Расчет расстояний",
    },
    {
      path: `/${lang || "ru"}/search-car`,
      label: "Поиск машин",
    },
    // {
    //   path: `/${lang || "ru"}/gps-tracking`,
    //   label: "GPS tracking",
    // },
  ];

};
