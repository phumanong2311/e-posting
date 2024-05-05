import { useState } from "react";
import { mainDataDefault } from "./data";
import { MainStateType, UserProfile, UserType } from "./providerType";

export const useAppProvider = () => {
  const [mainState, setMainState] = useState<MainStateType>(mainDataDefault);

  const updateUser = (user: UserType) => {
    setMainState((prev) => {
      return {
        ...prev,
        user,
      };
    });
  };

  const updateUserProfile = (profile: UserProfile) => {
    setMainState((prev) => {
      return {
        ...prev,
        userProfile: profile,
      };
    });
  };

  return {
    data: mainState,
    func: {
      updateUser,
      updateUserProfile,
    },
  };
};
