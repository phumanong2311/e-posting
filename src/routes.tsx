import { LoadingOverlay } from "@mantine/core";
import { Suspense, lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { EditJobPosting } from "./components/JobPosting";
import { PageLayout } from "./layout/layout";
import { DashboardLayout } from "./layout/layout/DashboardLayout";
import { NotFoundPage } from "./pages";
import ErrorBoundary from "./pages/ErrorBoundary ";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyProfilePage = lazy(() => import("./pages/MyProfile"));
const MyJobPostingsPage = lazy(
  () => import("./components/JobPosting/MyJobPostings")
);
const MyJobRequestsPage = lazy(() => import("./pages/MyJobRequests"));
const MyJobPostingsDetailPage = lazy(
  () => import("./pages/MyJobPostingDetailPage")
);
const SearchPage = lazy(() => import("./pages/SearchPage"));

const routesConfig: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <Suspense fallback={<LoadingOverlay visible variant="dots" />}>
        <PageLayout />
      </Suspense>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "profile",
            index: true,
            element: (
              <Suspense>
                <MyProfilePage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "job-postings",
            element: (
              <Suspense>
                <MyJobPostingsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "job-postings/:id",
            element: (
              <Suspense>
                <MyJobPostingsDetailPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "edit-job-posting/:id",
            element: (
              <Suspense fallback={<p>Loading package location...</p>}>
                <EditJobPosting />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "job-requests",
            element: (
              <Suspense>
                <MyJobRequestsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
        ],
      },
      {
        path: "search",
        element: (
          <Suspense>
            <SearchPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
  },
  {
    path: "login",
    index: true,
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routesConfig);
