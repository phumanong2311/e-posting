import { FunctionType, MainStateType } from './providerType'

export const mainDataDefault: MainStateType = {
  user: null,
  userProfile: null,
  visible: false,
}

export const mainFuncDefault: FunctionType = {
  updateUser: () => {},
  updateUserProfile: () => {},
  setLoading: () => {},
}

export const defaultDataType = {
  data: mainDataDefault,
  func: mainFuncDefault,
}
