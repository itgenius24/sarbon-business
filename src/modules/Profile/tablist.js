import { AddCard, Car, File, TopUpBalance, User } from "@/assets/icons/icons";
import { PersonalInfo } from "./tabs/PersonalInfo";

export const tabsList = [
  { title: "Личные данные", icon: <User />, content: <PersonalInfo /> },
  { title: "Добавить карту", icon: <AddCard /> },
  { title: "Пополнить баланс", icon: <TopUpBalance /> },
  { title: "Продажа авто", icon: <Car /> },
  { title: "Справочники", icon: <File /> },
];
