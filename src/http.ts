import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  // baseURL: "https://nexapps.com/",
  baseURL: 'https://eposting.mvp.hoysum.com/',
  timeout: 5000,
})

export default instance
