export type UserType = {
  id: string;
  email: string;
  signupDate: Date;
  isEmailAuthenticated: boolean;
  accountType: number;
  accountStatus: string;
  role: string;
  accountSettings?: string;
  lastActive?: Date;
  provider?: string;
  profile?: string;
  favorites?: string[];
  following?: string[];
};

export type MainStateType = {
  user: UserType;
};

export type FunctionType = {
  updateUser: (user: UserType) => void;
};

export type AppProviderType = {
  data: MainStateType;
  func: FunctionType;
};


