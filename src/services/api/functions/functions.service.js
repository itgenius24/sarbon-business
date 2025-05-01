import requestInvoke from "@/services/requestInvoke";
import { useMutation, useQuery } from "@tanstack/react-query";


const functionsService = {
  getLoadings: (data) =>
    requestInvoke.post("logistika-send-list-of-address-name", data),
  createAddress: (data) =>
    requestInvoke.post("logistika-create-addres", data),
  pushNotification: (data) =>
    requestInvoke.post("logistika-notification", data),
  offerFromCustomer: (data) =>
    requestInvoke.post("logistika-send-offer-from-customer", data),
  getSortedGPSHistory: (data) =>
    requestInvoke.post("logistika-get-list-sorted-gps-history", data),
  getWidtLocation: (data) =>
    requestInvoke.post("logistika-get-users-with-location", data),

  getCargoPost: (data) =>
    requestInvoke.post("logistika-get-cargo-with-filter", data),
  getExcelFile: (data) =>
<<<<<<< HEAD
    requestInvoke.post("logistika-get-list-sorted-gps-history",
      data
    ),  
  getNotification: (data) =>
    requestInvoke.post("logistika-notification", data),
  getNewPred: (data) =>
    requestInvoke.post("logistika-favourite-cargo", data),
=======
    requestInvoke.post("logistika-get-list-sorted-gps-history", data),
  getNotification: (data) => requestInvoke.post("logistika-notification", data),
  getNewPred: (data) => requestInvoke.post("logistika-favourite-cargo", data),
  updateUser2: (data) => requestInvoke.put(`/v2/items/users`, data),
>>>>>>> 638bc0de (change api exel download)
  sendNotification: (data) =>
    requestInvoke.post("logistika-send-notification-new-cargo", data),

  getLogistikaGpsTrackingFilterDriver: (data) =>
    requestInvoke.post("logistika-gps-tracking-filter-driver", data),
  getLogistikaGpsTrackingFilterDriverPred: (data) =>
    requestInvoke.post("logistika-send-list-of-address-name", data),
  getCar: (data) => requestInvoke.post("logistika-get-cargo-list", data),
  getCarDispatcher: (data) =>
    requestInvoke.post("logistika-send-notification-new-cargo", data),
  getCarRefueling: (data) =>
    requestInvoke.post("logistika-send-offer-notification", data),
  getCarTrackingFilter: (data) =>
    requestInvoke.post("logistika-gps-tracking-create-history", data),
  getLocation: (data) =>
    requestInvoke.post("logistika-get-cargo-for-map", data),
  googleRigister: (data) =>
    requestInvoke.post("logistika-get-current-location", data),
};

export const useGetCarDispatcherPost = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["getCarDispatcher", data],
    queryFn: () => functionsService.getCarDispatcher(data),
    ...querySettings,
  });
};

export const useGetCargoMap = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["useGetCargoMap", data],
    queryFn: () => functionsService.getCargoPost(data),
    ...querySettings,
  });
};

export const useGetNotification = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["notificationsData2", data],
    queryFn: () => functionsService.getNotification(data),
    ...querySettings,
  });
};

export const useGetNotificationFirst = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["notificationsFirst", data],
    queryFn: () => functionsService.getNotification(data),
    ...querySettings,
  });
};

export const useGetCreateAddress = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["useGetCreateAddress", data],
    queryFn: () => functionsService.createAddress(data),
    ...querySettings,
  });
};
export const useGetNewPredData = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["getNewPred", data],
    queryFn: () => functionsService.getNewPred(data),
    ...querySettings,
  });
};

export const useGetNewPredData2 = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["getNewPred2", data],
    queryFn: () => functionsService.getNewPred(data),
    ...querySettings,
  });
};

export const useGetNewPred = (mutationSettings) => {
  return useMutation({
    mutationFn: (params) => functionsService.getNewPred(params),
    ...mutationSettings,
  });
};

export const useGetCarData = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["useGetCarData", data],
    queryFn: () => functionsService.getCar(data),
    ...querySettings,
  });
};

export const useGoogleRigister = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.googleRigister(data),
    ...mutationSettings,
  });
};

export const useGetCarTrackingFilter = (mutationSettings) => {
  return useMutation({
    mutationFn: (params) => functionsService.getCarTrackingFilter(params),
    ...mutationSettings,
  });
};

export const useGetCarDispatcher = (mutationSettings) => {
  return useMutation({
    mutationFn: (params) => functionsService.getCarDispatcher(params),
    ...mutationSettings,
  });
};

export const useLocation = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.getLocation(data),
    ...mutationSettings,
  });
};

export const useGetCarRefueling = (mutationSettings) => {
  return useMutation({
    mutationFn: (params) => functionsService.getCarRefueling(params),
    ...mutationSettings,
  });
};

export const useLogistikaGpsTrackingFilterDriverPred = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) =>
      functionsService.getLogistikaGpsTrackingFilterDriverPred(data),
    ...mutationSettings,
  });
};



export const useGetCar = (mutationSettings) => {
  return useMutation({
    mutationFn: (params) => functionsService.getCar(params),
    ...mutationSettings,
  });
};

export const useGetCargoPost = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.getCargoPost(data),
    ...mutationSettings,
  });
};

export const useGetExcelPost = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.getExcelFile(data),
    ...mutationSettings,
  });
};

export const useSendNotification = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.sendNotification(data),
    ...mutationSettings,
  });
};

export const useLogistikaGpsTrackingFilterDriver = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) =>
      functionsService.getLogistikaGpsTrackingFilterDriver(data),
    ...mutationSettings,
  });
};

export const useGetLoadingMutation = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.getLoadings(data),
    ...mutationSettings,
  });
};

export const useCreateAddressMutation = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.createAddress(data),
    ...mutationSettings,
  });
};

export const usePushNotificationMutation = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.pushNotification(data),
    ...mutationSettings,
  });
};

export const useOfferFromCustomerMutation = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.offerFromCustomer(data),
    ...mutationSettings,
  });
};

export const useGetSortedGPSHistory = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.getSortedGPSHistory(data),
    ...mutationSettings,
  });
};

export const useGetWithLocation = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => functionsService.getWidtLocation(data),
    ...mutationSettings,
  });
};
