import { useCookies } from "react-cookie";

export const useGetLang = () => {
  const [cookies] = useCookies();

  return cookies["i18next"];
};
