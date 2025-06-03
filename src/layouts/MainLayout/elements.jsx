import authStore from "@/store/auth.store";

export const useElements = (lang) => {
  const isAuth = authStore.getIsAuth;
  const role_id = authStore.userData.role_id;
  const dispatcher_type = authStore?.userData?.dispatcher_type;
  const user_type = authStore?.userData?.user_status;

  if (role_id === `f81d3c3d-228d-479e-a2b1-9948c98640f2`) {
    return [
      // {
      //   path: `/${lang || "ru"}/`,
      //   label: "Главный",
      // },
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
        path: `/${lang || "ru"}/gps-tracking-carrier`,
        label: "GPS tracking",
      },
    ];
  } else if (dispatcher_type?.[0] === `first_dispatcher`) {
    return [
      // {
      //   path: `/${lang || "ru"}/`,
      //   label: "Главный",
      // },
      {
        path: `/${lang || "ru"}/dashboard-dispatcher`,
        label: "Dashboard",
      },
      {
        path: isAuth ? `/${lang || "ru"}/my-loads` : `/${lang || "ru"}/auth`,
        label: "Мои грузы",
      },
      {
        path: isAuth
          ? `/${lang || "ru"}/dispatcher-expeditor`
          : `/${lang || "ru"}/auth`,
        label: "Перевозчики",
      },
      {
        path: isAuth
          ? `/${lang || "ru"}/my-cars-dispatcher`
          : `/${lang || "ru"}/auth`,
        label: "Мои водители",
      },
      // {
      //   path: isAuth ? `/${lang || "ru"}/search-load-dispatcher` : `/${lang || "ru"}/auth`,
      //   label: "Поиск грузов",
      // },
      {
        path: `/${lang || "ru"}/distance-calculation`,
        label: "Расчет расстояний",
      },
      // {
      //   path: `/${lang || "ru"}/search-car`,
      //   label: "Поиск машин",
      // },
      {
        path: isAuth
          ? `/${lang || "ru"}/gps-tracking-dispatcher`
          : `/${lang || "ru"}/auth`,
        label: "GPS tracking",
      },
    ];
  } else if (dispatcher_type?.[0] === `top_dispatcher`) {
    return [
      // {
      //   path: `/${lang || "ru"}/`,
      //   label: "Главный",
      // },
      {
        path: `/${lang || "ru"}/dashboard-dispatcher-top`,
        label: "Dashboard",
      },
      {
        path: `/${lang || "ru"}/active-user-dis-top`,
        label: "Журнал активности",
      },
      {
        path: isAuth ? `/${lang || "ru"}/dispatcher` : `/${lang || "ru"}/auth`,
        label: "Диспетчеры",
      },
      {
        path: isAuth
          ? `/${lang || "ru"}/all-cargo-dispatcher`
          : `/${lang || "ru"}/auth`,
        label: "Грузы диспетчеров",
      },
      {
        path: isAuth
          ? `/${lang || "ru"}/my-cars-dispatcher-top`
          : `/${lang || "ru"}/auth`,
        label: "Водители",
      },

      {
        path: `/${lang || "ru"}/distance-calculation`,
        label: "Расчет расстояний",
      },
      // {
      //   path: `/${lang || "ru"}/search-car`,
      //   label: "Поиск машин",
      // },
      {
        path: isAuth
          ? `/${lang || "ru"}/gps-tracking-dispatcher-top`
          : `/${lang || "ru"}/auth`,
        label: "GPS tracking",
      },
    ];
  } else if (role_id === `48871d27-7361-4f69-8fe4-b54daf270739`) {
    let menu = [];

    if (user_type?.[0] === `approved`) {
      menu = [
        // {
        //   path: `/${lang || "ru"}/`,
        //   label: "Главный",
        // },
        {
          path: isAuth
            ? `/${lang || "r u"}/add-cargo`
            : `/${lang || "ru"}/auth`,
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
        // {
        //   path: `/${lang || "ru"}/search-car`,
        //   label: "Поиск машин",
        // },
        {
          path: isAuth
            ? `/${lang || "ru"}/gps-tracking-customer`
            : `/${lang || "ru"}/auth`,
          label: "GPS tracking",
        },
      ];
    } else {
      menu = [
          // {
          //   path: `/${lang || "ru"}/`,
          //   label: "Главный",
          // },
          

        {
          path: isAuth ? `/${lang || "ru"}/my-loads` : `/${lang || "ru"}/auth`,
          label: "Мои грузы",
        },
        {
          path: `/${lang || "ru"}/distance-calculation`,
          label: "Расчет расстояний",
        },
        // {
        //   path: `/${lang || "ru"}/search-car`,
        //   label: "Поиск машин",
        // },
        {
          path: isAuth
            ? `/${lang || "ru"}/gps-tracking-customer`
            : `/${lang || "ru"}/auth`,
          label: "GPS tracking",
        },
      ];
    }

    return menu;
  } else if (role_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469") {
    return [
      // {
      //   path: `/${lang || "ru"}/`,
      //   label: "Главный",
      // },
      {
        path: `/${lang || "ru"}/dashboard`,
        label: "Аналитика",
      },
      {
        path: `/${lang || "ru"}/active-user`,
        label: "Журнал активности",
      },
      {
        path: isAuth
          ? `/${lang || "ru"}/gps-tracking-super-admin`
          : `/${lang || "ru"}/auth`,
        label: "GPS tracking",
      },
    ];
  } else if (role_id === "6a88112a-d543-4e6e-8f77-18149c82d99b") {
    return [
      {
        path: `/${lang || "ru"}/my-cars-dillers`,
        label: "Мои Водители",
      },
      {
        path: `/${lang || "ru"}/add-cars`,
        label: "Добавить Водители",
      },
    ];
  } else {
    return [
      // {
      //   path: `/${lang || "ru"}/`,
      //   label: "Главный",
      // },
      // {
      //   path: isAuth ? `/${lang || "ru"}/add-cargo` : `/${lang || "ru"}/auth`,
      //   label: "Добавить груз",
      // },
      // {
      //   path: isAuth ? `/${lang || "ru"}/my-loads` : `/${lang || "ru"}/auth`,
      //   label: "Мои грузы",
      // },
      // {
      //   path: `/${lang || "ru"}/distance-calculation`,
      //   label: "Расчет расстояний",
      // },
      // {
      //   path: `/${lang || "ru"}/search-car`,
      //   label: "Поиск машин",
      // },
      // {
      //   path: isAuth
      //     ? `/${lang || "ru"}/gps-tracking`
      //     : `/${lang || "ru"}/auth`,
      //   label: "GPS tracking",
      // },
    ];
  }
};
