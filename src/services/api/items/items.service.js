import request from "@/services/request";
import { useMutation, useQuery } from "@tanstack/react-query";

const itemsService = {
  createAd: (data) => request.post("/v2/items/car_sale", data),
  updateAd: (data) => request.put("/v2/items/car_sale", data),
  updateUserInfo: (data) => request.put("/v2/items/users", data),
  updateLoad: (data) => request.put("/v2/items/cargo", data),
  getUserInfo: (id) => request.get(`/v2/items/users/${id}`),
  getClientType: (params) => request.get("/v2/items/client_type", { params }),
  getSingleNewData: (id) => request.get(`/v2/items/news/${id}`),
  deleteCargo: (id) => request.delete(`/v2/items/cargo/${id}`,{data:JSON.stringify({data:{}})}),
  updateCargo: (data) => request.put("/v2/items/cargo", data),
  updateResponse: (data) => request.put("/v2/items/response", data),
  createFeedback: (data) => request.post("/v2/items/review", data),
};

export const useCreateAdMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.createAd(data), ...mutationSettings });
};

export const useUpdateAdMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.updateAd(data), ...mutationSettings });
};

export const useUpdateUserInfo = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.updateUserInfo(data),
    ...mutationSettings,
  });
};

export const useGetUserInfo = (id = "", settings) => {
  return useQuery({
    queryKey: ["items/users/id", id],
    queryFn: () => itemsService.getUserInfo(id),
    ...settings,
  });
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

export const useUpdateResponse = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.updateResponse(data), ...mutationSettings });
};

export const useCreateFeedback = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.createFeedback(data), ...mutationSettings });
};
