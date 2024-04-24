import { useGetLang } from "@/hooks/useGetLang";

export const useElements = () => {

  const lang = useGetLang();

  return [
    {
      path: `/${lang || "ru"}/`,
      label: "Главный",
    },
    {
      path: `/${lang || "ru"}/add-cargo`,
      label: "Добавить груз",
    },
    {
      path: `/${lang || "ru"}/my-loads`,
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
