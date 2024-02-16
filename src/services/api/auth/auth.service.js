import authRequest from "@/services/authRequest";
import { useMutation, useQuery } from "@tanstack/react-query";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const authService = {
  oneLogin: (data) => authRequest.post(`/v2/multi-company/one-login?project_id=${projectId}`, data),
  login: (data) => authRequest.post(`/v2/login?project_id=${projectId}`, data),
  phone: (data) => authRequest.post(`/v2/auth/send-code?project_id=${projectId}`, data ),
  otp: (data) => authRequest.post(`/v2/login/with-option?project-id=${projectId}`, data),
  register: (data) => authRequest.post(`/v2/register?project-id=${projectId}`, data),
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

export const useRegisterMutation = (mutationSettings = {}) => {
  return useMutation({
    mutationFn: authService.register,
    ...mutationSettings
  });
};
