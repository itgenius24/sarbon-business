import { useGetUserInfo } from "@/services/api";
import authStore from "@/store/auth.store";

export const useGetUserInfoHook = () => {
  const id = authStore.userData.id;

  return useGetUserInfo(id, {
    enabled: Boolean(id),
    select: (res) => {
      if (!res.response) return {};
      return res?.response || {};
    },
  });

};
