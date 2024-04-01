import { useCookies } from "react-cookie";

export const useGetLang = () => {
  const [cookies] = useCookies(["i18next"]);

  return cookies["i18next"];
};
