import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://hoysum.com/",
  timeout: 5000,
});

export default instance;
