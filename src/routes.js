import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyProfilePage = lazy(() => import("./pages/MyProfile"));
const MyJobPostingsPage = lazy(() => import("./pages/MyJobPostings"));
const MyJobRequestsPage = lazy(() => import("./pages/MyJobRequests"));

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
  {
    path: "/dashboard",
    element: <DashboardPage />,
    children: [
      {
        path: "my-profile",
        element: (
          <Suspense>
            <MyProfilePage />
          </Suspense>
        ),
      },
      {
        path: "my-job-postings",
        element: (
          <Suspense>
            <MyJobPostingsPage />
          </Suspense>
        ),
      },
      {
        path: "my-job-requests",
        element: (
          <Suspense>
            <MyJobRequestsPage />
          </Suspense>
        ),
      },
    ],
  },
]);
