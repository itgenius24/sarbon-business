import { useMutation } from "@tanstack/react-query";

const { default: request } = require("@/services/request");

const functionsService = {
  getLoadings: (data) => request.post("/v1/invoke_function", data),
  createAddress: (data) => request.post("/v1/invoke_function/logistika-create-addres", data),
};

export const useGetLoadingMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => functionsService.getLoadings(data), ...mutationSettings });
};

export const useCreateAddressMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => functionsService.createAddress(data), ...mutationSettings });
};
