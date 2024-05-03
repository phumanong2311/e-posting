import { useState } from "react";
import { mainDataDefault } from "./data";
import { MainStateType, UserProfile, UserType } from "./providerType";
import { ContentEngineType } from "../types";

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

  const updateContentManagementTemp = (data: ContentEngineType[]) => {
    setMainState((prev) => {
      return {
        ...prev,
        dataContentManagementTemp: data,
      };
    });
  }

  const createContentEngineTemp = (data: ContentEngineType) => {
    setMainState((prev) => {
      return {
        ...prev,
        dataContentManagementTemp: [data, ...prev.dataContentManagementTemp],
      };
    });
  
  }

  return {
    data: mainState,
    func: {
      updateUser,
      updateUserProfile,
      updateContentManagementTemp
    },
  };
};
