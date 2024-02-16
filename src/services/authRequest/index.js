
import authStore from "@/store/auth.store";
import axios from "axios";

const authRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  timeout: 100000,
});

const errorHandler = (error) => {
  if (error?.response?.status === 401) {
    authStore.logout();
  }
  return Promise.reject(error.response);
};

authRequest.interceptors.request.use((config) => {
  const token = authStore.token.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["environment-id"] = "11b59b25-8772-456a-84e1-20bdfdd32506";
  config.headers["resource-id"] = "e32ba3ac-a552-4e42-a3c9-04e3ac1a4ac3";
  console.log({ config });
  return config;
});

authRequest.interceptors.response.use(
  (response) => response.data.data,
  errorHandler
);

export default authRequest;
