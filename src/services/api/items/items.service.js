import request from "@/services/request";
import { useMutation, useQuery } from "@tanstack/react-query";

const itemsService = {
  getClientType: (params) => request.get("/v2/items/client_type", { params }),
  createCargo: (data) => request.post("/v2/items/cargo", data),
  getSingleNewData: (id) => request.get(`/v2/items/news/${id}`),
  deleteCargo: (id) => request.delete(`/v2/items/cargo/${id}`),
  updateCargo: (data) => request.put("/v2/items/cargo", data)
};


export const useGetNewData = (id = {},settings) => {
  return useQuery({
    queryKey: ["items/news/", id],
    queryFn: () => itemsService.getSingleNewData(id),
    ...settings,
  });
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

export const useDeleteCargo = (mutationSettings) => {
  return useMutation({ mutationFn: ({ id }) => itemsService.deleteCargo(id), ...mutationSettings });
};

export const useUpdateCargo = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.updateCargo(data), ...mutationSettings });
};
