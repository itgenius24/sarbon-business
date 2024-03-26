import { useGetManualList } from "@/services/api";

export const useHandbookProps = () => {
  return useGetManualList({ data: JSON.stringify({ status: ["directory"] }) }, { select:(res)=> res?.response || [], });
};
