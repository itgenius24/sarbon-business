import authStore from "@/store/auth.store";
import axios from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASIC_URL,
  timeout: 10000,
});

export const errorHandlerHttp = (error) => {
  // if (error?.response?.status === 401) {
  //   (async() => {
  //     try {
  //       const result = await refreshToken(
  //         { refresh_token: authStore.token.refresh_token }
  //       );
  //       const data = {
  //         token: result?.token,
  //         user: authStore.userData
  //       };
  //       authStore.login(data);
  //     } catch(err) {
  //       authStore.logout();
  //     }
  //   })();
  //   return;
  // }

  return Promise.reject(error);
};

request.interceptors.request.use((config) => {
  const token = authStore.token.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["X-API-KEY"] = "P-LVV522r72r72mHNTNZ1w0FimKLFSCOqT";
  config.headers["Authorization"] = "API-KEY";

  return config;
});

request.interceptors.response.use((response) => {
  if (response?.data?.data?.data) return response.data.data.data;
  else if(response?.data?.data) return response.data.data;
  else return response.data || response;
}, errorHandlerHttp);

export default request;
