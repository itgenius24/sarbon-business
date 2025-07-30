import authStore from "@/store/auth.store";
import axios from "axios";

const requestInvoke = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASIC_INVOKE_URL,
  timeout: 2500000,
});

export const errorHandlerHttp = (error) => {
  if (
    error?.response?.status === 401 &&
    authStore.token.refresh_token === authStore.token.access_token
  ) {
    authStore.logout();
    return;
  } else if (error?.response?.status === 401) {
    authStore.changeToken();
  }

  return Promise.reject(error);
};

requestInvoke.interceptors.request.use((config) => {
  const token = authStore.token.access_token;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (!token) {
    config.headers["Authorization"] = "API-KEY";
    config.headers["X-API-KEY"] = "P-LVV522r72r72mHNTNZ1w0FimKLFSCOqT";
  }


  if (config.url && !config.url.startsWith('staging-')) {
    config.url = `${process.env.NEXT_PUBLIC_BASIC_INVOKE_STAGING_PREFIX_URL || ``}${config.url.replace(/^\/+/, '')}`;
  }

  return config;
});

requestInvoke.interceptors.response.use((response) => {
  if (response?.data?.data?.data?.data) return response.data.data.data.data;
  if (response?.data?.data?.data) return response.data.data.data;
  else if (response?.data?.data) return response.data.data;
  else return response.data || response;
}, errorHandlerHttp);

export default requestInvoke;
