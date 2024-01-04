import { ResponseWrapper } from "../types/ResponseWrapper";
import { API } from "./api";

class UserService extends API {
  async getMe(): Promise<ResponseWrapper> {
    const url = "/user/me";
    return this.getAPI(url);
  }

  //TODO: Call to api GET /user/profile
  async getProfile(): Promise<ResponseWrapper> {
    const url = "/user/profile";
    return this.getAPI(url);
  }
}

const userService = new UserService();

export default userService;
