import { useState } from "react";
import { mainDataDefault } from "./data";
import { MainStateType } from "./providerType";

export const useAppProvider = () => {
  const [mainState, setMainState] = useState<MainStateType>(mainDataDefault);

  const updateUser = (user: any) => {
    setMainState((prev) => {
      return {
        ...prev,
        user,
      };
    });
  };

  return {
    data: mainState,
    func: {
      updateUser,
    },
  };
};
