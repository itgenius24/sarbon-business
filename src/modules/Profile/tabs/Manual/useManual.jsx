import { useGetManualList } from "@/services/api";

export const useManual = () => {
  return useGetManualList(undefined, { select:(res)=> res?.response || [], });
};
