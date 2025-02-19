"use client";

import { useDeletedeleteDispacersDriver, useGetCar } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import authStore from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { useDebounce as useDebounce2 } from "use-debounce";
import useDebounce from "@/hooks/useDebounce";
import { isVisibleInViewport } from "@/utils/isVisibleInViewport";

export const useMyCarsDispatcher = () => {
  const { register, watch } = useForm();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const disId = authStore.userData?.id;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [refe, setRefe] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [filter1, setFilter1] = useState(false);
  const [isAscending, setIsAscending] = useState(true); // Saralash tartibini saqlash uchun holat
  const [search, setSearch] = useState(``);
  const [count, setCount] = useState(0);
  const [debouncedValue] = useDebounce2(search, 500);
  const containerRef = useRef(null);

  const { mutate, isLoading } = useGetCar({
    onSuccess: (res) => {
      if (res?.response?.length) {
        setRefe(false);
        setCount({count:res?.count?.total_count
          ,free_count:res?.FreeCount?.free_count});

        let data = res?.response;
        const uniqueData = data.filter(
          (item) =>
            !oldData.some((stateItem) => stateItem?.users_id === item?.users_id)
        );
        //  if(page > 1){
          const uniqueData2 = data.filter(
            (item) =>
              oldData.some((stateItem) => stateItem?.users_id === item?.users_id)
          );
            setData2((prev) => [...prev, ...uniqueData2])

        //  }
        setData((prev) => [...prev, ...uniqueData]); // Yangi ma'lumotlarni data ga qo'shish
        setOldData((prev) => [...prev, ...uniqueData]); // Yangi ma'lumotlarni oldData ga qo'shish
      }
    },
  });

  console.log(`data2`,data2.map(item => item?.driver_data?.[0]?.full_name  ))

  useEffect(() => {
    const dataReq = {
      data: {
        object_data: {
          page: debouncedValue?.length > 0 ? 0 : page,
          search: debouncedValue,
          limit: debouncedValue?.length > 0 ? 1000 : limit,
          type: "dispatcher",
          dispatcher_id: disId,
        },
      },
    };

    mutate(dataReq);
  }, [page, limit, debouncedValue?.length, refe]);

  const addPage = () => {
    setPage((pa) => pa + 1);
  };

  const nameFilter = () => {
    setFilter1(!filter1);
    const sortedData = data?.sort(
      (a, b) =>
        isAscending
          ? a?.driver_data?.[0]?.full_name.localeCompare(
              b?.driver_data?.[0]?.full_name
            ) // Alfavit bo'yicha
          : b?.driver_data?.[0]?.full_name.localeCompare(
              a?.driver_data?.[0]?.full_name
            ) // Teskari alfavit bo'yicha
    );

    setData(() => [...sortedData]);
    setIsAscending(!isAscending); // Tartibni almashtirish
  };

  const { mutate: deleteUser } = useDeletedeleteDispacersDriver({
    onSuccess: () => {
      setRefe(true);
      setData([]);
      setOldData([]);
    },
  });

  const deleteFuntion = (id) => {
    console.log(`deleteFuntion`, id);
    deleteUser({
      id,
    });
  };

  const setSearchFn = (val) => {
    setSearch(val?.replace(/\+/g, ""));
    if (val?.replace(/\+/g, "")) {
      setData([]);
      setOldData([]);
      setPage(0);
    }
  };
  const setDebouncedLimit = useDebounce(setPage, 250);

  const handleScroll = () => {
    if (!isLoading) {
      if (containerRef.current) {
        const isVisible = isVisibleInViewport(containerRef.current);

        if (isVisible) {
          setDebouncedLimit((res) => res + 1);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { capture: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);


//   const ids = [
//     "Aknazarov Abdurasul",
//     "Davlatov Alisher Tursunboy o'g'li",
//     "Shoimardanov Fazliddin",
//     "Ahmatov Jorabek",
//     "Кутбиддинов",
//     "Тогаев Толиь",
//     "Haqberdiyev Murot",
//     "Abdullayev Komolidin",
//     "Nizomov Mashrabjin",
//     "Haydarov Jonibek",
//     "Авулов",
//     "Shomurodov Diyorbek",
//     "Ismoilov Furqatbek",
//     "Yetyichayev Anvar",
//     "Oktamov Azamat",
//     "Mustifoqulov Odiljon",
//     "Sobirov Axrorjon Shokirjon ogli",
//     "Hamidov Ibrohim aka",
//     "Pardayev Ozodjon",
//     "Husanov Sanjar",
//     "Убайдуллаев Баходир",
//     "Aliqulov Tulqin",
//     "Худайназаров Муроджон",
//     "Гулямов Лочин",
//     "Ahmajonov Rustamjon",
//     "Qunduziv Anvar",
//     "Rahmatov Oktam",
//     "Нишанов Рахматжон",
//     "Nurmetov Nurmamad",
//     "Мирзаев Мухитдин",
//     "Aknazarov Abdurasul",
//     "Ураков Шерзодбек Ахмаджонович",
//     "Davlatov Alisher Tursunboy o'g'li",
//     "яАлимов Хайдарали",
//     "Shoimardanov Fazliddin",
//     "Обидов Ихлосбек И",
//     "Тошбоев Комилжон",
//     "Ahmatov Jorabek",
//     "Сайдалиев Хакимжон Солижонович",
//     "Кутбиддинов",
//     "Жораев Боирали Курбонаиевич",
//     "Тогаев Толиь",
//     "Насретдинов Мирфозил  Исмоилович",
//     "Haqberdiyev Murot",
//     "Моментов Исомиддин",
//     "Abdullayev Komolidin",
//     "Бозоров Жаъфар Шавкатович",
//     "Nizomov Mashrabjin",
//     "Худайназаров Муроджон",
//     "Гулямов Лочин",
//     "Ahmajonov Rustamjon",
//     "Qunduziv Anvar",
//     "Rahmatov Oktam",
//     "дадабоев Икболлиддин",
//     "Авулов",
//     "Tursunov Oybek",
//     "Shomurodov Diyorbek",
//     "QURANBAYEV BUNYOD",
//     "Ismoilov Furqatbek",
//     "Ahmedov Fayzullo",
//     "Yetyichayev Anvar",
//     "Guzarov Nodirbek",
//     "Oktamov Azamat",
//     "Abdulaziz Juraboyev",
//     "Mustifoqulov Odiljon",
//     "Ахмедов Лазизжон Махамаджанович",
//     "Sobirov Axrorjon Shokirjon ogli",
//     "ibrohim umarov",
//     "Hamidov Ibrohim aka",
//     "Рустамов Мухсин",
//     "Pardayev Ozodjon",
//     "Gulomjonov Zoir",
//     "Husanov Sanjar",
//     "TURDIBOYEV FOZILJON FAZLIDDINJON O'G'LI",
//     "Убайдуллаев Баходир",
//     "Худайназаров Муроджон",
//     "Гулямов Лочин",
//     "Ahmajonov Rustamjon",
//     "Qunduziv Anvar",
//     "Rahmatov Oktam",
//     "дадабоев Икболлиддин",
//     "Тураев Шухрат",
//     "Нишанов Рахматжон",
//     "ShukurufSirojon",
//     "Ergashev Ziynatshoh",
//     "Ахмедов Бахром",
//     "Nurmetov Nurmamad",
//     "Джангабаев Сардор",
//     "Мирзаев Мухитдин",
//     "Кабулов Умиджон",
//     "Aknazarov Abdurasul",
//     "Rajabov Jasurbek Obidovich",
//     "Ураков Шерзодбек Ахмаджонович",
//     "Shirinov Feruz Maxmudovich",
//     "Davlatov Alisher Tursunboy o'g'li",
//     "Тулаганов Откир",
//     "яАлимов Хайдарали",
//     "Жамолидинов Тохиржон",
//     "Shoimardanov Fazliddin",
//     "Алимов Мухтар",
//     "Обидов Ихлосбек И",
//     "Худайназаров Муроджон",
//     "Гулямов Лочин",
//     "Ahmajonov Rustamjon",
//     "Qunduziv Anvar",
//     "Rahmatov Oktam",
//     "дадабоев Икболлиддин",
//     "Тураев Шухрат",
//     "Тошбоев Комилжон",
//     "Шокиров Хамдамбек",
//     "Ahmatov Jorabek",
//     "Эсонбоев солижон",
//     "Сайдалиев Хакимжон Солижонович",
//     "одилов Лочин",
//     "Кутбиддинов",
//     "Мирзаяров Шербек",
//     "Жораев Боирали Курбонаиевич",
//     "Гуламов Самир",
//     "Тогаев Толиь",
//     "Бобамирзаев Бахтиёр Усмонович",
//     "Насретдинов Мирфозил  Исмоилович",
//     "Абдуллаев Азам",
//     "Haqberdiyev Murot",
//     "Илхомжон Тешабаев",
//     "Моментов Исомиддин",
//     "Жалилов Анваржон",
//     "Abdullayev Komolidin",
//     "Shoabdullayev  Shoakbar",
//     "Бозоров Жаъфар Шавкатович",
//     "Худайназаров Муроджон",
//     "Гулямов Лочин",
//     "Ahmajonov Rustamjon",
//     "Qunduziv Anvar",
//     "Rahmatov Oktam",
//     "дадабоев Икболлиддин",
//     "Тураев Шухрат"
// ]

// console.log(`ids`,ids)
  return {
    data,
    deleteFuntion,
    nameFilter,
    filter1,
    isLoading,
    t,
    register,
    setSearchFn,
    search,
    containerRef,
    count,
    addPage,
  };
};
