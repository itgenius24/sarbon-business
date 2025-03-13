import { useMutation, useQuery } from "@tanstack/react-query";

const { default: request } = require("@/services/request");

const functionsService = {
  getLoadings: (data) => request.post("/v1/invoke_function/logistika-send-list-of-address-name", data),
  createAddress: (data) => request.post("/v1/invoke_function/logistika-create-addres", data),
  pushNotification: (data) => request.post("/v1/invoke_function/logistika-notification", data),
  offerFromCustomer: (data) => request.post("/v1/invoke_function/logistika-send-offer-from-customer", data),
  getSortedGPSHistory: (data) => request.post("/v1/invoke_function/logistika-get-list-sorted-gps-history", data),
  getWidtLocation: (data) => request.post("/v1/invoke_function/logistika-get-users-with-location", data),
};


export const useGetCreateAddress = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["useGetCreateAddress", data],
    queryFn: () => functionsService.createAddress(data),
    ...querySettings,
  });
};


export const useGetLoadingMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => functionsService.getLoadings(data), ...mutationSettings });
};

export const useCreateAddressMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => functionsService.createAddress(data), ...mutationSettings });
};

export const usePushNotificationMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => functionsService.pushNotification(data), ...mutationSettings });
};

export const useOfferFromCustomerMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => functionsService.offerFromCustomer(data), ...mutationSettings });
};

export const useGetSortedGPSHistory = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => functionsService.getSortedGPSHistory(data), ...mutationSettings });
};

export const useGetWithLocation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => functionsService.getWidtLocation(data), ...mutationSettings });
};
