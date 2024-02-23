import request from "@/services/request";
import { useMutation, useQuery } from "@tanstack/react-query";

const itemsService = {
  getClientType: (params) => request.get("v2/items/client_type", { params }),
  createCargo: (data) => request.post("/v2/items/cargo", data)
};


export const useGetClientType = (params = {}) => {
  return useQuery({
    queryKey: ["items/client_type", params],
    queryFn: () => itemsService.getClientType(params),
  });
};

export const useCreateCargoMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.createCargo(data), ...mutationSettings });
};
