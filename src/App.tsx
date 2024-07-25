import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";

import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { AppProvider } from "./app-provider/AppProvider";
import { router } from "./routes";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
