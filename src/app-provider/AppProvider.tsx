import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useContext } from "react";
import { defaultDataType } from "./data";
import { AppProviderType } from "./providerType";
import { useAppProvider } from "./useAppProvider";

const AppContext = createContext<AppProviderType>(defaultDataType);
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const { data, func } = useAppProvider();
  return (
    <AppContext.Provider value={{ data, func }}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
            <Notifications />
            {children}
        </MantineProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
};
export const useAppProviderCtx = () => useContext(AppContext);
