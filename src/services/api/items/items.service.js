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
  createCargo: (data) => request.post("/v2/items/cargo", data),
  createPeriod: (data) => request.post("/v2/items/period", data),
  updateResponse: (data) => request.put("/v2/items/response", data),
  createFeedback: (data) => request.post("/v2/items/review", data),
  createVehicle: (data) => request.post("/v2/items/vehicle", data),
  updateVehicle: (data) => request.put("/v2/items/vehicle", data),
  deleteVehicle: (data) => request.delete(`/v2/items/vehicle/${data.id}`, {data:JSON.stringify({data:{}})}),
  deleteUsers: (data) => request.delete(`/v2/items/users/${data.id}`, {data:JSON.stringify({data:{}})}),
  createUser: (data) => request.post("/v2/items/users", data),
  getCargoPost: (data) => request.post("/v1/invoke_function/logistika-get-cargo-with-filter", data),
  updateUser: (data) => request.put(`/v2/items/users`, data),
  sendNotification: (data) => request.post("/v1/invoke_function/logistika-send-notification-new-cargo", data),
  getCargo: (params) =>
    request.get("/v2/object-slim/get-list/cargo", { params }),

};

// items/vehicle

export const useGetCargoList = ({params = { data: JSON.stringify({}) },querySettings}) => {
  return useQuery({
    queryKey: ["object/getCargo", params],
    queryFn: () => itemsService.getCargo(params),...querySettings
  });
};


export const useCreateAdMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.createAd(data), ...mutationSettings });
};
export const useGetCargoPost = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.getCargoPost(data), ...mutationSettings });
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

export const useCreatePeriodMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.createPeriod(data), ...mutationSettings });
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

export const useCreateVehicle = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.createVehicle(data), ...mutationSettings });
};

export const useUpdateVehicle = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.updateVehicle(data), ...mutationSettings });
};

export const useDeleteVehicle = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.deleteVehicle(data), ...mutationSettings });
};

export const useDeleteUsers = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.deleteUsers(data), ...mutationSettings });
};

export const useCreateUser = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.createUser(data), ...mutationSettings });
};

export const useUpdateUser = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.updateUser(data), ...mutationSettings });
};
export const useSendNotification = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => itemsService.sendNotification(data), ...mutationSettings });
};
