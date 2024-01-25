import { E_POSTING_TOKEN, REFRESH_TOKEN } from "../const/constants";

class Token {
  public accessToken: string | undefined | null = window.localStorage.getItem(E_POSTING_TOKEN) || null;
  public refreshToken: string | undefined | null = window.localStorage.getItem(REFRESH_TOKEN) || null;
  public setToken (token: string, refresh_token?: string) {
    localStorage.setItem(E_POSTING_TOKEN, token);
    if (refresh_token) {
      localStorage.setItem(REFRESH_TOKEN, refresh_token);
    }
    this.accessToken = token;
    this.refreshToken = refresh_token;
  }
  public removeToken () {
    localStorage.removeItem(E_POSTING_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    this.accessToken = null;
    this.refreshToken = null;
  }
}
export const tokenStore = new Token();