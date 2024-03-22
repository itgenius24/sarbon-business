import { useGetManualList } from "@/services/api";

export const useHandbookProps = () => {
  return useGetManualList(undefined, { select:(res)=> res?.response || [], });
};
