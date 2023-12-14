import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const LoginPage = lazy(() => import("./pages/LoginPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
]);
