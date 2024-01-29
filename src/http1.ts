import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://hoysum.com/",
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
})

const instanceWithoutHeader: AxiosInstance = axios.create({
  baseURL: "https://hoysum.com/",
  timeout: 5000,
});

export default { instance, instanceWithoutHeader };
