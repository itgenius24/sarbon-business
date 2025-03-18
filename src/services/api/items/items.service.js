import request from "@/services/request";
import { useMutation, useQuery } from "@tanstack/react-query";

const itemsService = {
  createAd: (data) => request.post("/v2/items/car_sale", data),
  updateAd: (data) => request.put("/v2/items/car_sale", data),
  updateUserInfo: (data) => request.put("/v2/items/users", data),
  updateLoad: (data) => request.put("/v2/items/cargo", data),
  getUserInfo: (id) => request.get(`/v2/items/users/${id}`),
  getFirm: (id) => request.get(`/v2/items/firm/${id}`),
  getFuelInfo: (id) => request.get(`/v2/items/fuel`),
  getClientType: (params) => request.get("/v2/items/client_type", { params }),
  getSingleNewData: (id) => request.get(`/v2/items/news/${id}`),
  deleteCargo: (id) =>
    request.delete(`/v2/items/cargo/${id}`, {
      data: JSON.stringify({ data: {} }),
    }),
  deleteDispacersDriver: (id) =>
    request.delete(`/v2/items/dispatcher_drivers/${id}`, {
      data: JSON.stringify({ data: {} }),
    }),
  updateCargo: (data) => request.put("/v2/items/cargo", data),
  createCargo: (data) => request.post("/v2/items/cargo", data),
  createPeriod: (data) => request.post("/v2/items/period", data),
  updateResponse: (data) => request.put("/v2/items/order", data),
  updateNoDriver: (data) => request.post("/v2/items/dispatcher_drivers", data),
  updateUser: (data) => request.put("/v2/items/users", data),
  createFeedback: (data) => request.post("/v2/items/review", data),
  createLogHistory: (data) => request.post("/v2/items/log_history", data),
  createVehicle: (data) => request.post("/v2/items/vehicle", data),
  updateVehicle: (data) => request.put("/v2/items/vehicle", data),
  deleteVehicle: (data) =>
    request.delete(`/v2/items/vehicle/${data.id}`, {
      data: JSON.stringify({ data: {} }),
    }),
  deleteUsers: (data) =>
    request.delete(`/v2/items/users/${data.id}`, {
      data: JSON.stringify({ data: {} }),
    }),
  createUser: (data) => request.post("/v2/items/users", data),
  createDispatcherTeams: (data) =>
    request.post("/v2/items/dispatcher_teams", data),
  checkUser: (data) => request.post("/v2/object/get-list/users", data),
  checkUserRegister: (data) =>
    request.post("/v2/object-slim/get-list/users", data),
  getCargoPost: (data) =>
    request.post("/v1/invoke_function/logistika-get-cargo-with-filter", data),
  getExcelFile: (data) =>
    request.post(
      "/v1/invoke_function/logistika-get-list-sorted-gps-history",
      data
    ),
  getNotification: (data) =>
    request.post("/v1/invoke_function/logistika-notification", data),
  getNewPred: (data) =>
    request.post("/v1/invoke_function/logistika-favourite-cargo", data),
  updateUser2: (data) => request.put(`/v2/items/users`, data),
  sendNotification: (data) =>
    request.post(
      "/v1/invoke_function/logistika-send-notification-new-cargo",
      data
    ),
  getCargo: (params) =>
    request.get("/v2/object-slim/get-list/cargo", { params }),
  getNote: (params) => request.get("/v2/object-slim/get-list/note", { params }),
  updateNote: (data) => request.put(`/v2/items/note`, data),
  getDriverPosition: (params) =>
    request.get("/v2/object-slim/get-list/gps_history", { params }),
  getPhoneUser: (params) =>
    request.get("/v2/object-slim/get-list/users", { params }),
  getActionUser: (params) =>
    request.get("/v2/object-slim/get-list/action_histories", { params }),
  getRole: (params) =>
    request.get("/v2/object-slim/get-list/role", { params }),
  deleteOrder: (id) =>
    request.delete(`/v2/items/order/${id}`, {
      data: JSON.stringify({ data: {} }),
    }),
  deleteDis: (data) =>
    request.delete(
      `/v1/object/project-id=f539f64b-961e-4c6c-8534-140091f7f27b`,
      { data }
    ),
};

// items/vehicle

export const useGetCargoList = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getCargo", params],
    queryFn: () => itemsService.getCargo(params),
    ...querySettings,
  });
};

export const useGetNoteList = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getNote", params],
    queryFn: () => itemsService.getNote(params),
    ...querySettings,
  });
};

export const useGetNotification = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["notificationsData2", data],
    queryFn: () => itemsService.getNotification(data),
    ...querySettings,
  });
};

export const useGetNewPredData = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["getNewPred", data],
    queryFn: () => itemsService.getNewPred(data),
    ...querySettings,
  });
};

export const useGetNewPredData2 = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["getNewPred2", data],
    queryFn: () => itemsService.getNewPred(data),
    ...querySettings,
  });
};

export const useGetUserPost = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["checkUserRegister", data],
    queryFn: () => itemsService.checkUser(data),
    ...querySettings,
  });
};


export const useGetNotificationFirst = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["notificationsFirst", data],
    queryFn: () => itemsService.getNotification(data),
    ...querySettings,
  });
};


export const useGetDriverPosition = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getDriverPosition", params],
    queryFn: () => itemsService.getDriverPosition(params),
    ...querySettings,
  });
};

export const useGetActionUser = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getActionUser", params],
    queryFn: () => itemsService.getActionUser(params),
    ...querySettings,
  });
};

export const useGetRole = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getRole", params],
    queryFn: () => itemsService.getRole(params),
    ...querySettings,
  });
};


export const useCreateAdMutation = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.createAd(data),
    ...mutationSettings,
  });
};
export const useGetCargoPost = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.getCargoPost(data),
    ...mutationSettings,
  });
};

export const useGetExcelPost = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.getExcelFile(data),
    ...mutationSettings,
  });
};

export const useUpdateAdMutation = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.updateAd(data),
    ...mutationSettings,
  });
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

export const useGetFirmInfo = (id = "", settings) => {
  return useQuery({
    queryKey: ["items/firm/id", id],
    queryFn: () => itemsService.getFirm(id),
    ...settings,
  });
};

export const useGetFuelInfo = (id = "", settings) => {
  return useQuery({
    queryKey: ["items/users/id", id],
    queryFn: () => itemsService.getFuelInfo(id),
    ...settings,
  });
};

export const useGetNewData = (id = {}, settings) => {
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
  return useMutation({
    mutationFn: (data) => itemsService.createCargo(data),
    ...mutationSettings,
  });
};

export const useCreatePeriodMutation = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.createPeriod(data),
    ...mutationSettings,
  });
};
export const useDeleteCargo = (mutationSettings) => {
  return useMutation({
    mutationFn: ({ id }) => itemsService.deleteCargo(id),
    ...mutationSettings,
  });
};

export const useDeletedeleteDispacersDriver = (mutationSettings) => {
  return useMutation({
    mutationFn: ({ id }) => itemsService.deleteDispacersDriver(id),
    ...mutationSettings,
  });
};

export const useDeleteOrder = (mutationSettings) => {
  return useMutation({
    mutationFn: ({ id }) => itemsService.deleteOrder(id),
    ...mutationSettings,
  });
};

export const useDeleteDisAll = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.deleteDis(data),
    ...mutationSettings,
  });
};

export const useUpdateCargo = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.updateCargo(data),
    ...mutationSettings,
  });
};

export const useUpdateResponse = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.updateResponse(data),
    ...mutationSettings,
  });
};

export const useUpdateNoDriver = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.updateNoDriver(data),
    ...mutationSettings,
  });
};

export const useUpdateUserData = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.updateUser2(data),
    ...mutationSettings,
  });
};

export const useUpdateNoteData = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.updateNote(data),
    ...mutationSettings,
  });
};

export const useCreateFeedback = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.createFeedback(data),
    ...mutationSettings,
  });
};

export const useCreateLogHistory = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.createLogHistory(data),
    ...mutationSettings,
  });
};

export const useCreateVehicle = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.createVehicle(data),
    ...mutationSettings,
  });
};

export const useUpdateVehicle = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.updateVehicle(data),
    ...mutationSettings,
  });
};

export const useDeleteVehicle = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.deleteVehicle(data),
    ...mutationSettings,
  });
};

export const useDeleteUsers = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.deleteUsers(data),
    ...mutationSettings,
  });
};

export const useCreateUser = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.createUser(data),
    ...mutationSettings,
  });
};

export const useGetPhone = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.getPhoneUser(data),
    ...mutationSettings,
  });
};

export const useCreateDispatcherTeams = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.createDispatcherTeams(data),
    ...mutationSettings,
  });
};

export const useCheckUser = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.checkUser(data),
    ...mutationSettings,
  });
};

export const useUpdateUser = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.updateUser(data),
    ...mutationSettings,
  });
};
export const useSendNotification = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => itemsService.sendNotification(data),
    ...mutationSettings,
  });
};
