import { useGetUserInfo } from "@/services/api";
import { useParams } from "next/navigation";

export const useGetUserInfoHook = () => {
  const { id } = useParams();
  return useGetUserInfo(id, {
    enabled: !!id,
    select: (res) => {
      if (!res.response) return undefined;
      return res?.response || {};
    },
  });

};
