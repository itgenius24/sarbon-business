import request from "@/services/request";
import { useQuery } from "@tanstack/react-query";

const itemsService = { getClientType: (params) => request.get("v2/items/client_type", { params }), };


export const useGetClientType = (params = {}) => {
  return useQuery({
    queryKey: ["items/client_type", params],
    queryFn: () => itemsService.getClientType(params),
  });
};
