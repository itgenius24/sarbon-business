import authStore from "@/store/auth.store";
import axios from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASIC_URL,
  timeout: 25000,
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
  // const token = authStore.token.access_token;
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfcGxhdGZvcm1faWQiOiIiLCJjbGllbnRfdHlwZV9pZCI6IjljMTcyZDhmLThiNzEtNDQyMC1hZjg1LWI4MmFlNDU3MjFiOSIsImRhdGEiOiJhZGRpdGlvbmFsIGpzb24gZGF0YSIsImV4cCI6MTcyOTI2MjQyOSwiaWF0IjoxNzI5MTc2MDI5LCJpZCI6IjFmYmUzYmQwLTFkODAtNDFiNC1hM2M3LWFiMDFhODQyYjYzZCIsImlwIjoiYWRkaXRpb25hbCBqc29uIGRhdGEiLCJsb2dpbl90YWJsZV9zbHVnIjoidXNlciIsInByb2plY3RfaWQiOiJmNTM5ZjY0Yi05NjFlLTRjNmMtODUzNC0xNDAwOTFmN2YyN2IiLCJyb2xlX2lkIjoiNTQxNjA1OTYtMTE5Yi00NTRiLTllNWYtMDMyYjkxMjAxMjBhIiwidGFibGVzIjpbXSwidXNlcl9pZCI6IjExNzMzOGZmLTg4ZTQtNDA3Yy05Nzg5LTE5NjNhYjk2YThkMiJ9.Nvbg4V6FyVFGxW0pWzQ3nUuSlvNC9m0JYeSu2U9XpaU`;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if(
    config.url.includes("client_type") ||
    config.url.includes("get-list/role") ||
    config.url.includes("get-list/firm") ||
    config.url.includes("/news") ||
    config.url.includes("/directory") ||
    config.url.includes("get-list/partners_company") ||
    config.url.includes("/users")
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
