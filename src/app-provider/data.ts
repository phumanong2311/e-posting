import { FunctionType, MainStateType } from './providerType'

export const mainDataDefault: MainStateType = {
  user: null,
  userProfile: null,
}

export const mainFuncDefault: FunctionType = {
  updateUser: () => {},
  updateUserProfile: () => {},
}

export const defaultDataType = {
  data: mainDataDefault,
  func: mainFuncDefault,
}
