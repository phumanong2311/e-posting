import { Suspense, lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { PageLayout } from "./layout/layout";
import { DashboardLayout } from "./layout/layout/DashboardLayout";
import { DefaultPage, NotFoundPage } from "./pages";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyProfilePage = lazy(() => import("./pages/MyProfile"));
const MyJobPostingsPage = lazy(() => import("./pages/MyJobPostings"));
const MyJobRequestsPage = lazy(() => import("./pages/MyJobRequests"));
const MyJobPostingsDetailPage = lazy(
  () => import("./pages/MyJobPostingDetailPage")
);
const SearchPage = lazy(() => import("./pages/SearchPage"));

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <DefaultPage />,
    children: [
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
    ],
  },
  {
    path: "login",
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
