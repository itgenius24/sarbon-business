import { useMutation } from "@tanstack/react-query";

const { default: request } = require("@/services/request");

const functionsService = { getLoadings: (data) => request.post("/v1/invoke_function", data) };

export const useGetLoadingMutation = (mutationSettings) => {
  return useMutation({ mutationFn: (data) => functionsService.getLoadings(data), ...mutationSettings });
};
