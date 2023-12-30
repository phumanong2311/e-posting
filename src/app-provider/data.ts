import { FunctionType, MainStateType, UserType } from "./providerType";

export const mainDataDefault: MainStateType = {
  user: {
    id: "",
    email: "",
    signupDate: new Date(),
    isEmailAuthenticated: false,
    accountType: 0,
    accountStatus: "",
    role: "",
  },
};

export const mainFuncDefault: FunctionType = {
  updateUser: (user: UserType) => {},
};

export const defaultDataType = {
  data: mainDataDefault,
  func: mainFuncDefault,
};
