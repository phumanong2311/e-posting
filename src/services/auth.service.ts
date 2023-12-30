import { API } from "./api";

class AuthService extends API {
  async get_access_token() {
    return this.getAPI("/token", {}, { headers: {} });
  }

  async logout() {
    return this.getAPI("/logout", {});
  }
}

const authService = new AuthService();

export default authService;
