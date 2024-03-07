import { AxiosResponse } from 'axios'

import instance from '../http'
import { toast } from '../lib/toast'

export class API {
  basePath = instance.defaults.baseURL
  getUrl(target: string) {
    return `${this.basePath}${target}`
  }

  getHeader() {
    return {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
  }

  isResponseError(resp: AxiosResponse) {
    return ![200, 201, 204, 206].includes(resp.status)
  }

  async postAPI(target: string, data: Object, options = { headers: {} }) {
    return instance
      .post(target, data, {
        headers: { ...this.getHeader(), ...(options?.headers || {}) },
      })
      .then((resp) => {
        return resp.data
      })
      .catch((err) => this.handleError(err))
  }

  async getAPI(target: string, params = {}, options = { headers: {} }) {
    return instance
      .get(this.getUrl(target), {
        headers: { ...this.getHeader(), ...(options?.headers || {}) },
        params: params,
      })
      .then((resp) => {
        return resp.data
      })
      .catch((err) => this.handleError(err))
  }

  async putAPI(target: string, data: Object, options = { headers: {} }) {
    return instance
      .put(target, data, {
        headers: { ...this.getHeader(), ...(options?.headers || {}) },
      })
      .then((resp) => {
        return resp.data
      })
      .catch((err) => this.handleError(err))
  }

  async deleteAPI(target: string, options = { headers: {} }) {
    return instance
      .delete(target, {
        headers: { ...this.getHeader(), ...(options?.headers || {}) },
      })
      .then((resp) => {
        return resp.data
      })
      .catch((err) => this.handleError(err))
  }

  async handleError(error: AxiosResponse | any) {
    if (error.response) {
      if (error.response.data) {
        const message =
          error.response.data.message || error.response.data.detail
        toast.error(message)
        return Promise.reject({
          status: error.response.status,
          errors: error.response.data,
          message: message,
        })
      }
      toast.error('Unknown error')
      return Promise.reject({
        status: error.response.status,
        message: 'Unknown error',
      })
    }

    if (error.request) {
      return Promise.reject(error.request)
    }

    // Something happened in setting up the request that triggered an Error
    return Promise.reject(error.message)
  }
}
