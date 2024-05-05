import { ContentEngineType } from "../types";

export type UserType = {
  id: string;
  email: string;
  signupDate: string;
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

export type UserProfile = {
  id: string;
  profilePicture?: string;
  firstName: string;
  lastName: string;
  title: string;
  phone: string;
  country: string;
  stateOrProvince: string;
  city: string;
  userSummary: string;
  userUrls?: { urlName: string; url: string }[];
  workExperience: {
    experienceId: string;
    jobTitle: string;
    employmentType: string;
    company: string;
    startDate?: string;
    endDate?: string;
    workLocationType: string;
    isCurrentlyActive: boolean;
    location: string;
    responsibilities: string;
  }[];
  skills?: string[];
  resume?: string;
  profileStep1: string;
  profileStep2: string;
  profileStep3: string;
  profileStep4: string;
};

export type MainStateType = {
  user: UserType | null;
  userProfile: UserProfile | null;
};

export type FunctionType = {
  updateUser: (user: UserType) => void;
  updateUserProfile: (profile: UserProfile) => void;
};

export type AppProviderType = {
  data: MainStateType;
  func: FunctionType;
};
