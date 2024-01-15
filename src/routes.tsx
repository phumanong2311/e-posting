import { Suspense, lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { EditJobPosting } from "./components/JobPosting";
import { PageLayout } from "./layout/layout";
import { DashboardLayout } from "./layout/layout/DashboardLayout";
import { NotFoundPage } from "./pages";
import { paths } from "./types";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyProfilePage = lazy(() => import("./pages/MyProfile"));
const MyJobPostingsPage = lazy(
  () => import("./components/JobPosting/MyJobPostings")
);
const MyJobRequestsPage = lazy(() => import("./pages/MyJobRequests"));
const MyJobPostingsDetailPage = lazy(
  () => import("./components/JobPosting/MyJobPostingDetailPage")
);
const SearchPage = lazy(() => import("./pages/SearchPage"));

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <PageLayout />,
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
          },
          {
            path: "job-postings",
            element: (
              <Suspense>
                <MyJobPostingsPage />
              </Suspense>
            ),
          },
          {
            path: "job-postings/:id",
            element: (
              <Suspense>
                <MyJobPostingsDetailPage />
              </Suspense>
            ),
          },
          {
            path: "edit-job-posting/:id",
            element: (
              <Suspense>
                <EditJobPosting />
              </Suspense>
            ),
          },
          {
            path: "job-requests",
            element: (
              <Suspense>
                <MyJobRequestsPage />
              </Suspense>
            ),
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
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routesConfig);
