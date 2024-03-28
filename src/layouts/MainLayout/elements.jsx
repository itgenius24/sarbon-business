import localeStore from "@/store/locale.store";

let activeLang = localeStore.locale;

export const elements = [
  {
    path: `/${activeLang}/`,
    label: "Главный",
  },
  {
    path: `/${activeLang}/add-cargo`,
    label: "Добавить груз",
  },
  {
    path: `/${activeLang}/my-loads`,
    label: "Мои грузы",
  },
  {
    path: `/${activeLang}/distance-calculation`,
    label: "Расчет расстояния",
  },
  {
    path: `/${activeLang}/search-car`,
    label: "Поиск машин",
  },
];
