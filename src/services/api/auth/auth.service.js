import authRequest from "@/services/authRequest";
import request from "@/services/request";
import { useMutation, useQuery } from "@tanstack/react-query";

const projectId = process.env.NEXT_PROJECT_ID;

const authService = {
  oneLogin: (data) => authRequest.post(`/v2/multi-company/one-login?project_id=${projectId}`, data),
  login: (data) => authRequest.post(`/v2/login?project_id=${projectId}`, data),
  phone: (data) => authRequest.post(`/v2/auth/send-code?project_id=${projectId}`, data ),
  otp: (data) => authRequest.post(`v2/login/with-option?project-id=${projectId}`, data),
  getCompany: (params) => request.get(`/v2/object-slim/get-list/company?project_id=${projectId}`, { params })
};

export const useOneLoginMutation = (mutationSettings = {}) => {
  return useMutation({
    mutationFn: authService.oneLogin,
    ...mutationSettings
  });
};

export const useLoginMutation = (mutationSettings = {}) => {
  return useMutation({
    mutationFn: authService.login,
    ...mutationSettings
  });
};

export const usePhoneMutation = (mutationSettings = {}) => {
  return useMutation({
    mutationFn: authService.phone,
    ...mutationSettings
  });
};

export const useOtpMutation = (mutationSettings = {}) => {
  return useMutation({
    mutationFn: authService.otp,
    ...mutationSettings
  });
};

export const useGetCompanyMutation = (params) => {
  return useQuery(
    {
      queryKey: ["company", params],
      queryFn: () => authService.getCompany(params),
    },
  );
};
