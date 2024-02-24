import { useGetUserCargo } from "@/services/api";
import authStore from "@/store/auth.store";

export const useMyLoadsMainProps = () => {

  const getAllUserCargo = useGetUserCargo({ data: JSON.stringify({ user_id: authStore.userData.id }) });

  return { allCargo: getAllUserCargo.data?.response };
};
