import authStore from "@/store/auth.store";
import axios from "axios";

export const fileUpload = async (e) => {

  const formData = new FormData();

  formData.append("file", e.target.files[0]);

  const fileUploadRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASIC_URL,
    timeout: 10000,
  });

  fileUploadRequest.interceptors.request.use((config) => {
    const token = authStore.token.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["X-API-KEY"] = "P-LVV522r72r72mHNTNZ1w0FimKLFSCOqT";
    config.headers["Authorization"] = "API-KEY";

    return config;
  });

  fileUploadRequest.interceptors.response.use((response) => response.data, () => {});


  const fileUpload = await fileUploadRequest.post("https://api.admin.furgo.uz/v1/files/folder_upload?folder_name=media", formData).then((res) => res.data);

  return fileUpload;

};
