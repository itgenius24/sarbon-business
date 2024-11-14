import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";

export const useElements = () => {

  const lang = useGetLang();
  const isAuth = authStore.getIsAuth;
  const role_id = authStore.userData.role_id



  if(role_id === `f81d3c3d-228d-479e-a2b1-9948c98640f2`){
    return [
      {
        path: `/${lang || "ru"}/`,
        label: "Главный",
      },
      {
        path: isAuth ? `/${lang || "ru"}/search-load` : `/${lang || "ru"}/auth`,
        label: "Поиск грузов",
      },
      {
        path: isAuth ? `/${lang || "ru"}/drivers` : `/${lang || "ru"}/auth`,
        label: "Водители",
      },
      {
        path: isAuth ? `/${lang || "ru"}/my-cars` : `/${lang || "ru"}/auth`,
        label: "Мои машины",
      },
      {
        path: isAuth ? `/${lang || "ru"}/performed` : `/${lang || "ru"}/auth`,
        label: "Мои заказы",
      },
      {
        path: `/${lang || "ru"}/distance-calculation`,
        label: "Расчет расстояний",
      },
      {
        path: `/${lang || "ru"}/gps-tracking`,
        label: "GPS tracking",
      },
    ];
  } else{
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
      {
        path: isAuth ? `/${lang || "ru"}/gps-tracking` : `/${lang || "ru"}/auth`,
        label: "GPS tracking",
      },
    ];
  }

  

};
