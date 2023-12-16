import { MantineProvider, createTheme, rem } from "@mantine/core";
import "@mantine/core/styles.css";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";

function App() {
  const theme = createTheme({
    colors: {
      // Add your color
      deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
      // or replace default theme color
      blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
    },

    shadows: {
      md: "1px 1px 3px rgba(0, 0, 0, .25)",
      xl: "5px 5px 3px rgba(0, 0, 0, .25)",
    },

    headings: {
      fontFamily: "Roboto, sans-serif",
      sizes: {
        h1: { fontSize: rem(36) },
      },
    },
  });
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
