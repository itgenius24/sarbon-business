import authStore from "@/store/auth.store";
import axios from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASIC_URL,
  timeout: 10000,
});

export const errorHandlerHttp = (error) => {
  if (error?.response?.status === 401 && authStore.token.refresh_token === authStore.token.access_token) {
    authStore.logout();
    return;
  } else if (error?.response?.status === 401) {
    authStore.changeToken();
  }

  return Promise.reject(error);
};

request.interceptors.request.use((config) => {
  const token = authStore.token.access_token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if(
    config.url.includes("client_type") ||
    config.url.includes("get-list/role") ||
    config.url.includes("get-list/firm") ||
    config.url.includes("get-list/news") ||
    config.url.includes("get-list/partners_company")
  ) {
    if(!token) {
      config.headers["Authorization"] = "API-KEY";
    }
    config.headers["X-API-KEY"] = "P-LVV522r72r72mHNTNZ1w0FimKLFSCOqT";
  }

  return config;
});

request.interceptors.response.use((response) => {
  if (response?.data?.data?.data?.data) return response.data.data.data.data;
  if (response?.data?.data?.data) return response.data.data.data;
  else if(response?.data?.data) return response.data.data;
  else return response.data || response;
}, errorHandlerHttp);

export default request;
