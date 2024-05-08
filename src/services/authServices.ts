
import { LoginPayload, LoginResult } from "../types";
import { API } from "./api";

class AuthService extends API {
  async login(payload: LoginPayload): Promise<LoginResult> {
    return this.postAPI("/v1/auth/login", { ...payload });
  }
  async getAccessToken() {
    return this.getAPI("/token", {}, { headers: {} });
  }

  async logout() {
    return this.getAPI("/logout", {});
  }

  async isAuthenticated() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return false;
    }
  }

  async clearData() {
    localStorage.removeItem("access_token");
  }
}

const authService = new AuthService();

export default authService;
