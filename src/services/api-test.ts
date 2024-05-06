// import Axios from 'axios';
// import queryString from 'query-string';
// import { isEmpty, isNil, reject } from 'ramda';

// import { parseData, parseError } from './helpers';

// import type {
//   TObject,
//   TGetParams,
//   IRequestBody,
//   IRequestProps,
//   IOptionsParams,
//   IOptionsResult,
//   IRequestParams,
// } from 'types/common';
// import { AuthService } from 'requests/services/auth';

// interface IConfigurationProps {
//   ssr?: boolean;
//   baseUrl?: string;
//   storage?: Storage;
//   skipVersion?: boolean;
//   requiredAuth?: boolean;
// }

// export class Api {
//   protected static _ssr: boolean;
//   protected static _apiEndpoint: string;
//   protected static _skipVersion: boolean;
//   protected static _authService: typeof AuthService;
//   protected static _requiredAuth: boolean | undefined;

//   public static config({
//     baseUrl,
//     storage,
//     ssr = false,
//     requiredAuth,
//     skipVersion = false,
//   }: IConfigurationProps): void {
//     this._ssr = ssr;
//     this._authService = AuthService;
//     this._skipVersion = skipVersion;
//     this._apiEndpoint = baseUrl || '';
//     this._requiredAuth = requiredAuth;

//     this._authService.config({
//       storage,
//     });
//   }

//   protected static async _options({
//     requiredAuth,
//     headers = {},
//   }: IOptionsParams): Promise<IOptionsResult> {
//     let options = {} as IOptionsResult;
//     const authToken = await this._authService?.token();

//     if (requiredAuth && authToken) {
//       options = {
//         ...options,
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       };
//     }

//     options.headers = { ...(options.headers as TObject), ...headers };

//     return options;
//   }

//   protected static async _request<T>({
//     data,
//     params,
//     signal,
//     headers,
//     endpoint,
//     version = 1,
//     method = 'get',
//     onUploadProgress,
//     isExternal = false,
//     requiredAuth = true,
//     skipVersion = false,
//     hasMeta = false,
//     responseType = 'json',
//   }: IRequestProps & IRequestBody & IRequestParams): Promise<T> {
//     if (typeof endpoint !== 'string') {
//       endpoint = queryString.stringifyUrl(
//         {
//           url: endpoint.url,
//           query: reject(isNil, endpoint.query || {}),
//         },
//         {
//           arrayFormat: 'bracket',
//         },
//       );
//     }

//     let url = endpoint.replace(/^\//, '');

//     if (!isExternal) {
//       url = [
//         this._apiEndpoint,
//         !(this._skipVersion || skipVersion) ? `v${version}` : '',
//         url,
//       ]
//         .filter((s) => !!s)
//         .join('/');
//     }

//     const promise = Axios.request({
//       ...reject(
//         (value) => !(!this._ssr && value instanceof FormData) && isEmpty(value),
//         {
//           url,
//           data,
//           params,
//           method,
//         },
//       ),
//       ...(await this._options({
//         headers,
//         requiredAuth: isNil(this._requiredAuth)
//           ? requiredAuth
//           : this._requiredAuth || false,
//       })),
//       signal,
//       responseType: responseType,
//       onUploadProgress,
//     })
//       .then((response) => parseData(response, hasMeta, responseType))
//       .catch(parseError);
//     return promise;
//   }

//   public static get<T>(options: TGetParams): Promise<T> {
//     return this._request<T>({ method: 'get', ...options });
//   }

//   public static post<T>(
//     options: Omit<IRequestProps, 'method'> & IRequestBody,
//   ): Promise<T> {
//     return this._request<T>({ method: 'post', ...options });
//   }

//   public static put<T>(
//     options: Omit<IRequestProps, 'method'> & IRequestBody,
//   ): Promise<T> {
//     return this._request<T>({ method: 'put', ...options });
//   }

//   public static delete<T>(
//     options: Omit<IRequestProps, 'method'> & IRequestBody,
//   ): Promise<T> {
//     return this._request<T>({ method: 'delete', ...options });
//   }
// }