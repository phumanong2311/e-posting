import {
  FunctionType,
  MainStateType,
  UserProfile,
  UserType,
} from "./providerType";

export const mainDataDefault: MainStateType = {
  user: null,
  userProfile: null,
};

export const mainFuncDefault: FunctionType = {
  updateUser: (user: UserType) => {},
  updateUserProfile: (profile: UserProfile) => {},
};

export const defaultDataType = {
  data: mainDataDefault,
  func: mainFuncDefault,
};
