import { LoginPayload } from "../types/Auth";
import { API } from "./api";

class AuthService extends API {
  async login(payload: LoginPayload) {
    return this.postAPI("/v1/auth/login", { ...payload });
  }
  async get_access_token() {
    return this.getAPI("/token", {}, { headers: {} });
  }

  async logout() {
    return this.getAPI("/logout", {});
  }
}

const authService = new AuthService();

export default authService;
