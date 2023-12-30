import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";
import { AppProvider } from "./app-provider/AppProvider";

function App() {
  return (
    <MantineProvider>
      <AppProvider>
        <Notifications />
        <RouterProvider router={router} />
      </AppProvider>
    </MantineProvider>
  );
}

export default App;
