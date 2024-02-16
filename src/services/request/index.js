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

request.interceptors.response.use((response) => response.data, errorHandlerHttp);

export default request;
