import axios from "axios";
import { getToken } from "../utils/token-storage";

const axiosInstance = axios.create({
  baseURL: "https://sairna.abdulrahman-hares.com/api/v1/dashboard",
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;