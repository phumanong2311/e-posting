import axios, { AxiosInstance } from 'axios';


// const baseUrl = import.meta.env.VITE_DOMAIN
// const baseUrl = `https://nexapps.com/`
const baseUrl = 'https://eposting.mvp.hoysum.com/'
const instance: AxiosInstance = axios.create({
  // baseURL: "https://hoysum.com/",
  // baseURL: 'https://nexapps.com/',
  baseURL: baseUrl,
  timeout: 5000,
})

export default instance
