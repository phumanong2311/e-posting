import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyProfilePage = lazy(() => import("./pages/MyProfile"));
const MyJobPostingsPage = lazy(() => import("./pages/MyJobPostings"));
const MyJobRequestsPage = lazy(() => import("./pages/MyJobRequests"));
const MyJobPostingsDetailPage = lazy(() =>
  import("./pages/MyJobPostingDetailPage")
);
const SearchPage = lazy(() => import("./pages/SearchPage"));

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
      {
        path: "my-job-postings/detail",
        element: (
          <Suspense>
            <MyJobPostingsDetailPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/search",
    element: (
      <Suspense>
        <SearchPage />
      </Suspense>
    ),
  },
]);
