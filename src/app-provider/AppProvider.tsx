import { PropsWithChildren, createContext, useContext } from "react";
import { defaultDataType } from "./data";
import { AppProviderType } from "./providerType";
import { useAppProvider } from "./useAppProvider";

const AppContext = createContext<AppProviderType>(defaultDataType)

export const AppProvider = ({ children }: PropsWithChildren) => {
  const { data, func } = useAppProvider()
  return (
    <AppContext.Provider value={{ data, func }}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppProviderCtx = () => useContext(AppContext);