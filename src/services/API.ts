import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { HttpErrorCode, TokenMethod, authorizationKey } from "../const/constants";

export class API {
  protected client!: AxiosInstance;

  errorHandlers = new Map<
    HttpErrorCode,
    (error: AxiosResponse, retry: () => Promise<any>) => void
  >();

  constructor(
    protected readonly baseUrl: string,
    protected readonly config: AxiosRequestConfig
  ) {
    this.client = axios.create({
      ...config,
      baseURL: baseUrl,
    })
  } 

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(url, config);
    return response.data;
  }

  public async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  public async put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  public async patch<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(url, config);
    return response.data;
  }

  setAccessToken(getter: () => string, tokenMethod = TokenMethod.Bearer) {
    this.client.interceptors.request.use((config) => {
      config.headers[authorizationKey] = `${tokenMethod} ${getter()}`;
      return config;
    });
  }

  setErrorHandler(
    code: HttpErrorCode,
    handler: (error: AxiosResponse, retry: () => Promise<any>) => void
  ) {
    this.errorHandlers.set(code, handler);
  }

  onError(errorsHandler: (error: any, retry?: () => Promise<any>) => void) {
    this.client.interceptors.response.use(undefined, (error) => {
      if (!isAxiosError(error)) {
        return errorsHandler(error);
      }
      const { response } = error;
      if (response) {
        const handler = this.errorHandlers.get(response.status);
        const retry = () => this.client.request(response.config);
        if (handler) {
          return handler(response, retry);
        }
        return errorsHandler(response, retry);
      }
      return errorsHandler(error);
    });
  }
}