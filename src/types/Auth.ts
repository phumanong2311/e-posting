export type LoginPayload = {
  email: string;
  password: string;
};
export type LoginResult = {
  accessToken: string;
  tokenType: string;
  userId: string;
};
