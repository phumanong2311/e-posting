import { AxiosResponse } from "axios";

import instance from "../http";
import { toast } from "../lib/toast";

export class API {
  basePath = instance.instance.defaults.baseURL;
  getUrl(target: string) {
    return `${this.basePath}${target}`;
  }

  async postAPI(target: string, data: Object) {
    return instance.instance
      .post(target, data)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => this.handleError(err));
  }

  async getAPI(target: string, params = {}) {
    return instance.instance
      .get(this.getUrl(target), {
        params: params,
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => this.handleError(err));
  }

  async putAPI(target: string, data: Object) {
    return instance.instance
      .put(target, data)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => this.handleError(err));
  }

  async deleteAPI(target: string) {
    return instance.instance
      .delete(target)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => this.handleError(err));
  }

  async handleError(error: AxiosResponse | any) {
    if (error.response) {
      if (error.response.data) {
        const message =
          error.response.data.message || error.response.data.detail;
        toast.error(message);
        return Promise.reject({
          status: error.response.status,
          errors: error.response.data,
          message: message,
        });
      }
      toast.error("Unknown error");
      return Promise.reject({
        status: error.response.status,
        message: "Unknown error",
      });
    }

    if (error.request) {
      return Promise.reject(error.request);
    }

    // Something happened in setting up the request that triggered an Error
    return Promise.reject(error.message);
  }
}
