import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
